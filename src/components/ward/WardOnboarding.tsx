import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import { EducationLevel } from '../../models';
import Button, { ButtonState } from '../ui/Button';
import { AuthService } from '../../services/auth';
import GridAccordionTable from '../../Gridnpm';

/**
 * Main Container
 */
const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

/**
 * Option Selection Area
 */
const OptionSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
`;

/**
 * Option Card
 */
const OptionCard = styled.div<{ isSelected: boolean }>`
  background: ${props => props.isSelected ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' : 'white'};
  border: 2px solid ${props => props.isSelected ? '#3b82f6' : '#e5e7eb'};
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
  }
`;

const OptionIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const OptionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const OptionDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin: 0;
`;

/**
 * Content Area (shows selected option's interface)
 */
const ContentArea = styled.div`
  background: white;
  /* border-radius: 12px; */
  /* padding: 2rem; */
  /* border: 1px solid #e5e7eb; */
  min-height: 200px;
`;

/**
 * Manual Form Styles
 */
const ManualForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

/**
 * Student List Display
 */
const StudentList = styled.div`
  margin-top: 2rem;
`;

const StudentItem = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  border: 1px solid #e5e7eb;
`;

const StudentInfo = styled.div`
  flex: 1;
`;

const StudentName = styled.div`
  font-weight: 600;
  color: #1e293b;
`;

const StudentDetails = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

const RemoveButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.2s ease;

  &:hover {
    background: #dc2626;
  }
`;

/**
 * Ward Onboarding Options
 */
enum OnboardingOption {
  NONE = 'none',
  MANUAL = 'manual',
  CSV = 'csv'
}

/**
 * Student Interface
 */
interface Student {
  id?: string;
  name: string;
  email: string;
  educationLevel: EducationLevel;
}

/**
 * Ward Onboarding Component
 */
