import { Request, Response, NextFunction } from 'express';
import Template from "../models/template";
import {CustomRequest} from "../interfaces/customRequest.interface";

export const checkTemplateOwner = async (req: CustomRequest, res: any, next: NextFunction) => {
    const { userId } = req.user || {}; // Используем опциональную цепочку
    const { id } = req.params;

    const template = await Template.findByPk(id);

    if (!template) return res.status(404).json({ error: 'Template not found' });

    if (!req.user || (template.userId !== userId && !req.user.isAdmin)) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    next();
};