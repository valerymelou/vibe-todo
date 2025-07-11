import { Component, inject } from '@angular/core';
import { ThemeService, Theme } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  template: `
    <div class="flex items-center gap-2">
      <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
        Theme:
      </label>
      <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        @for (option of themeOptions; track option.value) {
        <button
          (click)="setTheme(option.value)"
          class="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          [class.bg-white]="currentTheme() === option.value && !isDark()"
          [class.bg-gray-800]="currentTheme() === option.value && isDark()"
          [class.text-gray-900]="currentTheme() === option.value && !isDark()"
          [class.text-white]="currentTheme() === option.value && isDark()"
          [class.shadow-sm]="currentTheme() === option.value"
          [class.text-gray-600]="currentTheme() !== option.value && !isDark()"
          [class.text-gray-400]="currentTheme() !== option.value && isDark()"
          [class.hover:text-gray-900]="
            currentTheme() !== option.value && !isDark()
          "
          [class.hover:text-gray-200]="
            currentTheme() !== option.value && isDark()
          "
          [attr.aria-label]="'Set theme to ' + option.label"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              [attr.d]="option.icon"
            />
          </svg>
          <span class="hidden sm:inline">{{ option.label }}</span>
        </button>
        }
      </div>
    </div>
  `,
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  readonly currentTheme = this.themeService.theme;
  readonly isDark = this.themeService.isDark;

  readonly themeOptions: { value: Theme; label: string; icon: string }[] = [
    {
      value: 'light',
      label: 'Light',
      icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    },
    {
      value: 'system',
      label: 'System',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
  ];

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}
