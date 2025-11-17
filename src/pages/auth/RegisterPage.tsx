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
  background: white;
  backdrop-filter: blur(20px);
  width: 100%;
  max-width: 900px;
  padding: 48px;
  position: relative;

  @media (max-width: 768px) {
    padding: 32px 24px;
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;

/**
 * Options Grid
 */
const OptionsGrid = styled.div`
  display: grid;
  gap: 24px;
  margin: 32px 0;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const OptionCard = styled(Link)`
  display: block;
  background: white;
  border: 1px solid #e8eaed;
  border-radius: 8px;
  padding: 32px;
  text-decoration: none;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
    border-color: #1967d2;
  }

  &:active {
    transform: translateY(0);
  }
`;

const OptionIcon = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #1967d2 0%, #1557b0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 24px;
`;

const OptionTitle = styled.h3`
  color: #202124;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
  letter-spacing: 0;
`;

const OptionDescription = styled.p`
  color: #5f6368;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 16px;
`;

const OptionFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const OptionFeature = styled.li`
  color: #5f6368;
  font-size: 14px;
  margin-bottom: 8px;
  position: relative;
  padding-left: 20px;

  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #1e8e3e;
    font-weight: 500;
  }
`;

const TokenSection = styled.div`
  background: #f1f3f4;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  margin-top: 24px;
`;

const TokenTitle = styled.h3`
  color: #202124;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
  letter-spacing: 0;
`;

const TokenDescription = styled.p`
  color: #5f6368;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 16px;
`;

const TokenButton = styled(Link)`
  display: inline-block;
  background: #1e8e3e;
  color: white;
  padding: 10px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.15s ease;

  &:hover {
    background: #137333;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  }
`;

const BackToLogin = styled.div`
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid #e8eaed;
  margin-top: 32px;
`;

const BackLink = styled(Link)`
  color: #1967d2;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LegalFooter = styled.div`
  text-align: center;
  padding-top: 16px;
  margin-top: 16px;
`;

const LegalLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const LegalLink = styled(Link)`
  color: #5f6368;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
    color: #1967d2;
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

        <BackToLogin>
          <BackLink to="/">
            ← Back to Sign In
          </BackLink>
          <LegalFooter>
            <LegalLinks>
              <LegalLink to="/terms">Terms of Service</LegalLink>
              <LegalLink to="/privacy">Privacy Policy</LegalLink>
            </LegalLinks>
          </LegalFooter>
        </BackToLogin>
      </RegisterContainer>
    </AuthContainer>
  );
};

export default RegisterPage;
