import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import { RegisterOrganizationDto } from '../../models';
import Logger from '../../utils/logUtils';

/**
 * Compact Registration Design - Matches Login UI
 */
const RegisterContainer = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const RegisterCard = styled.div`
  display: flex;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 950px;
  width: 90%;
  height: 500px;
`;

const FormSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 500px;
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

const Title = styled.h1`
  color: #1e293b;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  width: 100%;
  flex: 1;
  overflow-y: auto;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
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

  &:invalid {
    border-color: #ef4444;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Checkbox = styled.input`
  margin-top: 0.125rem;
  flex-shrink: 0;
`;

const CheckboxLabel = styled.label`
  color: #4a5568;
  font-size: 0.75rem;
  line-height: 1.4;
  margin: 0;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  border-left: 3px solid #f56565;
`;

const BackLink = styled.div`
  text-align: center;
  margin-top: 1rem;
  
  a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.875rem;
    
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
`;

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

interface ValidationErrors {
  [key: string]: string | undefined;
}

const OrganizationRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerOrganization } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Personal Information Validation
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    // Password Validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.termsAccepted) {
      errors.termsAccepted = 'You must accept the terms and conditions';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setValidationErrors({});

    try {
      const registrationData: RegisterOrganizationDto = {
        // Placeholder organization fields (backend ignores these in two-phase approach)
        organizationName: 'PLACEHOLDER',
        contactEmail: formData.email.trim(),
        
        // Admin user fields (these are what the backend actually uses)
        adminName: formData.name.trim(),
        adminUsername: formData.username.trim(),
        adminEmail: formData.email.trim(),
        adminPassword: formData.password,
        confirmPassword: formData.confirmPassword,
        
        // Legal/compliance
        termsAccepted: formData.termsAccepted,
        privacyPolicyAccepted: true
      };

      Logger.info('OrganizationRegistration - Submitting admin registration (two-phase)');

      await registerOrganization(registrationData);
      Logger.info('OrganizationRegistration - Admin registration successful');
      
      navigate('/dashboard');
    } catch (error: any) {
      Logger.error('OrganizationRegistration - Admin registration failed');
      setValidationErrors({
        submit: error.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <FormSection>
          <div>
            <Title>Organization Admin Registration</Title>
            <Subtitle>Create your admin account - complete organization setup after login</Subtitle>
          </div>
          
          <Form onSubmit={handleSubmit} noValidate>
            {validationErrors.submit && (
              <ErrorMessage>{validationErrors.submit}</ErrorMessage>
            )}

            <FormRow>
              <FormGroup>
                <Label htmlFor="name">Administrator Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter admin name"
                  required
                  disabled={isSubmitting}
                />
                {validationErrors.name && <ErrorMessage>{validationErrors.name}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Choose username"
                  required
                  disabled={isSubmitting}
                />
                {validationErrors.username && <ErrorMessage>{validationErrors.username}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                required
                disabled={isSubmitting}
              />
              {validationErrors.email && <ErrorMessage>{validationErrors.email}</ErrorMessage>}
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create password"
                  required
                  disabled={isSubmitting}
                />
                {validationErrors.password && <ErrorMessage>{validationErrors.password}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  required
                  disabled={isSubmitting}
                />
                {validationErrors.confirmPassword && <ErrorMessage>{validationErrors.confirmPassword}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <CheckboxGroup>
              <Checkbox
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
              <CheckboxLabel htmlFor="termsAccepted">
                I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </CheckboxLabel>
            </CheckboxGroup>
            {validationErrors.termsAccepted && <ErrorMessage>{validationErrors.termsAccepted}</ErrorMessage>}

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Admin Account'}
            </SubmitButton>
          </Form>

          <BackLink>
            <Link to="/register">← Back to Registration Options</Link>
          </BackLink>
        </FormSection>

        <WelcomeSection>
          <WelcomeTitle>Welcome Institution!</WelcomeTitle>
          <WelcomeText>
            Create your admin account first, then complete your organization profile after logging in. Simple two-step setup!
          </WelcomeText>
        </WelcomeSection>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default OrganizationRegistrationPage;
