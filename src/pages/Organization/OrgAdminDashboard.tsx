import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';

const DashboardContent = styled.div`
  padding: 2rem;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 2.5rem;
  color: white;
  margin-bottom: 2rem;
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.95;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div<{ color: string }>`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-left: 4px solid ${props => props.color};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const StatIcon = styled.div<{ bgColor: string }>`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #718096;
  font-weight: 500;
`;

const QuickActions = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
`;

const QuickActionsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 1.5rem 0;
`;

const ActionButton = styled.button<{ bgColor: string }>`
  background: ${props => props.bgColor};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  width: 100%;

  &:hover {
    transform: translateX(4px);
  }
`;

/**
 * Organization Admin Dashboard - Main Overview Component
 */
const OrgAdminDashboard: React.FC = () => {
  const { user, organization } = useAuth();

  return (
    <DashboardContent>
      <WelcomeSection>
        <WelcomeTitle>Welcome back, {user?.name}!</WelcomeTitle>
        <WelcomeSubtitle>
          {organization?.name} Dashboard - Manage your students and resources
        </WelcomeSubtitle>
      </WelcomeSection>

      <StatsGrid>
        <StatCard color="#667eea">
          <StatIcon bgColor="rgba(102, 126, 234, 0.1)">
            👥
          </StatIcon>
          <StatValue>932</StatValue>
          <StatLabel>Total Students</StatLabel>
        </StatCard>

        <StatCard color="#f6ad55">
          <StatIcon bgColor="rgba(246, 173, 85, 0.1)">
            👨‍🏫
          </StatIcon>
          <StatValue>754</StatValue>
          <StatLabel>Teachers</StatLabel>
        </StatCard>

        <StatCard color="#fc8181">
          <StatIcon bgColor="rgba(252, 129, 129, 0.1)">
            📚
          </StatIcon>
          <StatValue>40</StatValue>
          <StatLabel>Events</StatLabel>
        </StatCard>

        <StatCard color="#4fd1c5">
          <StatIcon bgColor="rgba(79, 209, 197, 0.1)">
            🍽️
          </StatIcon>
          <StatValue>32k</StatValue>
          <StatLabel>Food Items</StatLabel>
        </StatCard>
      </StatsGrid>

      <QuickActions>
        <QuickActionsTitle>Quick Actions</QuickActionsTitle>
        <ActionButton bgColor="#667eea">
          <span>➕</span>
          <span>Add New Student</span>
        </ActionButton>
        <ActionButton bgColor="#48bb78">
          <span>📊</span>
          <span>View Reports</span>
        </ActionButton>
        <ActionButton bgColor="#ed8936">
          <span>📧</span>
          <span>Send Announcements</span>
        </ActionButton>
      </QuickActions>
    </DashboardContent>
  );
};

export default OrgAdminDashboard;
