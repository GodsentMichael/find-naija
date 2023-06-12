import {Express, Request, Response} from 'express';
import { registerUserCtrl } from "../controller/authCtrl";
import { regenerateApiKey } from '../controller/regenApiKeys';



const authRoutes = (app: Express) => {


    app.post('/api/auth/register', registerUserCtrl)
    app.post('/api/auth/regenerate-api-key/:userId', regenerateApiKey)
}

export default authRoutes

