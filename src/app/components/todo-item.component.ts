import { Component, inject, input, signal, ElementRef, viewChild, afterNextRender } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../models/todo.interface';
import { TodoService } from '../services/todo.service';
import { AnimationService } from '../services/animation.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div 
      #todoItem
      class="group flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]"
      [class.opacity-75]="todo().completed"
    >
      <!-- Checkbox -->
      <div class="relative">
        <input
          type="checkbox"
          [checked]="todo().completed"
          (change)="toggleTodo()"
          class="w-5 h-5 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200"
          [attr.aria-label]="'Mark ' + todo().text + ' as ' + (todo().completed ? 'incomplete' : 'complete')"
        />
        @if (todo().completed) {
          <svg class="absolute inset-0 w-5 h-5 text-green-500 pointer-events-none animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        }
      </div>
      
      <!-- Todo Text (Editable) -->
      <div class="flex-1 min-w-0">
        @if (isEditing()) {
          <input
            #editInput
            type="text"
            [(ngModel)]="editText"
            (blur)="saveEdit()"
            (keydown.enter)="saveEdit()"
            (keydown.escape)="cancelEdit()"
            class="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            placeholder="Enter todo text..."
          />
        } @else {
          <div
            (dblclick)="startEdit()"
            class="group-edit cursor-pointer px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 min-h-[2.5rem] flex items-center"
            [class.line-through]="todo().completed"
            [class.text-gray-500]="todo().completed"
            [class.dark:text-gray-400]="todo().completed"
            [class.text-gray-900]="!todo().completed"
            [class.dark:text-white]="!todo().completed"
          >
            <span class="break-words">{{ todo().text }}</span>
            <span class="ml-2 opacity-0 group-hover:opacity-100 text-xs text-gray-400 dark:text-gray-500 transition-opacity">
              Double-click to edit
            </span>
          </div>
        }
      </div>
      
      <!-- Actions -->
      <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        @if (!isEditing()) {
          <button
            (click)="startEdit()"
            class="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
          class="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
          [attr.aria-label]="'Delete ' + todo().text"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
      
      <!-- Timestamp -->
      <div class="text-xs text-gray-400 dark:text-gray-500 ml-2 hidden sm:block">
        {{ formatDate(todo().createdAt) }}
      </div>
    </div>
  `
})
export class TodoItemComponent {
  private todoService = inject(TodoService);
  private animationService = inject(AnimationService);
  
  readonly todo = input.required<Todo>();
  readonly isEditing = signal(false);
  readonly editText = signal('');
  
  private editInput = viewChild<ElementRef<HTMLInputElement>>('editInput');
  private todoItem = viewChild<ElementRef<HTMLDivElement>>('todoItem');
  
  constructor() {
    afterNextRender(() => {
      // Animate in when component is created
      const element = this.todoItem()?.nativeElement;
      if (element) {
        this.animationService.fadeIn(element, { duration: 400 });
      }
    });
  }
  
  toggleTodo(): void {
    this.todoService.toggleTodo(this.todo().id);
    
    // Add a subtle pulse animation
    const element = this.todoItem()?.nativeElement;
    if (element) {
      this.animationService.pulse(element, { duration: 200 });
    }
  }
  
  startEdit(): void {
    this.editText.set(this.todo().text);
    this.isEditing.set(true);
    
    // Focus the input after the next render
    setTimeout(() => {
      const input = this.editInput()?.nativeElement;
      if (input) {
        input.focus();
        input.select();
      }
    }, 0);
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
    const element = this.todoItem()?.nativeElement;
    if (element) {
      // Animate out before deleting
      const animation = this.animationService.fadeOut(element, { duration: 300 });
      animation.finished.then(() => {
        this.todoService.deleteTodo(this.todo().id);
      });
    } else {
      this.todoService.deleteTodo(this.todo().id);
    }
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
