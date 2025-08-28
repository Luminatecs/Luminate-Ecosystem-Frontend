import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { EducationLevel, RegisterIndividualDto } from '../../models';
import { AuthService } from '../../services/auth';
import Logger from '../../utils/logUtils';
import Button, { ButtonState } from '../../components/ui/Button';
import {
  AuthContainer,
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
  background: rgba(255, 255, 255, 0.95);
  /* border-radius: 20px; */
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  /* max-width: 900px;
  width: 90%; */
  /* min-height: 600px; */
  height: 99vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(66, 153, 225, 0.4) 50%, transparent 100%);
  }
`;

/**
 * Form Section
 */
const FormSection = styled.div`
  flex: 0.6;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  -ms-overflow-style: none;
  scrollbar-width: none; 
  
  &::-webkit-scrollbar {
    display: none; 
  }
  max-height: 650px;
`;

/**
 * Welcome Section
 */
const WelcomeSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #2c5282 0%, #4299e1 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
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
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

/**
 * Form Component
 */
const Form = styled.form`
  width: 100%;
  flex: 1;
  overflow-y: auto;
`;

const Select = styled.select`
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

/**
 * Back Link
 */
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
  educationLevel: EducationLevel | '';
  termsAccepted: boolean;
}

interface ValidationErrors {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  educationLevel?: string;
  termsAccepted?: string;
  submit?: string;
}

const IndividualRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonState, setButtonState] = useState(ButtonState.IDLE);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    educationLevel: '',
    termsAccepted: false
  });
  
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

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

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.educationLevel) {
      errors.educationLevel = 'Please select your education level';
    }

    if (!formData.termsAccepted) {
      errors.termsAccepted = 'You must accept the terms and conditions';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field error when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setButtonState(ButtonState.ERROR);
      return;
    }

    setIsSubmitting(true);
    setButtonState(ButtonState.LOADING);
    setValidationErrors({});

    try {
      const registrationData: RegisterIndividualDto = {
        name: formData.name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        educationLevel: formData.educationLevel as EducationLevel,
        confirmPassword: formData.confirmPassword,
        termsAccepted: formData.termsAccepted
      };

      Logger.info('IndividualRegistration - Submitting registration');

      const response = await AuthService.registerIndividual(registrationData);
      
      if (response.success) {
        Logger.info('IndividualRegistration - Registration successful');
        setButtonState(ButtonState.SUCCESS);
        
        // Navigate to login after showing success state
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
      
    } catch (error: any) {
      Logger.error('IndividualRegistration - Registration failed:', error);
      setButtonState(ButtonState.ERROR);
      setValidationErrors({
        submit: error.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
      // Reset button state after 3 seconds if it's not success
      setTimeout(() => {
        if (buttonState !== ButtonState.SUCCESS) {
          setButtonState(ButtonState.IDLE);
        }
      }, 3000);
    }
  };

  return (
    // <AuthContainer>
      <RegisterContainer>
        <FormSection>
          <div>
            <AuthTitle>Create Individual Account</AuthTitle>
            <AuthSubtitle>Join as an individual student for personalized career guidance</AuthSubtitle>
          </div>
          
          <Form onSubmit={handleSubmit} noValidate>
            {validationErrors.submit && (
              <ErrorMessage role="alert">
                {validationErrors.submit}
              </ErrorMessage>
            )}

            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                maxLength={100}
                disabled={isSubmitting}
                aria-invalid={!!validationErrors.name}
              />
              {validationErrors.name && (
                <ErrorMessage role="alert">{validationErrors.name}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Choose a username"
                required
                maxLength={50}
                disabled={isSubmitting}
                aria-invalid={!!validationErrors.username}
              />
              {validationErrors.username && (
                <ErrorMessage role="alert">{validationErrors.username}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                maxLength={255}
                disabled={isSubmitting}
                aria-invalid={!!validationErrors.email}
              />
              {validationErrors.email && (
                <ErrorMessage role="alert">{validationErrors.email}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="educationLevel">Education Level</Label>
              <Select
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                aria-invalid={!!validationErrors.educationLevel}
              >
                <option value="">Select your education level</option>
                <option value={EducationLevel.JHS1}>JHS1</option>
                <option value={EducationLevel.JHS2}>JHS2</option>
                <option value={EducationLevel.JHS3}>JHS3</option>
                <option value={EducationLevel.SHS1}>SHS1</option>
                <option value={EducationLevel.SHS2}>SHS2</option>
                <option value={EducationLevel.SHS3}>SHS3</option>
                <option value={EducationLevel.UNIVERSITY}>University</option>
              </Select>
              {validationErrors.educationLevel && (
                <ErrorMessage role="alert">{validationErrors.educationLevel}</ErrorMessage>
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
                placeholder="Create a password"
                required
                disabled={isSubmitting}
                aria-invalid={!!validationErrors.password}
              />
              {validationErrors.password && (
                <ErrorMessage role="alert">{validationErrors.password}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
                disabled={isSubmitting}
                aria-invalid={!!validationErrors.confirmPassword}
              />
              {validationErrors.confirmPassword && (
                <ErrorMessage role="alert">{validationErrors.confirmPassword}</ErrorMessage>
              )}
            </FormGroup>

            <CheckboxGroup>
              <Checkbox
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                aria-invalid={!!validationErrors.termsAccepted}
              />
              <CheckboxLabel htmlFor="termsAccepted">
                I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </CheckboxLabel>
            </CheckboxGroup>
            {validationErrors.termsAccepted && (
              <ErrorMessage role="alert">{validationErrors.termsAccepted}</ErrorMessage>
            )}

            <Button
              type="submit"
              state={buttonState}
              disabled={isSubmitting}
              fullWidth
              successText="Registration successful! Redirecting to login..."
              errorText="Registration failed. Please try again."
              backgroundColor="#667eea"
            >
              Create Account
            </Button>
          </Form>

          <BackLink>
            <Link to="/register">← Back to Registration Options</Link>
          </BackLink>
        </FormSection>

        <WelcomeSection>
          <WelcomeTitle>Welcome Student!</WelcomeTitle>
          <WelcomeText>
            Join thousands of students who have discovered their career path with our personalized guidance platform.
          </WelcomeText>
        </WelcomeSection>
      </RegisterContainer>
    // </AuthContainer>
  );
};

export default IndividualRegistrationPage;
