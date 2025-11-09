import React, { useState } from 'react';
import styled from 'styled-components';
import WardOnboarding from '../../components/ward/WardOnboarding';
import SingleWardEntry from '../../components/ward/SingleWardEntry';

const ManagementContainer = styled.div`
  padding: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 1rem 2rem;
  background: ${props => props.isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'};
  color: ${props => props.isActive ? 'white' : '#4a5568'};
  border: none;
  border-bottom: ${props => props.isActive ? '3px solid #667eea' : '3px solid transparent'};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px 8px 0 0;
  position: relative;
  bottom: -2px;

  &:hover {
    background: ${props => props.isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f7fafc'};
    color: ${props => props.isActive ? 'white' : '#2d3748'};
  }
`;

const TabContent = styled.div`
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

type TabType = 'bulk' | 'single';

/**
 * Ward Management Component
 * Contains tabs for Bulk Upload and Single Entry
 */
const WardManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('bulk');

  return (
    <ManagementContainer>
      <TabContainer>
        <Tab 
          isActive={activeTab === 'bulk'} 
          onClick={() => setActiveTab('bulk')}
        >
          📤 Bulk Upload
        </Tab>
        <Tab 
          isActive={activeTab === 'single'} 
          onClick={() => setActiveTab('single')}
        >
          ➕ Single Entry
        </Tab>
      </TabContainer>

      <TabContent>
        {activeTab === 'bulk' && <WardOnboarding />}
        {activeTab === 'single' && <SingleWardEntry />}
      </TabContent>
    </ManagementContainer>
  );
};

export default WardManagement;
