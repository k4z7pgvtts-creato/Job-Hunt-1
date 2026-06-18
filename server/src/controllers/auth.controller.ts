import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";

import crypto from "crypto";

import UserAccount from "../models/user/user-account.model";

import UserType from "../models/user/user-type.model";

import { BadRequestError } from "../errors/BadRequestError";

import { ApiError } from "../errors/ApiError";
// AuthController

// Methods: login, signup, forgotPassword, me

export default class AuthController {

// This method is used to login a user

public static async login(req: Request, res: Response, next: NextFunction) {

try {

const { email, password } = req.body;

const user = await UserAccount.findOne({ email: email });
  // If user account is not found, throw an error
  if (!user) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "User account not found",
      []
    );
  }

  // If user account is found, compare the password
  if (!(user as any).comparePassword(password)) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Invalid email or password",
      []
    );
  }

  // Send a response with the user account details
  res.status(StatusCodes.OK).json({
    user: user,
    token: (user as any).generateJWT(),
  });
} catch (error) {
  throw error;
}
}
// This method is used to register a user

public static async signup(req: Request, res: Response, next: NextFunction) {

try {

const payload = req.body;

const { user_type_name } = payload;
  // Find the user type where name [job_seeker, hr_recruiter]
  const userType = await UserType.findOne({
    user_type_name: user_type_name,
  });

  // If user type is not found, throw an error
  if (!userType) {
    throw new BadRequestError(
      "User type not found with user_type_name provided",
      []
    );
  }

  // Check if user account exists
  const existingUser = await UserAccount.findOne({
    email: payload.email,
  });

  // If user account exists, throw an error
  if (existingUser) {
    throw new BadRequestError("User account already exists", []);
  }

  // Create a new user account with the user type id and other details
  const userAccount = new UserAccount({
    ...payload,
    user_type_id: userType._id,
    registration_date: new Date(),
  });

  // Save the user account
  await userAccount.save();

  // Send a response with the user account details
  res.status(StatusCodes.CREATED).json({
    message: "User account created successfully",
    user: userAccount,
  });
} catch (error) {
  throw error;
}
}
// This method is used to send a password reset link to the user's email

public static async forgotPassword(

req: Request,

res: Response,

next: NextFunction

) {

try {

const { email } = req.body;

const user = await UserAccount.findOne({ email });
  // Always return a generic success message, even if the email doesn't
  // exist, so we don't leak which emails are registered in our system.
  if (!user) {
    res.status(StatusCodes.OK).json({
      message:
        "If an account exists for that email, a reset link has been sent.",
    });
    return;
  }

  // Generate a secure random token and set a 15-minute expiry
  const resetToken = crypto.randomBytes(32).toString("hex");
  (user as any).reset_password_token = resetToken;
  (user as any).reset_password_expires = new Date(
    Date.now() + 15 * 60 * 1000
  );
  await user.save();

  // TODO: Replace this with a real email service (e.g. nodemailer) once
  // one is set up. For now we log the link so it can be tested manually.
  const resetLink =
    (process.env.CLIENT_URL || "http://localhost:5173") +
    "/auth/reset-password?token=" +
    resetToken;

  console.log(
    "[DEV ONLY] Password reset link for " + email + ": " + resetLink
  );

  res.status(StatusCodes.OK).json({
    message:
      "If an account exists for that email, a reset link has been sent.",
  });
} catch (error) {
  throw error;
}
}
// This method is used to get the current user

public static async me(req: Request, res: Response, next: NextFunction) {

try {

// Get the user account from the request object

const user = req.user;
  // Send a response with the user account details
  res.status(StatusCodes.OK).json({
    user: user,
  });
} catch (error) {
  throw error;
}
}

}