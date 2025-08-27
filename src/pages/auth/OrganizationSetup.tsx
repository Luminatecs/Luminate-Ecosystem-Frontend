import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import OrganizationService from '../../services/OrganizationService';
import { IndustryType } from '../../models';
import Logger from '../../utils/logUtils';
import {
  AuthContainer,
  AuthCard,
  AuthTitle,
  AuthSubtitle,
  FormGroup,
  Label,
  Input as BaseInput,
  Button as BaseButton,
  ErrorMessage,
  SuccessMessage,
  Select as BaseSelect,
  TextArea as BaseTextArea
} from '../../components/auth/AuthStyles';

/**
 * Styled Components - Professional application layout
 */
const SetupContainer = styled(AuthContainer)`
  display: flex;
  padding: 0;
`;

const Sidebar = styled.div`
  width: 320px;
  background: #2c5282;
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 3rem;
  opacity: 0.9;
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StepItem = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: ${props => props.isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border: ${props => props.isActive ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const StepIcon = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  font-weight: 600;
  background: ${props => 
    props.isCompleted ? '#4299e1' :
    props.isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'
  };
  color: white;
  box-shadow: ${props => 
    props.isCompleted ? '0 0 20px rgba(66, 153, 225, 0.3)' : 'none'
  };
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.div<{ isActive: boolean }>`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${props => props.isActive ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  margin-bottom: 0.375rem;
  letter-spacing: 0.3px;
`;

const StepDescription = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
`;

const MainContent = styled(AuthCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: none;
  margin: 0;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  background: #f8fafc;
`;

const Header = styled.div`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 2.5rem 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #4299e1 0%, #2c5282 100%);
  }
`;

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(AuthTitle)`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled(AuthSubtitle)`
  margin: 0;
  font-size: 1.1rem;
`;

const ProgressContainer = styled.div`
  background: #f8fafc;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e2e8f0;
`;

const ProgressWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 2px;
  background: #e2e8f0;
  border-radius: 1px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: #3b82f6;
  border-radius: 1px;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.5rem;
  text-align: right;
`;

const FormSection = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;
  position: relative;
  padding-left: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #4299e1 0%, #2c5282 100%);
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const SectionDescription = styled.p`
  font-size: 1rem;
  color: #4a5568;
  margin: 0;
  line-height: 1.5;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled(BaseInput)<{ hasError?: boolean }>`
  border-color: ${props => props.hasError ? '#fc8181' : '#e2e8f0'};
  
  &:focus {
    border-color: ${props => props.hasError ? '#fc8181' : '#4299e1'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(252, 129, 129, 0.1)' : 'rgba(66, 153, 225, 0.1)'};
  }
`;

const Select = styled(BaseSelect)<{ hasError?: boolean }>`
  border-color: ${props => props.hasError ? '#fc8181' : '#e2e8f0'};
  
  &:focus {
    border-color: ${props => props.hasError ? '#fc8181' : '#4299e1'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(252, 129, 129, 0.1)' : 'rgba(66, 153, 225, 0.1)'};
  }
`;

const TextArea = styled(BaseTextArea)<{ hasError?: boolean }>`
  border-color: ${props => props.hasError ? '#fc8181' : '#e2e8f0'};
  
  &:focus {
    border-color: ${props => props.hasError ? '#fc8181' : '#4299e1'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(252, 129, 129, 0.1)' : 'rgba(66, 153, 225, 0.1)'};
  }
`;

const Footer = styled.div`
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled(BaseButton)<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 2rem;
  width: auto;
  
  ${props => props.variant === 'secondary' && `
    background: white;
    color: #2d3748;
    border: 2px solid #e2e8f0;
    
    &:hover {
      background: #f8fafc;
      border-color: #cbd5e0;
      transform: translateY(-1px);
    }
  `}
`;

/**
 * Form data interface
 */
interface OrganizationFormData {
  organizationName: string;
  industry: IndustryType | '';
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
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
    industry: '',
    contactEmail: user?.email || '',
    contactPhone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    website: '',
    description: ''
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Calculate form progress
  const getFormProgress = (): number => {
    const requiredFields = ['organizationName', 'industry', 'contactEmail', 'address', 'city', 'state', 'country'];
    const filledFields = requiredFields.filter(field => 
      formData[field as keyof OrganizationFormData].toString().trim() !== ''
    );
    return Math.round((filledFields.length / requiredFields.length) * 100);
  };

  // Redirect if user is not ORG_ADMIN or setup is already complete
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // if (user.role !== 'ORG_ADMIN') {
    //   navigate('/dashboard');
    //   return;
    // }
    
    // TODO: Check if setup is already complete
    // if (user.role === 'ORG_ADMIN' && user.organizationSetupComplete) {
    //   navigate('/organization-dashboard');
    //   return;
    // }
  }, [user, navigate]);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Required field validation
    if (!formData.organizationName.trim()) {
      errors.organizationName = 'Organization name is required';
    }

    if (!formData.industry) {
      errors.industry = 'Please select an industry type';
    }

    if (!formData.contactEmail.trim()) {
      errors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      errors.contactEmail = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) {
      errors.address = 'Street address is required';
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      errors.state = 'State/Province is required';
    }

    if (!formData.country.trim()) {
      errors.country = 'Country is required';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setValidationErrors({});
    setSuccessMessage('');

    try {
      // Prepare organization data for API call
      // Combine address fields into a single address string
      const fullAddress = [
        formData.address.trim(),
        formData.city.trim(),
        formData.state.trim(),
        formData.country.trim(),
        formData.postalCode.trim()
      ].filter(part => part.length > 0).join(', ');

      const organizationData = {
        name: formData.organizationName.trim(),
        contactEmail: formData.contactEmail.trim(),
        contactPhone: formData.contactPhone.trim() || undefined,
        address: fullAddress,
        website: formData.website?.trim() || undefined,
        description: formData.description?.trim() || undefined
      };

      Logger.info('OrganizationSetup - Submitting organization setup', organizationData);

      // Call the actual API endpoint
      const response = await OrganizationService.setupOrganization(organizationData);
      console.log('org registration response', response)
      if (!response.success) {
        throw new Error(response.error || 'Organization setup failed');
      }

      Logger.success('OrganizationSetup - Organization setup completed successfully', response.data);
      
      setSuccessMessage('Organization setup completed successfully! Redirecting to dashboard...');
      
      // Allow time for the server state to update and success message to be shown
      setTimeout(() => {
          Logger.info('OrganizationSetup - Navigating to dashboard with full page reload');
          window.location.href = '/organization-dashboard';
      }, 3000);

    } catch (error: any) {
      Logger.error('OrganizationSetup - Setup failed', error);
      setValidationErrors({
        submit: error.message || 'Setup failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <SetupContainer>
      <Sidebar>
        <SidebarContent>
          <Logo>Luminate Ecosystem</Logo>
          
          <StepList>
            <StepItem isActive={false} isCompleted={true}>
              <StepIcon isActive={false} isCompleted={true}>✓</StepIcon>
              <StepContent>
                <StepTitle isActive={false}>Admin Account</StepTitle>
                <StepDescription>Account created successfully</StepDescription>
              </StepContent>
            </StepItem>
            
            <StepItem isActive={true} isCompleted={false}>
              <StepIcon isActive={true} isCompleted={false}>2</StepIcon>
              <StepContent>
                <StepTitle isActive={true}>Organization Profile</StepTitle>
                <StepDescription>Complete your organization details</StepDescription>
              </StepContent>
            </StepItem>
            
            <StepItem isActive={false} isCompleted={false}>
              <StepIcon isActive={false} isCompleted={false}>3</StepIcon>
              <StepContent>
                <StepTitle isActive={false}>Start Managing</StepTitle>
                <StepDescription>Access your dashboard</StepDescription>
              </StepContent>
            </StepItem>
          </StepList>
        </SidebarContent>
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderContent>
            <Title>Organization Profile Setup</Title>
            <Subtitle>Complete your organization details to start managing students and resources</Subtitle>
          </HeaderContent>
        </Header>

        <ProgressContainer>
          <ProgressWrapper>
            <ProgressBar>
              <ProgressFill progress={getFormProgress()} />
            </ProgressBar>
            <ProgressText>{getFormProgress()}% Complete</ProgressText>
          </ProgressWrapper>
        </ProgressContainer>

        <FormSection>
          <FormContainer>
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

            <Form onSubmit={handleSubmit}>
              <Section>
                <SectionHeader>
                  <SectionTitle>Basic Information</SectionTitle>
                  <SectionDescription>Primary details about your organization</SectionDescription>
                </SectionHeader>

                <FormRow>
                  <FormGroup>
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      type="text"
                      value={formData.organizationName}
                      onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                      hasError={!!validationErrors.organizationName}
                      placeholder="Enter your organization name"
                    />
                    {validationErrors.organizationName && (
                      <ErrorMessage>{validationErrors.organizationName}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="industry">Industry Type *</Label>
                    <Select
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value as IndustryType }))}
                      hasError={!!validationErrors.industry}
                    >
                      <option value="">Select industry type</option>
                      <option value="EDUCATION">Education</option>
                      <option value="HEALTHCARE">Healthcare</option>
                      <option value="TECHNOLOGY">Technology</option>
                      <option value="MANUFACTURING">Manufacturing</option>
                      <option value="FINANCE">Finance</option>
                      <option value="RETAIL">Retail</option>
                      <option value="OTHER">Other</option>
                    </Select>
                    {validationErrors.industry && (
                      <ErrorMessage>{validationErrors.industry}</ErrorMessage>
                    )}
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                      hasError={!!validationErrors.contactEmail}
                      placeholder="organization@example.com"
                    />
                    {validationErrors.contactEmail && (
                      <ErrorMessage>{validationErrors.contactEmail}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                      hasError={!!validationErrors.contactPhone}
                      placeholder="+1 (555) 123-4567"
                    />
                    {validationErrors.contactPhone && (
                      <ErrorMessage>{validationErrors.contactPhone}</ErrorMessage>
                    )}
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label htmlFor="description">Organization Description</Label>
                  <TextArea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    hasError={!!validationErrors.description}
                    placeholder="Brief description of your organization..."
                  />
                  {validationErrors.description && (
                    <ErrorMessage>{validationErrors.description}</ErrorMessage>
                  )}
                </FormGroup>
              </Section>

              <Section>
                <SectionHeader>
                  <SectionTitle>Location & Address</SectionTitle>
                  <SectionDescription>Physical location of your organization</SectionDescription>
                </SectionHeader>

                <FormGroup>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    hasError={!!validationErrors.address}
                    placeholder="123 Main Street"
                  />
                  {validationErrors.address && (
                    <ErrorMessage>{validationErrors.address}</ErrorMessage>
                  )}
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      hasError={!!validationErrors.city}
                      placeholder="City name"
                    />
                    {validationErrors.city && (
                      <ErrorMessage>{validationErrors.city}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                      id="state"
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      hasError={!!validationErrors.state}
                      placeholder="State or province"
                    />
                    {validationErrors.state && (
                      <ErrorMessage>{validationErrors.state}</ErrorMessage>
                    )}
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      hasError={!!validationErrors.country}
                      placeholder="Country name"
                    />
                    {validationErrors.country && (
                      <ErrorMessage>{validationErrors.country}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                      hasError={!!validationErrors.postalCode}
                      placeholder="12345"
                    />
                    {validationErrors.postalCode && (
                      <ErrorMessage>{validationErrors.postalCode}</ErrorMessage>
                    )}
                  </FormGroup>
                </FormRow>
              </Section>
            </Form>
          </FormContainer>
        </FormSection>

        <Footer>
          <FooterContent>
            <div>* Required fields</div>
            <ButtonRow>
              <ActionButton 
                variant="secondary" 
                type="button"
                onClick={() => navigate('/ecosystem')}
              >
                Skip for Now
              </ActionButton>
              <ActionButton 
                variant="primary" 
                type="submit" 
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Creating Organization...' : 'Complete Setup'}
              </ActionButton>
            </ButtonRow>
          </FooterContent>
        </Footer>
              {validationErrors.submit && (
                <ErrorMessage>{validationErrors.submit}</ErrorMessage>
              )}
      </MainContent>
    </SetupContainer>
  );
};

export default OrganizationSetup;
