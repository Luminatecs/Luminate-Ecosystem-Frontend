import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';
import StudentManagement from './StudentManagement';
import AssignCredentialsPage from './AssignCredentialsPage';
import ReportsPage from './ReportsPage';
import AnalyticsPage from './AnalyticsPage';
import UsersPage from './UsersPage';
import SettingsPage from './SettingsPage';

/**
 * Main Dashboard Container
 */
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background: white;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
`;

/**
 * Side Panel (Navigation)
 */
const SidePanel = styled.div<{ isExpanded: boolean }>`
  width: ${props => props.isExpanded ? '240px' : '80px'};
  background: linear-gradient(180deg, #1a2332 0%, #0d1419 100%);
  color: white;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;

  @media (max-width: 768px) {
    width: ${props => props.isExpanded ? '240px' : '0'};
    box-shadow: ${props => props.isExpanded ? '2px 0 8px rgba(0, 0, 0, 0.1)' : 'none'};
  }
`;

/**
 * Side Panel Header
 */
const SidePanelHeader = styled.div<{ isExpanded: boolean }>`
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

/**
 * Sidebar Search Container
 */
const SidebarSearchContainer = styled.div<{ isExpanded: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  opacity: ${props => props.isExpanded ? 1 : 0};
  transition: opacity 0.3s ease;
`;

/**
 * Sidebar Search Bar
 */
const SidebarSearchBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  &:focus-within {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 0.875rem;
    font-family: inherit;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }

  svg {
    width: 16px;
    height: 16px;
    color: rgba(255, 255, 255, 0.7);
    flex-shrink: 0;
  }
`;

/**
 * Grid Icon Button (Modules)
 */
const GridIconButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  color: rgba(255, 255, 255, 0.9);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

/**
 * Chevron Toggle Button
 */
const ChevronButton = styled.button<{ isExpanded: boolean }>`
  position: absolute;
  right: -12px;
  top: 24px;
  width: 24px;
  height: 24px;
  background: #1a2332;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  z-index: 101;
  color: white;

  &:hover {
    background: #0d1419;
    border-color: rgba(255, 255, 255, 0.4);
  }

  svg {
    width: 14px;
    height: 14px;
    transform: ${props => props.isExpanded ? 'rotate(0deg)' : 'rotate(180deg)'};
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/**
 * Modules Popup
 */
const ModulesPopup = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 60px;
  left: ${props => props.isOpen ? '0' : '-300px'};
  width: 280px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  padding: 0.5rem;
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
`;

const ModuleItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s ease;
  text-align: left;
  color: #202124;

  &:hover {
    background: #f1f3f4;
  }

  .icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e8f0fe;
    border-radius: 6px;
    font-size: 16px;
  }

  .label {
    font-size: 14px;
    font-weight: 500;
  }
`;

/**
 * Navigation List
 */
const NavigationList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem 0;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

/**
 * Navigation Item
 */
const NavigationItem = styled.button<{ isActive: boolean; isExpanded: boolean }>`
  width: 100%;
  background: transparent;
  border: none;
  color: ${props => props.isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'};
  padding: ${props => props.isExpanded ? '0.875rem 1.5rem' : '0.875rem 0'};
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: ${props => props.isExpanded ? 'flex-start' : 'center'};
  gap: 0.875rem;
  font-weight: 500;
  font-size: 0.8125rem;
  position: relative;
  margin: 0.25rem 0;

  /* Rounded white indicator attached to right edge */
  ${props => props.isActive && props.isExpanded && `
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 40px;
      background: white;
      border-radius: 4px 0 0 4px;
    }
  `}

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #FFFFFF;
  }

  .icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .text {
    opacity: ${props => props.isExpanded ? 1 : 0};
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
  }
`;

/**
 * Content Area
 */
const ContentArea = styled.div<{ sidebarExpanded: boolean }>`
  flex: 1;
  margin-left: ${props => props.sidebarExpanded ? '240px' : '80px'};
  transition: margin-left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  background: white;
  height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

/**
 * Top Header Bar
 */
const TopHeader = styled.div`
  background: white;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8eaed;
  position: sticky;
  top: 0;
  z-index: 90;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

/**
 * Page Title
 */
const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #202124;
  margin: 0;
  letter-spacing: 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

/**
 * Header Actions
 */
const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

/**
 * Search Bar
 */
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #f1f3f4;
  border-radius: 8px;
  padding: 8px 16px;
  gap: 8px;
  width: 240px;
  transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #e8eaed;
  }

  &:focus-within {
    background: white;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  }

  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 14px;
    color: #202124;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;

    &::placeholder {
      color: #5f6368;
    }
  }

  svg {
    color: #5f6368;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/**
 * Icon Button
 */
const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #5f6368;
  position: relative;
  transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #f1f3f4;
  }

  &:active {
    background: #e8eaed;
  }
`;

/**
 * User Profile
 */
const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 24px;
  transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    background: #f1f3f4;
  }

  @media (max-width: 768px) {
    gap: 0;
    padding: 0;
  }
