import React, { useState } from 'react';
import styled from 'styled-components';
import { EducationLevel } from '../../models';
import AuthService from '../../services/auth/AuthService';
import { useAuth } from '../../contexts/auth/AuthContext';
import OrganizationSelector from '../../components/common/OrganizationSelector';

const PageContainer = styled.div`
  padding: 1.5rem;
  max-width: 600px;
`;

const PageHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
`;

const PageDescription = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.8125rem;

  .required {
    color: #e53e3e;
  }
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${props => props.hasError ? '#fc8181' : '#e2e8f0'};
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  background: ${props => props.hasError ? '#fff5f5' : 'white'};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53e3e' : '#667eea'};
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${props => props.hasError ? '#fc8181' : '#e2e8f0'};
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  background: ${props => props.hasError ? '#fff5f5' : 'white'};
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53e3e' : '#667eea'};
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: #e53e3e;
  margin-top: 0.25rem;
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background: #c6f6d5;
  border: 2px solid #48bb78;
  border-radius: 6px;
  color: #22543d;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const ErrorAlert = styled.div`
  padding: 1rem;
  background: #fed7d7;
  border: 2px solid #fc8181;
  border-radius: 6px;
  color: #742a2a;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    flex: 1;
    
    &:hover:not(:disabled) {
      transform: translateY(-1px);
      opacity: 0.9;
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  ` : `
    background: white;
    color: #4a5568;
    border: 2px solid #e2e8f0;
    
    &:hover {
      background: #f7fafc;
    }
  `}
`;

interface WardFormData {
  name: string;
  email: string;
  educationLevel: EducationLevel;
}

interface FormErrors {
  name?: string;
  email?: string;
  educationLevel?: string;
}

/**
 * Single Ward Entry Page
 */
const SingleWardEntryPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string>('');
  const [formData, setFormData] = useState<WardFormData>({
    name: '',
    email: '',
    educationLevel: EducationLevel.UNIVERSITY
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isSuperOrAccessAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ACCESS_ADMIN';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (isSuperOrAccessAdmin && !selectedOrganizationId) {
      setErrorMessage('Please select an organization first');
      return false;
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.educationLevel) {
      newErrors.educationLevel = 'Education level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const wardData = {
        guardianName: formData.name,  // Using name as guardian name for now
        guardianEmail: formData.email, // Using email as guardian email
        wardName: formData.name,       // Using same name as ward name
        educationLevel: formData.educationLevel,
        ...(isSuperOrAccessAdmin && selectedOrganizationId ? { organizationId: selectedOrganizationId } : {})
      };
      
      const response = await AuthService.createWard(wardData);

      if (response.success) {
        setSuccessMessage('Student added successfully!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          educationLevel: EducationLevel.UNIVERSITY
        });
        
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        throw new Error(response.message || 'Failed to add student');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add student';
      setErrorMessage(message);
      
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      educationLevel: EducationLevel.UNIVERSITY
    });
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Add Single Student</PageTitle>
        <PageDescription>
          Manually add a student to your organization
        </PageDescription>
      </PageHeader>

      <FormContainer>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <ErrorAlert>{errorMessage}</ErrorAlert>}

        <Form onSubmit={handleSubmit}>
          {isSuperOrAccessAdmin && (
            <OrganizationSelector
              selectedOrganizationId={selectedOrganizationId}
              onOrganizationSelect={setSelectedOrganizationId}
            />
          )}
          
          <FormGroup>
            <Label htmlFor="name">
              Full Name <span className="required">*</span>
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              hasError={!!errors.name}
              placeholder="Enter student's full name"
              disabled={isSubmitting}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">
              Email Address <span className="required">*</span>
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              hasError={!!errors.email}
              placeholder="Enter student's email"
              disabled={isSubmitting}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="educationLevel">
              Education Level <span className="required">*</span>
            </Label>
            <Select
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleInputChange}
              hasError={!!errors.educationLevel}
              disabled={isSubmitting}
            >
              {Object.values(EducationLevel).map(level => (
                <option key={level} value={level}>
                  {level.replace('_', ' ')}
                </option>
              ))}
            </Select>
            {errors.educationLevel && <ErrorMessage>{errors.educationLevel}</ErrorMessage>}
          </FormGroup>

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={handleReset} disabled={isSubmitting}>
              Reset
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Adding Student...' : 'Add Student'}
            </Button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </PageContainer>
  );
};

export default SingleWardEntryPage;
