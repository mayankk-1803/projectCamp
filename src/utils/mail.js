import Mailgen from "mailgen";

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! We're excited to have you on board.",
            action: {
                instructions: "To verify your email, Please click on the following button",
                button: {
                    color: "#22BC66",
                    text: "Verify your email",
                    link: verificationUrl
                },
            },
            outro: "Need Help or have questions? Just reply to this email, we'd love to help.",
        }
    }
}

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset the password of your account.",
            action: {
                instructions: "To reset your password, click on the following button or link.",
                button: {
                    color: "#ea2e2e",
                    text: "Reset Password",
                    link: passwordResetUrl
                },
            },
            outro: "Need Help or have questions? Just reply to this email, we'd love to help.",
        }
    }
}


export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent
}