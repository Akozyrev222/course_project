import {Router} from 'express';
import {
    createTemplate,
    getAllTemplates,
    getTemplateById,
    updateTemplate,
    deleteTemplate,
} from '../controllers/templateController';
import {
    createTemplateValidation,
    updateTemplateValidation,
} from '../validators/templateValidator';
import {validate} from '../middleware/validate';
import {checkTemplateOwner} from "../middleware/checkTemplateOwner";
import {authenticate} from "../middleware/authMiddleware";

const router = Router();

router.post('/', createTemplateValidation, validate, authenticate, createTemplate);
router.get('/', authenticate, getAllTemplates);
router.get('/:id', getTemplateById);
router.put('/:id', updateTemplateValidation, authenticate, checkTemplateOwner, validate, updateTemplate);
router.delete('/:id', authenticate, checkTemplateOwner, deleteTemplate);

export default router;