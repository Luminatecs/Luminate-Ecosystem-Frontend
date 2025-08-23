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

## UI Component Standards

### MANDATORY: Custom Button Component Usage

**CRITICAL**: ALL button implementations throughout the application MUST use the custom Button component located at `src/components/ui/Button/index.tsx`.

### Button Component Rules:
- ❌ **NEVER** use HTML `<button>` elements
- ❌ **NEVER** use styled-components for button creation
- ❌ **NEVER** create custom button components
- ✅ **ALWAYS** use `import Button from '../components/ui/Button'`
- ✅ **ALWAYS** leverage built-in async loading states
- ✅ **ALWAYS** provide meaningful `successText` and `errorText` props
- ✅ **ALWAYS** use appropriate button variants (SOLID, OUTLINE, GHOST)

### Button Implementation Example:
```tsx
import Button, { ButtonState, ButtonVariant } from '../components/ui/Button';

// Basic usage
<Button onClick={handleClick}>
  Submit
</Button>

// Advanced usage with async handling
<Button
  onClick={handleAsyncSubmit}
  variant={ButtonVariant.SOLID}
  fullWidth
  successText="Form submitted successfully!"
  errorText="Failed to submit. Please try again."
  backgroundColor="#10b981"
>
  Save Changes
</Button>
```

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
- ✅ Custom Button component for all submit actions

## Form Implementation Guidelines

1. **Use React State Management**: Manage form data with `useState` hooks
2. **Controlled Components**: All form inputs should be controlled by React state
3. **Simple Validation**: Implement custom validation functions without external libraries
4. **Semantic HTML**: Use proper HTML5 form elements and attributes
5. **Accessibility**: Include proper labels, ARIA attributes, and form structure
6. **Button Standards**: Use custom Button component with proper async state management

## Example Form Pattern:

```tsx
import Button, { ButtonState } from '../components/ui/Button';

const [formData, setFormData] = useState({
  email: '',
  password: ''
});
const [buttonState, setButtonState] = useState(ButtonState.IDLE);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  setButtonState(ButtonState.LOADING);
  try {
    await submitForm(formData);
    setButtonState(ButtonState.SUCCESS);
    // Navigate or perform success actions
  } catch (error) {
    setButtonState(ButtonState.ERROR);
  }
};

// Form JSX
<form onSubmit={handleSubmit}>
  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
  />
  
  <Button
    type="submit"
    state={buttonState}
    fullWidth
    successText="Form submitted successfully!"
    errorText="Submission failed. Please try again."
  >
    Submit
  </Button>
</form>
```

## Component Migration Requirements

When updating existing components, ALL button elements must be replaced with the custom Button component:

### Before (Deprecated):
```tsx
<button onClick={handleClick}>Submit</button>
<StyledButton>Save</StyledButton>
<button disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
```

### After (Required):
```tsx
<Button onClick={handleClick}>Submit</Button>
<Button>Save</Button>
<Button state={ButtonState.LOADING}>Submit</Button>
```

This approach keeps the codebase simple, maintainable, and provides consistent user experience across all interactions.
