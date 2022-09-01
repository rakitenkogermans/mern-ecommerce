import { Request, Response } from "express";
import { User } from "../models/User";
import { StatusCodes } from "../constants/statusCodes";

const authUser = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("please provide all values");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Invalid credentials");
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
  req: Request<{}, {}, { name: string; email: string; password: string }>,
  res: Response
) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    throw new Error("please provide all values");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("Email already in use");
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
  const user = await User.findById(res.locals.userId).select("-password");

  if (!user) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("User not found");
  }

  res.json({
    _id: user._id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
  });
};

export { authUser, registerUser, getUserProfile };
