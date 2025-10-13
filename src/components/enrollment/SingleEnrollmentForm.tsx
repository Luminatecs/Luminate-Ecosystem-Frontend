/**
 * Single Student Enrollment Form
 * Form for enrolling a single student with guardian information
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { EnrollmentService, BulkEnrollmentData } from '../../services/EnrollmentService';

interface SingleEnrollmentFormProps {
  organizationId: string;
  onSuccess?: (enrollmentId: string, tempCode: string) => void;
  onCancel?: () => void;
}

export const SingleEnrollmentForm: React.FC<SingleEnrollmentFormProps> = ({
  organizationId,
  onSuccess,
  onCancel
}) => {
  // Student fields
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [studentDOB, setStudentDOB] = useState('');
  const [studentGender, setStudentGender] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentAddress, setStudentAddress] = useState('');

  // Guardian fields
  const [guardianFirstName, setGuardianFirstName] = useState('');
  const [guardianLastName, setGuardianLastName] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianRelation, setGuardianRelation] = useState('');
  const [guardianAge, setGuardianAge] = useState('');

  // Enrollment fields
  const [gradeLevel, setGradeLevel] = useState('');
  const [academicYear, setAcademicYear] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [enrollmentResult, setEnrollmentResult] = useState<{ enrollmentId: string; tempCode: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!studentFirstName.trim() || !studentLastName.trim()) {
      setError('Student first name and last name are required');
      return;
    }

    if (!studentDOB) {
      setError('Student date of birth is required');
      return;
    }

    if (!studentGender) {
      setError('Student gender is required');
      return;
    }

    if (!guardianFirstName.trim() || !guardianLastName.trim()) {
      setError('Guardian first name and last name are required');
      return;
    }

    if (!guardianEmail.trim()) {
      setError('Guardian email is required');
      return;
    }

    if (!guardianRelation) {
      setError('Guardian relation is required');
      return;
    }

    if (!gradeLevel.trim() || !academicYear.trim()) {
      setError('Grade level and academic year are required');
      return;
    }

    // Build enrollment data
    const enrollmentData: BulkEnrollmentData = {
      student: {
        firstName: studentFirstName.trim(),
        lastName: studentLastName.trim(),
        dateOfBirth: studentDOB,
        gender: studentGender,
        email: studentEmail.trim(),
        phone: studentPhone.trim(),
        address: studentAddress.trim()
      },
      guardian: {
        firstName: guardianFirstName.trim(),
        lastName: guardianLastName.trim(),
        email: guardianEmail.trim(),
        phone: guardianPhone.trim(),
        relation: guardianRelation,
        age: guardianAge ? parseInt(guardianAge, 10) : 0
      },
      enrollment: {
        gradeLevel: gradeLevel.trim(),
        academicYear: academicYear.trim()
      }
    };

    try {
      setLoading(true);
      const response = await EnrollmentService.createSingleEnrollment({
        organizationId,
        enrollmentData
      });

      if (response.success && response.data) {
        setSuccess(true);
        setEnrollmentResult({
          enrollmentId: response.data.enrollmentId,
          tempCode: response.data.tempCode
        });

        // Reset form
        resetForm();

        // Call success callback
        if (onSuccess) {
          onSuccess(response.data.enrollmentId, response.data.tempCode);
        }
      } else {
        setError(response.error || 'Failed to create enrollment');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create enrollment');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStudentFirstName('');
    setStudentLastName('');
    setStudentDOB('');
    setStudentGender('');
    setStudentEmail('');
    setStudentPhone('');
    setStudentAddress('');
    setGuardianFirstName('');
    setGuardianLastName('');
    setGuardianEmail('');
    setGuardianPhone('');
    setGuardianRelation('');
    setGuardianAge('');
    setGradeLevel('');
    setAcademicYear('');
  };

  const handleNewEnrollment = () => {
    setSuccess(false);
    setEnrollmentResult(null);
    setError('');
  };

  if (success && enrollmentResult) {
    return (
      <SuccessContainer>
        <SuccessIcon>✅</SuccessIcon>
        <SuccessTitle>Enrollment Created Successfully!</SuccessTitle>
        <SuccessMessage>
          The student has been enrolled and guardian credentials have been sent via email.
        </SuccessMessage>

        <InfoGrid>
          <InfoCard>
            <InfoLabel>Enrollment ID</InfoLabel>
            <InfoValue>{enrollmentResult.enrollmentId}</InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoLabel>Temporary Code</InfoLabel>
            <InfoValue style={{ fontFamily: 'monospace' }}>{enrollmentResult.tempCode}</InfoValue>
          </InfoCard>
        </InfoGrid>

        <SuccessNote>
          📧 An email has been sent to the guardian with login credentials and instructions.
        </SuccessNote>

        <ButtonGroup>
          <SecondaryButton type="button" onClick={handleNewEnrollment}>
            ➕ Enroll Another Student
          </SecondaryButton>
          {onCancel && (
            <SecondaryButton type="button" onClick={onCancel}>
              ← Back to List
            </SecondaryButton>
          )}
        </ButtonGroup>
      </SuccessContainer>
    );
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        {/* Student Information Section */}
        <Section>
          <SectionHeader>
            <SectionIcon>👨‍🎓</SectionIcon>
            <SectionTitle>Student Information</SectionTitle>
          </SectionHeader>

          <FormGrid>
            <FormGroup>
              <Label>First Name *</Label>
              <Input
                type="text"
                value={studentFirstName}
                onChange={(e) => setStudentFirstName(e.target.value)}
                placeholder="John"
                disabled={loading}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Last Name *</Label>
              <Input
                type="text"
                value={studentLastName}
                onChange={(e) => setStudentLastName(e.target.value)}
                placeholder="Doe"
                disabled={loading}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Date of Birth *</Label>
              <Input
                type="date"
                value={studentDOB}
                onChange={(e) => setStudentDOB(e.target.value)}
                disabled={loading}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Gender *</Label>
              <Select
                value={studentGender}
                onChange={(e) => setStudentGender(e.target.value)}
                disabled={loading}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="john.doe@example.com"
                disabled={loading}
              />
            </FormGroup>

            <FormGroup>
              <Label>Phone</Label>
              <Input
                type="tel"
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                placeholder="+1234567890"
                disabled={loading}
              />
            </FormGroup>

            <FormGroupFull>
              <Label>Address</Label>
              <TextArea
                value={studentAddress}
                onChange={(e) => setStudentAddress(e.target.value)}
                placeholder="123 Main Street, City, State, ZIP"
                disabled={loading}
                rows={3}
              />
            </FormGroupFull>
          </FormGrid>
        </Section>

        {/* Guardian Information Section */}
        <Section>
          <SectionHeader>
            <SectionIcon>👨‍👩‍👧</SectionIcon>
            <SectionTitle>Guardian Information</SectionTitle>
          </SectionHeader>

          <FormGrid>
            <FormGroup>
              <Label>First Name *</Label>
              <Input
                type="text"
                value={guardianFirstName}
                onChange={(e) => setGuardianFirstName(e.target.value)}
                placeholder="Jane"
                disabled={loading}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Last Name *</Label>
              <Input
                type="text"
                value={guardianLastName}
                onChange={(e) => setGuardianLastName(e.target.value)}
                placeholder="Doe"
                disabled={loading}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Email *</Label>
              <Input
                type="email"
                value={guardianEmail}
                onChange={(e) => setGuardianEmail(e.target.value)}
                placeholder="jane.doe@example.com"
                disabled={loading}
                required
              />
              <HelpText>Credentials will be sent to this email</HelpText>
            </FormGroup>

            <FormGroup>
              <Label>Phone *</Label>
              <Input
                type="tel"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                placeholder="+0987654321"
                disabled={loading}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Relation *</Label>
              <Select
                value={guardianRelation}
                onChange={(e) => setGuardianRelation(e.target.value)}
                disabled={loading}
                required
              >
                <option value="">Select Relation</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Guardian</option>
                <option value="Aunt">Aunt</option>
                <option value="Uncle">Uncle</option>
                <option value="Grandparent">Grandparent</option>
                <option value="Sibling">Sibling</option>
                <option value="Other">Other</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Age</Label>
              <Input
                type="number"
                value={guardianAge}
                onChange={(e) => setGuardianAge(e.target.value)}
                placeholder="35"
                disabled={loading}
                min="18"
                max="120"
              />
            </FormGroup>
          </FormGrid>
        </Section>

        {/* Enrollment Details Section */}
        <Section>
          <SectionHeader>
            <SectionIcon>📚</SectionIcon>
            <SectionTitle>Enrollment Details</SectionTitle>
          </SectionHeader>

          <FormGrid>
            <FormGroup>
              <Label>Grade Level *</Label>
              <Input
                type="text"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                placeholder="5"
                disabled={loading}
                required
              />
              <HelpText>e.g., 1, 2, 3, ... 12</HelpText>
            </FormGroup>

            <FormGroup>
              <Label>Academic Year *</Label>
              <Input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="2024-2025"
                disabled={loading}
                required
              />
              <HelpText>Format: YYYY-YYYY</HelpText>
            </FormGroup>
          </FormGrid>
        </Section>

        {/* Error Message */}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {/* Action Buttons */}
        <ButtonGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating Enrollment...' : '✓ Create Enrollment'}
          </SubmitButton>
          {onCancel && (
            <CancelButton type="button" onClick={onCancel} disabled={loading}>
              Cancel
            </CancelButton>
          )}
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

