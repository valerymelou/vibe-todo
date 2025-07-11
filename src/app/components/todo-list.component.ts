import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { TodoItemComponent } from './todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  template: `
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      @if (todos().length === 0) {
        <div class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No todos yet</h3>
          <p class="text-gray-500">
            @switch (filter()) {
              @case ('active') {
                No active todos. Great job! 🎉
              }
              @case ('completed') {
                No completed todos yet. Start checking off some tasks!
              }
              @default {
                Add your first todo above to get started.
              }
            }
          </p>
        </div>
      } @else {
        <div class="divide-y divide-gray-200">
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
