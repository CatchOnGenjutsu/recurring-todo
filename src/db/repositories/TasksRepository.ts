import { getDb } from '../db';

export type RepeatType = 'once' | 'daily' | 'weekly' | 'monthly';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  repeatType: RepeatType;
  repeatDays?: number[]; // для weekly (номера дней недели)
  dueDate?: string; // ISO-строка
}

export const TasksRepository = {
  create: async (task: Task) => {
    const db = getDb();
    await db.runAsync(
      `INSERT INTO tasks (title, description, repeatType, repeatDays, dueDate) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        task.title,
        task.description ?? null,
        task.repeatType,
        task.repeatDays ? JSON.stringify(task.repeatDays) : null,
        task.dueDate ?? null,
      ],
    );
  },

  getAll: async (): Promise<Task[]> => {
    const db = getDb();
    const rows = await db.getAllAsync<Task>('SELECT * FROM tasks');
    return rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      repeatType: row.repeatType as RepeatType,
      repeatDays: row.repeatDays ? JSON.parse(row.repeatDays) : undefined,
      dueDate: row.dueDate,
    }));
  },

  getById: async (id: number): Promise<Task | null> => {
    const db = getDb();
    const row = await db.getFirstAsync<Task>(
      'SELECT * FROM tasks WHERE id = ?',
      [id],
    );
    return row
      ? ({
          id: row.id,
          title: row.title,
          description: row.description,
          repeatType: row.repeatType as RepeatType,
          repeatDays: row.repeatDays
            ? JSON.parse(row.repeatDays as any)
            : undefined,
          dueDate: row.dueDate,
        } satisfies Task)
      : null;
  },

  update: async (id: number, task: Task) => {
    const db = getDb();
    await db.runAsync(
      `UPDATE tasks 
       SET title = ?, description = ?, repeatType = ?, repeatDays = ?, dueDate = ?
       WHERE id = ?`,
      [
        task.title,
        task.description ?? null,
        task.repeatType,
        task.repeatDays ? JSON.stringify(task.repeatDays) : null,
        task.dueDate ?? null,
        id,
      ],
    );
  },

  delete: async (id: number) => {
    const db = getDb();
    await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
  },
};
