import { Router } from 'express';
import taskRoutes from './taskRoutes';


const router = Router();

router.get('/', (req, res) => {
    return res.send('Testando 1 2');
});
router.get('/teste', (req, res) => {
    return res.send('Testando 1 2');
});
router.use('/tasks', taskRoutes);

export { router };