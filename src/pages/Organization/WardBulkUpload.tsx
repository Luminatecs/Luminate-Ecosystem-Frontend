import React, { useState } from 'react';
import styled from 'styled-components';
import { EducationLevel } from '../../models';
import Button, { ButtonState } from '../../components/ui/Button';
import AuthService from '../../services/auth/AuthService';
import GridAccordionTable from '../../Gridnpm';

const PageContainer = styled.div`
  padding: 1.5rem;
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

const UploadSection = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
`;

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
 * Ward Bulk Upload Component - CSV Import Only
 */
const WardBulkUpload: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [buttonState, setButtonState] = useState(ButtonState.IDLE);

  /**
   * Handle CSV import data
   */
  const handleCsvImport = async (csvData: any[]) => {
    const mappedStudents: Student[] = csvData.map((row, index) => ({
      id: `csv-${index}`,
      name: row.name || row.Name || '',
      email: row.email || row.Email || '',
      educationLevel: (row.educationLevel || row.EducationLevel || row.education_level || EducationLevel.UNIVERSITY) as EducationLevel
    }));

    setStudents(mappedStudents);
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

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Bulk Upload Students</PageTitle>
        <PageDescription>
          Import multiple students using a CSV file. Required columns: name, email, educationLevel
        </PageDescription>
      </PageHeader>

      <UploadSection>
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
          <div style={{ marginTop: '1.5rem' }}>
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
      </UploadSection>
    </PageContainer>
  );
};

export default WardBulkUpload;
