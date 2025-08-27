import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #f0f4f8 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  padding: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, #2c5282 0%, transparent 100%);
    opacity: 0.05;
  }
`;

export const AuthCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  width: 100%;
  max-width: 480px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #4299e1 0%, #2c5282 100%);
    border-radius: 16px 16px 0 0;
  }
`;

export const AuthTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(90deg, #2c5282 0%, #4299e1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.5px;
`;

export const AuthSubtitle = styled.p`
  color: #4a5568;
  margin: 0 0 2rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  color: #2d3748;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: left;
  letter-spacing: 0.025em;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f8fafc;
  font-family: inherit;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
    background: white;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: #a0aec0;
    font-weight: 400;
  }
  
  &:hover:not(:focus) {
    border-color: #cbd5e0;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #2c5282 0%, #4299e1 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  letter-spacing: 0.025em;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(44, 82, 130, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.3);
  }
`;

export const ErrorMessage = styled.div`
  color: #e53e3e;
  background: linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%);
  border: 1px solid #fc8181;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '⚠️';
    font-size: 1rem;
  }
`;

export const SuccessMessage = styled.div`
  color: #2f855a;
  background: linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%);
  border: 1px solid #68d391;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '✅';
    font-size: 1rem;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f8fafc;
  font-family: inherit;
  box-sizing: border-box;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
    background: white;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
    transform: translateY(-1px);
  }
  
  &:hover:not(:focus) {
    border-color: #cbd5e0;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f8fafc;
  font-family: inherit;
  box-sizing: border-box;
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
    background: white;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: #a0aec0;
    font-weight: 400;
  }
  
  &:hover:not(:focus) {
    border-color: #cbd5e0;
  }
`;
