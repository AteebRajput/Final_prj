import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessfullEmail
} from "../nodemailer/emails.js";

export const signupController = async (req, res) => {
  console.log("Request Body:", req.body);

  const {
    name,
    email,
    password,
    role,  // role should be a string
    phone,
    state,
    nic,
    address,
    postalCode,
    company,
    companyVAT,
    companyActivity,
    language,
    preferredProducts,
    otherProducts,
    termsAgreed,
  } = req.body;

  try {
    if (
      !name ||
      !email ||
      !password ||
      !role ||
      !phone ||
      !state ||
      !nic ||
      !address ||
      !postalCode ||
      !company ||
      !companyVAT ||
      !companyActivity ||
      !termsAgreed
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All required fields must be provided" });
    }

    // Ensure the role is a string and is valid
    const validRoles = ["seller", "buyer", "both"];
    if (typeof role !== "string" || !validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. The role must be one of ${validRoles.join(", ")}.`,
      });
    }

    // Check if user already exists
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
      postalCode,
      state,
      nic,
      company,
      companyVAT,
      companyActivity,
      language,
      preferredProducts,
      otherProducts,
      termsAgreed,
      verificationToken,
      verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours expiry
    });

    // Save user to the database
    try {
      await user.save();
    } catch (error) {
      console.error("Validation errors:", error.errors);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    // Generate and set JWT token in cookies
    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(email, verificationToken);

    // Respond with user data (excluding password)
    const userData = user.toObject();
    delete userData.password;
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userData,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  console.log("Request Body:", req.body);
  
  

  // const { userId } = req.params; // Assuming user ID is passed as a route parameter
  const {
    userId,
    name,
    email,
    role, // Role should be a string
    phone,
    state,
    nic,
    address,
    postalCode,
    company,
    companyVAT,
    companyActivity,
    language,
    preferredProducts,
    otherProducts,
  } = req.body;

  try {
    // Validate required fields
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });

  
    }

    console.log("User Id:",userId);
    
    // Ensure the role is valid (if provided)
    const validRoles = ["seller", "buyer", "both"];
    if (role && (typeof role !== "string" || !validRoles.includes(role))) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. The role must be one of ${validRoles.join(", ")}.`,
      });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (phone) user.phone = phone;
    if (state) user.state = state;
    if (nic) user.nic = nic;
    if (address) user.address = address;
    if (postalCode) user.postalCode = postalCode;
    if (company) user.company = company;
    if (companyVAT) user.companyVAT = companyVAT;
    if (companyActivity) user.companyActivity = companyActivity;
    if (language) user.language = language;
    if (preferredProducts) user.preferredProducts = preferredProducts;
    if (otherProducts) user.otherProducts = otherProducts;

    // Save the updated user to the database
    await user.save();

    // Respond with the updated user data (excluding sensitive fields like password)
    const updatedUser = user.toObject();
    delete updatedUser.password; // Remove the password from the response

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.query; // Extract userId from query parameters
    console.log("userId is", userId);

    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};



export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  

  try {
    // Find user with the verification token that hasn't expired
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpireAt: { $gt: Date.now() },
    });
    console.log("User found:", user);


    // If no user is found, send an error response
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired code" });
    }

    // Mark the user as verified and remove the verification token
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpireAt = undefined;

    // Save updated user
    await user.save();

    // Send a welcome email
    await sendWelcomeEmail(user.email, user.name);

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from the response
      },
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ success: false, message: error.message });
  }
};
export const loginController = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Input validation
      if (!email || !password) {
          return res.status(400).json({
              success: false,
              message: "Please provide both email and password"
          });
      }

      // Find user and check if email is verified
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({
              success: false,
              message: "Invalid credentials"
          });
      }

      // Check if email is verified
      if (!user.isVerified) {
          return res.status(401).json({
              success: false,
              message: "Please verify your email before logging in"
          });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({
              success: false,
              message: "Invalid credentials"
          });
      }

      // Generate token and update last login
      const token = generateTokenAndSetCookie(res, user._id);  // Make sure to return token here
      user.lastLogin = Date.now();
      await user.save();
      console.log("Token is:",token);
      
      // Remove sensitive data before sending response
      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.verificationToken;
      delete userResponse.verificationTokenExpireAt;

      res.status(200).json({
          success: true,
          message: "Login successful",
          user: userResponse,
          token  // <-- Add the token here in the response
      });

  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
          success: false,
          message: "An error occurred during login"
      });
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("token")
  res.status(201).json({success:true,message:"Logout Successfully"})
};


export const forgotPassword = async (req,res) =>{
  const {email} = req.body
  try {
      const user = await User.findOne({email})
      if(!user){
          return res.status(400).json({success:false,message:"Invalid credentials"})
      }
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000;

      user.resetPasswordToken = resetToken
      user.resetPasswordExpireAt = resetTokenExpireAt

      await user.save()
      await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)

      res.status(200).json({success:true,message:"Reset password link is sent to your email"})
  } catch (error) {
      console.log("Error sending Reset email", error);
      throw new Error(`Error sending Reset email: ${error.message}`);
  }
}

export const resetPassword = async (req,res) =>{
  const {password} = req.body
  const {token} = req.params;
  try {
      const user = await User.findOne({
          resetPasswordExpireAt:token,
          resetPasswordExpireAt: {$gt: Date.now()}
      })
      if(!user){
          return res.status(400).json({success:false,message:"Invalid credentials"})
      }
      const hashedPassword = await bcrypt.hash(password,10)
      user.resetPasswordToken = undefined
      user.resetPasswordExpireAt = undefined
      user.password = hashedPassword

      await user.save()

      await sendResetSuccessfullEmail(user.email)

      res.status(201).json({success:true,message:"Password Reset Successfully"})

  } catch (error) {
      console.log("Error while Reseting Password", error);
      throw new Error(`Error while Reseting Password: ${error.message}`);
  }
}


export const checkAuth = async (req, res) => {
  try {
      console.log("User ID in request:", req.userId); // Debugging log
      const user = await User.findById(req.userId).select("-password");
      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" }); // 404 for not found
      }
      res.status(200).json({ success: true, user }); // 200 OK
  } catch (error) {
      console.error("Error in checkAuth:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
