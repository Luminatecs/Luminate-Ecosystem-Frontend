/**
 * Enrollment List Page
 * View and manage all student enrollments
 */

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { EnrollmentList } from '../../components/enrollment/EnrollmentList';
import { useAuth } from '../../contexts/auth';

export const EnrollmentListPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const organizationId = user?.organizationId || '';

  const handleEnrollmentClick = (enrollmentId: string) => {
    // Could navigate to enrollment detail page
    console.log('View enrollment:', enrollmentId);
    // navigate(`/enrollment/${enrollmentId}`);
  };

  const handleCreateEnrollment = () => {
    navigate('/enrollment/create');
  };

  if (!organizationId) {
    return (
      <Container>
        <ErrorCard>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Organization Not Found</ErrorTitle>
          <ErrorText>
            You must be associated with an organization to view enrollments.
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
        <BreadcrumbCurrent>Enrollments</BreadcrumbCurrent>
      </Breadcrumbs>

      {/* Page Header */}
      <PageHeader>
        <HeaderContent>
          <HeaderIcon>📋</HeaderIcon>
          <HeaderTextGroup>
            <PageTitle>Student Enrollments</PageTitle>
            <PageSubtitle>
              Manage and track all student enrollments for your organization
            </PageSubtitle>
          </HeaderTextGroup>
        </HeaderContent>
        <CreateButton onClick={handleCreateEnrollment}>
          ➕ Create New Enrollment
        </CreateButton>
      </PageHeader>

      {/* Enrollment List */}
      <EnrollmentList
        organizationId={organizationId}
        onEnrollmentClick={handleEnrollmentClick}
      />

      {/* Quick Actions */}
      <QuickActions>
        <QuickActionsTitle>Quick Actions</QuickActionsTitle>
        <ActionsGrid>
          <ActionCard onClick={handleCreateEnrollment}>
            <ActionIcon>👤</ActionIcon>
            <ActionLabel>Single Enrollment</ActionLabel>
            <ActionDescription>Enroll one student</ActionDescription>
          </ActionCard>
          <ActionCard onClick={handleCreateEnrollment}>
            <ActionIcon>📊</ActionIcon>
            <ActionLabel>Bulk Upload</ActionLabel>
            <ActionDescription>Upload CSV file</ActionDescription>
          </ActionCard>
          <ActionCard onClick={() => navigate('/dashboard')}>
            <ActionIcon>📈</ActionIcon>
            <ActionLabel>View Reports</ActionLabel>
            <ActionDescription>Analytics & insights</ActionDescription>
          </ActionCard>
        </ActionsGrid>
      </QuickActions>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1600px;
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

const CreateButton = styled.button`
  padding: 14px 28px;
  background: white;
  color: #4299e1;
  border: none;
  border-radius: 8px;
  font-size: 16px;
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

const QuickActions = styled.div`
  padding: 24px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
`;

const QuickActionsTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled.button`
  padding: 24px;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #4299e1;
    background: #ebf8ff;
    transform: translateY(-2px);
  }
`;

const ActionIcon = styled.div`
  font-size: 36px;
  margin-bottom: 8px;
`;

const ActionLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
`;

const ActionDescription = styled.div`
  font-size: 13px;
  color: #718096;
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
