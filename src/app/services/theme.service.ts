import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'vibe-todo-theme';
  
  private readonly _theme = signal<Theme>('system');
  private readonly _isDark = signal<boolean>(false);
  
  readonly theme = this._theme.asReadonly();
  readonly isDark = this._isDark.asReadonly();
  
  constructor() {
    // Load theme from localStorage
    this.loadTheme();
    
    // Listen for system theme changes
    this.watchSystemTheme();
    
    // Apply theme changes to document
    effect(() => {
      this.applyTheme();
    });
  }
  
  setTheme(theme: Theme): void {
    this._theme.set(theme);
    this.saveTheme(theme);
    this.updateDarkMode();
  }
  
  toggleTheme(): void {
    const currentTheme = this._theme();
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  private loadTheme(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY) as Theme;
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        this._theme.set(stored);
      }
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error);
    }
    this.updateDarkMode();
  }
  
  private saveTheme(theme: Theme): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
    }
  }
  
  private watchSystemTheme(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Initial check
      this.updateDarkMode();
      
      // Listen for changes
      mediaQuery.addEventListener('change', () => {
        this.updateDarkMode();
      });
    }
  }
  
  private updateDarkMode(): void {
    const theme = this._theme();
    let isDark = false;
    
    if (theme === 'dark') {
      isDark = true;
    } else if (theme === 'system') {
      isDark = typeof window !== 'undefined' && 
               window.matchMedia && 
               window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    this._isDark.set(isDark);
  }
  
  private applyTheme(): void {
    if (typeof document !== 'undefined') {
      const isDark = this._isDark();
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
