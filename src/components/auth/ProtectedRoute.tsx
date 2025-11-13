import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import { UserRole } from '../../models';
import styled from 'styled-components';

/**
 * Styled Components
 */
const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

/**
 * Protected Route Props Interface
 */
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: UserRole[];
  allowedRoles?: UserRole[];
  redirectTo?: string;
  requireEmailVerification?: boolean;
}

/**
 * Protected Route Component
 * SECURITY: Enforces authentication and role-based access control
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
  allowedRoles,
  redirectTo = '/',
  requireEmailVerification = false,
}) => {
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    hasAnyRole
  } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <LoadingContainer>
        <div>
          <LoadingSpinner />
          {/* <LoadingText>Verifying authentication...</LoadingText> */}
        </div>
      </LoadingContainer>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ 
          from: location.pathname,
          message: 'Please sign in to access this page.' 
        }} 
        replace 
      />
    );
  }

  // Check email verification requirement
  if (requireEmailVerification && !user.emailVerified) {
    return (
      <Navigate 
        to="/verify-email" 
        state={{ 
          from: location.pathname,
          message: 'Please verify your email address to continue.',
          email: user.email
        }} 
        replace 
      />
    );
  }

  // Check if user account is active
  if (!user.isActive) {
    return (
      <Navigate 
        to="/account-disabled" 
        state={{ 
          message: 'Your account has been disabled. Please contact support.' 
        }} 
        replace 
      />
    );
  }

  // Check required roles (user must have ANY of the specified roles)
  if (requiredRoles && requiredRoles.length > 0) {
    const hasAnyRequiredRole = hasAnyRole(requiredRoles);
    if (!hasAnyRequiredRole) {
      return (
        <Navigate 
          to="/unauthorized" 
          state={{ 
            message: 'You do not have permission to access this page.',
            requiredRoles
          }} 
          replace 
        />
      );
    }
  }

  // Check allowed roles (user must have ANY of the specified roles)
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = hasAnyRole(allowedRoles);
    if (!hasAllowedRole) {
      return (
        <Navigate 
          to="/unauthorized" 
          state={{ 
            message: 'You do not have permission to access this page.',
            allowedRoles
          }} 
          replace 
        />
      );
    }
  }
  

  // User is authenticated and authorized
  return <>{children}</>;
};

export default ProtectedRoute;
