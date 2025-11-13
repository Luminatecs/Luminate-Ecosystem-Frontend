import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  background: #f1f3f4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
`;

export const AuthCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 48px;
  width: 100%;
  max-width: 480px;
  position: relative;

  @media (max-width: 480px) {
    padding: 32px 24px;
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
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  color: #2d3748;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: left;
  letter-spacing: 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.15s ease;
  background: white;
  font-family: inherit;
  box-sizing: border-box;
  color: #202124;
  
  &:focus {
    outline: none;
    border-color: #1967d2;
    box-shadow: 0 0 0 1px #1967d2;
  }
  
  &::placeholder {
    color: #80868b;
    font-weight: 400;
  }
  
  &:hover:not(:focus) {
    border-color: #5f6368;
  }

  &:disabled {
    background: #f1f3f4;
    color: #80868b;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #a5491a 0%, #F4824B 50%);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
  letter-spacing: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    background: #1557b0;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
  }
`;

export const ErrorMessage = styled.div`
  color: #c5221f;
  background: #fce8e6;
  border-left: 4px solid #d93025;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 20px;
`;

export const SuccessMessage = styled.div`
  color: #137333;
  background: #e6f4ea;
  border-left: 4px solid #1e8e3e;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 20px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.15s ease;
  background: white;
  font-family: inherit;
  box-sizing: border-box;
  cursor: pointer;
  color: #202124;
  
  &:focus {
    outline: none;
    border-color: #1967d2;
    box-shadow: 0 0 0 1px #1967d2;
  }
  
  &:hover:not(:focus) {
    border-color: #5f6368;
  }

  &:disabled {
    background: #f1f3f4;
    color: #80868b;
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.15s ease;
  background: white;
  font-family: inherit;
  box-sizing: border-box;
  resize: vertical;
  min-height: 120px;
  color: #202124;
  
  &:focus {
    outline: none;
    border-color: #1967d2;
    box-shadow: 0 0 0 1px #1967d2;
  }
  
  &::placeholder {
    color: #80868b;
    font-weight: 400;
  }
  
  &:hover:not(:focus) {
    border-color: #5f6368;
  }

  &:disabled {
    background: #f1f3f4;
    color: #80868b;
    cursor: not-allowed;
  }
`;
