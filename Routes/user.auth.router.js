import express from 'express';
import { regestirUser, loginUser, passReset, getLoggedInUser, sendEmail } from '../Controller/user.auth.controller.js';

const router = express.Router();

router.post('/auth/register',sendEmail, regestirUser);
router.post('/auth/login', loginUser);
router.post('/auth/changePassword', passReset);
router.get('/auth/user/me',getLoggedInUser );

export default router;
