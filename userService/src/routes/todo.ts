import { Router } from 'express';
import { validateUser } from '../middleware/authMiddelware';
import TodoController from '../controllers/todoController';

const router = Router();
const todoController = new TodoController();

router.get("/:id", todoController.getOneById);
router.get("/uuid/:id", todoController.getOneByUUID);
router.get("/", todoController.getList);
router.post("/", [validateUser], todoController.create);
router.put("/", [validateUser], todoController.save);
router.delete("/sd/:id", [validateUser], todoController.softDelete);
router.delete("/sd/*", [validateUser], todoController.softDeleteMany);
router.delete("sr/:id", [validateUser], todoController.softRemove);
router.delete("sr/*", [validateUser], todoController.softRemoveMany);

export default router;
