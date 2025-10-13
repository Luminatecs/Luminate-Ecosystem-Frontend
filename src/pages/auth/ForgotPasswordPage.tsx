/**
 * Forgot Password Page
 * Request password reset link
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      const response = await AuthService.forgotPassword(email);

      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.error || 'Failed to send reset link');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container>
        <Card>
          <SuccessIcon>✅</SuccessIcon>
          <SuccessTitle>Check Your Email</SuccessTitle>
          <SuccessText>
            We've sent a password reset link to <strong>{email}</strong>
          </SuccessText>
          <SuccessNote>
            The link will expire in 1 hour. If you don't see the email, check your spam folder.
          </SuccessNote>
          <ButtonGroup>
            <PrimaryButton onClick={() => navigate('/login')}>
              ← Back to Login
            </PrimaryButton>
            <SecondaryButton onClick={() => setSuccess(false)}>
              Resend Email
            </SecondaryButton>
          </ButtonGroup>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Header>
          <Icon>🔒</Icon>
          <Title>Forgot Password?</Title>
          <Subtitle>
            Enter your email address and we'll send you a link to reset your password
          </Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? '📧 Sending...' : '📧 Send Reset Link'}
          </SubmitButton>
        </Form>

        <Footer>
          <FooterLink onClick={() => navigate('/login')}>
            ← Back to Login
          </FooterLink>
          <FooterSeparator>•</FooterSeparator>
          <FooterLink onClick={() => navigate('/temp-login')}>
            Guardian Login
          </FooterLink>
        </Footer>
      </Card>

      <HelpSection>
        <HelpTitle>💡 Need Help?</HelpTitle>
        <HelpText>
          If you're a guardian logging in for the first time, use the{' '}
          <HelpLink onClick={() => navigate('/temp-login')}>
            Guardian Login
          </HelpLink>{' '}
          page with the temporary code sent to your email.
        </HelpText>
      </HelpSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Card = styled.div`
  width: 100%;
  max-width: 480px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 48px;

  @media (max-width: 640px) {
    padding: 32px 24px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Icon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  margin: 0 0 12px 0;
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #718096;
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }

  &:disabled {
    background: #f7fafc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: #fff5f5;
  border: 2px solid #f56565;
  border-radius: 8px;
  color: #c53030;
  font-size: 14px;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  padding: 14px;
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 100%);
  color: white;
  border: none;
  border-radius: 8px;
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
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 14px;
`;

const FooterLink = styled.button`
  background: none;
  border: none;
  color: #4299e1;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterSeparator = styled.span`
  color: #cbd5e0;
`;

const HelpSection = styled.div`
  margin-top: 24px;
  max-width: 480px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
`;

const HelpTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
`;

const HelpText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #4a5568;
  line-height: 1.6;
`;

const HelpLink = styled.button`
  background: none;
  border: none;
  color: #4299e1;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

// Success State Components
const SuccessIcon = styled.div`
  font-size: 64px;
  text-align: center;
  margin-bottom: 20px;
`;

const SuccessTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
  text-align: center;
`;

const SuccessText = styled.p`
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #4a5568;
  text-align: center;
  line-height: 1.6;

  strong {
    color: #2d3748;
    font-weight: 600;
  }
`;

const SuccessNote = styled.div`
  padding: 16px;
  background: #ebf8ff;
  border: 2px solid #4299e1;
  border-radius: 8px;
  color: #2c5282;
  font-size: 14px;
  text-align: center;
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  flex: 1;
  padding: 14px;
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
`;

const SecondaryButton = styled.button`
  flex: 1;
  padding: 14px;
  background: white;
  color: #4299e1;
  border: 2px solid #4299e1;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #ebf8ff;
  }
`;
