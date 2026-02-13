import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    avatar: {
        type: {
            url: String,
            localPath: String,
        },
        default: {
            url: `https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg`,
            localPath: ""
        }
    },

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    fullName: {
        type: String,
        trim: true
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },

    refreshToken: {
        type: String
    },

    forgotPasswordToken: {
        type: String
    },

    forgotPasswordExpiry: {
        type: Date
    },

    emailVerificationToken: {
        type: String
    },

    emailVerificationExpiry: {
        type: Date
    }
}, {
    timestamps: true
});

export const User = mongoose.model("User", userSchema);