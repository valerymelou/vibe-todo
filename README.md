# 🎯 Vibe Todo App

A modern, feature-rich todo application built with Angular 20 and Tailwind CSS 4.0.

## ✨ Features

- **Modern Angular 20** with zoneless architecture
- **Standalone components** (no NgModules)
- **Signals-based state management** for reactive updates
- **Tailwind CSS 4.0** for styling
- **Dark mode support** with system preference detection
- **Smooth animations** and micro-interactions
- **Local storage persistence** - your todos survive page refreshes
- **Responsive design** - works on all devices
- **Full accessibility** - keyboard navigation and screen reader support

## 🚀 Todo Features

- ✅ Add new todos with form validation
- ✅ Edit todos inline (double-click to edit)
- ✅ Delete todos with smooth animations
- ✅ Toggle completion status
- ✅ Filter todos (All, Active, Completed)
- ✅ Bulk actions (Check All, Clear Completed)
- ✅ Progress tracking with visual progress bar
- ✅ Statistics and counters
- ✅ Theme toggle (Light/Dark/System)

## 🛠️ Technologies Used

- **Angular 20** - Latest version with zoneless architecture
- **Tailwind CSS 4.0** - Latest utility-first CSS framework
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming
- **Yarn** - Package manager

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vibe-todo.git
cd vibe-todo

# Install dependencies
yarn install

# Start development server
yarn start
```

## 🎮 Development

```bash
# Development server
yarn start

# Build for production
yarn build:prod

# Run tests
yarn test

# Deploy to GitHub Pages
yarn deploy
```

## 🚀 Deployment

### GitHub Pages

1. **Create a GitHub repository** and push your code
2. **Configure base href** in the deploy script (already set up)
3. **Deploy with one command**:
   ```bash
   yarn deploy
   ```

The app will be available at `https://yourusername.github.io/vibe-todo/`

### Manual Deployment

1. Build for production:

   ```bash
   yarn build:prod
   ```

2. Deploy the `dist/vibe-todo-app/browser/` directory to your hosting service

## 🎨 Architecture

- **Signals** for reactive state management
- **Standalone components** for modern Angular architecture
- **Dependency injection** with `inject()` function
- **New control flow** syntax (`@if`, `@for`, `@switch`)
- **Service-based architecture** for business logic
- **TypeScript interfaces** for type safety

## 🌙 Dark Mode

The app supports three theme modes:

- **Light** - Traditional light theme
- **Dark** - Dark theme for low-light environments
- **System** - Automatically follows your system preference

## 📱 Responsive Design

The app is fully responsive and works beautifully on:

- 📱 Mobile devices
- 📱 Tablets
- 💻 Desktop computers

## ♿ Accessibility

- Full keyboard navigation support
- Screen reader compatible
- ARIA labels and roles
- Focus management
- High contrast support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with Angular 20 and Tailwind CSS 4.0
- Inspired by modern todo app designs
- Uses the latest web development best practices

---

**Made with ❤️ using Angular 20 & Tailwind CSS 4.0**
