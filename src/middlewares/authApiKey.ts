import { Request, Response, NextFunction } from 'express';
import User, { UserDocument } from '../model/userModel';
import ApiError from '../utils/apiError';

interface CustomRequest extends Request {
  user?: UserDocument; //This is to define the 'user' property on the Request object
}

export const authenticateApiKey = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const apiKey = req.headers['x-api-key']; // Assuming the API key is passed in the 'x-api-key' header

    if (!apiKey) {
      throw new ApiError(401, "You've not provided an API Key", 'MissingApiKey');
    }

    // Find the user by the API key
    const user: UserDocument | null = await User.findOne({ apiKey });

    if (!user) {
      throw new ApiError(401, 'Invalid API key', 'InvalidApiKey');
    }

    // Check the API key expiration
    const currentDate = new Date();

    if (user.apiKeyExpiration && user.apiKeyExpiration < currentDate) {
      throw new ApiError(401, 'Expired API key', 'ExpiredApiKey');
    }

    // Attach the authenticated user to the request object for future use
    req.user = user;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error authenticating API key:', error);

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        error: {
          message: error.message,
          code: error.errorCode,
        },
      });
    }

    return res.status(500).json({ error: 'Failed to authenticate API key' });
  }
};
