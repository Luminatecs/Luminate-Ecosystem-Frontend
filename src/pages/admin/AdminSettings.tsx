import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AddResourcesPage from './AddResourcesPage';
import ManageAllUsersPage from './ManageAllUsersPage';
import ManageUsersPage from './ManageUsersPage';

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
  padding: 0.5rem;
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  border: 1px solid #dadce0;
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
  padding: 8px 0;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-8px)'};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  border: 1px solid #dadce0;
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
  superAdminOnly?: boolean; // Flag for SUPER_ADMIN only items
}

const navigationItems: NavigationItemConfig[] = [
  {
    id: 'add-resources',
    label: 'Add Resources',
    icon: '➕',
    path: '/admin/settings'
  },
  {
    id: 'manage-organizations',
    label: 'Manage Organizations',
    icon: '🏢',
    path: '/admin/settings/manage-organizations'
  },
  {
    id: 'manage-user-access',
    label: 'Manage User Access',
    icon: '🔐',
    path: '/admin/settings/manage-users',
    superAdminOnly: true // Only visible to SUPER_ADMIN
  }
];

/**
 * Admin Settings Component
 */
const AdminSettings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(window.innerWidth > 768);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
      
      if (userMenuOpen && !target.closest('[data-dropdown="user-menu"]')) {
        setUserMenuOpen(false);
      }
      
      if (isModulesOpen && !target.closest('[data-dropdown="modules"]')) {
        setIsModulesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen, isModulesOpen]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const getActiveItemId = () => {
    const currentPath = location.pathname;
    const activeNav = navigationItems.find(item => item.path === currentPath);
    return activeNav?.id || 'add-resources';
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
    if (window.innerWidth <= 768) {
      setIsExpanded(false);
    }
  };

  const handleBackToDashboard = () => {
    // ACCESS_ADMIN doesn't have a dashboard, so redirect to ecosystem
    if (user?.role === 'ACCESS_ADMIN') {
      navigate('/ecosystem');
    } else {
      navigate('/super-admin-dashboard');
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
          {navigationItems
            .filter(item => !item.superAdminOnly || user?.role === 'SUPER_ADMIN')
            .map((item) => (
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

        <LogoutButton isExpanded={isExpanded} onClick={handleBackToDashboard}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          <span className="text">{user?.role === 'ACCESS_ADMIN' ? 'Back to Ecosystem' : 'Back to Dashboard'}</span>
        </LogoutButton>
      </SidePanel>

      <ContentArea sidebarExpanded={isExpanded}>
        <TopHeader>
          <PageTitle>{currentNavItem?.label || 'Admin Settings'}</PageTitle>
          
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
            
            <UserProfile onClick={() => setUserMenuOpen(!userMenuOpen)} data-dropdown="user-menu">
              <UserAvatar>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </UserAvatar>
              <UserInfo>
                <UserName>{user?.name}</UserName>
                <UserRole>{user?.role === 'ACCESS_ADMIN' ? 'Access Admin' : 'Super Admin'}</UserRole>
              </UserInfo>
              
              <DropdownMenu isOpen={userMenuOpen}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eaed' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#202124' }}>{user?.name}</div>
                  <div style={{ fontSize: '12px', color: '#5f6368', marginTop: '2px' }}>{user?.email}</div>
                </div>
                {user?.role === 'SUPER_ADMIN' && (
                  <DropdownItem onClick={() => { handleBackToDashboard(); setUserMenuOpen(false); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Dashboard
                  </DropdownItem>
                )}
                <DropdownItem onClick={() => { navigate('/ecosystem'); setUserMenuOpen(false); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Ecosystem Hub
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
          <Route index element={<AddResourcesPage />} />
          <Route path="manage-organizations" element={<ManageAllUsersPage />} />
          <Route path="manage-users" element={<ManageUsersPage />} />
        </Routes>
      </ContentArea>
    </DashboardContainer>
  );
};

export default AdminSettings;
