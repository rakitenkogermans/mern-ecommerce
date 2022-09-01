import { Request, Response } from "express";
import { User } from "../models/User";
import { StatusCodes } from "../constants/statusCodes";

const userAuth = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    _id: user._id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
    token: null,
  });
};

export { userAuth };
