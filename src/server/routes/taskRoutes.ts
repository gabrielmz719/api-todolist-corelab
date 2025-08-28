import { Router } from 'express';
import { listTasks, getTask, createTask, updateTask, deleteTask, toggleFavorite } from '../controllers/taskController';

const router = Router();

router.get('/', listTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/favorite', toggleFavorite);

export default router;
