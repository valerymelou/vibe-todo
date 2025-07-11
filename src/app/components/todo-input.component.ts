import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
    >
      <form (ngSubmit)="addTodo()" class="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          [(ngModel)]="newTodoText"
          name="newTodo"
          placeholder="What needs to be done?"
          class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          [class.border-red-300]="showError() && !newTodoText().trim()"
          [class.dark:border-red-600]="showError() && !newTodoText().trim()"
          autocomplete="off"
        />
        <button
          type="submit"
          [disabled]="newTodoText().trim().length === 0"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium transform hover:scale-105 active:scale-95"
        >
          <span class="flex items-center gap-2">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Todo
          </span>
        </button>
      </form>

      @if (showError()) {
      <div
        class="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
      >
        <p
          class="text-sm text-red-600 dark:text-red-400 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          Please enter a valid todo item.
        </p>
      </div>
      }
    </div>
  `,
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
