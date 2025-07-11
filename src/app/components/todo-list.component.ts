import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { TodoItemComponent } from './todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      @if (todos().length === 0) {
        <div class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No todos yet</h3>
          <p class="text-gray-500 dark:text-gray-400">
            @switch (filter()) {
              @case ('active') {
                <span class="flex items-center justify-center gap-2">
                  No active todos. Great job! 
                  <span class="text-2xl">🎉</span>
                </span>
              }
              @case ('completed') {
                <span class="flex items-center justify-center gap-2">
                  No completed todos yet. Start checking off some tasks!
                  <span class="text-2xl">✅</span>
                </span>
              }
              @default {
                <span class="flex items-center justify-center gap-2">
                  Add your first todo above to get started.
                  <span class="text-2xl">📝</span>
                </span>
              }
            }
          </p>
        </div>
      } @else {
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          @for (todo of todos(); track todo.id) {
            <div class="p-0">
              <app-todo-item [todo]="todo" />
            </div>
          }
        </div>
      }
    </div>
  `
})
export class TodoListComponent {
  private todoService = inject(TodoService);
  
  readonly todos = this.todoService.filteredTodos;
  readonly filter = this.todoService.filter;
}
