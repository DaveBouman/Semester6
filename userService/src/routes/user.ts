import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const todoController = new UserController();

router.get("/event", todoController.createTopic);

export default router;
