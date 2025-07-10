export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoStats {
  total: number;
  active: number;
  completed: number;
}

export interface CreateTodoRequest {
  text: string;
}

export interface UpdateTodoRequest {
  id: string;
  text?: string;
  completed?: boolean;
}
