import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private todoService = inject(TodoService);
  
  // For now, we'll expose the service for testing
  // Later we'll create specific components for each feature
  readonly stats = this.todoService.stats;
  readonly todos = this.todoService.filteredTodos;
  readonly filter = this.todoService.filter;
  
  ngOnInit() {
    // Add some test data if no todos exist
    if (this.todoService.todos().length === 0) {
      this.todoService.addTodo({ text: 'Welcome to Vibe Todo!' });
      this.todoService.addTodo({ text: 'Add your first todo item' });
      this.todoService.addTodo({ text: 'Check off completed tasks' });
      
      // Mark one as completed for testing
      const todos = this.todoService.todos();
      if (todos.length > 0) {
        this.todoService.toggleTodo(todos[0].id);
      }
    }
  }
}
