import { User } from "../models/user.models.js"
import { ApiResponse } from "../utils/api-response.js"
import { ApiError} from "../utils/api-error.js"
import { asyncHandler } from "../utils/async-handler.js"
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js"


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generation access token", [])   
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {email, username, password} = req.body

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existingUser){
        throw new ApiError(409, "User with email or username already exists.", )
    }

    const newUser = await User.create({
        email,
        username,
        password,
        isEmailVerified: false
    })


    const { unHashedToken, hashedToken, tokenExpiry } = newUser.generateTemporaryToken()

    newUser.emailVerificationToken = hashedToken
    newUser.emailVerificationExpiry = tokenExpiry

    await newUser.save({validateBeforeSave: false})

    await sendEmail(
        {
            email: newUser?.email,
            subject: "Please verify your email.",
            mailgenContent: emailVerificationMailgenContent(
                newUser.username,
                `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
            )
        }
    )

    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user.")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            {user: createdUser},
            "User registered successfully and verification email has been sent on your email"
        )
    )
})


export {
    registerUser
}