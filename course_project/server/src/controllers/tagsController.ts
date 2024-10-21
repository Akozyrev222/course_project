import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Tag from "../models/tag";

export const searchTags = async (req: Request, res: any) => {
    const { query } = req.query;

    if (!query) return res.status(400).json({ error: 'Query is required' });

    const tags = await Tag.findAll({
        where: {
            name: {
                [Op.like]: `%${query}%`
            }
        }
    });

    res.json(tags);
};