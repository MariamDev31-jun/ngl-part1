import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: function () {
            return this.provider === 'local'

        }
    },
    provider: {
        type: String,
        enum: ["local", "google", "facebook"],
        default: 'local'
    },
    profilePicture: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: 'male'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
export const User = model("User", UserSchema);

