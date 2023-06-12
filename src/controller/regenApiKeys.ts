import { Request, Response } from 'express';
import User, { UserDocument } from '../model/userModel';
import { generateApiKey } from '../utils/apiKeyUtils';
import ApiError from '../utils/apiError';

export const regenerateApiKey = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Find the user in the database
    const user: UserDocument | null = await User.findOne({ userId });
    if (!user) {
      throw new ApiError(404, 'User not found', 'UserNotFound');
    }

    // Generate a new API key
    const newApiKey = generateApiKey();

    // Set the expiration date to 30 days from the current date
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    // Update the user's API key and expiration date
    user.apiKey = newApiKey;
    user.apiKeyExpiration = expirationDate;
    await user.save();

    return res.status(200).json({ message: 'API key regenerated successfully', user });
  } catch (error) {
    console.error('Error regenerating API key:', error);

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        error: {
          message: error.message,
          code: error.errorCode,
        },
      });
    }

    return res.status(500).json({ error: 'Failed to regenerate API key' });
  }
};
