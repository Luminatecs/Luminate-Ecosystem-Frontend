import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { UserRole } from '../../models';
import UserService, { User } from '../../services/UserService';

/**
 * User Interface
 */
// User interface imported from UserService

/**
 * Main Container
 */
const Container = styled.div`
  padding: 24px;
  background: #f8f9fa;
  min-height: calc(100vh - 73px);
`;

/**
 * Header Section
 */
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
  padding: 32px 24px;

  @media (max-width: 768px) {
    padding: 24px 16px;
    margin-bottom: 32px;
  }
`;

/**
 * Title
 */
const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
  color: #202124;
  margin: 0 0 24px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

/**
 * Search Bar
 */
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #dadce0;
  border-radius: 24px;
  padding: 12px 20px;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus-within {
    border-color: #1967d2;
  }

  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 16px;
    color: #202124;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;

    &::placeholder {
      color: #5f6368;
    }
  }

  svg {
    color: #5f6368;
    flex-shrink: 0;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px 16px;
    
    input {
      font-size: 14px;
    }
  }
`;

/**
 * Table Container
 */
const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #dadce0;
  overflow: visible;
`;

/**
 * Table
 */
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: #f8f9fa;
    border-bottom: 1px solid #dadce0;

    th {
      padding: 16px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      color: #5f6368;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #e8eaed;
      transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: #f8f9fa;
      }

      td {
        padding: 16px;
        font-size: 14px;
        color: #202124;
        position: relative;
      }
    }
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

/**
 * Role Badge
 */
const RoleBadge = styled.span<{ role: UserRole }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.role) {
      case UserRole.SUPER_ADMIN: return '#e8f5e9';
      case UserRole.ACCESS_ADMIN: return '#e3f2fd';
      case UserRole.ORG_ADMIN: return '#fff3e0';
      case UserRole.ORG_WARD: return '#f3e5f5';
      case UserRole.INDIVIDUAL: return '#e0f2f1';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.role) {
      case UserRole.SUPER_ADMIN: return '#2e7d32';
      case UserRole.ACCESS_ADMIN: return '#1565c0';
      case UserRole.ORG_ADMIN: return '#ef6c00';
      case UserRole.ORG_WARD: return '#6a1b9a';
      case UserRole.INDIVIDUAL: return '#00695c';
      default: return '#616161';
    }
  }};
`;

/**
 * Status Badge
 */
const StatusBadge = styled.span<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.active ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.active ? '#2e7d32' : '#c62828'};
`;

/**
 * Actions Menu
 */
const ActionsMenu = styled.div`
  position: relative;
`;

const MenuButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #5f6368;
  transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #f1f3f4;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 200px;
  background: white;
  border-radius: 8px;
  border: 1px solid #dadce0;
  padding: 8px 0;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-8px)'};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const DropdownItem = styled.button<{ danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  color: ${props => props.danger ? '#d93025' : '#202124'};
  font-size: 14px;
  transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${props => props.danger ? '#fce8e6' : '#f1f3f4'};
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.danger ? '#d93025' : '#5f6368'};
    flex-shrink: 0;
  }
`;

/**
 * Side Panel
 */
const SidePanel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-700px'};
  width: 700px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  transition: right 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    right: ${props => props.isOpen ? '0' : '-100%'};
  }
`;

const PanelHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e8eaed;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PanelTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #202124;
  margin: 0;
`;

const CloseButton = styled.button`
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
  transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #f1f3f4;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const PanelContent = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #202124;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 90%;
  padding: 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  color: #202124;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: #1967d2;
  }

  &:disabled {
    background: #f8f9fa;
    color: #5f6368;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  color: #202124;
  background: white;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: #1967d2;
  }
`;

