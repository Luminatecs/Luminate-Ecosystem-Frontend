import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../../contexts/auth';
import { UserRole } from '../../models';
import { Navigate } from 'react-router-dom';
import WardOnboardingComponent from './components/WardOnboarding';
import AssignWardComponent from './components/AssignWard';

/**
 * Slide animations
 */
const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

/**
 * Main Dashboard Container
 */
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f8fafc;
  overflow: hidden;
`;

/**
 * Side Panel (Navigation)
 */
const SidePanel = styled.div<{ isExpanded: boolean }>`
  width: ${props => props.isExpanded ? '280px' : '60px'};
  background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
  color: white;
  transition: width 0.3s ease;
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
`;

/**
 * Side Panel Header
 */
const SidePanelHeader = styled.div<{ isExpanded: boolean }>`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: ${props => props.isExpanded ? 'space-between' : 'center'};
  min-height: 60px;
`;

/**
 * Hamburger Menu Button
 */
const HamburgerButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

/**
 * Organization Title
 */
const OrgTitle = styled.h1<{ isExpanded: boolean }>`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  opacity: ${props => props.isExpanded ? 1 : 0};
  transition: opacity 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
`;

/**
 * Navigation List
 */
const NavigationList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem 0;
`;

/**
 * Navigation Item
 */
const NavigationItem = styled.button<{ isActive: boolean; isExpanded: boolean }>`
  width: 100%;
  background: ${props => props.isActive ? 'rgba(59, 130, 246, 0.3)' : 'none'};
  border: none;
  color: white;
  padding: 0.75rem 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  border-left: 3px solid ${props => props.isActive ? '#3b82f6' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .icon {
    min-width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  .text {
    font-weight: 500;
    opacity: ${props => props.isExpanded ? 1 : 0};
    transition: opacity 0.2s ease;
    white-space: nowrap;
  }
`;

/**
 * Content Area
 */
const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: #f8fafc;
`;

/**
 * Content Card
 */
const ContentCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin: 0 auto;
  max-width: 1200px;
  min-height: calc(100vh - 8rem);
  border: 1px solid #e2e8f0;
`;

/**
 * Page Header
 */
const PageHeader = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
`;

const PageDescription = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
`;

/**
 * Navigation items configuration
 */
interface NavigationItemConfig {
  id: string;
  label: string;
  icon: string;
  component: React.ComponentType<any>;
  description: string;
}

const navigationItems: NavigationItemConfig[] = [
  {
    id: 'ward-onboarding',
    label: 'Ward Onboarding',
    icon: '👥',
    component: WardOnboardingComponent,
    description: 'Add new students to your organization'
  },
  {
    id: 'assign-ward',
    label: 'Assign Ward',
    icon: '📧',
    component: AssignWardComponent,
    description: 'Send login credentials to students'
  }
];

/**
 * Organization Dashboard Component
 */
const OrganizationDashboard: React.FC = () => {
  const { user, organization } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState<string>('ward-onboarding');

  // Protect route - only ORG_ADMIN can access
  if (!user || user.role !== UserRole.ORG_ADMIN) {
    return <Navigate to="/ecosystem" replace />;
  }

  const currentNavItem = navigationItems.find(item => item.id === activeItem);
  const CurrentComponent = currentNavItem?.component;

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <DashboardContainer>
      <SidePanel isExpanded={isExpanded}>
        <SidePanelHeader isExpanded={isExpanded}>
          <HamburgerButton onClick={toggleSidebar}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </HamburgerButton>
          
          <OrgTitle isExpanded={isExpanded}>
            {organization?.name || 'Organization'}
          </OrgTitle>
        </SidePanelHeader>

        <NavigationList>
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              isActive={activeItem === item.id}
              isExpanded={isExpanded}
              onClick={() => setActiveItem(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span className="text">{item.label}</span>
            </NavigationItem>
          ))}
        </NavigationList>
      </SidePanel>

      <ContentArea>
        <ContentCard>
          <PageHeader>
            <PageTitle>{currentNavItem?.label}</PageTitle>
            <PageDescription>{currentNavItem?.description}</PageDescription>
          </PageHeader>

          {CurrentComponent && <CurrentComponent />}
        </ContentCard>
      </ContentArea>
    </DashboardContainer>
  );
};

export default OrganizationDashboard;
