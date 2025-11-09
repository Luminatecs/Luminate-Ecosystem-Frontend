import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 24px;
  background: #f8f9fa;
  min-height: calc(100vh - 80px);
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 400;
  color: #202124;
  margin: 0 0 24px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 32px;
  border: 1px solid #dadce0;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const EmptyStateTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 8px 0;
`;

const EmptyStateDescription = styled.p`
  font-size: 14px;
  color: #5f6368;
  margin: 0;
  line-height: 20px;
`;

/**
 * Users Management Page - Manage organization administrators
 */
const UsersPage: React.FC = () => {
  return (
    <PageContainer>
      <PageTitle>Manage Users</PageTitle>
      <ContentCard>
        <EmptyStateIcon>👥</EmptyStateIcon>
        <EmptyStateTitle>User Management Coming Soon</EmptyStateTitle>
        <EmptyStateDescription>
          Add, edit, and manage organization administrators and their permissions.
        </EmptyStateDescription>
      </ContentCard>
    </PageContainer>
  );
};

export default UsersPage;
