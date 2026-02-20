import { Router } from 'express'
import { login, logout, registerUser } from '../controllers/auth.controllers.js'
import { validate } from '../middlewares/validator.middlewares.js';
import { userRegisterValidator, userLoginValidator } from '../validators/index.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser)
router.route("/login").post(userLoginValidator(), validate ,login)
router.route("/logout").post(verifyJWT,logout)

export default router;