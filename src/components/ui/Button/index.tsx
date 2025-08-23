import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

/**
 * Button States
 */
export enum ButtonState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

/**
 * Button Variants
 */
export enum ButtonVariant {
  SOLID = 'solid',
  OUTLINE = 'outline',
  GHOST = 'ghost'
}

/**
 * Button Props Interface
 */
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  variant?: ButtonVariant;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  state?: ButtonState;
  successText?: string;
  errorText?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  autoHandleAsync?: boolean; // Automatically handle async onClick states
}

/**
 * Spinner Animation
 */
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

/**
 * Success/Error Message Animation
 */
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

/**
 * Button Container
 */
const ButtonContainer = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

/**
 * Main Button Component
 */
const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $backgroundColor?: string;
  $textColor?: string;
  $borderColor?: string;
  $state: ButtonState;
  $size: 'small' | 'medium' | 'large';
  $fullWidth?: boolean;
}>`
  /* Base Styles */
  position: relative;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  outline: none;
  text-decoration: none;
  user-select: none;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  /* Size Variants */
  ${props => props.$size === 'small' && css`
    padding: 8px 16px;
    font-size: 0.875rem;
    min-height: 36px;
  `}
  
  ${props => props.$size === 'medium' && css`
    padding: 12px 24px;
    font-size: 1rem;
    min-height: 44px;
  `}
  
  ${props => props.$size === 'large' && css`
    padding: 16px 32px;
    font-size: 1.125rem;
    min-height: 52px;
  `}

  /* Variant Styles */
  ${props => props.$variant === ButtonVariant.SOLID && css`
    background: ${props.$backgroundColor || '#667eea'};
    color: ${props.$textColor || 'white'};
    border: 2px solid ${props.$borderColor || props.$backgroundColor || '#667eea'};
    
    &:hover:not(:disabled) {
      background: ${props.$backgroundColor ? `${props.$backgroundColor}dd` : '#5a67d8'};
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `}
  
  ${props => props.$variant === ButtonVariant.OUTLINE && css`
    background: transparent;
    color: ${props.$textColor || props.$backgroundColor || '#667eea'};
    border: 2px solid ${props.$borderColor || props.$backgroundColor || '#667eea'};
    
    &:hover:not(:disabled) {
      background: ${props.$backgroundColor || '#667eea'};
      color: ${props.$textColor || 'white'};
      transform: translateY(-1px);
    }
  `}
  
  ${props => props.$variant === ButtonVariant.GHOST && css`
    background: transparent;
    color: ${props.$textColor || props.$backgroundColor || '#667eea'};
    border: 2px solid transparent;
    
    &:hover:not(:disabled) {
      background: ${props.$backgroundColor ? `${props.$backgroundColor}20` : 'rgba(102, 126, 234, 0.1)'};
      transform: translateY(-1px);
    }
  `}

  /* State-based Styles */
  ${props => props.$state === ButtonState.LOADING && css`
    cursor: not-allowed;
    opacity: 0.8;
  `}
  
  ${props => props.$state === ButtonState.SUCCESS && css`
    background: #10b981 !important;
    border-color: #10b981 !important;
    color: white !important;
    cursor: default;
  `}
  
  ${props => props.$state === ButtonState.ERROR && css`
    background: #ef4444 !important;
    border-color: #ef4444 !important;
    color: white !important;
    cursor: default;
  `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none !important;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
  }
`;

/**
 * Button Content (text that can be hidden during loading)
 */
const ButtonContent = styled.span<{ $visible: boolean }>`
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.2s ease;
`;

/**
 * Spinner Component
 */
const Spinner = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

/**
 * Status Message (Success/Error text below button)
 */
const StatusMessage = styled.div<{ $type: 'success' | 'error' }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  animation: ${fadeInUp} 0.3s ease;
  
  ${props => props.$type === 'success' && css`
    background: #d1fae5;
    color: #065f46;
    border: 1px solid #10b981;
  `}
  
  ${props => props.$type === 'error' && css`
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #ef4444;
  `}
`;

/**
 * Custom Button Component
 * 
 * Features:
 * - Multiple variants (solid, outline, ghost)
 * - Customizable colors
 * - Async loading state with spinner
 * - Success/error states with messages
 * - Auto-hide status messages after 3 seconds
 * - Size variants
 * - Full width option
 * - Automatic async handling
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = ButtonVariant.SOLID,
  backgroundColor,
  textColor,
  borderColor,
  state: externalState,
  successText = 'Success!',
  errorText = 'Error occurred',
  disabled = false,
  type = 'button',
  className,
  size = 'medium',
  fullWidth = false,
  autoHandleAsync = true,
  ...props
}) => {
  const [internalState, setInternalState] = useState<ButtonState>(ButtonState.IDLE);
  const [showStatusMessage, setShowStatusMessage] = useState(false);

  // Use external state if provided, otherwise use internal state
  const currentState = externalState || internalState;

  /**
   * Handle button click with optional async support
   */
  const handleClick = async () => {
    if (disabled || currentState === ButtonState.LOADING) return;

    try {
      if (autoHandleAsync && !externalState) {
        setInternalState(ButtonState.LOADING);
      }

      if (onClick) {
        const result = onClick();
        
        // If onClick returns a Promise, wait for it
        if (result instanceof Promise) {
          await result;
        }
      }

      // If using internal state management, show success
      if (autoHandleAsync && !externalState) {
        setInternalState(ButtonState.SUCCESS);
        setShowStatusMessage(true);
        
        // Reset to idle after 3 seconds
        setTimeout(() => {
          setInternalState(ButtonState.IDLE);
          setShowStatusMessage(false);
        }, 3000);
      }

    } catch (error) {
      // If using internal state management, show error
      if (autoHandleAsync && !externalState) {
        setInternalState(ButtonState.ERROR);
        setShowStatusMessage(true);
        
        // Reset to idle after 3 seconds
        setTimeout(() => {
          setInternalState(ButtonState.IDLE);
          setShowStatusMessage(false);
        }, 3000);
      }
      
      console.error('Button onClick error:', error);
    }
  };

  /**
   * Auto-hide status message after 3 seconds when external state changes
   */
  useEffect(() => {
    if (externalState === ButtonState.SUCCESS || externalState === ButtonState.ERROR) {
      setShowStatusMessage(true);
      const timer = setTimeout(() => {
        setShowStatusMessage(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [externalState]);

  return (
    <ButtonContainer $fullWidth={fullWidth}>
      <StyledButton
        type={type}
        onClick={handleClick}
        disabled={disabled || currentState === ButtonState.LOADING}
        $variant={variant}
        $backgroundColor={backgroundColor}
        $textColor={textColor}
        $borderColor={borderColor}
        $state={currentState}
        $size={size}
        $fullWidth={fullWidth}
        className={className}
        {...props}
      >
        <ButtonContent $visible={currentState !== ButtonState.LOADING}>
          {children}
        </ButtonContent>
        
        {currentState === ButtonState.LOADING && <Spinner />}
      </StyledButton>

      {/* Status Messages */}
      {showStatusMessage && currentState === ButtonState.SUCCESS && (
        <StatusMessage $type="success">{successText}</StatusMessage>
      )}
      
      {showStatusMessage && currentState === ButtonState.ERROR && (
        <StatusMessage $type="error">{errorText}</StatusMessage>
      )}
    </ButtonContainer>
  );
};

export default Button;
