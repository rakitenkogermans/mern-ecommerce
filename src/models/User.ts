import { model, Schema } from "mongoose";
import { IUserModel } from "../types/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const UserSchema: Schema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minLength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minLength: 8,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.createJWT = function () {
  const user = this as IUserModel;
  return sign({ userId: user._id }, process.env.JWT_SECRET || "", {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as IUserModel;
  return await compare(candidatePassword, user.password);
};

const User = model<IUserModel>("User", UserSchema);
export { User };
