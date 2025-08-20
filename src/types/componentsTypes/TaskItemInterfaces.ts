export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface NewTaskValue {
  newTask: string;
}
export interface TaskItemPropsInterface {
  item: Task;
  toggleTask: (id: string) => void;
}
