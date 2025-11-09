import React, { useState } from 'react';
import styled from 'styled-components';
import { EducationLevel } from '../../models';
import Button, { ButtonState } from '../../components/ui/Button';
import AuthService from '../../services/auth/AuthService';
import GridAccordionTable from '../../Gridnpm';
import { useAuth } from '../../contexts/auth/AuthContext';
import OrganizationSelector from '../../components/common/OrganizationSelector';

const PageContainer = styled.div`
  padding: 24px;
  background: white;
  min-height: calc(100vh - 80px);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 4px 0;
  letter-spacing: 0;
`;

const PageDescription = styled.p`
  font-size: 14px;
  color: #5f6368;
  margin: 0;
  line-height: 20px;
`;

/**
 * Material Design Tabs
 */
const TabContainer = styled.div`
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #e8eaed;
  margin-bottom: 24px;
`;

const Tab = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  color: ${props => props.isActive ? '#1967d2' : '#5f6368'};
  font-size: 14px;
  font-weight: 500;
  padding: 12px 0;
  cursor: pointer;
  position: relative;
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.isActive ? '#1967d2' : 'transparent'};
    transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: ${props => props.isActive ? '#1967d2' : '#202124'};
  }
`;

const TabContent = styled.div`
  animation: fadeIn 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/**
 * Single Entry Form Styles
 */
const FormContainer = styled.div`
  max-width: 600px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #202124;
  letter-spacing: 0.2px;

  .required {
    color: #d93025;
  }
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${props => props.hasError ? '#d93025' : '#dadce0'};
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  color: #202124;

  &:hover {
    border-color: ${props => props.hasError ? '#d93025' : '#80868b'};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#d93025' : '#1967d2'};
    border-width: 2px;
    padding: 11px 15px;
  }

  &::placeholder {
    color: #80868b;
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${props => props.hasError ? '#d93025' : '#dadce0'};
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  color: #202124;

  &:hover {
    border-color: ${props => props.hasError ? '#d93025' : '#80868b'};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#d93025' : '#1967d2'};
    border-width: 2px;
    padding: 11px 15px;
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #d93025;
  margin-top: 4px;
`;

const SuccessMessage = styled.div`
  padding: 12px 16px;
  background: #e6f4ea;
  border-left: 4px solid #1e8e3e;
  border-radius: 4px;
  color: #137333;
  font-size: 14px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ErrorAlert = styled.div`
  padding: 12px 16px;
  background: #fce8e6;
  border-left: 4px solid #d93025;
  border-radius: 4px;
  color: #c5221f;
  font-size: 14px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MaterialButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  letter-spacing: 0.25px;
  
  ${props => props.variant === 'primary' ? `
    background: #1967d2;
    color: white;
    
    &:hover:not(:disabled) {
      background: #1557b0;
      box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
    }

    &:active:not(:disabled) {
      background: #1557b0;
      box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15);
    }
    
    &:disabled {
      background: #dadce0;
      color: #80868b;
      cursor: not-allowed;
    }
  ` : `
    background: white;
    color: #1967d2;
    border: 1px solid #dadce0;
    
    &:hover {
      background: #f8f9fa;
      border-color: #dadce0;
    }

    &:active {
      background: #f1f3f4;
    }
  `}
