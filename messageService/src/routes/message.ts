import { Router } from 'express';
import MessageController from '../controllers/messageController';

const router = Router();
const messageController = new MessageController();

router.post("/", messageController.create);

export default router;
