import { Router } from 'express';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { ProfileController } from './controllers/ProfileController';

import { ensureAuthenticated } from './middlewares/ensureAuthenticted';

const router = Router();
 
const authenticateUserController = new AuthenticateUserController();
const profileController = new ProfileController();
const createMessageController = new CreateMessageController();

router.get('/profile', ensureAuthenticated, profileController.handle);

router.post('/authenticate', authenticateUserController.handle);

router.post('/messages', ensureAuthenticated, createMessageController.handle);

export { router }