const PanelFooter = styled.div`
  padding: 24px;
  border-top: 1px solid #e8eaed;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;

  ${props => {
    if (props.variant === 'danger') {
      return `
        background: #d93025;
        color: white;
        &:hover { background: #c5221f; }
      `;
    } else if (props.variant === 'secondary') {
      return `
        background: #f1f3f4;
        color: #202124;
        &:hover { background: #e8eaed; }
      `;
    } else {
      return `
        background: #1967d2;
        color: white;
        &:hover { background: #1557b0; }
      `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  color: #5f6368;

  svg {
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  div {
    font-size: 16px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  text-align: center;

  svg {
    margin-bottom: 24px;
    opacity: 0.5;
  }
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 8px 0;
`;

const EmptyText = styled.p`
  font-size: 14px;
  color: #5f6368;
  margin: 0;
`;

/**
 * Manage Users Page Component
 */
const ManageUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedRole, setEditedRole] = useState<UserRole | ''>('');

  // Fetch all users on initial load
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await UserService.getUsers();

      if (response.success && response.data) {
        const users = response.data.users || [];
        setUsers(users);
        setFilteredUsers(users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Search users with backend
  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      console.log('🔍 Search query empty, showing all users');
      setFilteredUsers(users);
      return;
    }

    try {
      setSearching(true);
      console.log('🔍 Searching backend with query:', query);
      
      const response = await UserService.searchUsers(query.trim());
      
      console.log('✅ Search response:', response);

      if (response.success && response.data) {
        const foundUsers = response.data.users || [];
        console.log(`✅ Found ${foundUsers.length} users`);
        setFilteredUsers(foundUsers);
      } else {
        console.warn('⚠️ Search returned no data, falling back to client-side');
        // Fallback to client-side search
        const filtered = users.filter(user =>
          user.name?.toLowerCase().includes(query.toLowerCase()) ||
          user.email?.toLowerCase().includes(query.toLowerCase()) ||
          user.username?.toLowerCase().includes(query.toLowerCase()) ||
          user.role?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
      }
    } catch (error: any) {
      console.error('❌ Error searching users:', error);
      
      // Check if it's an authentication error
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        alert('Your session has expired. Please log in again.');
        return;
      }
      
      // Fallback to client-side search
      const filtered = users.filter(user =>
        user.name?.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase()) ||
        user.username?.toLowerCase().includes(query.toLowerCase()) ||
        user.role?.toLowerCase().includes(query.toLowerCase())
      );
      console.log('🔍 Client-side filtered results:', filtered.length);
      setFilteredUsers(filtered);
    } finally {
      setSearching(false);
    }
  }, [users]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchUsers(searchQuery);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery, searchUsers]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-menu]')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setEditedRole(user.role);
    setSidePanelOpen(true);
    setOpenMenuId(null);
  };

  const handleClosePanel = () => {
    setSidePanelOpen(false);
    setSelectedUser(null);
    setEditedRole('');
  };

  const handleUpdateRole = async () => {
    if (!selectedUser || !editedRole) return;

    try {
      console.log(`📝 Updating role for user ${selectedUser.id} to ${editedRole}`);
      
      const response = await UserService.updateUserRole(selectedUser.id, editedRole);
      
      if (response.success) {
        console.log('✅ Role updated successfully:', response);
        // Refresh users list
        await fetchUsers();
        handleClosePanel();
      }
    } catch (error: any) {
      console.error('❌ Error updating role:', error);
      alert(error.message || 'Failed to update user role');
    }
  };

  return (
    <Container>
      <Header>
        <Title>Manage User Access</Title>
        <SearchBar>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search users by name, email, username, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searching && (
            <div style={{ display: 'flex', alignItems: 'center', color: '#5f6368' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25"/>
                <path d="M4 12a8 8 0 018-8" strokeLinecap="round"/>
              </svg>
            </div>
          )}
        </SearchBar>
      </Header>

      <TableContainer>
        {loading ? (
          <LoadingSpinner>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1967d2" strokeWidth="2">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25"/>
              <path d="M4 12a8 8 0 018-8" strokeLinecap="round"/>
            </svg>
            <div>Loading users...</div>
          </LoadingSpinner>
        ) : filteredUsers.length === 0 ? (
          <EmptyState>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <EmptyTitle>
              {searchQuery.trim() ? 'No users found' : 'No users yet'}
            </EmptyTitle>
            <EmptyText>
              {searchQuery.trim() 
                ? `No users match "${searchQuery}"`
                : 'Users will appear here once they are created'}
            </EmptyText>
          </EmptyState>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td><strong>{user.name}</strong></td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>
                    <RoleBadge role={user.role}>{user.role}</RoleBadge>
                  </td>
                  <td>
                    <StatusBadge active={user.isActive}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </StatusBadge>
                  </td>
                  <td>
                    <ActionsMenu data-menu>
                      <MenuButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === user.id ? null : user.id);
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="5" r="2"></circle>
                          <circle cx="12" cy="12" r="2"></circle>
                          <circle cx="12" cy="19" r="2"></circle>
                        </svg>
                      </MenuButton>
                      <Dropdown isOpen={openMenuId === user.id}>
                        <DropdownItem onClick={() => handleOpenEdit(user)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                          Change Role
                        </DropdownItem>
                        <DropdownItem>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          View Details
                        </DropdownItem>
                        {!user.isActive && (
                          <DropdownItem>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                            Activate User
                          </DropdownItem>
                        )}
                        {user.isActive && (
                          <DropdownItem danger>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="15" y1="9" x2="9" y2="15"></line>
                              <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            Deactivate User
                          </DropdownItem>
                        )}
                      </Dropdown>
                    </ActionsMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableContainer>

      {/* Side Panel for Editing */}
      <SidePanel isOpen={sidePanelOpen}>
        <PanelHeader>
          <PanelTitle>Update User Role</PanelTitle>
          <CloseButton onClick={handleClosePanel}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </CloseButton>
        </PanelHeader>

        {selectedUser && (
          <>
            <PanelContent>
              <FormGroup>
                <Label>Name</Label>
                <Input type="text" value={selectedUser.name} disabled />
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <Input type="email" value={selectedUser.email} disabled />
              </FormGroup>

              <FormGroup>
                <Label>Username</Label>
                <Input type="text" value={selectedUser.username} disabled />
              </FormGroup>

              <FormGroup>
                <Label>Current Role</Label>
                <Input type="text" value={selectedUser.role} disabled />
              </FormGroup>

              <FormGroup>
                <Label>New Role *</Label>
                <Select
                  value={editedRole}
                  onChange={(e) => setEditedRole(e.target.value as UserRole)}
                >
                  <option value="">Select a role...</option>
                  <option value={UserRole.SUPER_ADMIN}>SUPER_ADMIN - Full system access</option>
                  <option value={UserRole.ACCESS_ADMIN}>ACCESS_ADMIN - Resource management only</option>
                  <option value={UserRole.ORG_ADMIN}>ORG_ADMIN - Organization management</option>
                  <option value={UserRole.INDIVIDUAL}>INDIVIDUAL - Individual user</option>
                  <option value={UserRole.ORG_WARD}>ORG_WARD - Student/Ward user</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Status</Label>
                <StatusBadge active={selectedUser.isActive}>
                  {selectedUser.isActive ? '✓ Active' : '✗ Inactive'}
                </StatusBadge>
              </FormGroup>
            </PanelContent>

            <PanelFooter>
              <Button variant="secondary" onClick={handleClosePanel}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdateRole}
                disabled={!editedRole || editedRole === selectedUser.role}
              >
                Update Role
              </Button>
            </PanelFooter>
          </>
        )}
      </SidePanel>
    </Container>
  );
};

export default ManageUsersPage;
