import { Router } from 'express';
import MessageController from '../controllers/messageController';

const router = Router();
const messageController = new MessageController();

router.get("/event", messageController.createTopic);

export default router;
