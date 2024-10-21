import { Request, Response } from 'express';
import Template from "../models/template";
import {TemplateCreationAttributes} from "../interfaces/template.interface";
import {CustomRequest} from "../interfaces/customRequest.interface";

export const createTemplate = async (req: CustomRequest, res: any) => {
    const { title, description, isPublic } = req.body;
    const userId = req.user?.userId; // Получаем userId из запроса
    console.log(req.user)

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const newTemplate: TemplateCreationAttributes = {
            title,
            description,
            isPublic,
            userId
        };
        const createdTemplate = await Template.create(newTemplate);
        res.status(201).json(createdTemplate);
    } catch (error) {
        console.error("Ошибка при создании шаблона:", error);
        res.status(500).json({ error: 'Ошибка при создании шаблона' });
    }
};

export const getAllTemplates = async (req: Request, res: Response) => {
    try {
        const templates = await Template.findAll();
        res.json(templates);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Ошибка при получении шаблонов' });
    }
};

export const getTemplateById = async (req: Request, res: any) => {
    try {
        const template = await Template.findByPk(req.params.id);
        if (!template) {
            return res.status(404).json({ error: 'Шаблон не найден' });
        }
        res.json(template);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении шаблона' });
    }
};

export const updateTemplate = async (req: Request, res: any) => {
    try {
        const [updated] = await Template.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updated) {
            return res.status(404).json({ error: 'Шаблон не найден' });
        }
        res.status(200).json({ message: 'Шаблон обновлен' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении шаблона' });
    }
};

export const deleteTemplate = async (req: Request, res: any) => {
    try {
        const deleted = await Template.destroy({
            where: { id: req.params.id },
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Шаблон не найден' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении шаблона' });
    }
};