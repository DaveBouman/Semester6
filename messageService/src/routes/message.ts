import { Router } from 'express';
import MessageController from '../controllers/messageController';
import { validateUser } from '../middleware/authMiddelware';

const router = Router();
const messageController = new MessageController();

router.post("/", messageController.create);
router.get("/", messageController.getList);

export default router;
