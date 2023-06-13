import User, { UserDocument } from '../model/userModel';
import ApiError from '../utils/apiError';
import { generateUserId } from '../utils/userUtils'; // Import the utility function to generate userId

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  apiKey: string,
  expirationDate: Date
): Promise<UserDocument> => {
  try {
    const userId = generateUserId(); // Generate the unique userId for the user

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, 'User with this email already exists', 'UserExists');
    }

    const user = new User({ userId, username, password,email, apiKey, apiKeyExpiration: expirationDate });
    await user.save();

    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new ApiError(500, 'Failed to register user', 'RegistrationError');
  }
};
