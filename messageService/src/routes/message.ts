import { Router } from 'express';
import MessageController from '../controllers/messageController';

const router = Router();
const messageController = new MessageController();

router.post("/", messageController.create);
router.get("/test", messageController.getTest);

export default router;
