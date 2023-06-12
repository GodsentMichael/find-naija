
import mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import State from '../model/stateLgaModel';

const seedData = async () => {
  try {
    // Read the contents of the JSON file
    const filePath = path.join(__dirname, 'stateAndLocalGov.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    // Connect to your MongoDB database
    const db_url = process.env.DB_URL as string;
    await mongoose.connect(db_url);
    
    console.log('Connected to the database');

    // Clear existing data from the states collection
    await State.deleteMany();

    // Iterate over the data and create new documents for states and local government areas
    for (const stateData of data) {
      const state = new State(stateData);
      await state.save();
    }

    console.log('Data seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from the MongoDB database
    mongoose.disconnect();
    console.log('Disconnected from the database');
  }
};

// Call the seedData function to start the seeding process
seedData().catch((error) => {
  console.error('Failed to seed data:', error);
});
