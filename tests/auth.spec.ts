import request from 'supertest';
import { connect } from './database';
import app from '../app';
import User from '../src/model/userModel';

describe('Authenticate User', () => {
    let connectDB: any;
  
    beforeAll(async (): Promise<void> => {
      console.log('Starting the server...');
      connectDB = await connect();
    });
  
    afterEach(async () => {
      await connectDB.cleanup();
    });
  
    afterAll(async () => {
      await connectDB.disconnect();
    });
  
    // Tests for Signup end point
    it('Should signup a user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .set('content-type', 'application/json')
        .send({
          username: 'John Doe',
          email: 'john@doe.com',
          password: 'password123',
        });
  
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('username', 'John Doe');
      expect(res.body.user).toHaveProperty('email', 'john@doe.com');
    }, 5000); // Increase the timeout for this specific test
  
    it("Shouldn't signup a user", async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .set('content-type', 'application/json')
        .send({
          first_name: 'John',
          email: 'john@doe.com',
          password: 'password123',
        });
  
      expect(res.status).toBe(400);
    }, 5000);
   
  
  });

