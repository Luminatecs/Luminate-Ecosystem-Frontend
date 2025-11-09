import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';

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

const SettingsGrid = styled.div`
  display: grid;
  gap: 20px;
`;

const SettingsCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #dadce0;
`;

const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 16px 0;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f3f4;

  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  font-size: 14px;
  color: #202124;
`;

const SettingValue = styled.div`
  font-size: 14px;
  color: #5f6368;
`;

/**
 * Organization Settings Page
 */
const SettingsPage: React.FC = () => {
  const { organization } = useAuth();

  return (
    <PageContainer>
      <PageTitle>Organization Settings</PageTitle>
      
      <SettingsGrid>
        <SettingsCard>
          <CardTitle>Organization Information</CardTitle>
          <SettingRow>
            <SettingLabel>Organization Name</SettingLabel>
            <SettingValue>{organization?.name || 'Not set'}</SettingValue>
          </SettingRow>
          <SettingRow>
            <SettingLabel>Contact Email</SettingLabel>
            <SettingValue>{organization?.contactEmail || 'Not set'}</SettingValue>
          </SettingRow>
          <SettingRow>
            <SettingLabel>Status</SettingLabel>
            <SettingValue>Active</SettingValue>
          </SettingRow>
        </SettingsCard>

        <SettingsCard>
          <CardTitle>Preferences</CardTitle>
          <SettingRow>
            <SettingLabel>Additional settings coming soon</SettingLabel>
            <SettingValue>⚙️</SettingValue>
          </SettingRow>
        </SettingsCard>
      </SettingsGrid>
    </PageContainer>
  );
};

export default SettingsPage;
