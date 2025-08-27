import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import WardOnboardingComponent from './components/WardOnboarding';
import AssignWardComponent from './components/AssignWard';

/**
 * Main Dashboard Container
 */
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #f0f4f8 0%, #e6f3ff 100%);
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

/**
 * Side Panel (Navigation)
 */
const SidePanel = styled.div<{ isExpanded: boolean }>`
  width: ${props => props.isExpanded ? '280px' : '70px'};
  background: linear-gradient(180deg, #1a365d 0%, #2c5282 50%, #2d3748 100%);
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 30px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 10;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%);
    pointer-events: none;
  }
`;

/**
 * Side Panel Header
 */
const SidePanelHeader = styled.div<{ isExpanded: boolean }>`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: ${props => props.isExpanded ? 'flex-start' : 'center'};
  gap: ${props => props.isExpanded ? '1.5rem' : '0'};
  min-height: 70px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`;

/**
 * Hamburger Menu Button
 */
const HamburgerButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

/**
 * Organization Title
 */
const OrgTitle = styled.h1<{ isExpanded: boolean }>`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
  opacity: ${props => props.isExpanded ? 1 : 0};
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  color: #ffffff;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

/**
 * Navigation List
 */
const NavigationList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.5rem 0;
  margin-top: 1rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

/**
 * Navigation Item
 */
const NavigationItem = styled.button<{ isActive: boolean; isExpanded: boolean }>`
  width: calc(100% - 16px);
  margin: 0 8px 6px 8px;
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, rgba(66, 153, 225, 0.3) 0%, rgba(66, 153, 225, 0.2) 100%)'
    : 'transparent'
  };
  border: ${props => props.isActive 
    ? '1px solid rgba(66, 153, 225, 0.4)'
    : '1px solid transparent'
  };
  color: ${props => props.isActive ? '#ffffff' : '#e2e8f0'};
  padding: 14px 16px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 14px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  font-weight: 500;
  letter-spacing: 0.3px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, #4299e1 0%, #2c5282 100%);
    opacity: ${props => props.isActive ? 1 : 0};
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: ${props => props.isActive 
      ? 'linear-gradient(135deg, rgba(66, 153, 225, 0.4) 0%, rgba(66, 153, 225, 0.25) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)'
    };
    border-color: rgba(255, 255, 255, 0.2);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

    &::after {
      opacity: 1;
    }

    .icon {
      background: ${props => props.isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(66, 153, 225, 0.3)'};
      transform: scale(1.1);
    }
  }

  &:active {
    transform: translateY(0);
  }

  .icon {
    min-width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    background: ${props => props.isActive 
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
      : 'rgba(255, 255, 255, 0.08)'
    };
    border-radius: 10px;
    padding: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid ${props => props.isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
    backdrop-filter: blur(10px);
    flex-shrink: 0;
  }

  .text {
    font-weight: 500;
    opacity: ${props => props.isExpanded ? 1 : 0};
    transform: translateX(${props => props.isExpanded ? '0' : '-10px'});
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    font-size: 0.95rem;
    letter-spacing: 0.3px;
    flex: 1;
  }
`;

/**
 * Content Area
 */
const ContentArea = styled.div`
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  min-height: 100vh;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: linear-gradient(180deg, 
      rgba(44, 82, 130, 0.08) 0%, 
      rgba(66, 153, 225, 0.04) 50%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at top right, rgba(66, 153, 225, 0.03) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

/**
 * Content Card
 */
const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  padding: 3rem;
  margin: 0 auto;
  max-width: 1200px;
  min-height: calc(100vh - 8rem);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  backdrop-filter: blur(20px);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(66, 153, 225, 0.4) 50%, transparent 100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, 
      rgba(66, 153, 225, 0.1) 0%, 
      transparent 30%,
      transparent 70%, 
      rgba(44, 82, 130, 0.1) 100%
    );
    border-radius: 22px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

/**
 * Page Header
 */
const PageHeader = styled.div`
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(66, 153, 225, 0.1);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #4299e1 0%, #2c5282 100%);
    border-radius: 1px;
  }
`;

/**
 * Page Title
 */
const PageTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #2c5282 0%, #4299e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  line-height: 1.2;
`;

/**
 * Page Description
 */
const PageDescription = styled.p`
  color: #4a5568;
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 700px;
  font-weight: 400;
`;

/**
 * Logout Button
 */
const LogoutButton = styled.button`
  width: calc(100% - 16px);
  margin: 0 8px 1.5rem 8px;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(185, 28, 28, 0.1) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fecaca;
  padding: 14px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: linear-gradient(135deg, rgba(220, 38, 38, 0.25) 0%, rgba(185, 28, 28, 0.2) 100%);
    border-color: rgba(239, 68, 68, 0.5);
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.2);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
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
  const { user, organization, logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState<string>('ward-onboarding');
  const navigate = useNavigate();

  // Wait for user data to load
  if (!user) {
    return <div>Loading...</div>;
  }

  // Debug logging
  console.log('OrganizationDashboard - User data:', {
    organizationSetupComplete: user.organizationSetupComplete,
    role: user.role,
    id: user.id
  });

  // Check if organization setup is complete
  // If not complete, redirect to setup page
  if (user.organizationSetupComplete === false) {
    console.log('Redirecting to organization setup...');
    return <Navigate to="/organization/setup" replace />;
  }

  const currentNavItem = navigationItems.find(item => item.id === activeItem);
  const CurrentComponent = currentNavItem?.component;

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
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

        <LogoutButton onClick={handleLogout}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
            />
          </svg>
          Sign Out
        </LogoutButton>
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
