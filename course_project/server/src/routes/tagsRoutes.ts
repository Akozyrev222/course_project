import { Router } from 'express';
import { searchTags } from '../controllers/tagsController';

const router = Router();

router.get('/search', searchTags);

export default router;