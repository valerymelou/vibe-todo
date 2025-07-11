import { Injectable, signal } from '@angular/core';

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private readonly _animationsEnabled = signal(true);

  readonly animationsEnabled = this._animationsEnabled.asReadonly();

  readonly defaultConfig: AnimationConfig = {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    delay: 0,
  };

  constructor() {
    // Check if user prefers reduced motion
    this.checkReducedMotion();
  }

  toggleAnimations(): void {
    this._animationsEnabled.update((enabled) => !enabled);
  }

  fadeIn(
    element: HTMLElement,
    config: Partial<AnimationConfig> = {}
  ): Animation {
    const finalConfig = { ...this.defaultConfig, ...config };

    if (!this._animationsEnabled()) {
      element.style.opacity = '1';
      return this.createDummyAnimation();
    }

    return element.animate(
      [
        { opacity: 0, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration: finalConfig.duration,
        easing: finalConfig.easing,
        delay: finalConfig.delay,
        fill: 'forwards',
      }
    );
  }

  fadeOut(
    element: HTMLElement,
    config: Partial<AnimationConfig> = {}
  ): Animation {
    const finalConfig = { ...this.defaultConfig, ...config };

    if (!this._animationsEnabled()) {
      element.style.opacity = '0';
      return this.createDummyAnimation();
    }

    return element.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-10px)' },
      ],
      {
        duration: finalConfig.duration,
        easing: finalConfig.easing,
        delay: finalConfig.delay,
        fill: 'forwards',
      }
    );
  }

  slideIn(
    element: HTMLElement,
    direction: 'left' | 'right' | 'up' | 'down' = 'left',
    config: Partial<AnimationConfig> = {}
  ): Animation {
    const finalConfig = { ...this.defaultConfig, ...config };

    if (!this._animationsEnabled()) {
      element.style.transform = 'translateX(0)';
      return this.createDummyAnimation();
    }

    const transforms = {
      left: ['translateX(-100%)', 'translateX(0)'],
      right: ['translateX(100%)', 'translateX(0)'],
      up: ['translateY(-100%)', 'translateY(0)'],
      down: ['translateY(100%)', 'translateY(0)'],
    };

    return element.animate(
      [
        { transform: transforms[direction][0], opacity: 0 },
        { transform: transforms[direction][1], opacity: 1 },
      ],
      {
        duration: finalConfig.duration,
        easing: finalConfig.easing,
        delay: finalConfig.delay,
        fill: 'forwards',
      }
    );
  }

  pulse(
    element: HTMLElement,
    config: Partial<AnimationConfig> = {}
  ): Animation {
    const finalConfig = { ...this.defaultConfig, ...config };

    if (!this._animationsEnabled()) {
      return this.createDummyAnimation();
    }

    return element.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' },
      ],
      {
        duration: finalConfig.duration,
        easing: finalConfig.easing,
        delay: finalConfig.delay,
      }
    );
  }

  private checkReducedMotion(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this._animationsEnabled.set(!mediaQuery.matches);

      mediaQuery.addEventListener('change', (e) => {
        this._animationsEnabled.set(!e.matches);
      });
    }
  }

  private createDummyAnimation(): Animation {
    // Create a dummy animation that completes immediately
    const dummy = document.createElement('div');
    return dummy.animate([], { duration: 0 });
  }
}
