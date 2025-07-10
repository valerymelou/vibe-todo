import { Injectable, signal, computed, effect } from '@angular/core';
import { Todo, TodoFilter, TodoStats, CreateTodoRequest, UpdateTodoRequest } from '../models/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly STORAGE_KEY = 'vibe-todo-items';
  
  // Signals for state management
  private readonly _todos = signal<Todo[]>([]);
  private readonly _filter = signal<TodoFilter>('all');
  
  // Public readonly signals
  readonly todos = this._todos.asReadonly();
  readonly filter = this._filter.asReadonly();
  
  // Computed signals for derived state
  readonly filteredTodos = computed(() => {
    const todos = this._todos();
    const filter = this._filter();
    
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  });
  
  readonly stats = computed<TodoStats>(() => {
    const todos = this._todos();
    const completed = todos.filter(todo => todo.completed).length;
    const active = todos.length - completed;
    
    return {
      total: todos.length,
      active,
      completed
    };
  });
  
  readonly allCompleted = computed(() => {
    const todos = this._todos();
    return todos.length > 0 && todos.every(todo => todo.completed);
  });
  
  constructor() {
    // Load todos from localStorage on initialization
    this.loadTodos();
    
    // Auto-save todos to localStorage whenever they change
    effect(() => {
      this.saveTodos(this._todos());
    });
  }
  
  // Todo CRUD operations
  addTodo(request: CreateTodoRequest): void {
    const newTodo: Todo = {
      id: this.generateId(),
      text: request.text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this._todos.update(todos => [...todos, newTodo]);
  }
  
  updateTodo(request: UpdateTodoRequest): void {
    this._todos.update(todos => 
      todos.map(todo => 
        todo.id === request.id 
          ? { 
              ...todo, 
              ...(request.text !== undefined && { text: request.text.trim() }),
              ...(request.completed !== undefined && { completed: request.completed }),
              updatedAt: new Date()
            }
          : todo
      )
    );
  }
  
  deleteTodo(id: string): void {
    this._todos.update(todos => todos.filter(todo => todo.id !== id));
  }
  
  toggleTodo(id: string): void {
    this._todos.update(todos => 
      todos.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  }
  
  // Batch operations
  toggleAllTodos(): void {
    const allCompleted = this.allCompleted();
    this._todos.update(todos => 
      todos.map(todo => ({ 
        ...todo, 
        completed: !allCompleted, 
        updatedAt: new Date() 
      }))
    );
  }
  
  clearCompleted(): void {
    this._todos.update(todos => todos.filter(todo => !todo.completed));
  }
  
  // Filter operations
  setFilter(filter: TodoFilter): void {
    this._filter.set(filter);
  }
  
  // Local storage operations
  private loadTodos(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const todos = JSON.parse(stored) as Todo[];
        // Convert date strings back to Date objects
        const normalizedTodos = todos.map(todo => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt)
        }));
        this._todos.set(normalizedTodos);
      }
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error);
    }
  }
  
  private saveTodos(todos: Todo[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  }
  
  private generateId(): string {
    return `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
