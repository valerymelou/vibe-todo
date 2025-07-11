import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { TodoFilter } from '../models/todo.interface';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [],
  template: `
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <!-- Filter Buttons -->
        <div class="flex gap-2 flex-wrap">
          @for (filterOption of filterOptions; track filterOption.value) {
          <button
            (click)="setFilter(filterOption.value)"
            class="px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
            [class.bg-blue-600]="currentFilter() === filterOption.value"
            [class.dark:bg-blue-500]="currentFilter() === filterOption.value"
            [class.text-white]="currentFilter() === filterOption.value"
            [class.bg-gray-100]="currentFilter() !== filterOption.value"
            [class.dark:bg-gray-700]="currentFilter() !== filterOption.value"
            [class.text-gray-700]="currentFilter() !== filterOption.value"
            [class.dark:text-gray-300]="currentFilter() !== filterOption.value"
            [class.hover:bg-blue-700]="currentFilter() === filterOption.value"
            [class.dark:hover:bg-blue-600]="
              currentFilter() === filterOption.value
            "
            [class.hover:bg-gray-200]="currentFilter() !== filterOption.value"
            [class.dark:hover:bg-gray-600]="
              currentFilter() !== filterOption.value
            "
          >
            {{ filterOption.label }}
            @if (filterOption.value === 'active' && stats().active > 0) {
            <span
              class="ml-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded-full"
            >
              {{ stats().active }}
            </span>
            } @if (filterOption.value === 'completed' && stats().completed > 0)
            {
            <span
              class="ml-1 px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
            >
              {{ stats().completed }}
            </span>
            }
          </button>
          }
        </div>

        <!-- Bulk Actions -->
        <div class="flex gap-2 flex-wrap">
          @if (stats().total > 0) {
          <button
            (click)="toggleAll()"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            {{ allCompleted() ? 'Uncheck All' : 'Check All' }}
          </button>
          } @if (stats().completed > 0) {
          <button
            (click)="clearCompleted()"
            class="px-4 py-2 text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Clear Completed ({{ stats().completed }})
          </button>
          }
        </div>
      </div>

      <!-- Stats Summary -->
      @if (stats().total > 0) {
      <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div
          class="flex justify-between text-sm text-gray-600 dark:text-gray-400"
        >
          <span>
            {{ stats().active }} of {{ stats().total }} tasks remaining
          </span>
          <span> {{ stats().completed }} completed </span>
        </div>

        <!-- Progress Bar -->
        <div class="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
            [style.width.%]="
              stats().total > 0 ? (stats().completed / stats().total) * 100 : 0
            "
          ></div>
        </div>
      </div>
      }
    </div>
  `,
})
export class TodoFilterComponent {
  private todoService = inject(TodoService);

  readonly currentFilter = this.todoService.filter;
  readonly stats = this.todoService.stats;
  readonly allCompleted = this.todoService.allCompleted;

  readonly filterOptions: { value: TodoFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  setFilter(filter: TodoFilter): void {
    this.todoService.setFilter(filter);
  }

  toggleAll(): void {
    this.todoService.toggleAllTodos();
  }

  clearCompleted(): void {
    this.todoService.clearCompleted();
  }
}
