import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import Logger from '../../utils/logUtils';
import AuthService from '../../services/auth/AuthService';
import { storeToken, storeRefreshToken, storeTokenExpiration } from '../../utils/tokenUtils';
import { secureStorage } from '../../lib/secure-storage';
import {
  AuthContainer,
  AuthTitle,
  AuthSubtitle,
  FormGroup,
  Label,
  Input,
  Button,
  ErrorMessage
} from '../../components/auth/AuthStyles';
import ecosystemBackground from '../../assets/images/ecosystembackgroundpng.png';
import { LoginDto } from '../../models';

const LoginContainer = styled.div`
  display: flex;
  background: #44bbcb;
  /* border-radius: 16px; */
  /* box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); */
  overflow: hidden;
  /* max-width: 1000px; */
  width: 100%;
  height: 100vh;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #4299e1 0%, #2c5282 100%);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
`;

const LoginFormSection = styled.div`
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    order: 2;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const WelcomeSection = styled.div`
  flex: 2.4;
  background: #F3FEFF url(${ecosystemBackground}) no-repeat center center;
  background-size: 95% 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: white;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(243, 254, 255, 0.1);
  }

  @media (max-width: 768px) {
    flex: none;
    min-height: 300px;
    padding: 2rem 1.5rem;
    order: 1;
    background-size: 80% 80%;
  }

  @media (max-width: 480px) {
    min-height: 250px;
    padding: 1.5rem 1rem;
    background-size: 90% 90%;
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  color: #47C2D2;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }
`;

const WelcomeText = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
  color: #47C2D2;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const PasswordInput = styled(Input)`
  padding-right: 3rem;
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;


const EyeButton = styled.button`
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
  transition: color 0.2s;

  &:hover {
    color: #4a5568;
  }

  &:focus {
    outline: none;
  }

  svg {
    display: block;
  }
`;

const ForgotPasswordLink = styled(Link)`
  display: inline-block;
  margin-top: 8px;
  font-size: 14px;
  color: #4299e1;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #2c5282;
    text-decoration: underline;
  }
`;

const WelcomeButton = styled(Button)`
  background: transparent;
  border: 2px solid #47C2D2;
  color: #1d7f8b;
  width: auto;
  padding: 0.875rem 2.5rem;
  z-index: 1;
  
  &:hover {
    background: #47C2D2;
    color: white;
    border-color: #47C2D2;
    /* transform: translateY(-1px);
    cursor: pointer; */
  }

  @media (max-width: 768px) {
    padding: 0.75rem 2rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 0.65rem 1.75rem;
    font-size: 0.9rem;
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginDto>({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Check if username is a temporary code (starts with 'lumtempcode-')
      const isTempCode = formData.username.startsWith('lumtempcode-');
      
      // Clear any existing temp login flags to prevent modal from showing for regular logins
      if (!isTempCode) {
        sessionStorage.removeItem('needsPasswordChange');
        sessionStorage.removeItem('tempLoginUser');
        sessionStorage.removeItem('tempCode');
      }
      
      if (isTempCode) {
        // Handle temporary code login
        Logger.info('LoginPage - Attempting temp code login');
        
        const response = await AuthService.loginWithTempCode(formData.username, formData.password);
        
        if (response.success && response.data) {
          Logger.success('LoginPage - Temp code login successful');
          
          // Store authentication tokens using tokenUtils (same as regular login)
          if (response.data.accessToken) {
            await storeToken(response.data.accessToken);
          }
          if (response.data.refreshToken) {
            await storeRefreshToken(response.data.refreshToken);
          }
          if (response.data.expiresIn) {
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (response.data.expiresIn * 1000));
            await storeTokenExpiration(expirationDate.toISOString());
          }
          
          // Store user data in encrypted secure storage (required for AuthContext initialization)
          await secureStorage.setItem('auth_user_data', response.data.user);
          await secureStorage.setItem('auth_is_authenticated', true);
          
          // Store organization if provided
          if (response.data.organization) {
            await secureStorage.setItem('auth_organization_data', response.data.organization);
          }
          
          // Store temp login flags and temp code in sessionStorage for password change modal
          sessionStorage.setItem('needsPasswordChange', 'true');
          sessionStorage.setItem('tempLoginUser', JSON.stringify(response.data.user));
          sessionStorage.setItem('tempCode', formData.username); // Store the actual temp code
          
          Logger.info('LoginPage - Temp login complete, redirecting to ecosystem');
          
          // Show success state for 800ms before navigating
          setLoginSuccess(true);
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Full page reload to /ecosystem - AuthContext will initialize from secure storage
          // and the password change modal will appear due to sessionStorage flags
          window.location.href = '/ecosystem';
        } else {
          throw new Error(response.error || 'Invalid temporary code or password');
        }
      } else {
        // Regular username/password login
        Logger.info('LoginPage - Attempting regular login', { username: formData.username });
        
        const user = await login(formData.username, formData.password);
        if (user) {
          Logger.success('LoginPage - Login successful', user);
          
          // Show success state for 800ms before navigating
          setLoginSuccess(true);
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Navigate based on user role and setup status
          if (user.role === 'SUPER_ADMIN') {
            navigate('/super-admin-dashboard');
          } else if (user.role === 'ACCESS_ADMIN') {
            // ACCESS_ADMIN goes directly to settings page (resources management only)
            navigate('/admin/settings');
          } else if (user.role === 'ORG_ADMIN') {
            if (user.organizationSetupComplete) {
              navigate('/organization-dashboard');
            } else {
              navigate('/organization/setup');
            }
          } else {
            navigate('/ecosystem');
          }
        } else {
          throw new Error('Login failed');
        }
      }
    } catch (error: any) {
      Logger.error('LoginPage - Login failed', error);
      setError(error.message || 'Invalid username or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthContainer>
      <LoginContainer>
        <WelcomeSection>
          <WelcomeTitle>Luminate Ecosystem</WelcomeTitle>
          <WelcomeText>
            Empowering education through innovative technology solutions.
            Join thousands of educators and students in transforming learning experiences.
          </WelcomeText>
          <WelcomeButton onClick={() => navigate('/register')}>
            Create Account
          </WelcomeButton>
        </WelcomeSection>
        
        <LoginFormSection>
          <div>
            <AuthTitle>Welcome Back</AuthTitle>
            <AuthSubtitle>Sign in to your Luminate Ecosystem account</AuthSubtitle>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter your username"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <PasswordInputWrapper>
                  <PasswordInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter your password"
                    required
                  />
                  <EyeButton 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </EyeButton>
                </PasswordInputWrapper>
                <ForgotPasswordLink to="/forgot-password">
                  Forgot Password?
                </ForgotPasswordLink>
              </FormGroup>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                style={{
                  background: loginSuccess 
                    ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' 
                    : undefined
                }}
              >
                {isSubmitting && !loginSuccess && (
                  <>
                    <Spinner />
                    <span>Signing in...</span>
                  </>
                )}
                {loginSuccess && (
                  <>
                    <CheckIcon />
                    <span>Success!</span>
                  </>
                )}
                {!isSubmitting && !loginSuccess && 'Sign In'}
              </Button>
            </Form>
      
            {/* <SignUpPrompt>
              Don't have an account? <SignUpLink to="/register">Create one here</SignUpLink>
            </SignUpPrompt> */}
          </div>
        </LoginFormSection>
      </LoginContainer>
    </AuthContainer>
  );
};

export default LoginPage;
