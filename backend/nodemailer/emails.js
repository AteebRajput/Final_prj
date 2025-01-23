import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";

dotenv.config();

// Validate environment variables
if (!process.env.USER || !process.env.PASSWORD) {
    throw new Error("Gmail credentials are missing in the environment variables.");
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error("Transporter error:", error);
    } else {
        console.log("Transporter ready to send emails:", success);
    }
});

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        if (!email || !verificationToken) {
            return { success: false, error: "Email and verification token are required" };
        }

        const mailOptions = {
            from: `"AgriHub" <${process.env.USER}>`,
            to: email,
            subject: "Verify Your Email - AgriHub",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Verification email sent:", info.messageId);

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending verification email:", error);
        return { success: false, error: error.message };
    }
};

export const sendWelcomeEmail = async (email, name) => {
    try {
        if (!email || !name) {
            return { success: false, error: "Email and name are required" };
        }

        const mailOptions = {
            from: `"AgriHub" <${process.env.USER}>`,
            to: email,
            subject: "Welcome to AgriHub!",
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Welcome email sent:", info.messageId);

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending welcome email:", error);
        return { success: false, error: error.message };
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        if (!email || !resetURL) {
            throw new Error("Email and reset URL are required");
        }

        const mailOptions = {
            from: `"AgriHub" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Reset Your Password - AgriHub",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL), // Fixed the replacement
            category: "PASSWORD RESET"
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Password reset email sent:", info.messageId);
        
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending reset email:", error);
        return { success: false, error: error.message };
    }
};

export const sendResetSuccessfullEmail = async (email) =>{
    
    try {
        const mailOptions = {
            to:email,
            from: `"AgriHub" <${process.env.GMAIL_USER}>`,
            subject:"Passwors Reset Successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"        
        }
        const info = await transporter.sendMail(mailOptions);
        console.log("Password reset email sent:", info.messageId);
    } catch (error) {
        
    }
}

