import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import Logger from '../../utils/logUtils';
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

const LoginContainer = styled.div`
  display: flex;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1000px;
  width: 100%;
  height: 600px;
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
`;

const LoginFormSection = styled.div`
  flex: 1.2;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WelcomeSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #2c5282 0%, #4299e1 100%);
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>') repeat;
    background-size: 50px 50px;
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const WelcomeText = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  width: 100%;
`;

const SignUpPrompt = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #4a5568;
`;

const SignUpLink = styled(Link)`
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: #2c5282;
  }
`;

const WelcomeButton = styled(Button)`
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: auto;
  padding: 0.875rem 2.5rem;
  z-index: 1;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    /* transform: translateY(-1px);
    cursor: pointer; */
  }
`;

interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
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
      Logger.info('LoginPage - Attempting login', { username: formData.username });
      
      const user = await login(formData.username, formData.password);
      if (user) {
        Logger.success('LoginPage - Login successful', user);
        
        // Navigate based on user role and setup status
        if (user.role === 'SUPER_ADMIN') {
          navigate('/super-admin-dashboard');
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
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  required
                />
              </FormGroup>
              
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form>
      
            {/* <SignUpPrompt>
              Don't have an account? <SignUpLink to="/register">Create one here</SignUpLink>
            </SignUpPrompt> */}
          </div>
        </LoginFormSection>
        
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
      </LoginContainer>
    </AuthContainer>
  );
};

export default LoginPage;
