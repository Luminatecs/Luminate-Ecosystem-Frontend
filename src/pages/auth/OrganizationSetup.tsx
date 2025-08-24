import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import { IndustryType } from '../../models';
import Logger from '../../utils/logUtils';

/**
 * Styled Components - Clean, professional setup form
 */
const SetupContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const SetupCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
`;

const FormSection = styled.div`
  padding: 2rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 2px;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.hasError ? '#ef4444' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 0.875rem;
  background: #f8fafc;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ef4444' : '#6366f1'};
    background: white;
    box-shadow: 0 0 0 2px ${props => props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'};
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.hasError ? '#ef4444' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 0.875rem;
  background: #f8fafc;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ef4444' : '#6366f1'};
    background: white;
    box-shadow: 0 0 0 2px ${props => props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'};
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.hasError ? '#ef4444' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 0.875rem;
  background: #f8fafc;
  transition: all 0.2s ease;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ef4444' : '#6366f1'};
    background: white;
    box-shadow: 0 0 0 2px ${props => props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'};
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

const SuccessMessage = styled.div`
  background: #c6f6d5;
  color: #22543d;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  border-left: 3px solid #38a169;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    
    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  ` : `
    background: #f3f4f6;
    color: #374151;
    
    &:hover:not(:disabled) {
      background: #e5e7eb;
    }
  `}
`;

const InfoBox = styled.div`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const InfoText = styled.p`
  color: #1e40af;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
`;

/**
 * Form data interface
 */
interface OrganizationFormData {
  organizationName: string;
  industryType: IndustryType | '';
  contactEmail: string;
  contactPhone: string;
  address: string;
  website: string;
  description: string;
}

/**
 * Validation errors interface
 */
interface ValidationErrors {
  [key: string]: string | undefined;
}

/**
 * Organization Setup Component
 * For completing organization profile after admin registration
 */
const OrganizationSetup: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<OrganizationFormData>({
    organizationName: '',
    industryType: '',
    contactEmail: user?.email || '',
    contactPhone: '',
    address: '',
    website: '',
    description: ''
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Calculate form progress
  const getFormProgress = (): number => {
    const requiredFields = ['organizationName', 'industryType', 'contactEmail', 'address'];
    const filledFields = requiredFields.filter(field => 
      formData[field as keyof OrganizationFormData].trim() !== ''
    );
    return Math.round((filledFields.length / requiredFields.length) * 100);
  };

  // Redirect if user is not ORG_ADMIN or setup is already complete
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'ORG_ADMIN') {
      navigate('/dashboard');
      return;
    }
    
    // TODO: Check if setup is already complete
    // if (user.organizationSetupComplete) {
    //   navigate('/dashboard');
    //   return;
    // }
  }, [user, navigate]);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Required field validation
    if (!formData.organizationName.trim()) {
      errors.organizationName = 'Organization name is required';
    }

    if (!formData.industryType) {
      errors.industryType = 'Please select an industry type';
    }

    if (!formData.contactEmail.trim()) {
      errors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      errors.contactEmail = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }

    // Optional field validation
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      errors.website = 'Website must start with http:// or https://';
    }

    if (formData.contactPhone && !/^\+?[\d\s\-()]+$/.test(formData.contactPhone)) {
      errors.contactPhone = 'Please enter a valid phone number';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    setSuccessMessage('');

    try {
      // TODO: Call organization setup API endpoint
      const organizationData = {
        name: formData.organizationName.trim(),
        industry_type: formData.industryType,
        contact_email: formData.contactEmail.trim(),
        contact_phone: formData.contactPhone.trim() || undefined,
        address: formData.address.trim(),
        website: formData.website.trim() || undefined,
        description: formData.description.trim() || undefined
      };

      Logger.info('OrganizationSetup - Submitting organization setup', organizationData);

      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));

      Logger.success('OrganizationSetup - Organization setup completed successfully');
      
      setSuccessMessage('Organization setup completed successfully! Redirecting to dashboard...');
      
      // Redirect to dashboard after success
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error: any) {
      Logger.error('OrganizationSetup - Setup failed', error);
      setValidationErrors({
        submit: error.message || 'Setup failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipForNow = () => {
    // TODO: Implement skip functionality
    navigate('/dashboard');
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <SetupContainer>
      <SetupCard>
        <Header>
          <Title>Complete Your Organization Setup</Title>
          <Subtitle>Finish setting up your organization profile to get started</Subtitle>
        </Header>

        <FormSection>
          <ProgressBar>
            <ProgressFill progress={getFormProgress()} />
          </ProgressBar>

          <InfoBox>
            <InfoText>
              <strong>Welcome, {user.name}!</strong> Complete your organization profile to enable 
              student registration and start managing your institution effectively.
            </InfoText>
          </InfoBox>

          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

          <Form onSubmit={handleSubmit}>
            {validationErrors.submit && (
              <ErrorMessage>{validationErrors.submit}</ErrorMessage>
            )}

            <FormRow>
              <FormGroup>
                <Label htmlFor="organizationName">Organization Name *</Label>
                <Input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="Enter your organization name"
                  hasError={!!validationErrors.organizationName}
                  disabled={isSubmitting}
                />
                {validationErrors.organizationName && (
                  <ErrorMessage>{validationErrors.organizationName}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="industryType">Industry Type *</Label>
                <Select
                  id="industryType"
                  name="industryType"
                  value={formData.industryType}
                  onChange={handleInputChange}
                  hasError={!!validationErrors.industryType}
                  disabled={isSubmitting}
                >
                  <option value="">Select industry type</option>
                  <option value={IndustryType.EDUCATION}>Education</option>
                  <option value={IndustryType.TECHNOLOGY}>Technology</option>
                  <option value={IndustryType.HEALTHCARE}>Healthcare</option>
                  <option value={IndustryType.FINANCE}>Finance</option>
                  <option value={IndustryType.MANUFACTURING}>Manufacturing</option>
                  <option value={IndustryType.GOVERNMENT}>Government</option>
                  <option value={IndustryType.OTHER}>Other</option>
                </Select>
                {validationErrors.industryType && (
                  <ErrorMessage>{validationErrors.industryType}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                placeholder="organization@example.com"
                hasError={!!validationErrors.contactEmail}
                disabled={isSubmitting}
              />
              {validationErrors.contactEmail && (
                <ErrorMessage>{validationErrors.contactEmail}</ErrorMessage>
              )}
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="contactPhone">Phone Number (Optional)</Label>
                <Input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  hasError={!!validationErrors.contactPhone}
                  disabled={isSubmitting}
                />
                {validationErrors.contactPhone && (
                  <ErrorMessage>{validationErrors.contactPhone}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://yourorganization.com"
                  hasError={!!validationErrors.website}
                  disabled={isSubmitting}
                />
                {validationErrors.website && (
                  <ErrorMessage>{validationErrors.website}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="address">Address *</Label>
              <TextArea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your organization's full address"
                hasError={!!validationErrors.address}
                disabled={isSubmitting}
                rows={3}
              />
              {validationErrors.address && (
                <ErrorMessage>{validationErrors.address}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Description (Optional)</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of your organization (optional)"
                hasError={!!validationErrors.description}
                disabled={isSubmitting}
                rows={3}
              />
              {validationErrors.description && (
                <ErrorMessage>{validationErrors.description}</ErrorMessage>
              )}
            </FormGroup>

            <ButtonRow>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={handleSkipForNow}
                disabled={isSubmitting}
              >
                Skip for Now
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Setting up...' : 'Complete Setup'}
              </Button>
            </ButtonRow>
          </Form>
        </FormSection>
      </SetupCard>
    </SetupContainer>
  );
};

export default OrganizationSetup;
