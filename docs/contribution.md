# Contribution Guide

## How to Contribute to Nexa

Contributing to Nexa is a great way to improve the framework and help others in the community. Here’s how you can get started:

1. **Fork the repository:** Start by forking the Nexa repository to your GitHub account. This creates a copy of the repository where you can make changes.

2. **Clone your fork:** Clone your fork to your local machine using Git:

```bash
git clone https://github.com/your-username/nexa.git
```


3. **Create a branch:** Always create a new branch for your changes. This helps keep the `main` branch clean and makes it easier to manage multiple changes at once.

```bash
git checkout -b your-branch-name
```


4. **Make your changes:** Implement your changes, whether it's fixing bugs, adding new features, or improving documentation. Be sure to follow the code style and best practices outlined below.

5. **Commit your changes:** Once you’ve made the changes, commit them to your branch:

```bash
git add . git commit -m "Description of changes"
```

6. **Push your changes:** Push your changes to your forked repository:

```bash
git push origin your-branch-name
```


7. **Open a pull request (PR):** Once your changes are pushed to your fork, open a pull request against the main Nexa repository. Describe the changes you made, and why they’re important.

8. **Review & Merge:** Once the maintainers review and approve your PR, they will merge it into the main repository.

## Code Style & Best Practices

To keep the codebase clean and maintainable, we follow certain coding styles and best practices. Please make sure to adhere to these when contributing:

1. **Follow consistent naming conventions:** 
- Use camelCase for variable and function names.
- Use PascalCase for component and schema names.
- Keep class and variable names descriptive but concise.

2. **Indentation:** 
- Use 2 spaces for indentation (no tabs).

3. **Avoid unnecessary comments:** 
- Code should be self-explanatory, so avoid adding comments unless absolutely necessary.

4. **Writing tests:** 
- If you're adding new features or fixing bugs, make sure to write tests for your changes.
- Follow the existing testing structure and ensure tests are clear and concise.

5. **Commit messages:** 
- Use clear, concise commit messages that explain the purpose of the changes. For example:
  - "Fix bug in route handler"
  - "Add pagination support to the API"

- Commit messages should be in the present tense and follow this format:
  ```
  type(scope): short description
  ```

6. **Linting:** 
- Make sure your code is linted before committing. Use the `eslint` configuration provided in the project to ensure consistent formatting.

7. **Documentation:** 
- Update documentation when adding new features or making changes that affect the API or user-facing functionality. Follow the structure of the existing docs and make them clear and easy to understand.

## Submitting Issues & PRs

### Submitting Issues:

If you encounter a bug, error, or have a suggestion for Nexa, please follow these steps to submit an issue:

1. **Check for existing issues:** Before opening a new issue, check if someone else has already reported the same problem or suggestion.
2. **Create a clear issue title and description:** 
- Include steps to reproduce the problem.
- Provide context about your environment (e.g., Node version, operating system, etc.).
- Attach any relevant error messages, logs, or screenshots.
3. **Label your issue:** Use appropriate labels to categorize the issue (e.g., "bug", "feature request", "enhancement", etc.).

### Submitting Pull Requests:

When submitting a pull request (PR), follow these steps:

1. **Ensure your PR is complete:** Make sure your changes are fully implemented, tested, and documented before opening a PR.
2. **PR title and description:** 
- Provide a clear title and description for your PR. Explain what changes were made, and why they are needed.
3. **Follow the PR template:** If the project has a PR template, make sure to fill it out completely.
4. **Request reviews:** Request reviews from the maintainers or other contributors.
5. **Be responsive to feedback:** Address any feedback or requested changes from the maintainers.

By following these guidelines, you’ll help make Nexa a better framework for everyone!

---

## Summary

- **Fork** the repository and create a **branch** for your changes.
- Follow **code style** and **best practices** to maintain a clean, consistent codebase.
- Write **clear commit messages** and **documentation**.
- Submit **issues** and **pull requests** with detailed information.
- **Follow the PR template** and be responsive to reviews and feedback.

Thank you for contributing to Nexa! Your help makes the project better for everyone.
