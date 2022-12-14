import { CallbackWithoutResultAndOptionalError, model, Schema } from 'mongoose';
import { IUserModel } from '../types/User';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const UserSchema: Schema = new Schema<IUserModel>(
    {
        name: {
            type: String,
            required: [true, 'Please provide name'],
            minLength: 3,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide password'],
            minLength: 8,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

UserSchema.pre(
    'save',
    async function (this: IUserModel, next: CallbackWithoutResultAndOptionalError) {
        if (!this.isModified('password')) return;
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        return next();
    }
);

UserSchema.methods.createJWT = function () {
    const user = this as IUserModel;
    return sign({ userId: user._id, userName: user.name }, process.env.JWT_SECRET || '', {
        expiresIn: process.env.JWT_LIFETIME,
    });
};

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as IUserModel;
    return await compare(candidatePassword, user.password);
};

const User = model<IUserModel>('User', UserSchema);
export { User };
