import { Request, Response } from 'express';
import { User } from '../models/User';
import { StatusCodes } from '../constants/statusCodes';

const authUser = async (
    req: Request<unknown, unknown, { email: string; password: string }>,
    res: Response
) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Please provide all values');
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('Invalid credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('Invalid credentials');
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        token,
    });
};

const registerUser = async (
    req: Request<unknown, unknown, { name: string; email: string; password: string }>,
    res: Response
) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Please provide all values');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Email already in use');
    }

    const user = await User.create({ name, email, password });
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        token,
    });
};

const getUserProfile = async (req: Request, res: Response) => {
    const user = await User.findById(res.locals.userId).select('-password');

    if (!user) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('User not found');
    }

    res.json({
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
    });
};

const updateUserProfile = async (
    req: Request<unknown, unknown, { name: string; email: string; password: string }>,
    res: Response
) => {
    const user = await User.findById(res.locals.userId).select('-password');

    if (!user) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('User not found');
    }
    const { name, email, password } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
        user.password = password;
    }

    const updatedUser = await user.save();
    const token = updatedUser.createJWT();

    res.json({
        _id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        isAdmin: updatedUser.isAdmin,
        token,
    });
};

const updateUserById = async (
    req: Request<{ id: string }, unknown, { name: string; email: string; isAdmin: boolean }>,
    res: Response
) => {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('User not found');
    }
    const { name, email, isAdmin } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin;

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        isAdmin: updatedUser.isAdmin,
    });
};

const getUsers = async (req: Request, res: Response) => {
    const users = await User.find({}).select('-password');
    res.json(users);
};

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('User not found');
    }
    res.json(user);
};

const removeUser = async (req: Request<{ id: string }>, res: Response) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('User not found');
    }
    await user.remove();
    res.json({ message: 'User removed' });
};

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    removeUser,
    getUserById,
    updateUserById,
};
