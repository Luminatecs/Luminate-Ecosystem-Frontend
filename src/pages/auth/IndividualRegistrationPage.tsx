import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { EducationLevel, RegisterIndividualDto } from '../../models';
import { AuthService } from '../../services/auth';
import Logger from '../../utils/logUtils';
import Button, { ButtonState } from '../../components/ui/Button';
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
  background: linear-gradient(135deg, #1967d2 0%, #1557b0 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

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

const Form = styled.form`
  width: 100%;
  flex: 1;
  overflow-y: auto;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  color: #202124;
  transition: all 0.15s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #1967d2;
    box-shadow: 0 0 0 1px #1967d2;
  }

  &:hover {
    border-color: #5f6368;
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
