import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import {CustomRequest} from "../interfaces/customRequest.interface";

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    res.json(user);
};

const testUserProperty = (req: CustomRequest) => {
    const userId = req.user?.userId; // Это не должно выдавать ошибку
};

export const login = async (req: Request, res: any) => {
    const { email, password } = req.body ;
    const user = await User.findOne({ where: { email: email } });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
};
