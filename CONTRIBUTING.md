# Contributing to Apex Terminal

Thank you for your interest in contributing to Apex Terminal! This document provides guidelines and instructions for contributing.

## 🎯 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/apex-terminal.git
   cd apex-terminal
   ```
3. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Workflow

### Setting Up Your Environment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

3. Add your API keys to `.env.local` (see README.md for details)

4. Start the development server:
   ```bash
   npm run dev
   ```

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Formatting**: Follow existing code style and patterns
- **Comments**: Add comments for complex logic or non-obvious code
- **Naming**: Use descriptive variable and function names

### Testing

Before submitting a PR:

- [ ] Test your changes locally
- [ ] Ensure the dashboard loads correctly
- [ ] Check that API calls work as expected
- [ ] Verify no console errors
- [ ] Test on different screen sizes (responsive)

## 🔀 Pull Request Process

1. **Update your branch** with the latest changes:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Write clear commit messages**:
   - Use present tense ("Add feature" not "Added feature")
   - Be descriptive but concise
   - Reference issues if applicable

3. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request** on GitHub with:
   - Clear title and description
   - What changes you made and why
   - Screenshots if UI changes
   - Any breaking changes or migration steps

## 📋 Code Review Guidelines

- Be respectful and constructive
- Focus on the code, not the person
- Ask questions if something is unclear
- Suggest improvements, don't just point out problems

## 🐛 Reporting Bugs

When reporting bugs, please include:

- **Description**: What happened vs. what you expected
- **Steps to reproduce**: Clear steps to recreate the issue
- **Environment**: Node version, OS, browser
- **Screenshots**: If applicable
- **Console errors**: Any error messages from the browser console

## 💡 Feature Requests

Have an idea? We'd love to hear it!

1. Check if it's already in the roadmap
2. Open an issue describing:
   - What you want to add
   - Why it would be useful
   - How it might work

## 📚 Areas for Contribution

- **Documentation**: Improve docs, add examples
- **UI/UX**: Enhance the dashboard design
- **Performance**: Optimize API calls, reduce bundle size
- **Features**: Add new analytics, filters, or visualizations
- **Testing**: Add tests for critical functionality
- **Accessibility**: Improve keyboard navigation, screen reader support

## ❓ Questions?

If you have questions about contributing:

- Open an issue with the `question` label
- Check existing documentation
- Review closed PRs for examples

Thank you for contributing! 🎉