// Styled Components
const FormContainer = styled.div`
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
`;

const SectionIcon = styled.div`
  font-size: 24px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormGroupFull = styled(FormGroup)`
  grid-column: 1 / -1;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }

  &:disabled {
    background: #f7fafc;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  font-size: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }

  &:disabled {
    background: #f7fafc;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  font-size: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }

  &:disabled {
    background: #f7fafc;
    cursor: not-allowed;
  }
`;

const HelpText = styled.span`
  font-size: 12px;
  color: #718096;
`;

const ErrorMessage = styled.div`
  padding: 14px 16px;
  background: #fff5f5;
  border: 2px solid #f56565;
  border-radius: 8px;
  color: #c53030;
  font-size: 14px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled.button`
  padding: 14px 28px;
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled.button`
  padding: 14px 28px;
  background: white;
  color: #718096;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: #cbd5e0;
    color: #4a5568;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  padding: 14px 28px;
  background: white;
  color: #4299e1;
  border: 2px solid #4299e1;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #ebf8ff;
  }
`;

// Success State Components
const SuccessContainer = styled.div`
  background: white;
  border: 2px solid #48bb78;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const SuccessTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
`;

const SuccessMessage = styled.p`
  margin: 0 0 30px 0;
  font-size: 16px;
  color: #4a5568;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  padding: 20px;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  text-align: left;
`;

const InfoLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const InfoValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  word-break: break-all;
`;

const SuccessNote = styled.div`
  padding: 16px;
  background: #ebf8ff;
  border: 2px solid #4299e1;
  border-radius: 8px;
  color: #2c5282;
  font-size: 14px;
  margin-bottom: 30px;
`;
