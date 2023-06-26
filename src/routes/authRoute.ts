/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - userId
 *        - username
 *        - password
 *        - email
 *        - apiKey
 *        - apiKeyExpiration
 * 
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         apiKey:
 *           type: string
 *           description: The auto-generated API key of the user
 *         apiKeyExpiration:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users consuming the API
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request body
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 * /api/users/{userId}:
 *   get:
 *     summary: Get a user by userId
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update a user by userId
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 * /api/auth/regenerate-api-key/{userId}:
 *   post:
 *     summary: Regenerate a user's API key
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User API key regenerated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 * /api/users/delete/{userId}:
 *   delete:
 *     summary: Delete a user by userId
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The api/user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

import { Express, Request, Response } from 'express';
import { registerUserCtrl,  getAllUsersCtrl,
    getUserByIdCtrl,
    updateUserCtrl,
    deleteUserCtrl, } from '../controller/authCtrl';
    import { authenticateApiKey } from '../middlewares/authApiKey';
import { regenerateApiKey } from '../controller/regenApiKeys';

const authRoutes = (app: Express) => {
	app.post('/api/auth/register', registerUserCtrl);
    app.post('/api/auth/regenerate-api-key/:userId', regenerateApiKey);

    
  // User routes
  app.get('/api/users', getAllUsersCtrl);
  app.get('/api/users/:userId', getUserByIdCtrl);
  app.put('/api/users/:userId', updateUserCtrl);
  app.delete('/api/users/delete/:userId', deleteUserCtrl);
};

export default authRoutes;
