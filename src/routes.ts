import { Router } from 'express';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';

import { ensureAuthenticated } from './middlewares/ensureAuthenticted';

const router = Router();
 
const authenticateUserController = new AuthenticateUserController();

router.post('/authenticate', authenticateUserController.handle);


export { router }