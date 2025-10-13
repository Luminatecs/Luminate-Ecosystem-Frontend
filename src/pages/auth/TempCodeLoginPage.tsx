/**
 * Temporary Code Login Page
 * For guardians logging in for the first time with temp credentials
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthService from '../../services/auth/AuthService';
import { ChangePasswordModal } from '../../components/auth/ChangePasswordModal';

export const TempCodeLoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [tempCode, setTempCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentTempCode, setCurrentTempCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!tempCode.trim() || !password.trim()) {
      setError('Please enter both temporary code and password');
      return;
    }

    try {
      setLoading(true);
      const response = await AuthService.loginWithTempCode(tempCode, password);

      if (response.success && response.data) {
        // Check if password change is required
        if (response.data.requiresPasswordChange) {
          setCurrentTempCode(response.data.tempCode);
          setShowPasswordModal(true);
        } else {
          // Normal login (shouldn't happen but handle it)
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  const handlePasswordChanged = () => {
    // Close modal and redirect to regular login
    setShowPasswordModal(false);
    navigate('/login', {
      state: { message: 'Password changed successfully! Please login with your new credentials.' }
    });
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <PageContainer>
      <LoginCard>
        <Header>
          <Logo>🎓</Logo>
          <Title>Guardian Portal</Title>
          <Subtitle>First-Time Login</Subtitle>
        </Header>

        <InfoSection>
          <InfoBox>
            <InfoIcon>📧</InfoIcon>
            <InfoContent>
              <InfoTitle>Check Your Email</InfoTitle>
              <InfoText>
                You should have received an email with your temporary login code and password.
                Use these credentials to log in for the first time.
              </InfoText>
            </InfoContent>
          </InfoBox>
        </InfoSection>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Temporary Code *</Label>
            <Input
              type="text"
              value={tempCode}
              onChange={(e) => setTempCode(e.target.value)}
              placeholder="lumtempcode-xxxxx-xxxxx-xxxxx"
              disabled={loading}
              autoFocus
            />
            <HelpText>Format: lumtempcode-xxxxx-xxxxx-xxxxx</HelpText>
          </FormGroup>

          <FormGroup>
            <Label>Temporary Password *</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your temporary password"
              disabled={loading}
            />
            <HelpText>This is the password from your email</HelpText>
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Continue'}
          </SubmitButton>
        </Form>

        <Footer>
          <BackButton type="button" onClick={handleBackToLogin}>
            ← Back to Regular Login
          </BackButton>
          
          <HelpSection>
            <HelpTitle>Need Help?</HelpTitle>
            <HelpList>
              <HelpItem>• Check your email (including spam folder)</HelpItem>
              <HelpItem>• Contact your organization administrator</HelpItem>
              <HelpItem>• Temporary codes expire after 5 days</HelpItem>
            </HelpList>
          </HelpSection>
        </Footer>
      </LoginCard>

      {showPasswordModal && (
        <ChangePasswordModal
          tempCode={currentTempCode}
          onPasswordChanged={handlePasswordChanged}
        />
      )}
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  max-width: 500px;
  width: 100%;
`;

const Header = styled.div`
  padding: 40px 40px 30px;
  text-align: center;
  border-bottom: 2px solid #e2e8f0;
`;

const Logo = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 16px;
  color: #718096;
`;

const InfoSection = styled.div`
  padding: 30px 40px;
  background: #f7fafc;
  border-bottom: 2px solid #e2e8f0;
`;

const InfoBox = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px;
  background: white;
  border: 2px solid #4299e1;
  border-radius: 12px;
`;

const InfoIcon = styled.div`
  font-size: 32px;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #4a5568;
  line-height: 1.6;
`;

const Form = styled.form`
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
`;

const Input = styled.input`
  padding: 14px 16px;
  font-size: 15px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.2s;
  font-family: monospace;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }

  &:disabled {
    background: #f7fafc;
    cursor: not-allowed;
  }
`;

const HelpText = styled.span`
  font-size: 12px;
  color: #718096;
`;

const ErrorMessage = styled.div`
  padding: 14px 16px;
  background: #fff5f5;
  border: 2px solid #f56565;
  border-radius: 10px;
  color: #c53030;
  font-size: 14px;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  padding: 16px 24px;
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Footer = styled.div`
  padding: 30px 40px;
  border-top: 2px solid #e2e8f0;
  background: #f7fafc;
  border-radius: 0 0 14px 14px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #4299e1;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 20px;
  transition: color 0.2s;

  &:hover {
    color: #2c5282;
    text-decoration: underline;
  }
`;

const HelpSection = styled.div`
  margin-top: 20px;
`;

const HelpTitle = styled.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
`;

const HelpList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const HelpItem = styled.li`
  font-size: 13px;
  color: #718096;
  margin-bottom: 6px;
`;
