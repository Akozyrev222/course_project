import { Request as ExpressRequest } from 'express';

export interface CustomRequest extends ExpressRequest {
    user?: {
        userId: number;
        isAdmin: boolean;
    };
}