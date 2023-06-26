import { Request, Response } from 'express';
import { generateApiKey } from '../utils/apiKeyUtils';
import ApiError from '../utils/apiError';
import bcrypt from 'bcrypt';
import { registerUser } from '../services/registerUser';
import sendMail from '../utils/sendMail';
import User  from '../model/userModel';

const EXPIRATION_DAYS = 30; // Number of days until the API key expires

export const registerUserCtrl = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username) {
      throw new ApiError(400, 'Username is required', 'ValidationError', {
        username: ['Username is required'],
      });
    }

    if (!email) {
      throw new ApiError(400, 'Email is required', 'ValidationError', {
        email: ['Email is required'],
      });
    }

    if (!password){
      throw new ApiError(400, 'Password is required', 'ValidationError', {
        password: ['Password is required'],
      });
    }
    //Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    const apiKey = generateApiKey();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + EXPIRATION_DAYS);

    const user = await registerUser(username, email,hashedPassword, apiKey, expirationDate);

    // Send email to the user containing the API key and instructions
    const message = `Hi ${username},\n\nThank you for signing up!🙏\n\nYour API key is: ${user.apiKey}\n\nTo access protected routes, include this API key in the 'x-api-key' header of your requests.\n\nPlease keep your API key safe and do not share it with others.\n\nIf you have any questions or need further assistance, feel free to reach out.\n\nBest regards,\nThe API Team`;
    await sendMail({
      email: user.email,
      subject: 'API Key',
      message,
    });

    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        error: {
          message: error.message,
          code: error.errorCode,
          validationErrors: error.validationErrors,
        },
      });
    }
    return res.status(500).json({ error: 'Failed to register user' });
  }
};

// Get all users
export const getAllUsersCtrl = async (
  req: Request,
  res: Response,
) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();
    if(users){
      return res.status(200).json({message: "Users retrieved successfully", users});
    }
    else{
      throw new ApiError(404, 'User not found', 'NotFoundError');
    }
  } catch (error) {
    console.error('Error getting users:', error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        error: {
          message: error.message,
          code: error.errorCode,
          validationErrors: error.validationErrors,
        },
      });
    }

    return res.status(500).json({ error: 'Failed to get users' });
  }
};

// Get a user by userId
export const getUserByIdCtrl = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;

    // Retrieve the user from the database by userId
    const user = await User.findOne({ userId });

    if (!user) {
      throw new ApiError(404, 'User not found', 'NotFoundError');
    }

    return res.status(200).json({message: "User retrieved successfully", user});
  } catch (error) {
    console.error('Error getting user:', error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        error: {
          message: error.message,
          code: error.errorCode,
          validationErrors: error.validationErrors,
        },
      });
    }
   return res.status(500).json({ error: 'Failed to get user' });
  }
};

// Update a user by userId
export const updateUserCtrl = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;
    const { username, email } = req.body;

    // Update the user in the database by userId
    const user = await User.findOneAndUpdate(
      { userId },
      { username, email },
      { new: true }
    );

    if (!user) {
      throw new ApiError(404, 'User not found', 'NotFoundError');
    }

    return res.status(200).json({message: 	
      "User updated successfully", user});
  } catch (error) {
    console.error('Error updating user:', error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        error: {
          message: error.message,
          code: error.errorCode,
          validationErrors: error.validationErrors,
        },
      });
    }
    return res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user by userId
export const deleteUserCtrl = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;

    // Delete the user from the database by userId
    const user = await User.findOneAndDelete({ userId });

    if (!user) {
      throw new ApiError(404, 'User not found', 'NotFoundError');
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        error: {
          message: error.message,
          code: error.errorCode,
          validationErrors: error.validationErrors,
        },
      });
    }
    return res.status(500).json({ error: 'Failed to delete user' });
  }
};
