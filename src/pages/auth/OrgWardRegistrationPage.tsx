import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import { OrgWardRegistrationDto, EducationLevel } from '../../models';
import Logger from '../../utils/logUtils';

/**
 * Styled Components
 */
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #718096;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #2d3748;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 0.875rem 1rem;
  border: 2px solid ${props => props.hasError ? '#e53e3e' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53e3e' : '#667eea'};
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  padding: 0.875rem 1rem;
  border: 2px solid ${props => props.hasError ? '#e53e3e' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53e3e' : '#667eea'};
  }
`;

const TokenInput = styled.div`
  position: relative;
`;

const TokenLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TokenIcon = styled.span`
  font-size: 1.1rem;
`;

const TokenHelper = styled.div`
  color: #718096;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-style: italic;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  font-weight: 500;
`;

const SuccessMessage = styled.div`
  color: #38a169;
  font-size: 0.875rem;
  font-weight: 500;
`;

const SubmitButton = styled.button<{ isLoading?: boolean }>`
  background: ${props => props.isLoading ? '#a0aec0' : '#667eea'};
  color: white;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.isLoading ? '#a0aec0' : '#5a67d8'};
    transform: ${props => props.isLoading ? 'none' : 'translateY(-2px)'};
  }
`;

const BackLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  display: block;
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const InfoBox = styled.div`
  background: #edf2f7;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #667eea;
`;

const InfoTitle = styled.div`
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoText = styled.div`
  color: #4a5568;
  font-size: 0.875rem;
  line-height: 1.4;
`;

/**
 * Interface for form validation errors
 */
interface FormErrors {
  registrationToken?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  studentId?: string;
  educationLevel?: string;
  general?: string;
}

/**
 * Organization Ward Registration Page Component
 * SECURITY: Comprehensive validation and secure registration process with token verification
 */
const OrgWardRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerOrgWard } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState<OrgWardRegistrationDto>({
    registrationToken: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    studentId: '',
    educationLevel: '' as EducationLevel
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Input sanitization function
   * SECURITY: Prevent XSS and injection attacks
   */
  const sanitizeInput = (value: string): string => {
    return value.trim().replace(/[<>"']/g, '');
  };

  /**
   * Email validation
   * SECURITY: Comprehensive email format validation
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 255;
  };

  /**
   * Password validation
   * SECURITY: Strong password requirements
   */
  const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return { isValid: errors.length === 0, errors };
  };

  /**
   * Registration token validation
   * SECURITY: Validate token format and length
   */
  const validateToken = (token: string): boolean => {
    // Token should be alphanumeric and between 8-32 characters
    const tokenRegex = /^[A-Za-z0-9]{8,32}$/;
    return tokenRegex.test(token.trim());
  };

  /**
   * Student ID validation
   */
  const validateStudentId = (studentId: string): boolean => {
    // Student ID should be alphanumeric and between 3-20 characters
    const studentIdRegex = /^[A-Za-z0-9]{3,20}$/;
    return studentIdRegex.test(studentId.trim());
  };

  /**
   * Form validation function
   * SECURITY: Comprehensive input validation
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Registration token validation
    if (!formData.registrationToken.trim()) {
      newErrors.registrationToken = 'Registration token is required';
    } else if (!validateToken(formData.registrationToken)) {
      newErrors.registrationToken = 'Invalid token format. Must be 8-32 alphanumeric characters';
    }

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (formData.firstName.length > 50) {
      newErrors.firstName = 'First name must be less than 50 characters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    } else if (formData.lastName.length > 50) {
      newErrors.lastName = 'Last name must be less than 50 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors[0];
    }

    // Confirm password validation
    if (confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Student ID validation
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    } else if (!validateStudentId(formData.studentId)) {
      newErrors.studentId = 'Student ID must be 3-20 alphanumeric characters';
    }

    // Education level validation
    if (!formData.educationLevel) {
      newErrors.educationLevel = 'Please select your education level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input changes
   * SECURITY: Sanitize all inputs
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    
    if (name === 'confirmPassword') {
      setConfirmPassword(sanitizeInput(value));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'password' ? value : sanitizeInput(value) // Don't sanitize password
      }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  /**
   * Handle form submission
   * SECURITY: Comprehensive validation and secure registration
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    Logger.info('OrgWardRegistration: Form submission started');

    if (!validateForm()) {
      Logger.warn('OrgWardRegistration: Form validation failed');
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      Logger.info('OrgWardRegistration: Attempting registration', { 
        email: formData.email,
        token: formData.registrationToken.substring(0, 4) + '...' // Log partial token for debugging
      });

      await registerOrgWard(formData);
      
      Logger.success('OrgWardRegistration: Registration successful');
      setSuccessMessage('Registration successful! Please check your email to verify your account before logging in.');
      
      // Redirect to login after success
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000);

    } catch (error: any) {
      Logger.error('OrgWardRegistration: Registration failed', error);
      
      if (error.message.includes('email already exists')) {
        setErrors({ email: 'An account with this email already exists' });
      } else if (error.message.includes('invalid token') || error.message.includes('token not found')) {
        setErrors({ registrationToken: 'Invalid or expired registration token' });
      } else if (error.message.includes('student ID already exists')) {
        setErrors({ studentId: 'This student ID is already in use' });
      } else {
        setErrors({ 
          general: error.message || 'Registration failed. Please try again.' 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>Student Registration</Title>
        <Subtitle>Join your organization with a registration token</Subtitle>

        <InfoBox>
          <InfoTitle>
            <span>ℹ️</span>
            Registration Token Required
          </InfoTitle>
          <InfoText>
            You need a registration token from your organization admin to create your student account. 
            Contact your institution if you don't have one.
          </InfoText>
        </InfoBox>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <TokenLabel>
              <Label htmlFor="registrationToken">
                <TokenIcon>🎟️</TokenIcon>
                Registration Token *
              </Label>
            </TokenLabel>
            <TokenInput>
              <Input
                id="registrationToken"
                name="registrationToken"
                type="text"
                value={formData.registrationToken}
                onChange={handleChange}
                placeholder="Enter your registration token"
                hasError={!!errors.registrationToken}
                maxLength={32}
                style={{ fontFamily: 'monospace', letterSpacing: '1px' }}
                required
              />
              <TokenHelper>Provided by your organization admin</TokenHelper>
            </TokenInput>
            {errors.registrationToken && <ErrorMessage>{errors.registrationToken}</ErrorMessage>}
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                hasError={!!errors.firstName}
                maxLength={50}
                required
              />
              {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                hasError={!!errors.lastName}
                maxLength={50}
                required
              />
              {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@student.university.edu"
              hasError={!!errors.email}
              maxLength={255}
              required
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label htmlFor="studentId">Student ID *</Label>
              <Input
                id="studentId"
                name="studentId"
                type="text"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="STU12345"
                hasError={!!errors.studentId}
                maxLength={20}
                style={{ fontFamily: 'monospace' }}
                required
              />
              {errors.studentId && <ErrorMessage>{errors.studentId}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="educationLevel">Education Level *</Label>
              <Select
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                hasError={!!errors.educationLevel}
                required
              >
                <option value="">Select level</option>
                <option value="HIGH_SCHOOL">High School</option>
                <option value="UNDERGRADUATE">Undergraduate</option>
                <option value="GRADUATE">Graduate</option>
                <option value="POSTGRADUATE">Postgraduate</option>
                <option value="DOCTORATE">Doctorate</option>
                <option value="CERTIFICATE">Certificate</option>
                <option value="DIPLOMA">Diploma</option>
                <option value="OTHER">Other</option>
              </Select>
              {errors.educationLevel && <ErrorMessage>{errors.educationLevel}</ErrorMessage>}
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a strong password"
                hasError={!!errors.password}
                required
              />
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                hasError={!!errors.confirmPassword}
                required
              />
              {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
            </FormGroup>
          </FormRow>

          {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

          <SubmitButton type="submit" isLoading={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Student Account'}
          </SubmitButton>
        </Form>

        <BackLink to="/register">
          ← Back to Registration Options
        </BackLink>
      </FormCard>
    </Container>
  );
};

export default OrgWardRegistrationPage;
