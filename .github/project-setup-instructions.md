# EcoApp Project Setup Instructions

## Initial Package Installation Requirements

When setting up the EcoApp React TypeScript project, install the following packages ONLY:

```bash
npm install axios react-router-dom @types/react-router-dom styled-components @types/styled-components uuid @types/uuid
```

### Package Purposes:
- **axios** - For HTTP requests and API communication
- **react-router-dom** - For client-side routing and navigation
- **@types/react-router-dom** - TypeScript definitions for react-router-dom
- **styled-components** - For CSS-in-JS styling
- **@types/styled-components** - TypeScript definitions for styled-components
- **uuid** - For generating unique identifiers
- **@types/uuid** - TypeScript definitions for uuid

## Form Handling Philosophy

**CRITICAL**: Always use simple React JSX and HTML form elements. Do NOT use complex form libraries.

### Prohibited Libraries:
- ❌ react-hook-form
- ❌ @hookform/resolvers
- ❌ yup (validation library)
- ❌ @tanstack/react-query / react-query
- ❌ date-fns
- ❌ Any other over-complicated form handling libraries

### Preferred Approach:
- ✅ Native HTML form elements (`<form>`, `<input>`, `<select>`, `<textarea>`)
- ✅ React controlled components with useState
- ✅ Simple onChange handlers
- ✅ Custom validation with basic JavaScript/TypeScript
- ✅ Structured JSX with proper semantic HTML

## Form Implementation Guidelines

1. **Use React State Management**: Manage form data with `useState` hooks
2. **Controlled Components**: All form inputs should be controlled by React state
3. **Simple Validation**: Implement custom validation functions without external libraries
4. **Semantic HTML**: Use proper HTML5 form elements and attributes
5. **Accessibility**: Include proper labels, ARIA attributes, and form structure

## Example Form Pattern:

```tsx
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Simple validation and submission logic
};
```

This approach keeps the codebase simple, maintainable, and easy to understand without unnecessary dependencies.
