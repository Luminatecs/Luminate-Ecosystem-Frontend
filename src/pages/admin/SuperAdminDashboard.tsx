import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  AuthContainer,
  AuthTitle,
  AuthSubtitle
} from '../../components/auth/AuthStyles';

/**
 * Super Admin Dashboard Selection Container
 */
const DashboardContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 100%;
  max-width: 800px;
  position: relative;
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
`;

/**
 * Options Grid
 */
const OptionsGrid = styled.div`
  display: grid;
  gap: 2rem;
  margin: 2.5rem 0;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/**
 * Option Card
 */
const OptionCard = styled.button`
  display: block;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(66, 153, 225, 0.1);
  border-radius: 16px;
  padding: 2.5rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-align: center;
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
    background: linear-gradient(135deg, rgba(66, 153, 225, 0.05) 0%, rgba(44, 82, 130, 0.02) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 12px 30px rgba(66, 153, 225, 0.15),
      0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: rgba(66, 153, 225, 0.3);

    &::before {
      opacity: 1;
    }

    .icon {
      transform: scale(1.1);
    }
  }

  &:active {
    transform: translateY(-2px);
  }
`;

/**
 * Option Icon
 */
const OptionIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.2);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
`;

/**
 * Option Title
 */
const OptionTitle = styled.h3`
  color: #2d3748;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  letter-spacing: -0.2px;
`;

/**
 * Option Description
 */
const OptionDescription = styled.p`
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  position: relative;
  z-index: 1;
`;

/**
 * Header Section
 */
const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

/**
 * Super Admin Dashboard Selection Component
 */
const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <AuthContainer>
      <DashboardContainer>
        <HeaderSection>
          <AuthTitle>Welcome, Super Admin</AuthTitle>
          <AuthSubtitle>
            Choose your destination to manage the Luminate Ecosystem
          </AuthSubtitle>
        </HeaderSection>

        <OptionsGrid>
          <OptionCard onClick={() => handleNavigation('/ecosystem')}>
            <OptionIcon className="icon">🌐</OptionIcon>
            <OptionTitle>Ecosystem Hub</OptionTitle>
            <OptionDescription>
              Access the main ecosystem interface with all modules and resources available to users
            </OptionDescription>
          </OptionCard>

          <OptionCard onClick={() => handleNavigation('/organization-dashboard')}>
            <OptionIcon className="icon">🏢</OptionIcon>
            <OptionTitle>Organization Dashboard</OptionTitle>
            <OptionDescription>
              Manage organizations, monitor system-wide analytics, and oversee administrative functions
            </OptionDescription>
          </OptionCard>
        </OptionsGrid>
      </DashboardContainer>
    </AuthContainer>
  );
};

export default SuperAdminDashboard;
