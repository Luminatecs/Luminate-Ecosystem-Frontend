import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/auth/AuthService';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 48px;
  max-width: 480px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #202124;
  margin: 0 0 8px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #5f6368;
  margin: 0;
  line-height: 20px;
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
  font-weight: 500;
  color: #202124;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${props => props.hasError ? '#d93025' : '#dadce0'};
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  color: #202124;

  &:hover {
    border-color: ${props => props.hasError ? '#d93025' : '#80868b'};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#d93025' : '#1967d2'};
    border-width: 2px;
    padding: 11px 15px;
  }

  &::placeholder {
    color: #80868b;
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #d93025;
  margin-top: 4px;
`;

const InfoBox = styled.div`
  background: #e8f0fe;
  border-left: 4px solid #1967d2;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 13px;
  color: #185abc;
  line-height: 18px;
  margin-bottom: 8px;
`;

const ErrorAlert = styled.div`
  padding: 12px 16px;
  background: #fce8e6;
  border-left: 4px solid #d93025;
  border-radius: 4px;
  color: #c5221f;
  font-size: 14px;
  margin-bottom: 16px;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background: #1967d2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  letter-spacing: 0.25px;
  margin-top: 8px;

  &:hover:not(:disabled) {
    background: #1557b0;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  }

  &:active:not(:disabled) {
    background: #1557b0;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15);
  }

  &:disabled {
    background: #dadce0;
    color: #80868b;
    cursor: not-allowed;
  }
`;

const HelpText = styled.div`
  text-align: center;
  font-size: 13px;
  color: #5f6368;
  margin-top: 24px;
  line-height: 18px;
`;

const CodeFormat = styled.code`
  background: #f1f3f4;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #1967d2;
`;

/**
 * Temporary Login Page for Organization Wards
 * Students use temp code and password sent to their guardian's email
 * URL format: /temp-login/{tempCode} - tempCode is optional and pre-fills the form
 */
const TempLogin: React.FC = () => {
  const navigate = useNavigate();
  const { tempCode: urlTempCode } = useParams<{ tempCode?: string }>();
  
  const [formData, setFormData] = useState({
    tempCode: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ tempCode?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill temp code from URL if provided
  useEffect(() => {
    if (urlTempCode) {
      setFormData(prev => ({ ...prev, tempCode: urlTempCode }));
    }
  }, [urlTempCode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    setErrorMessage('');
  };

  const validateForm = (): boolean => {
    const newErrors: { tempCode?: string; password?: string } = {};

    if (!formData.tempCode.trim()) {
      newErrors.tempCode = 'Temporary code is required';
    } else if (!formData.tempCode.startsWith('lumtempcode-')) {
      newErrors.tempCode = 'Invalid code format. Must start with lumtempcode-';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Temporary password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await AuthService.loginWithTempCode(
        formData.tempCode.trim(),
        formData.password
      );

      if (response.success) {
        // Navigate to login page with flag to show password change modal
        navigate('/', { 
          state: { 
            tempCode: formData.tempCode,
            isFirstLogin: true 
          } 
        });
      } else {
        setErrorMessage(response.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed. Please check your credentials.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <LoginCard>
        <Header>
          <Title>Welcome to Luminate</Title>
          <Subtitle>Enter your temporary login credentials</Subtitle>
        </Header>

        <InfoBox>
          🔑 These credentials were sent to your guardian's email. 
          After logging in, you'll create your permanent username and password.
        </InfoBox>

        {errorMessage && (
          <ErrorAlert>
            <strong>Login Failed:</strong> {errorMessage}
          </ErrorAlert>
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="tempCode">
              Temporary Code
            </Label>
            <Input
              type="text"
              id="tempCode"
              name="tempCode"
              value={formData.tempCode}
              onChange={handleInputChange}
              hasError={!!errors.tempCode}
              placeholder="lumtempcode-12345678"
              disabled={isSubmitting}
              autoComplete="off"
            />
            {errors.tempCode && <ErrorMessage>{errors.tempCode}</ErrorMessage>}
            {!errors.tempCode && (
              <span style={{ fontSize: '12px', color: '#5f6368', marginTop: '4px' }}>
                Format: <CodeFormat>lumtempcode-XXXXXXXX</CodeFormat>
              </span>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">
              Temporary Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              hasError={!!errors.password}
              placeholder="Enter temporary password"
              disabled={isSubmitting}
              autoComplete="current-password"
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </SubmitButton>
        </Form>

        <HelpText>
          Your temporary credentials expire in 5 days.<br />
          If you're having trouble, please contact your organization administrator.
        </HelpText>
      </LoginCard>
    </PageContainer>
  );
};

export default TempLogin;
