import React from 'react';
import { useAuth } from '../../contexts/auth';
import { UserRole } from '../../models';
import styled from 'styled-components';

const DebugContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-size: 12px;
  font-family: monospace;
  z-index: 9999;
  max-width: 250px;
`;

const DebugTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #4ade80;
`;

const DebugItem = styled.div`
  margin: 0.25rem 0;
`;

const UserRoleDebug: React.FC = () => {
  const { user, isAuthenticated, hasRole, hasAnyRole, isSuperAdmin, isOrgAdmin } = useAuth();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <DebugContainer>
      <DebugTitle>User Debug Info</DebugTitle>
      <DebugItem>Authenticated: {isAuthenticated ? '✅' : '❌'}</DebugItem>
      <DebugItem>User Role: {user?.role || 'None'}</DebugItem>
      <DebugItem>Is Super Admin: {isSuperAdmin() ? '✅' : '❌'}</DebugItem>
      <DebugItem>Is Org Admin: {isOrgAdmin() ? '✅' : '❌'}</DebugItem>
      <DebugItem>Has SUPER_ADMIN: {hasRole(UserRole.SUPER_ADMIN) ? '✅' : '❌'}</DebugItem>
      <DebugItem>Has ORG_ADMIN: {hasRole(UserRole.ORG_ADMIN) ? '✅' : '❌'}</DebugItem>
      <DebugItem>
        Can Access Org Dashboard: {hasAnyRole([UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN]) ? '✅' : '❌'}
      </DebugItem>
      <DebugItem>User ID: {user?.id || 'None'}</DebugItem>
      <DebugItem>Email: {user?.email || 'None'}</DebugItem>
    </DebugContainer>
  );
};

export default UserRoleDebug;
