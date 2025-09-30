import { Router } from 'express';
import { getTodos, createTodo, deleteTodo, updateTodo } from './controller.js';

const router = Router();

router.get('/', getTodos);
router.post('/', createTodo);

router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);

export default router;
