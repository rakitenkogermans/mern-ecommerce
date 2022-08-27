import { model, Schema } from "mongoose";
import { IUserModel } from "../types/User";

const UserSchema: Schema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minLength: 3,
      maxLength: 20,
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

// UserSchema.pre("save", async function (this: IUserModel, next) {
//   return next();
// });

const User = model<IUserModel>("User", UserSchema);
export { User };
