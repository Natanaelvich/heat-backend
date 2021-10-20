import { Router } from 'express';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { ProfileController } from './controllers/ProfileController';

import { ensureAuthenticated } from './middlewares/ensureAuthenticted';

const router = Router();
 
const authenticateUserController = new AuthenticateUserController();
const profileController = new ProfileController();

router.get('/profile', ensureAuthenticated, profileController.handle);

router.post('/authenticate', authenticateUserController.handle);


export { router }