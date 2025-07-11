import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { TodoInputComponent } from './components/todo-input.component';
import { TodoListComponent } from './components/todo-list.component';
import { TodoFilterComponent } from './components/todo-filter.component';
import { ThemeToggleComponent } from './components/theme-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TodoInputComponent,
    TodoListComponent,
    TodoFilterComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private todoService = inject(TodoService);

  readonly stats = this.todoService.stats;

  ngOnInit() {
    // Add some test data if no todos exist (only on first visit)
    if (this.todoService.todos().length === 0) {
      this.todoService.addTodo({ text: 'Welcome to Vibe Todo! 🎉' });
      this.todoService.addTodo({ text: 'Try dark mode with the toggle above' });
      this.todoService.addTodo({ text: 'Double-click to edit this todo' });
      this.todoService.addTodo({ text: 'Check off completed tasks' });
      this.todoService.addTodo({
        text: 'Try the filter buttons and animations',
      });

      // Mark one as completed for demo
      const todos = this.todoService.todos();
      if (todos.length > 0) {
        this.todoService.toggleTodo(todos[0].id);
      }
    }
  }
}
