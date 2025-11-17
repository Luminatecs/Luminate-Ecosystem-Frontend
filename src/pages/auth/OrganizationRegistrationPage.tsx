import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import { RegisterOrganizationDto } from '../../models';
import Logger from '../../utils/logUtils';
import {
  AuthTitle,
  AuthSubtitle,
  FormGroup,
  Label,
  Input,
  ErrorMessage
} from '../../components/auth/AuthStyles';

/**
 * Registration Container
 */
const RegisterContainer = styled.div`
  display: flex;
  background: white;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
`;

/**
 * Form Section
 */
const FormSection = styled.div`
  flex: 1;
  padding: 48px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  
  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 32px 24px;
    order: 2;
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;

/**
 * Welcome Section
 */
const WelcomeSection = styled.div`
  flex: 0.8;
  background: linear-gradient(135deg, #1a2332 0%, #2c5282 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 35, 50, 0.1);
  }

  @media (max-width: 768px) {
    flex: none;
    min-height: 250px;
    padding: 32px 24px;
    order: 1;
  }

  @media (max-width: 480px) {
    min-height: 200px;
    padding: 24px 16px;
  }
`;

/**
 * Form Components
 */
const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

/**
 * Form Component
 */
const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  
  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`;

const Checkbox = styled.input`
  margin-top: 2px;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  color: #5f6368;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  cursor: pointer;

  a {
    color: #1967d2;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #a5491a 0%, #F4824B 50%);
  color: white;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #1a2332 0%, #2c5282 100%);
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

/**
 * Back Link
 */
const BackLink = styled.div`
  text-align: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e8eaed;
  
  a {
    color: #1967d2;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const WelcomeTitle = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 16px;
  letter-spacing: 0;
`;

const WelcomeText = styled.p`
  font-size: 14px;
  line-height: 20px;
  opacity: 0.9;
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
      
      navigate('/login');
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
    // <AuthContainer>
      <RegisterContainer>
        <FormSection>
          <div>
            <AuthTitle>Organization Admin Registration</AuthTitle>
            <AuthSubtitle>Create your admin account - complete organization setup after login</AuthSubtitle>
          </div>
          
          <Form onSubmit={handleSubmit} noValidate>
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

            {validationErrors.submit && (
              <ErrorMessage style={{ marginBottom: '16px' }}>{validationErrors.submit}</ErrorMessage>
            )}

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
      </RegisterContainer>
    // </AuthContainer>
  );
};

export default OrganizationRegistrationPage;
