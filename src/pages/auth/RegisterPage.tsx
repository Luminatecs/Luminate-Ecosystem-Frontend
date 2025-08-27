import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  AuthContainer,
  AuthTitle,
  AuthSubtitle
} from '../../components/auth/AuthStyles';

/**
 * Register Page Container
 */
const RegisterContainer = styled.div`
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
  gap: 1.5rem;
  margin: 2.5rem 0;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const OptionCard = styled(Link)`
  display: block;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(66, 153, 225, 0.1);
  border-radius: 16px;
  padding: 2rem;
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
  }

  &:active {
    transform: translateY(-2px);
  }
`;

const OptionIcon = styled.div`
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.25rem;
`;

const OptionTitle = styled.h3`
  color: #2d3748;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.375rem;
`;

const OptionDescription = styled.p`
  color: #718096;
  font-size: 0.75rem;
  line-height: 1.4;
  margin-bottom: 0.75rem;
`;

const OptionFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const OptionFeature = styled.li`
  color: #4a5568;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  position: relative;
  padding-left: 1rem;

  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #48bb78;
    font-weight: bold;
  }
`;

const TokenSection = styled.div`
  background: #edf2f7;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const TokenTitle = styled.h3`
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TokenDescription = styled.p`
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const TokenButton = styled(Link)`
  display: inline-block;
  background: #48bb78;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.8rem;
  transition: all 0.2s ease;

  &:hover {
    background: #059669;
    transform: translateY(-1px);
  }
`;

const BackToLogin = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
`;

const BackLink = styled(Link)`
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

/**
 * Registration Selection Page Component
 * SECURITY: Provides role-based registration paths
 */
const RegisterPage: React.FC = () => {
  return (
    <AuthContainer>
      <RegisterContainer>
        <AuthTitle>Join Our Platform</AuthTitle>
        <AuthSubtitle>
          Choose how you'd like to get started with your career guidance journey
        </AuthSubtitle>

        <OptionsGrid>
          <OptionCard to="/register/individual">
            <OptionIcon>👤</OptionIcon>
            <OptionTitle>Individual Student</OptionTitle>
            <OptionDescription>
              Perfect for students seeking personal career guidance and development
            </OptionDescription>
            <OptionFeatures>
              <OptionFeature>Personal career assessments</OptionFeature>
              <OptionFeature>Individual progress tracking</OptionFeature>
              <OptionFeature>Direct access to resources</OptionFeature>
              <OptionFeature>Personalized recommendations</OptionFeature>
            </OptionFeatures>
          </OptionCard>

          <OptionCard to="/register/organization">
            <OptionIcon>🏫</OptionIcon>
            <OptionTitle>Educational Institution</OptionTitle>
            <OptionDescription>
              For schools and institutions managing multiple students
            </OptionDescription>
            <OptionFeatures>
              <OptionFeature>Student management dashboard</OptionFeature>
              <OptionFeature>Bulk student registration</OptionFeature>
              <OptionFeature>Progress monitoring tools</OptionFeature>
              <OptionFeature>Institutional analytics</OptionFeature>
            </OptionFeatures>
          </OptionCard>
        </OptionsGrid>

        <TokenSection>
          <TokenTitle>Have a Registration Token?</TokenTitle>
          <TokenDescription>
            If your school or institution provided you with a registration token, 
            use it to join under their organization
          </TokenDescription>
          <TokenButton to="/register/token">
            Register with Token
          </TokenButton>
        </TokenSection>

        <BackToLogin>
          <BackLink to="/">
            ← Back to Sign In
          </BackLink>
        </BackToLogin>
      </RegisterContainer>
    </AuthContainer>
  );
};

export default RegisterPage;
