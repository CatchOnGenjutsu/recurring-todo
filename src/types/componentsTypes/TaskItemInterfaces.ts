export type RepeatType = 'once' | 'daily' | 'weekly' | 'monthly';
export interface Task {
  id: number;
  title: string;
  description?: string;

  // Дата старта задачи
  dueDate: Date;

  // Повторяемость
  repeatType: RepeatType;

  // Поля для разных типов повторов:
  // ----
  // для weekly
  daysOfWeek?: number[]; // [1,3,5] (пн, ср, пт) — хранить лучше 0-6 (в стиле JS Date.getDay())

  // для monthly
  dayOfMonth?: number; // напр. 15 (каждое 15-е число)
  // (если в будущем понадобится "каждый 2-й понедельник месяца" —
  // можно добавить поля weekOfMonth + weekday)

  // для once — просто используем dueDate

  // Дополнительно
  isCompleted: boolean;
  createdAt: Date | null;
  updatedAt?: Date | null;
}

export interface NewTaskValue {
  newTask: string;
}
export interface TaskItemPropsInterface {
  item: Task;
  toggleTask: (id: number) => void;
}