const WardOnboarding: React.FC = () => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState<OnboardingOption>(OnboardingOption.NONE);
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<Student>({
    name: '',
    email: '',
    educationLevel: EducationLevel.UNIVERSITY
  });
  const [buttonState, setButtonState] = useState(ButtonState.IDLE);

  /**
   * Handle form input changes
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Add student to the list (manual entry)
   */
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) return;

    const newStudent: Student = {
      id: `temp-${Date.now()}`,
      ...formData
    };

    setStudents(prev => [...prev, newStudent]);
    setFormData({
      name: '',
      email: '',
      educationLevel: EducationLevel.UNIVERSITY
    });
  };

  /**
   * Remove student from the list
   */
  const handleRemoveStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  /**
   * Save all students to the database
   */
  const handleSaveStudents = async () => {
    if (students.length === 0) return;

    setButtonState(ButtonState.LOADING);

    try {
      const wardsData = students.map(student => ({
        name: student.name,
        email: student.email,
        educationLevel: student.educationLevel
      }));

      const response = await AuthService.createWardsBulk({ wards: wardsData });
      
      if (response.success) {
        setButtonState(ButtonState.SUCCESS);
        setStudents([]);
        setSelectedOption(OnboardingOption.NONE);
        
        // Reset after 2 seconds
        setTimeout(() => {
          setButtonState(ButtonState.IDLE);
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to create wards');
      }

    } catch (error) {
      setButtonState(ButtonState.ERROR);
      console.error('Error creating wards:', error);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setButtonState(ButtonState.IDLE);
      }, 3000);
    }
  };

  /**
   * Handle CSV import data
   */
  const handleCsvImport = async (csvData: any[]) => {
    const mappedStudents: Student[] = csvData.map((row, index) => ({
      id: `csv-${index}`,
      name: row.name || row.Name || '',
      email: row.email || row.Email || '',
      educationLevel: (row.educationLevel || row.EducationLevel || EducationLevel.UNIVERSITY) as EducationLevel
    }));

    setStudents(mappedStudents);
  };

  /**
   * Handle CSV file upload
   */
  const handleCsvFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const data = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',').map(v => v.trim());
          const row: any = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          return row;
        });

      handleCsvImport(data);
    };
    
    reader.readAsText(file);
  };

  return (
    <OnboardingContainer>
      {/* Option Selection */}
      <OptionSelector>
        <OptionCard 
          isSelected={selectedOption === OnboardingOption.MANUAL}
          onClick={() => setSelectedOption(OnboardingOption.MANUAL)}
        >
          <OptionIcon>✍️</OptionIcon>
          <OptionTitle>Manual Entry</OptionTitle>
          <OptionDescription>
            Manually add students one by one with their information
          </OptionDescription>
        </OptionCard>

        <OptionCard 
          isSelected={selectedOption === OnboardingOption.CSV}
          onClick={() => setSelectedOption(OnboardingOption.CSV)}
        >
          <OptionIcon>📊</OptionIcon>
          <OptionTitle>CSV Import</OptionTitle>
          <OptionDescription>
            Import multiple students from a CSV file with their data
          </OptionDescription>
        </OptionCard>
      </OptionSelector>

      {/* Content Area */}
      <ContentArea>
        {/* {selectedOption === OnboardingOption.NONE && (
          <div style={{ textAlign: 'center', color: '#64748b', paddingTop: '2rem' }}>
            <h3>Select an onboarding method above to get started</h3>
            <p>Choose between manual entry or CSV import to add students to your organization.</p>
          </div>
        )} */}
        {selectedOption === OnboardingOption.MANUAL && (
          <>
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Add Student Information</h3>
            
            <ManualForm onSubmit={handleAddStudent}>
              <FormGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter student's full name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter student's email"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="educationLevel">Education Level</Label>
                <Select
                  id="educationLevel"
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleInputChange}
                  required
                >
                  {Object.values(EducationLevel).map(level => (
                    <option key={level} value={level}>
                      {level.replace('_', ' ')}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <div style={{ alignSelf: 'flex-start' }}>
                <Button
                  type="submit"
                  backgroundColor="#10b981"
                >
                  ➕ Add Student
                </Button>
              </div>
            </ManualForm>

            {students.length > 0 && (
              <StudentList>
                <h4 style={{ color: '#1e293b', marginBottom: '1rem' }}>
                  Added Students ({students.length})
                </h4>
                
                {students.map(student => (
                  <StudentItem key={student.id}>
                    <StudentInfo>
                      <StudentName>{student.name}</StudentName>
                      <StudentDetails>
                        {student.email} • {student.educationLevel.replace('_', ' ')}
                      </StudentDetails>
                    </StudentInfo>
                    <RemoveButton onClick={() => handleRemoveStudent(student.id!)}>
                      Remove
                    </RemoveButton>
                  </StudentItem>
                ))}

                <div style={{ marginTop: '1.5rem' }}>
                  <Button
                    onClick={handleSaveStudents}
                    state={buttonState}
                    backgroundColor="#3b82f6"
                    successText="Students added successfully!"
                    errorText="Failed to add students. Please try again."
                    fullWidth
                  >
                    Save All Students to Database
                  </Button>
                </div>
              </StudentList>
            )}
          </>
        )}

        {selectedOption === OnboardingOption.CSV && (
          <>
            <div>
              <GridAccordionTable
                  columns={[]}
                  data={students}
                  loading={false}
                  searchable={true}
                  filterable={true}
                  csvMode={true}
                  onCsvSave={handleCsvFileUpload}
                  csvmodeonmount={true} 
                />
            </div>

            {students.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <Button
                  onClick={handleSaveStudents}
                  state={buttonState}
                  backgroundColor="#3b82f6"
                  successText="Students imported successfully!"
                  errorText="Failed to import students. Please try again."
                  fullWidth
                >
                  Save Imported Students ({students.length})
                </Button>
              </div>
            )}
          </>
        )}
      </ContentArea>
    </OnboardingContainer>
  );
};

export default WardOnboarding;
