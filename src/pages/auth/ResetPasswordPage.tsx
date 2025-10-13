/**
 * Reset Password Page
 * Reset password using token from email link
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthService } from '../../services/auth';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  const validateToken = async () => {
    if (!token) {
      setError('No reset token provided');
      setValidating(false);
      return;
    }

    try {
      const response = await AuthService.validateResetToken(token);
      
      if (response.success) {
        setTokenValid(true);
      } else {
        setError(response.error || 'Invalid or expired reset token');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to validate reset token');
    } finally {
      setValidating(false);
    }
  };

  useEffect(() => {
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
    
    if (strength >= 3 && password.length >= 10) return 'strong';
    if (strength >= 2) return 'medium';
    return 'weak';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await AuthService.resetPassword(token!, newPassword);

      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.error || 'Failed to reset password');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = newPassword ? getPasswordStrength(newPassword) : null;

  // Token Validation State
  if (validating) {
    return (
      <Container>
        <Card>
          <LoadingIcon>⏳</LoadingIcon>
          <LoadingText>Validating reset token...</LoadingText>
        </Card>
      </Container>
    );
  }

  // Invalid Token State
  if (!tokenValid) {
    return (
      <Container>
        <Card>
          <ErrorIcon>❌</ErrorIcon>
          <ErrorTitle>Invalid Reset Link</ErrorTitle>
          <ErrorText>{error || 'This password reset link is invalid or has expired.'}</ErrorText>
          <ErrorNote>
            Password reset links expire after 1 hour. Please request a new one.
          </ErrorNote>
          <PrimaryButton onClick={() => navigate('/forgot-password')}>
            Request New Link
          </PrimaryButton>
        </Card>
      </Container>
    );
  }

  // Success State
  if (success) {
    return (
      <Container>
        <Card>
          <SuccessIcon>✅</SuccessIcon>
          <SuccessTitle>Password Reset Successful!</SuccessTitle>
          <SuccessText>
            Your password has been successfully reset. You can now log in with your new password.
          </SuccessText>
          <PrimaryButton onClick={() => navigate('/login')}>
            Continue to Login
          </PrimaryButton>
        </Card>
      </Container>
    );
  }

  // Reset Password Form
  return (
    <Container>
      <Card>
        <Header>
          <Icon>🔑</Icon>
          <Title>Reset Your Password</Title>
          <Subtitle>Enter your new password below</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
              autoFocus
            />
            {passwordStrength && (
              <PasswordStrength strength={passwordStrength}>
                <StrengthBar strength={passwordStrength} />
                <StrengthText>
                  Password strength: <strong>{passwordStrength}</strong>
                </StrengthText>
              </PasswordStrength>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </FormGroup>

          <PasswordRequirements>
            <RequirementsTitle>Password Requirements:</RequirementsTitle>
            <RequirementsList>
              <Requirement met={newPassword.length >= 8}>
                {newPassword.length >= 8 ? '✓' : '○'} At least 8 characters
              </Requirement>
              <Requirement met={/[A-Z]/.test(newPassword)}>
                {/[A-Z]/.test(newPassword) ? '✓' : '○'} One uppercase letter
              </Requirement>
              <Requirement met={/[a-z]/.test(newPassword)}>
                {/[a-z]/.test(newPassword) ? '✓' : '○'} One lowercase letter
              </Requirement>
              <Requirement met={/\d/.test(newPassword)}>
                {/\d/.test(newPassword) ? '✓' : '○'} One number
              </Requirement>
            </RequirementsList>
          </PasswordRequirements>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? '🔄 Resetting...' : '✓ Reset Password'}
          </SubmitButton>
        </Form>

        <Footer>
          <FooterLink onClick={() => navigate('/login')}>
            ← Back to Login
          </FooterLink>
        </Footer>
      </Card>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Card = styled.div`
  width: 100%;
  max-width: 500px;
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

const PasswordStrength = styled.div<{ strength: 'weak' | 'medium' | 'strong' }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StrengthBar = styled.div<{ strength: 'weak' | 'medium' | 'strong' }>`
  height: 4px;
  border-radius: 2px;
  background: ${props => {
    if (props.strength === 'strong') return '#48bb78';
    if (props.strength === 'medium') return '#ed8936';
    return '#f56565';
  }};
  width: ${props => {
    if (props.strength === 'strong') return '100%';
    if (props.strength === 'medium') return '66%';
    return '33%';
  }};
  transition: all 0.3s;
`;

const StrengthText = styled.div`
  font-size: 12px;
  color: #718096;

  strong {
    text-transform: capitalize;
    font-weight: 600;
  }
`;

const PasswordRequirements = styled.div`
  padding: 16px;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
`;

const RequirementsTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
`;

const RequirementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Requirement = styled.div<{ met: boolean }>`
  font-size: 13px;
  color: ${props => props.met ? '#48bb78' : '#718096'};
  font-weight: ${props => props.met ? '600' : '400'};
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
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
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
  text-align: center;
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

const LoadingIcon = styled.div`
  font-size: 64px;
  text-align: center;
  margin-bottom: 20px;
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #718096;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 64px;
  text-align: center;
  margin-bottom: 20px;
`;

const ErrorTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 24px;
  font-weight: 700;
  color: #c53030;
  text-align: center;
`;

const ErrorText = styled.p`
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #742a2a;
  text-align: center;
`;

const ErrorNote = styled.div`
  padding: 16px;
  background: #fff5f5;
  border: 2px solid #f56565;
  border-radius: 8px;
  color: #c53030;
  font-size: 14px;
  text-align: center;
  margin-bottom: 24px;
`;

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
  margin: 0 0 24px 0;
  font-size: 16px;
  color: #4a5568;
  text-align: center;
  line-height: 1.6;
`;

const PrimaryButton = styled.button`
  width: 100%;
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
