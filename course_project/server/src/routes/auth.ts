import {Router} from 'express';
import {register, login} from '../controllers/authController';
import {loginValidation, registerValidation} from "../validators/authValidator";
import {validate} from "../middleware/validate";

const router = Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

export default router;