`;

const BulkUploadSection = styled.div``;

type TabType = 'single' | 'bulk';

interface WardFormData {
  guardianName: string;
  guardianEmail: string;
  wardName: string;
  educationLevel: EducationLevel;
}

interface FormErrors {
  guardianName?: string;
  guardianEmail?: string;
  wardName?: string;
  educationLevel?: string;
}

interface Student {
  id?: string;
  guardianName: string;
  guardianEmail: string;
  wardName: string;
  educationLevel: EducationLevel;
}

/**
 * Student Management Component - Combined Single Entry and Bulk Upload
 */
const StudentManagement: React.FC = () => {
  const { user } = useAuth();
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('single');
  
  const isSuperOrAccessAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ACCESS_ADMIN';
  
  // Single Entry State
  const [formData, setFormData] = useState<WardFormData>({
    guardianName: '',
    guardianEmail: '',
    wardName: '',
    educationLevel: EducationLevel.UNIVERSITY
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Bulk Upload State
  const [students, setStudents] = useState<Student[]>([]);
  const [bulkButtonState, setBulkButtonState] = useState(ButtonState.IDLE);

  // Single Entry Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
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

    if (!formData.guardianName.trim()) {
      newErrors.guardianName = 'Guardian name is required';
    }

    if (!formData.guardianEmail.trim()) {
      newErrors.guardianEmail = 'Guardian email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.guardianEmail)) {
      newErrors.guardianEmail = 'Invalid email format';
    }

    if (!formData.wardName.trim()) {
      newErrors.wardName = 'Student name is required';
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
        ...formData,
        ...(isSuperOrAccessAdmin && selectedOrganizationId ? { organizationId: selectedOrganizationId } : {})
      };
      
      const response = await AuthService.createWard(wardData);

      if (response.success) {
        setSuccessMessage('Student added successfully!');
        setFormData({
          guardianName: '',
          guardianEmail: '',
          wardName: '',
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
      guardianName: '',
      guardianEmail: '',
      wardName: '',
      educationLevel: EducationLevel.UNIVERSITY
    });
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
  };

  // Bulk Upload Handlers
  const handleCsvImport = async (csvData: any[]) => {
    const mappedStudents: Student[] = csvData.map((row, index) => ({
      id: `csv-${index}`,
      guardianName: row.guardianName || row.GuardianName || row.guardian_name || '',
      guardianEmail: row.guardianEmail || row.GuardianEmail || row.guardian_email || '',
      wardName: row.wardName || row.WardName || row.ward_name || row.name || row.Name || '',
      educationLevel: (row.educationLevel || row.EducationLevel || row.education_level || EducationLevel.UNIVERSITY) as EducationLevel
    }));

    setStudents(mappedStudents);
  };

  const handleSaveStudents = async () => {
    if (students.length === 0) return;

    if (isSuperOrAccessAdmin && !selectedOrganizationId) {
      setBulkButtonState(ButtonState.ERROR);
      setErrorMessage('Please select an organization first');
      setTimeout(() => {
        setBulkButtonState(ButtonState.IDLE);
      }, 3000);
      return;
    }

    setBulkButtonState(ButtonState.LOADING);

    try {
      const wardsData = students.map(student => ({
        guardianName: student.guardianName,
        guardianEmail: student.guardianEmail,
        wardName: student.wardName,
        educationLevel: student.educationLevel
      }));

      const response = await AuthService.createWardsBulk({ 
        wards: wardsData,
        ...(isSuperOrAccessAdmin && selectedOrganizationId ? { organizationId: selectedOrganizationId } : {})
      });
      
      if (response.success) {
        setBulkButtonState(ButtonState.SUCCESS);
        setStudents([]);
        
        setTimeout(() => {
          setBulkButtonState(ButtonState.IDLE);
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to create wards');
      }

    } catch (error) {
      setBulkButtonState(ButtonState.ERROR);
      console.error('Error creating wards:', error);
      
      setTimeout(() => {
        setBulkButtonState(ButtonState.IDLE);
      }, 3000);
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Student Management</PageTitle>
        <PageDescription>
          Add students individually or import multiple students using CSV
        </PageDescription>
      </PageHeader>

      <TabContainer>
        <Tab 
          isActive={activeTab === 'single'} 
          onClick={() => setActiveTab('single')}
        >
          Single Entry
        </Tab>
        <Tab 
          isActive={activeTab === 'bulk'} 
          onClick={() => setActiveTab('bulk')}
        >
          Bulk Upload
        </Tab>
      </TabContainer>

      <TabContent key={activeTab}>
        {activeTab === 'single' && (
          <FormContainer>
            {successMessage && (
              <SuccessMessage>
                <span>✓</span>
                <span>{successMessage}</span>
              </SuccessMessage>
            )}
            {errorMessage && (
              <ErrorAlert>
                <span>⚠</span>
                <span>{errorMessage}</span>
              </ErrorAlert>
            )}

            <Form onSubmit={handleSubmit}>
              {isSuperOrAccessAdmin && (
                <OrganizationSelector
                  selectedOrganizationId={selectedOrganizationId}
                  onOrganizationSelect={setSelectedOrganizationId}
                />
              )}
              
              <FormGroup>
                <Label htmlFor="guardianName">
                  Guardian/Parent Name <span className="required">*</span>
                </Label>
                <Input
                  type="text"
                  id="guardianName"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleInputChange}
                  hasError={!!errors.guardianName}
                  placeholder="Enter guardian's full name"
                  disabled={isSubmitting}
                />
                {errors.guardianName && <ErrorMessage>{errors.guardianName}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="guardianEmail">
                  Guardian Email Address <span className="required">*</span>
                </Label>
                <Input
                  type="email"
                  id="guardianEmail"
                  name="guardianEmail"
                  value={formData.guardianEmail}
                  onChange={handleInputChange}
                  hasError={!!errors.guardianEmail}
                  placeholder="Enter guardian's email (temp credentials will be sent here)"
                  disabled={isSubmitting}
                />
                {errors.guardianEmail && <ErrorMessage>{errors.guardianEmail}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="wardName">
                  Student Name <span className="required">*</span>
                </Label>
                <Input
                  type="text"
                  id="wardName"
                  name="wardName"
                  value={formData.wardName}
                  onChange={handleInputChange}
                  hasError={!!errors.wardName}
                  placeholder="Enter student's full name"
                  disabled={isSubmitting}
                />
                {errors.wardName && <ErrorMessage>{errors.wardName}</ErrorMessage>}
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
                <MaterialButton type="button" variant="secondary" onClick={handleReset} disabled={isSubmitting}>
                  Reset
                </MaterialButton>
                <MaterialButton type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding Student...' : 'Add Student'}
                </MaterialButton>
              </ButtonGroup>
            </Form>
          </FormContainer>
        )}

        {activeTab === 'bulk' && (
          <BulkUploadSection>
            {isSuperOrAccessAdmin && (
              <div style={{ marginBottom: '24px' }}>
                <OrganizationSelector
                  selectedOrganizationId={selectedOrganizationId}
                  onOrganizationSelect={setSelectedOrganizationId}
                />
              </div>
            )}
            
            <GridAccordionTable
              columns={[]}
              data={students}
              loading={false}
              searchable={true}
              filterable={true}
              csvMode={true}
              onCsvSave={handleCsvImport}
              csvmodeonmount={true} 
            />

            {students.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <Button
                  onClick={handleSaveStudents}
                  state={bulkButtonState}
                  backgroundColor="#1967d2"
                  successText="Students imported successfully!"
                  errorText="Failed to import students. Please try again."
                  fullWidth
                >
                  Save Imported Students ({students.length})
                </Button>
              </div>
            )}
          </BulkUploadSection>
        )}
      </TabContent>
    </PageContainer>
  );
};

export default StudentManagement;
