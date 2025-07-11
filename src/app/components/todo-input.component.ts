import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <form (ngSubmit)="addTodo()" class="flex gap-4">
        <input
          type="text"
          [(ngModel)]="newTodoText"
          name="newTodo"
          placeholder="What needs to be done?"
          class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
          [class.border-red-300]="showError()"
          autocomplete="off"
        />
        <button
          type="submit"
          [disabled]="newTodoText().trim().length === 0"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Add Todo
        </button>
      </form>
      
      @if (showError()) {
        <p class="mt-2 text-sm text-red-600">
          Please enter a valid todo item.
        </p>
      }
    </div>
  `
})
export class TodoInputComponent {
  private todoService = inject(TodoService);
  
  readonly newTodoText = signal('');
  readonly showError = signal(false);
  
  addTodo(): void {
    const text = this.newTodoText().trim();
    
    if (text.length === 0) {
      this.showError.set(true);
      return;
    }
    
    this.todoService.addTodo({ text });
    this.newTodoText.set('');
    this.showError.set(false);
  }
}
