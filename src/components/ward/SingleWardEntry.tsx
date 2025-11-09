import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 1.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a5568;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  .required {
    color: #e53e3e;
  }
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.hasError ? '#fc8181' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${props => props.hasError ? '#fff5f5' : 'white'};

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53e3e' : '#667eea'};
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.hasError ? '#fc8181' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${props => props.hasError ? '#fff5f5' : 'white'};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53e3e' : '#667eea'};
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.85rem;
  color: #e53e3e;
  margin-top: 0.25rem;
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background: #c6f6d5;
  border: 2px solid #48bb78;
  border-radius: 10px;
  color: #22543d;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #e2e8f0;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
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
      border-color: #cbd5e0;
    }
  `}
`;

interface WardFormData {
  name: string;
  email: string;
  educationLevel: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianRelation: string;
  guardianAge: string;
}

interface ValidationErrors {
  [key: string]: string;
}

/**
 * Single Ward Entry Form Component
 * Allows adding one student at a time with guardian information
 */
const SingleWardEntry: React.FC = () => {
  const [formData, setFormData] = useState<WardFormData>({
    name: '',
    email: '',
    educationLevel: '',
    guardianName: '',
    guardianEmail: '',
    guardianPhone: '',
    guardianRelation: '',
    guardianAge: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Student validation
    if (!formData.name.trim()) newErrors.name = 'Student name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Student email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.educationLevel) newErrors.educationLevel = 'Education level is required';

    // Guardian validation
    if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian name is required';
    if (!formData.guardianEmail.trim()) {
      newErrors.guardianEmail = 'Guardian email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.guardianEmail)) {
      newErrors.guardianEmail = 'Invalid email format';
    }
    if (!formData.guardianRelation) newErrors.guardianRelation = 'Relation is required';
    if (formData.guardianAge && (parseInt(formData.guardianAge) < 18 || parseInt(formData.guardianAge) > 120)) {
      newErrors.guardianAge = 'Age must be between 18 and 120';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Call API to create ward
      // const response = await WardService.createSingleWard({
      //   ...formData,
      //   organizationId: organization?.id
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccessMessage(`✓ Student ${formData.name} has been successfully added!`);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        educationLevel: '',
        guardianName: '',
        guardianEmail: '',
        guardianPhone: '',
        guardianRelation: '',
        guardianAge: ''
      });
    } catch (error: any) {
      setErrors({ submit: error.message || 'Failed to add student' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      educationLevel: '',
      guardianName: '',
      guardianEmail: '',
      guardianPhone: '',
      guardianRelation: '',
      guardianAge: ''
    });
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <FormContainer>
      <FormTitle>Add New Student</FormTitle>
      
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <Form onSubmit={handleSubmit}>
        {/* Student Information */}
        <div>
          <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>Student Information</h3>
          <FormSection>
            <FormGroup>
              <Label>
                Full Name <span className="required">*</span>
              </Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student's full name"
                hasError={!!errors.name}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>
                Email Address <span className="required">*</span>
              </Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@example.com"
                hasError={!!errors.email}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>
                Education Level <span className="required">*</span>
              </Label>
              <Select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                hasError={!!errors.educationLevel}
              >
                <option value="">Select level</option>
                <option value="PRIMARY">Primary School</option>
                <option value="JHS">Junior High School</option>
                <option value="SHS">Senior High School</option>
                <option value="TERTIARY">Tertiary</option>
                <option value="VOCATIONAL">Vocational</option>
              </Select>
              {errors.educationLevel && <ErrorMessage>{errors.educationLevel}</ErrorMessage>}
            </FormGroup>
          </FormSection>
        </div>

        {/* Guardian Information */}
        <div>
          <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>Guardian Information</h3>
          <FormSection>
            <FormGroup>
              <Label>
                Guardian Name <span className="required">*</span>
              </Label>
              <Input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="Enter guardian's full name"
                hasError={!!errors.guardianName}
              />
              {errors.guardianName && <ErrorMessage>{errors.guardianName}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>
                Guardian Email <span className="required">*</span>
              </Label>
              <Input
                type="email"
                name="guardianEmail"
                value={formData.guardianEmail}
                onChange={handleChange}
                placeholder="guardian@example.com"
                hasError={!!errors.guardianEmail}
              />
              {errors.guardianEmail && <ErrorMessage>{errors.guardianEmail}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Guardian Phone</Label>
              <Input
                type="tel"
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleChange}
                placeholder="+233 XX XXX XXXX"
                hasError={!!errors.guardianPhone}
              />
              {errors.guardianPhone && <ErrorMessage>{errors.guardianPhone}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>
                Relation to Student <span className="required">*</span>
              </Label>
              <Select
                name="guardianRelation"
                value={formData.guardianRelation}
                onChange={handleChange}
                hasError={!!errors.guardianRelation}
              >
                <option value="">Select relation</option>
                <option value="Parent">Parent</option>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Guardian">Guardian</option>
                <option value="Aunt">Aunt</option>
                <option value="Uncle">Uncle</option>
                <option value="Grandparent">Grandparent</option>
                <option value="Sibling">Sibling</option>
                <option value="Other">Other</option>
              </Select>
              {errors.guardianRelation && <ErrorMessage>{errors.guardianRelation}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Guardian Age</Label>
              <Input
                type="number"
                name="guardianAge"
                value={formData.guardianAge}
                onChange={handleChange}
                placeholder="Enter age"
                min="18"
                max="120"
                hasError={!!errors.guardianAge}
              />
              {errors.guardianAge && <ErrorMessage>{errors.guardianAge}</ErrorMessage>}
            </FormGroup>
          </FormSection>
        </div>

        {errors.submit && <ErrorMessage style={{ fontSize: '1rem' }}>{errors.submit}</ErrorMessage>}

        <ButtonGroup>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset Form
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Adding Student...' : 'Add Student'}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default SingleWardEntry;
