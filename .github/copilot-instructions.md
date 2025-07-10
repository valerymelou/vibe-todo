# Copilot Instructions for Vibe Todo App

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a modern Angular 20 todo application built with:

- **Angular 20** with zoneless architecture (no zone.js)
- **Standalone components** (no NgModules)
- **Tailwind CSS 4.0** for styling
- **TypeScript** for type safety
- **Yarn** as package manager

## Coding Guidelines

### Angular Best Practices

- Use standalone components with `standalone: true`
- Prefer signals over traditional reactive patterns when possible
- Use the new control flow syntax (`@if`, `@for`, `@switch`) instead of structural directives
- Implement proper TypeScript interfaces for all data models
- Use dependency injection with `inject()` function where appropriate

### Tailwind CSS Guidelines

- Use Tailwind CSS 4.0 utility classes for styling
- Prefer utility-first approach over custom CSS
- Use responsive design classes (`sm:`, `md:`, `lg:`, `xl:`)
- Implement dark mode support using `dark:` prefix
- Use semantic color names and maintain consistent spacing

### Code Structure

- Keep components small and focused on single responsibilities
- Use services for business logic and data management
- Implement proper error handling and loading states
- Write comprehensive TypeScript interfaces for all data models
- Use Angular's built-in features like forms, routing, and HTTP client

### Todo App Features

The app should include:

- Add, edit, delete, and toggle todo items
- Filter todos by status (all, active, completed)
- Mark all as complete/incomplete
- Clear completed todos
- Responsive design that works on mobile and desktop
- Local storage persistence
- Clean, modern UI with smooth animations

## Development Notes

- The project uses the latest Angular CLI and follows current best practices
- All components should be properly tested
- Code should be well-documented and maintainable
- Follow accessibility guidelines (ARIA labels, keyboard navigation)
