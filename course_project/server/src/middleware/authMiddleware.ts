import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {CustomRequest} from "../interfaces/customRequest.interface";

export const authenticate = (req: CustomRequest, res: any, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; isAdmin: boolean; };
        req.user = {
            userId: (decoded as any).userId,
            isAdmin: (decoded as any).isAdmin || false
        };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
