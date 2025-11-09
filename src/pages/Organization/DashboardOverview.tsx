import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';

const DashboardContent = styled.div`
  padding: 24px;
  background: #f8f9fa;
  min-height: calc(100vh - 80px);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

/**
 * Simple greeting text (no card)
 */
const GreetingText = styled.h1<{ visible: boolean }>`
  font-size: 24px;
  font-weight: 400;
  color: #202124;
  margin: 0 0 32px 0;
  letter-spacing: 0;
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateY(${props => props.visible ? 0 : -10}px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const StatCard = styled.div<{ color: string }>`
  background: white;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #dadce0;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color};
  }

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
    transform: translateY(-2px);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StatIcon = styled.div<{ bgColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const StatValue = styled.div`
  font-size: 36px;
  font-weight: 400;
  color: #202124;
  margin-bottom: 8px;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #5f6368;
  font-weight: 400;
  letter-spacing: 0.2px;
`;

const StatTrend = styled.div<{ positive: boolean }>`
  font-size: 12px;
  color: ${props => props.positive ? '#1e8e3e' : '#d93025'};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`;

const QuickActionsSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #dadce0;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 20px 0;
  letter-spacing: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled.button`
  background: white;
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  display: flex;
  align-items: flex-start;
  gap: 16px;

  &:hover {
    border-color: #1967d2;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ActionIconWrapper = styled.div<{ bgColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`;

const ActionContent = styled.div`
  flex: 1;
`;

const ActionTitle = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #202124;
  margin-bottom: 4px;
  letter-spacing: 0.1px;
`;

const ActionDescription = styled.div`
  font-size: 13px;
  color: #5f6368;
  line-height: 18px;
`;

/**
 * Dashboard Overview Component with Material Design
 */
const DashboardOverview: React.FC = () => {
  const { user, organization } = useAuth();
  const navigate = useNavigate();
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [greetingText, setGreetingText] = useState('');

  // Simple greeting that appears for 10 seconds
  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    if (hour >= 12 && hour < 18) greeting = 'Good afternoon';
    if (hour >= 18) greeting = 'Good evening';
    
    setGreetingText(`${greeting}, ${user?.name || 'there'}`);
    setGreetingVisible(true);

    const timer = setTimeout(() => {
      setGreetingVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [user?.name]);

  const handleAddStudent = () => {
    navigate('/organization-dashboard/students');
  };

  const handleViewReports = () => {
    navigate('/organization-dashboard/reports');
  };

  const handleManageUsers = () => {
    navigate('/organization-dashboard/users');
  };

  const handleSettings = () => {
    navigate('/organization-dashboard/settings');
  };

  const handleAssignCredentials = () => {
    navigate('/organization-dashboard/assign-credentials');
  };

  const handleViewAnalytics = () => {
    navigate('/organization-dashboard/analytics');
  };

  return (
    <DashboardContent>
      <GreetingText visible={greetingVisible}>
        {greetingText}
      </GreetingText>

      <StatsGrid>
        <StatCard color="#1967d2">
          <StatHeader>
            <StatIcon bgColor="rgba(25, 103, 210, 0.1)">
              👥
            </StatIcon>
          </StatHeader>
          <StatValue>0</StatValue>
          <StatLabel>Total Students</StatLabel>
          <StatTrend positive={true}>
            <span>↑</span>
            <span>Start adding students</span>
          </StatTrend>
        </StatCard>

        <StatCard color="#1e8e3e">
          <StatHeader>
            <StatIcon bgColor="rgba(30, 142, 62, 0.1)">
              ✅
            </StatIcon>
          </StatHeader>
          <StatValue>0</StatValue>
          <StatLabel>Active Enrollments</StatLabel>
          <StatTrend positive={true}>
            <span>↑</span>
            <span>Ready for new term</span>
          </StatTrend>
        </StatCard>

        <StatCard color="#ea4335">
          <StatHeader>
            <StatIcon bgColor="rgba(234, 67, 53, 0.1)">
              ⏱️
            </StatIcon>
          </StatHeader>
          <StatValue>0</StatValue>
          <StatLabel>Pending Credentials</StatLabel>
          <StatTrend positive={false}>
            <span>→</span>
            <span>No pending actions</span>
          </StatTrend>
        </StatCard>

        <StatCard color="#f9ab00">
          <StatHeader>
            <StatIcon bgColor="rgba(249, 171, 0, 0.1)">
              📚
            </StatIcon>
          </StatHeader>
          <StatValue>{organization?.name ? '1' : '0'}</StatValue>
          <StatLabel>Active Organizations</StatLabel>
          <StatTrend positive={true}>
            <span>✓</span>
            <span>Setup complete</span>
          </StatTrend>
        </StatCard>
      </StatsGrid>

      <QuickActionsSection>
        <SectionTitle>Quick Actions</SectionTitle>
        <ActionsGrid>
          <ActionCard onClick={handleAddStudent}>
            <ActionIconWrapper bgColor="rgba(25, 103, 210, 0.1)">
              👨‍🎓
            </ActionIconWrapper>
            <ActionContent>
              <ActionTitle>Add Students</ActionTitle>
              <ActionDescription>
                Create student accounts individually or import via CSV
              </ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard onClick={handleAssignCredentials}>
            <ActionIconWrapper bgColor="rgba(30, 142, 62, 0.1)">
              🔑
            </ActionIconWrapper>
            <ActionContent>
              <ActionTitle>Assign Credentials</ActionTitle>
              <ActionDescription>
                Send temporary login codes to students
              </ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard onClick={handleViewAnalytics}>
            <ActionIconWrapper bgColor="rgba(249, 171, 0, 0.1)">
              📊
            </ActionIconWrapper>
            <ActionContent>
              <ActionTitle>View Analytics</ActionTitle>
              <ActionDescription>
                Track student progress and engagement
              </ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard onClick={handleViewReports}>
            <ActionIconWrapper bgColor="rgba(234, 67, 53, 0.1)">
              📈
            </ActionIconWrapper>
            <ActionContent>
              <ActionTitle>Reports</ActionTitle>
              <ActionDescription>
                Generate and download detailed reports
              </ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard onClick={handleManageUsers}>
            <ActionIconWrapper bgColor="rgba(168, 85, 247, 0.1)">
              👤
            </ActionIconWrapper>
            <ActionContent>
              <ActionTitle>Manage Users</ActionTitle>
              <ActionDescription>
                Add or edit organization administrators
              </ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard onClick={handleSettings}>
            <ActionIconWrapper bgColor="rgba(95, 99, 104, 0.1)">
              ⚙️
            </ActionIconWrapper>
            <ActionContent>
              <ActionTitle>Settings</ActionTitle>
              <ActionDescription>
                Configure organization preferences
              </ActionDescription>
            </ActionContent>
          </ActionCard>
        </ActionsGrid>
      </QuickActionsSection>
    </DashboardContent>
  );
};

export default DashboardOverview;