`;

/**
 * Dropdown Menu
 */
const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 240px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  padding: 8px 0;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-8px)'};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
`;

/**
 * Dropdown Item
 */
const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  color: #202124;
  font-size: 14px;
  transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #f1f3f4;
  }

  svg {
    width: 20px;
    height: 20px;
    color: #5f6368;
    flex-shrink: 0;
  }

  &.danger {
    color: #d93025;

    svg {
      color: #d93025;
    }

    &:hover {
      background: #fce8e6;
    }
  }
`;

/**
 * Dropdown Divider
 */
const DropdownDivider = styled.div`
  height: 1px;
  background: #e8eaed;
  margin: 8px 0;
`;

/**
 * Notification Badge
 */
const NotificationBadge = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background: #d93025;
  border-radius: 50%;
  border: 2px solid white;
`;

/**
 * Notification Item
 */
const NotificationItem = styled.div`
  padding: 12px 16px;
  display: flex;
  gap: 12px;
  cursor: pointer;
  transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #f1f3f4;
  }

  .notification-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #e8f0fe;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 18px;
  }

  .notification-content {
    flex: 1;
    min-width: 0;

    .notification-title {
      font-size: 14px;
      font-weight: 500;
      color: #202124;
      margin-bottom: 2px;
    }

    .notification-time {
      font-size: 12px;
      color: #5f6368;
    }
  }
`;

/**
 * User Avatar
 */
const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  font-size: 14px;
`;

/**
 * User Info
 */
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
`;

/**
 * User Name
 */
const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #202124;
  line-height: 20px;
`;

/**
 * User Role
 */
const UserRole = styled.div`
  font-size: 12px;
  color: #5f6368;
  line-height: 16px;
`;

/**
 * Logout Button
 */
const LogoutButton = styled.button<{ isExpanded: boolean }>`
  width: 100%;
  background: transparent;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: ${props => props.isExpanded ? '1rem 1.5rem' : '1rem 0'};
  cursor: pointer;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: ${props => props.isExpanded ? 'flex-start' : 'center'};
  gap: 1rem;
  font-weight: 500;
  font-size: 0.95rem;

  &:hover {
    background: rgba(255, 68, 68, 0.1);
    color: #FF6B6B;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  .text {
    opacity: ${props => props.isExpanded ? 1 : 0};
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

/**
 * Navigation items configuration
 */
interface NavigationItemConfig {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const navigationItems: NavigationItemConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '🏠',
    path: '/organization-dashboard'
  },
  {
    id: 'students',
    label: 'Student Management',
    icon: '👥',
    path: '/organization-dashboard/students'
  },
  {
    id: 'assign-credentials',
    label: 'Assign Credentials',
    icon: '📧',
    path: '/organization-dashboard/assign-credentials'
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: '📊',
    path: '/organization-dashboard/reports'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: '📈',
    path: '/organization-dashboard/analytics'
  },
  {
    id: 'users',
    label: 'Manage Users',
    icon: '👤',
    path: '/organization-dashboard/users'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    path: '/organization-dashboard/settings'
  }
];

/**
 * Organization Dashboard Component
 */
const OrganizationDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(window.innerWidth > 768);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Close sidebar on mobile when route changes
  React.useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsExpanded(false);
    }
  }, [location.pathname]);

  // Handle responsive sidebar
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close notifications dropdown if clicking outside
      if (notificationsOpen && !target.closest('[data-dropdown="notifications"]')) {
        setNotificationsOpen(false);
      }
      
      // Close user menu dropdown if clicking outside
      if (userMenuOpen && !target.closest('[data-dropdown="user-menu"]')) {
        setUserMenuOpen(false);
      }
      
      // Close modules popup if clicking outside
      if (isModulesOpen && !target.closest('[data-dropdown="modules"]')) {
        setIsModulesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notificationsOpen, userMenuOpen, isModulesOpen]);

  // Wait for user data to load
  if (!user) {
    return <div>Loading...</div>;
  }

  // Check if organization setup is complete
  if (user.organizationSetupComplete === false && user.role !== 'SUPER_ADMIN') {
    console.log('Redirecting to organization setup...');
    return <Navigate to="/organization/setup" replace />;
  }

  // Get active item based on current path
  const getActiveItemId = () => {
    const currentPath = location.pathname;
    const activeNav = navigationItems.find(item => item.path === currentPath);
    return activeNav?.id || 'dashboard';
  };

  const activeItem = getActiveItemId();
  const currentNavItem = navigationItems.find(item => item.id === activeItem);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      setIsExpanded(false);
    }
  };

  return (
    <DashboardContainer>
      <SidePanel isExpanded={isExpanded}> 
        <ChevronButton isExpanded={isExpanded} onClick={toggleSidebar}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </ChevronButton>

        <SidePanelHeader isExpanded={isExpanded}>
          <SidebarSearchContainer isExpanded={isExpanded}>
            <SidebarSearchBar>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SidebarSearchBar>
            <img 
              src="/luminate-logo.png" 
              alt="Luminate Logo" 
              style={{ 
                width: '24px', 
                height: '24px', 
                marginLeft: '8px',
                objectFit: 'contain'
              }} 
            />
            <div style={{ position: 'relative' }} data-dropdown="modules">
              <GridIconButton onClick={() => setIsModulesOpen(!isModulesOpen)}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                  <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                </svg>
              </GridIconButton>
            </div>
          </SidebarSearchContainer>

          <ModulesPopup isOpen={isModulesOpen}>
            <ModuleItem onClick={() => { navigate('/library'); setIsModulesOpen(false); }}>
              <div className="icon">📚</div>
              <div className="label">Library</div>
            </ModuleItem>
            <ModuleItem onClick={() => { navigate('/kaeval'); setIsModulesOpen(false); }}>
              <div className="icon">🎯</div>
              <div className="label">Kaeval</div>
            </ModuleItem>
            <ModuleItem onClick={() => { navigate('/resources'); setIsModulesOpen(false); }}>
              <div className="icon">🔧</div>
              <div className="label">Resources</div>
            </ModuleItem>
          </ModulesPopup>
        </SidePanelHeader>

        <NavigationList>
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              isActive={activeItem === item.id}
              isExpanded={isExpanded}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="icon">{item.icon}</span>
              <span className="text">{item.label}</span>
            </NavigationItem>
          ))}
        </NavigationList>

        <LogoutButton isExpanded={isExpanded} onClick={handleLogout}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
            />
          </svg>
          <span className="text">Sign Out</span>
        </LogoutButton>
      </SidePanel>

      <ContentArea sidebarExpanded={isExpanded}>
        <TopHeader>
          <PageTitle>{currentNavItem?.label}</PageTitle>
          
          <HeaderActions>
            <SearchBar>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input type="text" placeholder="Search here..." />
            </SearchBar>
            
            <IconButton onClick={toggleSidebar}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </IconButton>
            
            <div style={{ position: 'relative' }} data-dropdown="notifications">
              <IconButton onClick={() => setNotificationsOpen(!notificationsOpen)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <NotificationBadge />
              </IconButton>
              
              <DropdownMenu isOpen={notificationsOpen}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eaed' }}>
                  <div style={{ fontSize: '16px', fontWeight: 500, color: '#202124' }}>Notifications</div>
                </div>
                <NotificationItem>
                  <div className="notification-icon">👨‍🎓</div>
                  <div className="notification-content">
                    <div className="notification-title">New student enrolled</div>
                    <div className="notification-time">2 hours ago</div>
                  </div>
                </NotificationItem>
                <NotificationItem>
                  <div className="notification-icon">📊</div>
                  <div className="notification-content">
                    <div className="notification-title">Weekly report available</div>
                    <div className="notification-time">1 day ago</div>
                  </div>
                </NotificationItem>
                <DropdownDivider />
                <DropdownItem onClick={() => setNotificationsOpen(false)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  View all notifications
                </DropdownItem>
              </DropdownMenu>
            </div>
            
            <IconButton onClick={() => handleNavigation('/organization-dashboard/assign-credentials')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 3v18m9-9H3" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </IconButton>
            
            <UserProfile onClick={() => setUserMenuOpen(!userMenuOpen)} data-dropdown="user-menu">
              <UserAvatar>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </UserAvatar>
              <UserInfo>
                <UserName>{user?.name}</UserName>
                <UserRole>Admin</UserRole>
              </UserInfo>
              
              <DropdownMenu isOpen={userMenuOpen}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eaed' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#202124' }}>{user?.name}</div>
                  <div style={{ fontSize: '12px', color: '#5f6368', marginTop: '2px' }}>{user?.email}</div>
                </div>
                <DropdownItem onClick={() => { handleNavigation('/organization-dashboard/settings'); setUserMenuOpen(false); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Account Settings
                </DropdownItem>
                <DropdownItem onClick={() => { handleNavigation('/organization-dashboard/users'); setUserMenuOpen(false); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Manage Users
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem className="danger" onClick={handleLogout}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </UserProfile>
          </HeaderActions>
        </TopHeader>

        {/* Routes for nested pages */}
        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="assign-credentials" element={<AssignCredentialsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </ContentArea>
    </DashboardContainer>
  );
};

export default OrganizationDashboard;
