import { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IUserModel extends IUser, Document {}
