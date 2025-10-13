/**
 * Bulk Enrollment Upload Component
 * CSV file upload with drag & drop, validation, and processing
 */

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { EnrollmentService } from '../../services/EnrollmentService';
import { csvUtilityService } from '../../services/CSVUtilityService';

interface BulkEnrollmentUploadProps {
  organizationId: string;
  onSuccess?: (result: any) => void;
  onCancel?: () => void;
}

interface ValidationError {
  row: number;
  errors: string[];
}

export const BulkEnrollmentUpload: React.FC<BulkEnrollmentUploadProps> = ({
  organizationId,
  onSuccess,
  onCancel
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [csvContent, setCsvContent] = useState<string>('');
  const [validationResult, setValidationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [processingResult, setProcessingResult] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = async (selectedFile: File) => {
    setError('');
    setValidationResult(null);
    setSuccess(false);

    // Validate file
    const validation = csvUtilityService.validateCSVFile(selectedFile);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setFile(selectedFile);

    // Read CSV content
    try {
      const content = await csvUtilityService.readCSVFile(selectedFile);
      setCsvContent(content);
    } catch (err: any) {
      setError(err.message || 'Failed to read file');
      setFile(null);
    }
  };

  const handleValidateCSV = async () => {
    if (!csvContent) {
      setError('No CSV content to validate');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await EnrollmentService.validateCSV(csvContent);

      if (response.success && response.data) {
        setValidationResult(response.data);
        
        if (response.data.errorCount === 0) {
          // All valid
          console.log('✅ All rows are valid!');
        } else {
          console.log('⚠️ Found validation errors:', response.data.errorCount);
        }
      } else {
        setError(response.error || 'Validation failed');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to validate CSV');
    } finally {
      setLoading(false);
    }
  };

  const handleProcessEnrollment = async () => {
    if (!validationResult || !validationResult.validData || validationResult.validData.length === 0) {
      setError('No valid data to process');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await EnrollmentService.processBulkEnrollment({
        organizationId,
        enrollmentData: validationResult.validData
      });

      if (response.success && response.data) {
        setSuccess(true);
        setProcessingResult(response.data);
        
        if (onSuccess) {
          onSuccess(response.data);
        }
      } else {
        setError(response.error || 'Failed to process enrollment');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to process enrollment');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const template = await EnrollmentService.downloadCSVTemplate();
      csvUtilityService.downloadCSV(template, 'student-enrollment-template.csv');
    } catch (err: any) {
      setError(err.message || 'Failed to download template');
    }
  };

  const handleReset = () => {
    setFile(null);
    setCsvContent('');
    setValidationResult(null);
    setError('');
    setSuccess(false);
    setProcessingResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNewUpload = () => {
    handleReset();
  };

  // Success State
  if (success && processingResult) {
    return (
      <SuccessContainer>
        <SuccessIcon>✅</SuccessIcon>
        <SuccessTitle>Bulk Enrollment Complete!</SuccessTitle>
        
        <StatsGrid>
          <StatCard color="#48bb78">
            <StatNumber>{processingResult.successful}</StatNumber>
            <StatLabel>Successful</StatLabel>
          </StatCard>
          <StatCard color="#f56565">
            <StatNumber>{processingResult.failed}</StatNumber>
            <StatLabel>Failed</StatLabel>
          </StatCard>
          <StatCard color="#4299e1">
            <StatNumber>{processingResult.totalProcessed}</StatNumber>
            <StatLabel>Total Processed</StatLabel>
          </StatCard>
        </StatsGrid>

        <ResultsSection>
          <ResultsTitle>📊 Detailed Results</ResultsTitle>
          <ResultsTable>
            <thead>
              <tr>
                <TableHeader>Student Name</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Message</TableHeader>
              </tr>
            </thead>
            <tbody>
              {processingResult.results.map((result: any, index: number) => (
                <tr key={index}>
                  <TableCell>{result.studentName}</TableCell>
                  <TableCell>
                    {result.success ? (
                      <StatusBadge success>✓ Success</StatusBadge>
                    ) : (
                      <StatusBadge success={false}>✗ Failed</StatusBadge>
                    )}
                  </TableCell>
                  <TableCell>{result.message}</TableCell>
                </tr>
              ))}
            </tbody>
          </ResultsTable>
        </ResultsSection>

        <SuccessNote>
          📧 Credentials have been sent to all guardians via email.
        </SuccessNote>

        <ButtonGroup>
          <PrimaryButton onClick={handleNewUpload}>
            ⬆️ Upload Another File
          </PrimaryButton>
          {onCancel && (
            <SecondaryButton onClick={onCancel}>
              ← Back to List
            </SecondaryButton>
          )}
        </ButtonGroup>
      </SuccessContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Bulk Student Enrollment</Title>
        <Subtitle>Upload a CSV file with student and guardian information</Subtitle>
      </Header>

      {/* Step 1: Download Template */}
      <StepCard>
        <StepNumber>1</StepNumber>
        <StepContent>
          <StepTitle>Download CSV Template</StepTitle>
          <StepDescription>
            Start by downloading our template with all required columns and an example row.
          </StepDescription>
          <DownloadButton onClick={handleDownloadTemplate}>
            ⬇️ Download Template
          </DownloadButton>
        </StepContent>
      </StepCard>

      {/* Step 2: Upload CSV */}
      <StepCard>
        <StepNumber>2</StepNumber>
        <StepContent>
          <StepTitle>Upload Your CSV File</StepTitle>
          <StepDescription>
            Fill in the template with your data and upload it here.
          </StepDescription>

          <UploadZone
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            isDragging={isDragging}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadIcon>📁</UploadIcon>
            {file ? (
              <>
                <UploadText>{file.name}</UploadText>
                <UploadSubtext>{csvUtilityService.formatFileSize(file.size)}</UploadSubtext>
              </>
            ) : (
              <>
                <UploadText>Drag & drop CSV file here</UploadText>
                <UploadSubtext>or click to browse (max 5MB)</UploadSubtext>
              </>
            )}
          </UploadZone>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />

          {file && (
            <FileActions>
              <ValidateButton onClick={handleValidateCSV} disabled={loading}>
                {loading ? '🔍 Validating...' : '🔍 Validate CSV'}
              </ValidateButton>
              <RemoveButton onClick={handleReset}>✗ Remove File</RemoveButton>
            </FileActions>
          )}
        </StepContent>
      </StepCard>

      {/* Step 3: Validation Results */}
      {validationResult && (
        <StepCard>
          <StepNumber>3</StepNumber>
          <StepContent>
            <StepTitle>Validation Results</StepTitle>
            
            <ValidationSummary>
              <SummaryItem success>
                <SummaryIcon>✓</SummaryIcon>
                <SummaryText>{validationResult.validCount} Valid Rows</SummaryText>
              </SummaryItem>
              <SummaryItem success={false}>
                <SummaryIcon>✗</SummaryIcon>
                <SummaryText>{validationResult.errorCount} Invalid Rows</SummaryText>
              </SummaryItem>
            </ValidationSummary>

            {validationResult.errorCount > 0 && (
              <ErrorsSection>
                <ErrorsTitle>⚠️ Validation Errors</ErrorsTitle>
                <ErrorsList>
                  {validationResult.errors.map((error: ValidationError, index: number) => (
                    <ErrorItem key={index}>
                      <ErrorRow>Row {error.row}</ErrorRow>
                      <ErrorMessages>
                        {error.errors.map((msg: string, idx: number) => (
                          <ErrorMessage key={idx}>• {msg}</ErrorMessage>
                        ))}
                      </ErrorMessages>
                    </ErrorItem>
                  ))}
                </ErrorsList>
              </ErrorsSection>
            )}

            {validationResult.validCount > 0 && (
              <ProcessButton onClick={handleProcessEnrollment} disabled={loading}>
                {loading
                  ? '⏳ Processing...'
                  : `✓ Process ${validationResult.validCount} Valid Enrollment${validationResult.validCount > 1 ? 's' : ''}`
                }
              </ProcessButton>
            )}
          </StepContent>
        </StepCard>
      )}

      {/* Error Message */}
      {error && <ErrorBanner>{error}</ErrorBanner>}

      {/* Cancel Button */}
      {onCancel && (
        <CancelButtonContainer>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </CancelButtonContainer>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  padding: 24px;
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 100%);
  border-radius: 12px;
  border: 2px solid #2c5282;
  color: white;
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
`;

const StepCard = styled.div`
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 20px;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StepTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
`;

const StepDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #718096;
`;

const DownloadButton = styled.button`
  padding: 12px 24px;
  background: white;
  color: #4299e1;
  border: 2px solid #4299e1;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  align-self: flex-start;

  &:hover {
    background: #ebf8ff;
  }
`;

const UploadZone = styled.div<{ isDragging: boolean }>`
  padding: 60px 40px;
  border: 3px dashed ${props => props.isDragging ? '#4299e1' : '#cbd5e0'};
  border-radius: 12px;
  background: ${props => props.isDragging ? '#ebf8ff' : '#f7fafc'};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4299e1;
    background: #ebf8ff;
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const UploadText = styled.p`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
`;

const UploadSubtext = styled.p`
  margin: 0;
  font-size: 14px;
  color: #718096;
`;

const FileActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ValidateButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
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

const RemoveButton = styled.button`
  padding: 12px 24px;
  background: white;
  color: #f56565;
  border: 2px solid #f56565;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #fff5f5;
  }
`;

const ValidationSummary = styled.div`
  display: flex;
  gap: 16px;
`;

const SummaryItem = styled.div<{ success: boolean }>`
  flex: 1;
  padding: 16px;
  background: ${props => props.success ? '#f0fff4' : '#fff5f5'};
  border: 2px solid ${props => props.success ? '#48bb78' : '#f56565'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SummaryIcon = styled.div`
  font-size: 24px;
`;

const SummaryText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
`;

const ErrorsSection = styled.div`
  padding: 20px;
  background: #fff5f5;
  border: 2px solid #f56565;
  border-radius: 8px;
`;

const ErrorsTitle = styled.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #c53030;
`;

const ErrorsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
`;

const ErrorItem = styled.div`
  padding: 12px;
  background: white;
  border-radius: 6px;
`;

const ErrorRow = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #c53030;
  margin-bottom: 8px;
`;

const ErrorMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ErrorMessage = styled.div`
  font-size: 13px;
  color: #742a2a;
`;

const ProcessButton = styled.button`
  padding: 14px 28px;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
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

const ErrorBanner = styled.div`
  padding: 16px 20px;
  background: #fff5f5;
  border: 2px solid #f56565;
  border-radius: 8px;
  color: #c53030;
  font-size: 14px;
  font-weight: 500;
`;

const CancelButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  background: white;
  color: #718096;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #cbd5e0;
    color: #4a5568;
  }
`;

// Success State Components
const SuccessContainer = styled.div`
  background: white;
  border: 2px solid #48bb78;
  border-radius: 12px;
  padding: 40px;
`;

const SuccessIcon = styled.div`
  font-size: 64px;
  text-align: center;
  margin-bottom: 20px;
`;

const SuccessTitle = styled.h2`
  margin: 0 0 30px 0;
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div<{ color: string }>`
  padding: 24px;
  background: white;
  border: 2px solid ${props => props.color};
  border-radius: 8px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
`;

const ResultsSection = styled.div`
  margin-bottom: 30px;
`;

const ResultsTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
`;

const ResultsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  padding: 12px 16px;
  background: #f7fafc;
  border-bottom: 2px solid #e2e8f0;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
`;

const TableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 14px;
  color: #4a5568;
`;

const StatusBadge = styled.span<{ success: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  background: ${props => props.success ? '#f0fff4' : '#fff5f5'};
  color: ${props => props.success ? '#38a169' : '#c53030'};
  border: 1px solid ${props => props.success ? '#48bb78' : '#f56565'};
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const SuccessNote = styled.div`
  padding: 16px;
  background: #ebf8ff;
  border: 2px solid #4299e1;
  border-radius: 8px;
  color: #2c5282;
  font-size: 14px;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  padding: 14px 28px;
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
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
