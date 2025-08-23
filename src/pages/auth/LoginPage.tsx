import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import { UserRole } from '../../models';
import Logger from '../../utils/logUtils';

/**
 * Compact Login Design - Matches UI Reference
 */
const PageContainer = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const LoginContainer = styled.div`
  display: flex;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 800px;
  width: 90%;
  height: 500px;
`;

const LoginFormSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WelcomeSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: white;
  text-align: center;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  color: #1e293b;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
`;

const SocialLogin = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  font-size: 0.75rem;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    border-color: #cbd5e1;
    background: #f8fafc;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  color: #64748b;
  font-size: 0.75rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
  }

  span {
    margin: 0 0.75rem;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.375rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  background: #f8fafc;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #6366f1;
    background: white;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }

  &[aria-invalid="true"] {
    border-color: #ef4444;
    background: #fef2f2;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CheckboxInput = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #4f46e5;
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: #475569;
  cursor: pointer;
`;

const ForgotPassword = styled.a`
  color: #6366f1;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const SignInButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SignUpPrompt = styled.div`
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;

  a {
    color: #4f46e5;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const WelcomeTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

const WelcomeText = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const SignUpButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  display: flex;
  align-items: center;
  
  &::before {
    content: '⚠';
    margin-right: 0.5rem;
    color: #ef4444;
  }
`;

const LoadingSpinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

/**
 * Form Data Interface
 */
interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

/**
 * Form Validation Interface
 */
interface ValidationErrors {
  username?: string;
  password?: string;
  submit?: string;
}

/**
 * Login Page Component
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, user } = useAuth();

  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    rememberMe: false,
  });

  // Validation state
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Form validation
   */
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters, numbers, underscores, and hyphens';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle input changes
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear validation error for this field
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setValidationErrors({});

      // Validate form
      if (!validateForm()) {
        return;
      }

      Logger.info('LoginPage: Attempting login', { username: formData.username });

      // Attempt login
      await login(formData.username, formData.password, formData.rememberMe);
      Logger.success('LoginPage: Login successful');
      
      // Route based on user role - user state will be updated after login
      // Use a small delay to ensure state is updated
      setTimeout(() => {
        if (user?.role === UserRole.ORG_ADMIN) {
          navigate('/organization-dashboard');
        } else {
          navigate('/ecosystem');
        }
      }, 100);
      
    } catch (error) {
      Logger.error('LoginPage: Login failed', error);
      
      setValidationErrors({
        submit: error instanceof Error 
          ? error.message 
          : 'Login failed. Please check your credentials and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <LoginContainer>
        {/* Login Form Section */}
        <LoginFormSection>
          <Header>
            <Title>Sign In</Title>
            <Subtitle>or use your email & password</Subtitle>
          </Header>

          {/* Social Login Buttons */}
          <SocialLogin>
            <SocialButton type="button">
              G+
            </SocialButton>
            <SocialButton type="button">
              f
            </SocialButton>
            <SocialButton type="button">
              in
            </SocialButton>
          </SocialLogin>

          <Divider>
            <span>or use your email & password</span>
          </Divider>

          <Form onSubmit={handleSubmit}>
            {validationErrors.submit && (
              <ErrorMessage role="alert">
                {validationErrors.submit}
              </ErrorMessage>
            )}

            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                required
                autoComplete="username"
                disabled={isLoading || isSubmitting}
                aria-invalid={!!validationErrors.username}
              />
              {validationErrors.username && (
                <ErrorMessage role="alert">
                  {validationErrors.username}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                autoComplete="current-password"
                disabled={isLoading || isSubmitting}
                aria-invalid={!!validationErrors.password}
              />
              {validationErrors.password && (
                <ErrorMessage role="alert">
                  {validationErrors.password}
                </ErrorMessage>
              )}
            </FormGroup>

            <CheckboxContainer>
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={isLoading || isSubmitting}
                />
                <CheckboxLabel htmlFor="rememberMe">
                  Remember me
                </CheckboxLabel>
              </CheckboxWrapper>
              <ForgotPassword href="/forgot-password">
                Forgot Your Password?
              </ForgotPassword>
            </CheckboxContainer>

            <SignInButton 
              type="submit" 
              disabled={isLoading || isSubmitting}
            >
              {(isLoading || isSubmitting) && <LoadingSpinner />}
              {isLoading || isSubmitting ? 'Signing In...' : 'SIGN IN'}
            </SignInButton>
          </Form>
        </LoginFormSection>

        {/* Welcome Section */}
        <WelcomeSection>
          <WelcomeTitle>Hello, Friend!</WelcomeTitle>
          <WelcomeText>Register your new account</WelcomeText>
          <SignUpButton onClick={() => navigate('/register')}>
            SIGN UP
          </SignUpButton>
        </WelcomeSection>
      </LoginContainer>
    </PageContainer>
  );
};

export default LoginPage;
