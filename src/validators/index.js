import { body } from "express-validator";

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),

        body("username")
            .trim()
            .notEmpty()
            .withMessage("username is required")
            .isLowercase()
            .withMessage("Username must be in lowercase")
            .isLength(
                {
                    min: 3
                }
            )
            .withMessage("Username must be of atleast 3 characters long"),

        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
    ]
}

const userLoginValidator = () => {
    return [
        body("email")
            .optional()
            .isEmail()
            .withMessage("Email is invalid"),
        
        body("password")
            .notEmpty()
            .withMessage("password is required")

    ]
}

export { userRegisterValidator, userLoginValidator }