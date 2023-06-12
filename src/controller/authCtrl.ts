import { Request, Response } from 'express';
import { generateApiKey } from '../utils/apiKeyUtils';
import ApiError from '../utils/apiError';
import { registerUser } from '../services/registerUser';
import sendMail from '../utils/sendMail';

const EXPIRATION_DAYS = 30; // Number of days until the API key expires

export const registerUserCtrl = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;

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

    const apiKey = generateApiKey();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + EXPIRATION_DAYS);

    const user = await registerUser(username, email, apiKey, expirationDate);

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
