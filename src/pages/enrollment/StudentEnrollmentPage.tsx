/**
 * Student Enrollment Page
 * Allows org admins to enroll students via single form or bulk CSV upload
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SingleEnrollmentForm } from '../../components/enrollment/SingleEnrollmentForm';
import { BulkEnrollmentUpload } from '../../components/enrollment/BulkEnrollmentUpload';
import { useAuth } from '../../contexts/auth';

type EnrollmentTab = 'single' | 'bulk';

export const StudentEnrollmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<EnrollmentTab>('single');

  const organizationId = user?.organizationId || '';

  const handleEnrollmentSuccess = (result: any) => {
    console.log('Enrollment successful:', result);
    // Could show a success toast here
  };

  const handleCancel = () => {
    navigate('/enrollment/list');
  };

  if (!organizationId) {
    return (
      <Container>
        <ErrorCard>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Organization Not Found</ErrorTitle>
          <ErrorText>
            You must be associated with an organization to create enrollments.
          </ErrorText>
        </ErrorCard>
      </Container>
    );
  }

  return (
    <Container>
      {/* Breadcrumbs */}
      <Breadcrumbs>
        <BreadcrumbLink onClick={() => navigate('/dashboard')}>
          Dashboard
        </BreadcrumbLink>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbLink onClick={() => navigate('/enrollment/list')}>
          Enrollments
        </BreadcrumbLink>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbCurrent>Create Enrollment</BreadcrumbCurrent>
      </Breadcrumbs>

      {/* Page Header */}
      <PageHeader>
        <HeaderContent>
          <HeaderIcon>🎓</HeaderIcon>
          <HeaderTextGroup>
            <PageTitle>Create Student Enrollment</PageTitle>
            <PageSubtitle>
              Enroll new students individually or upload multiple students at once
            </PageSubtitle>
          </HeaderTextGroup>
        </HeaderContent>
        <BackButton onClick={handleCancel}>
          ← Back to List
        </BackButton>
      </PageHeader>

      {/* Tab Navigation */}
      <TabContainer>
        <Tab
          active={activeTab === 'single'}
          onClick={() => setActiveTab('single')}
        >
          <TabIcon>👤</TabIcon>
          <TabLabel>Single Enrollment</TabLabel>
          <TabDescription>Enroll one student at a time</TabDescription>
        </Tab>
        <Tab
          active={activeTab === 'bulk'}
          onClick={() => setActiveTab('bulk')}
        >
          <TabIcon>📊</TabIcon>
          <TabLabel>Bulk Upload</TabLabel>
          <TabDescription>Upload CSV file with multiple students</TabDescription>
        </Tab>
      </TabContainer>

      {/* Tab Content */}
      <ContentArea>
        {activeTab === 'single' && (
          <SingleEnrollmentForm
            organizationId={organizationId}
            onSuccess={handleEnrollmentSuccess}
            onCancel={handleCancel}
          />
        )}

        {activeTab === 'bulk' && (
          <BulkEnrollmentUpload
            organizationId={organizationId}
            onSuccess={handleEnrollmentSuccess}
            onCancel={handleCancel}
          />
        )}
      </ContentArea>

      {/* Help Section */}
      <HelpSection>
        <HelpTitle>💡 Need Help?</HelpTitle>
        <HelpList>
          <HelpItem>
            <strong>Single Enrollment:</strong> Use this option to enroll one student at a time with detailed information.
          </HelpItem>
          <HelpItem>
            <strong>Bulk Upload:</strong> Download the CSV template, fill in multiple students' data, and upload it to enroll many students at once.
          </HelpItem>
          <HelpItem>
            <strong>Guardian Credentials:</strong> After enrollment, guardians will receive an email with their login credentials and a temporary code valid for 5 days.
          </HelpItem>
          <HelpItem>
            <strong>Student Accounts:</strong> Each enrolled student automatically gets a user account that guardians can access.
          </HelpItem>
        </HelpList>
      </HelpSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const BreadcrumbLink = styled.button`
  background: none;
  border: none;
  color: #4299e1;
  cursor: pointer;
  padding: 0;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: #cbd5e0;
`;

const BreadcrumbCurrent = styled.span`
  color: #2d3748;
  font-weight: 600;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 100%);
  border-radius: 12px;
  border: 2px solid #2c5282;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 24px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const HeaderIcon = styled.div`
  font-size: 48px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeaderTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const PageSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
`;

const BackButton = styled.button`
  padding: 12px 24px;
  background: white;
  color: #4299e1;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(0.95);
  }

  @media (max-width: 768px) {
    align-self: stretch;
  }
`;

const TabContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 24px;
  background: ${props => props.active ? 'white' : '#f7fafc'};
  border: 2px solid ${props => props.active ? '#4299e1' : '#e2e8f0'};
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:hover {
    border-color: #4299e1;
    background: white;
  }
`;

const TabIcon = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
`;

const TabLabel = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
`;

const TabDescription = styled.div`
  font-size: 14px;
  color: #718096;
`;

const ContentArea = styled.div`
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const HelpSection = styled.div`
  padding: 24px;
  background: #ebf8ff;
  border: 2px solid #4299e1;
  border-radius: 12px;
`;

const HelpTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2c5282;
`;

const HelpList = styled.ul`
  margin: 0;
  padding: 0 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HelpItem = styled.li`
  font-size: 14px;
  color: #2c5282;
  line-height: 1.6;

  strong {
    font-weight: 700;
  }
`;

const ErrorCard = styled.div`
  padding: 60px 40px;
  background: white;
  border: 2px solid #f56565;
  border-radius: 12px;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const ErrorTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 24px;
  font-weight: 700;
  color: #c53030;
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #742a2a;
`;
