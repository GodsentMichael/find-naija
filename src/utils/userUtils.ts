import { v4 as uuidv4 } from 'uuid';

export const generateUserId = (): string => {
  return uuidv4(); // Generate a new UUID (version 4) as the userId
};
