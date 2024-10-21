import { body } from 'express-validator';

export const createTemplateValidation = [
    body('title').isString().withMessage('Title is required'),
    body('description').isString().withMessage('Description is required'),
];

export const updateTemplateValidation = [
    body('title').optional().isString().withMessage('Title must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
];