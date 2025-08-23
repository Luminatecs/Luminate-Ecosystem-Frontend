# Custom Button Component

## Overview
A comprehensive, reusable button component with async loading states, success/error feedback, and multiple visual variants.

## Features
- 🔄 **Async Loading States** - Automatic spinner during async operations
- ✅ **Success/Error Feedback** - Visual feedback with status messages
- 🎨 **Multiple Variants** - Solid, outline, and ghost styles
- 🎯 **Customizable Colors** - Background, text, and border colors
- 📱 **Responsive Sizes** - Small, medium, and large sizes
- 🖱️ **Hover Effects** - Smooth animations and transforms
- ♿ **Accessibility** - Proper focus states and keyboard navigation

## Import
```typescript
import Button, { ButtonState, ButtonVariant } from '../components/ui/Button';
```

## Basic Usage
```tsx
<Button onClick={() => console.log('Clicked!')}>
  Click Me
</Button>
```

## Props

### Core Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Button content/text |
| `onClick` | `() => void \| Promise<void>` | - | Click handler (can be async) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `disabled` | `boolean` | `false` | Disable button |
| `className` | `string` | - | Additional CSS classes |

### Visual Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `SOLID` | Button style variant |
| `backgroundColor` | `string` | `#667eea` | Custom background color |
| `textColor` | `string` | `white` | Custom text color |
| `borderColor` | `string` | - | Custom border color |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `fullWidth` | `boolean` | `false` | Full width button |

### State Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `ButtonState` | - | External state control |
| `successText` | `string` | `'Success!'` | Success message text |
| `errorText` | `string` | `'Error occurred'` | Error message text |
| `autoHandleAsync` | `boolean` | `true` | Auto-manage async states |

## Variants

### Solid (Default)
```tsx
<Button variant={ButtonVariant.SOLID} backgroundColor="#667eea">
  Solid Button
</Button>
```

### Outline
```tsx
<Button variant={ButtonVariant.OUTLINE} borderColor="#667eea">
  Outline Button
</Button>
```

### Ghost
```tsx
<Button variant={ButtonVariant.GHOST} textColor="#667eea">
  Ghost Button
</Button>
```

## States

### Loading State (Automatic)
```tsx
<Button onClick={async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
}}>
  Click me (will show spinner)
</Button>
```

### Manual State Control
```tsx
const [buttonState, setButtonState] = useState(ButtonState.IDLE);

const handleSubmit = async () => {
  setButtonState(ButtonState.LOADING);
  try {
    await submitForm();
    setButtonState(ButtonState.SUCCESS);
  } catch (error) {
    setButtonState(ButtonState.ERROR);
  }
};

<Button 
  state={buttonState}
  onClick={handleSubmit}
  autoHandleAsync={false}
  successText="Form submitted successfully!"
  errorText="Failed to submit form"
>
  Submit Form
</Button>
```

## Sizes

```tsx
<Button size="small">Small Button</Button>
<Button size="medium">Medium Button</Button>
<Button size="large">Large Button</Button>
```

## Examples

### Registration Form Button
```tsx
<Button
  type="submit"
  fullWidth
  successText="Registration successful!"
  errorText="Registration failed. Please try again."
  backgroundColor="#10b981"
>
  Create Account
</Button>
```

### Login Button
```tsx
<Button
  onClick={handleLogin}
  fullWidth
  successText="Login successful! Redirecting..."
  errorText="Invalid credentials"
>
  Sign In
</Button>
```

### Action Button with Custom Colors
```tsx
<Button
  variant={ButtonVariant.OUTLINE}
  borderColor="#ef4444"
  textColor="#ef4444"
  onClick={handleDelete}
  successText="Deleted successfully"
>
  Delete Item
</Button>
```

### Loading Button
```tsx
<Button
  onClick={async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
  }}
>
  Save Changes
</Button>
```

## Best Practices

1. **Use appropriate variants**:
   - `SOLID` for primary actions
   - `OUTLINE` for secondary actions  
   - `GHOST` for tertiary actions

2. **Provide meaningful feedback**:
   - Set custom `successText` and `errorText`
   - Use appropriate colors for the action context

3. **Handle async operations**:
   - The component automatically handles async onClick functions
   - Use manual state control for complex form submissions

4. **Accessibility**:
   - The component includes proper ARIA states
   - Use semantic `type` props for form buttons

## Migration from Regular Buttons

Replace old button implementations:

### Before
```tsx
<button className="btn btn-primary" onClick={handleClick}>
  Submit
</button>

<StyledButton onClick={handleSubmit}>
  Save
</StyledButton>
```

### After
```tsx
<Button onClick={handleClick}>
  Submit
</Button>

<Button onClick={handleSubmit}>
  Save
</Button>
```
