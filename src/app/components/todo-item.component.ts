import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../models/todo.interface';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="group flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <!-- Checkbox -->
      <input
        type="checkbox"
        [checked]="todo().completed"
        (change)="toggleTodo()"
        class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        [attr.aria-label]="'Mark ' + todo().text + ' as ' + (todo().completed ? 'incomplete' : 'complete')"
      />
      
      <!-- Todo Text (Editable) -->
      <div class="flex-1 min-w-0">
        @if (isEditing()) {
          <input
            type="text"
            [(ngModel)]="editText"
            (blur)="saveEdit()"
            (keydown.enter)="saveEdit()"
            (keydown.escape)="cancelEdit()"
            class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            #editInput
          />
        } @else {
          <span
            (dblclick)="startEdit()"
            class="block cursor-pointer px-2 py-1 rounded hover:bg-gray-50 transition-colors"
            [class.line-through]="todo().completed"
            [class.text-gray-500]="todo().completed"
            [class.text-gray-900]="!todo().completed"
          >
            {{ todo().text }}
          </span>
        }
      </div>
      
      <!-- Actions -->
      <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        @if (!isEditing()) {
          <button
            (click)="startEdit()"
            class="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            [attr.aria-label]="'Edit ' + todo().text"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
        }
        
        <button
          (click)="deleteTodo()"
          class="p-1 text-gray-400 hover:text-red-600 transition-colors"
          [attr.aria-label]="'Delete ' + todo().text"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
      
      <!-- Timestamp -->
      <div class="text-xs text-gray-400 ml-2">
        {{ formatDate(todo().createdAt) }}
      </div>
    </div>
  `
})
export class TodoItemComponent {
  private todoService = inject(TodoService);
  
  readonly todo = input.required<Todo>();
  readonly isEditing = signal(false);
  readonly editText = signal('');
  
  toggleTodo(): void {
    this.todoService.toggleTodo(this.todo().id);
  }
  
  startEdit(): void {
    this.editText.set(this.todo().text);
    this.isEditing.set(true);
  }
  
  saveEdit(): void {
    const text = this.editText().trim();
    if (text.length > 0 && text !== this.todo().text) {
      this.todoService.updateTodo({
        id: this.todo().id,
        text: text
      });
    }
    this.isEditing.set(false);
  }
  
  cancelEdit(): void {
    this.isEditing.set(false);
    this.editText.set('');
  }
  
  deleteTodo(): void {
    this.todoService.deleteTodo(this.todo().id);
  }
  
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}
