import express from 'express';
import { regestirUser, loginUser, passReset, getLoggedInUser } from '../Controller/user.auth.controller.js';

const router = express.Router();

router.post('/auth/register', regestirUser);
router.post('/auth/login', loginUser);
router.post('/auth/changePassword', passReset);
router.get('/auth/user/me',getLoggedInUser );

export default router;
