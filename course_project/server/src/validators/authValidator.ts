import {body} from 'express-validator';
import User from "../models/user";

export const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
];

export const registerValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email').custom(async (email) => {
        const existingUser = await User.findOne({where: {email}});
        if (existingUser) {
            throw new Error('Email is already in use');
        }
        return true;
    }),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
];