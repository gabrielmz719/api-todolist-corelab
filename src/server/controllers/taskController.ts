import { Request, Response } from 'express';
import { db } from '../database/connection';
import { Task } from '../models/task';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const listTasks = async (req: Request, res: Response) => {
    const [rows] = await db.query<Task & RowDataPacket[]>(
        'SELECT * FROM tasks ORDER BY favorite DESC, id DESC'
    );
    res.json(rows);
};

export const getTask = async (req: Request, res: Response) => {
    const [rows] = await db.query<Task & RowDataPacket[]>(
        'SELECT * FROM tasks WHERE id = ?',
        [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(rows[0]);
};

export const createTask = async (req: Request, res: Response) => {
    const { title, description, completed = false, favorite = false, color } = req.body as Task;
    const [result] = await db.query<ResultSetHeader>(
        'INSERT INTO tasks (title, description, completed, favorite, color) VALUES (?, ?, ?, ?, ?)',
        [title, description, completed, favorite, color]
    );
    res.status(201).json({
        id: result.insertId,
        title,
        description,
        completed,
        favorite,
        color
    });
};

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as Partial<Task>;
    await db.query('UPDATE tasks SET ? WHERE id = ?', [data, id]);
    res.json({ message: 'Tarefa atualizada' });
};

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.status(204).send();
};

export const toggleFavorite = async (req: Request, res: Response) => {
    const { id } = req.params;
    await db.query('UPDATE tasks SET favorite = NOT favorite WHERE id = ?', [id]);
    res.json({ message: 'Favorito alternado' });
};
