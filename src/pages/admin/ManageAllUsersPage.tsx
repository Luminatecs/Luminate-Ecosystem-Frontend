import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import OrganizationService, { Organization } from '../../services/OrganizationService';

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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

/**
 * Title
 */
const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: #202124;
  margin: 0;
`;

/**
 * Search Bar
 */
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 10px 16px;
  gap: 8px;
  width: 320px;
  transition: all 0.15s ease;

  &:focus-within {
    border-color: #1967d2;
    background: #f8f9fa;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    color: #202124;
    background: transparent;

    &::placeholder {
      color: #5f6368;
    }
  }

  svg {
    width: 18px;
    height: 18px;
    color: #5f6368;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

/**
 * Content Area
 */
const Content = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #dadce0;
  overflow: hidden;
`;

/**
 * Table
 */
const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: #f8f9fa;
    border-bottom: 1px solid #dadce0;
  }

  th {
    text-align: left;
    padding: 12px 16px;
    font-size: 12px;
    font-weight: 500;
    color: #5f6368;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  tbody tr {
    border-bottom: 1px solid #dadce0;
    transition: background 0.15s ease;

    &:hover {
      background: #f8f9fa;
    }
  }

  td {
    padding: 16px;
    font-size: 14px;
    color: #202124;
  }
`;

const StatusBadge = styled.span<{ isActive: boolean }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.isActive ? '#e6f4ea' : '#fce8e6'};
  color: ${props => props.isActive ? '#137333' : '#d93025'};
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #5f6368;
  transition: all 0.15s ease;
  position: relative;

  &:hover {
    background: #f1f3f4;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 150px;
  background: white;
  border-radius: 8px;
  border: 1px solid #dadce0;
  padding: 4px 0;
  margin-top: 4px;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-8px)'};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #202124;
  font-size: 14px;
  text-align: left;
  transition: background 0.15s ease;

  &:hover {
    background: #f1f3f4;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

/**
 * Side Panel Overlay
 */
const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
`;

/**
 * Side Panel
 */
const SidePanel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-500px'};
  width: 500px;
  max-width: 90vw;
  height: 100vh;
  background: white;
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  font-weight: 500;
  color: #202124;
  margin: 0;
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #5f6368;
  transition: all 0.15s ease;

  &:hover {
    background: #f1f3f4;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

const PanelFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e8eaed;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

/**
 * Form Elements
 */
const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #202124;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  color: #202124;
  font-family: inherit;
  transition: all 0.15s ease;

  &:focus {
    outline: none;
    border-color: #1967d2;
    background: #f8f9fa;
  }

  &::placeholder {
    color: #9aa0a6;
  }

  &:disabled {
    background: #f1f3f4;
    color: #5f6368;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  color: #202124;
  font-family: inherit;
  min-height: 100px;
  resize: vertical;
  transition: all 0.15s ease;

  &:focus {
    outline: none;
    border-color: #1967d2;
    background: #f8f9fa;
  }

  &::placeholder {
    color: #9aa0a6;
  }
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1967d2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #1557b0;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #dadce0;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  padding: 10px 20px;
  background: white;
  color: #5f6368;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f1f3f4;
    border-color: #9aa0a6;
  }
`;

/**
 * Info Section
 */
const InfoSection = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e8eaed;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-size: 13px;
  color: #5f6368;
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #202124;
  font-weight: 500;
`;

/**
 * Loading & Empty States
 */
const EmptyState = styled.div`
  padding: 60px 24px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 8px 0;
`;

const EmptyText = styled.p`
  font-size: 14px;
  color: #5f6368;
  margin: 0;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;

  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid #f1f3f4;
    border-top-color: #1967d2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

/**
 * Pagination
 */
const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #e8eaed;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const PaginationInfo = styled.div`
  font-size: 14px;
  color: #5f6368;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  background: ${props => props.isActive ? '#1967d2' : 'white'};
  color: ${props => props.isActive ? 'white' : '#5f6368'};
  border: 1px solid ${props => props.isActive ? '#1967d2' : '#dadce0'};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: ${props => props.isActive ? '#1557b0' : '#f1f3f4'};
    border-color: ${props => props.isActive ? '#1557b0' : '#9aa0a6'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/**
 * Main Component
 */
interface FormData {
  name: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  description: string;
  website: string;
}

const ManageAllUsersPage: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrgs, setTotalOrgs] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    description: '',
    website: ''
  });

  // Load organizations
  const loadOrganizations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await OrganizationService.getOrganizations({
        page: currentPage,
        limit: 10,
        search: searchQuery || undefined
      });

      console.log('📋 Organizations response:', response);

      if (response.success) {
        // Backend returns: { success, data: [...orgs], pagination: {...} }
        // OR { success, data: { data: [...orgs], pagination: {...} } }
        let organizations: Organization[] = [];
        let paginationData = { totalPages: 1, total: 0 };

        // Handle both response structures
        if (Array.isArray(response.data)) {
          // Direct array response
          organizations = response.data;
          paginationData = (response as any).pagination || paginationData;
        } else if (response.data && typeof response.data === 'object') {
          // Nested data structure
          organizations = (response.data as any).data || [];
          paginationData = (response.data as any).pagination || paginationData;
        }

        console.log('✅ Loaded', organizations.length, 'organizations');
        
        setOrganizations(organizations);
        setTotalPages(paginationData.totalPages || 1);
        setTotalOrgs(paginationData.total || organizations.length);
      } else {
        // Handle empty or error response
        console.warn('⚠️ No organizations found or error:', response);
        setOrganizations([]);
        setTotalPages(1);
        setTotalOrgs(0);
      }
    } catch (error) {
      console.error('Failed to load organizations:', error);
      setOrganizations([]);
      setTotalPages(1);
      setTotalOrgs(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    loadOrganizations();
  }, [loadOrganizations]);

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

  const handleView = async (org: Organization) => {
    try {
      const response = await OrganizationService.getOrganizationById(org.id);
      if (response.success && response.data) {
        setSelectedOrg(response.data);
        setFormData({
          name: response.data.name,
          contactEmail: response.data.contactEmail,
          contactPhone: response.data.contactPhone || '',
          address: response.data.address,
          description: response.data.description || '',
          website: response.data.website || ''
        });
        setIsViewMode(true);
        setIsPanelOpen(true);
        setOpenMenuId(null);
      }
    } catch (error) {
      console.error('Failed to load organization:', error);
      alert('Failed to load organization details');
    }
  };

  const handleEdit = async (org: Organization) => {
    try {
      const response = await OrganizationService.getOrganizationById(org.id);
      if (response.success && response.data) {
        setSelectedOrg(response.data);
        setFormData({
          name: response.data.name,
          contactEmail: response.data.contactEmail,
          contactPhone: response.data.contactPhone || '',
          address: response.data.address,
          description: response.data.description || '',
          website: response.data.website || ''
        });
        setIsViewMode(false);
        setIsPanelOpen(true);
        setOpenMenuId(null);
      }
    } catch (error) {
      console.error('Failed to load organization:', error);
      alert('Failed to load organization details');
    }
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => {
      setSelectedOrg(null);
      setIsViewMode(false);
    }, 700);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOrg) return;

    try {
      await OrganizationService.updateOrganization(selectedOrg.id, formData);
      handleClosePanel();
      loadOrganizations();
    } catch (error) {
      console.error('Failed to update organization:', error);
      alert('Failed to update organization. Please try again.');
    }
  };

  const filteredOrganizations = organizations;

  return (
    <>
      <Container>
        <Header>
          <Title>Organization Management</Title>
          <SearchBar>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </SearchBar>
        </Header>

        <Content>
          {loading ? (
            <LoadingSpinner />
          ) : filteredOrganizations.length === 0 ? (
            <EmptyState>
              <EmptyIcon>🏢</EmptyIcon>
              <EmptyTitle>No organizations found</EmptyTitle>
              <EmptyText>
                {searchQuery ? 'Try adjusting your search' : 'No organizations have been registered yet'}
              </EmptyText>
            </EmptyState>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Organization Name</th>
                      <th>Contact Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrganizations.map((org) => (
                      <tr key={org.id}>
                        <td><strong>{org.name}</strong></td>
                        <td>{org.contactEmail}</td>
                        <td>{org.contactPhone || 'N/A'}</td>
                        <td>{org.address}</td>
                        <td>
                          <StatusBadge isActive={org.isActive}>
                            {org.isActive ? 'Active' : 'Inactive'}
                          </StatusBadge>
                        </td>
                        <td>
                          <ActionButton
                            data-menu
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === org.id ? null : org.id);
                            }}
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <circle cx="12" cy="5" r="2"></circle>
                              <circle cx="12" cy="12" r="2"></circle>
                              <circle cx="12" cy="19" r="2"></circle>
                            </svg>
                            <Dropdown isOpen={openMenuId === org.id}>
                              <DropdownItem onClick={() => handleView(org)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                View Details
                              </DropdownItem>
                              <DropdownItem onClick={() => handleEdit(org)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Edit
                              </DropdownItem>
                            </Dropdown>
                          </ActionButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>

              {totalPages > 1 && (
                <Pagination>
                  <PaginationInfo>
                    Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalOrgs)} of {totalOrgs} organizations
                  </PaginationInfo>
                  <PaginationButtons>
                    <PageButton
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </PageButton>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <PageButton
                          key={pageNum}
                          isActive={currentPage === pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </PageButton>
                      );
                    })}
                    <PageButton
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </PageButton>
                  </PaginationButtons>
                </Pagination>
              )}
            </>
          )}
        </Content>
      </Container>

      {/* Side Panel for View/Edit */}
      <Overlay isOpen={isPanelOpen} onClick={handleClosePanel} />
      <SidePanel isOpen={isPanelOpen}>
        <PanelHeader>
          <PanelTitle>{isViewMode ? 'Organization Details' : 'Edit Organization'}</PanelTitle>
          <CloseButton onClick={handleClosePanel}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </CloseButton>
        </PanelHeader>
        <PanelBody>
          {isViewMode ? (
            <>
              <InfoSection>
                <InfoRow>
                  <InfoLabel>Organization ID</InfoLabel>
                  <InfoValue>{selectedOrg?.id}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Status</InfoLabel>
                  <InfoValue>
                    <StatusBadge isActive={selectedOrg?.isActive || false}>
                      {selectedOrg?.isActive ? 'Active' : 'Inactive'}
                    </StatusBadge>
                  </InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Created</InfoLabel>
                  <InfoValue>
                    {selectedOrg?.createdAt ? new Date(selectedOrg.createdAt).toLocaleDateString() : 'N/A'}
                  </InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Last Updated</InfoLabel>
                  <InfoValue>
                    {selectedOrg?.updatedAt ? new Date(selectedOrg.updatedAt).toLocaleDateString() : 'N/A'}
                  </InfoValue>
                </InfoRow>
              </InfoSection>

              <FormGroup>
                <Label>Organization Name</Label>
                <Input type="text" value={formData.name} disabled />
              </FormGroup>

              <FormGroup>
                <Label>Contact Email</Label>
                <Input type="email" value={formData.contactEmail} disabled />
              </FormGroup>

              <FormGroup>
                <Label>Contact Phone</Label>
                <Input type="tel" value={formData.contactPhone} disabled />
              </FormGroup>

              <FormGroup>
                <Label>Address</Label>
                <TextArea value={formData.address} disabled rows={3} />
              </FormGroup>

              <FormGroup>
                <Label>Website</Label>
                <Input type="url" value={formData.website} disabled />
              </FormGroup>

              <FormGroup>
                <Label>Description</Label>
                <TextArea value={formData.description} disabled rows={4} />
              </FormGroup>
            </>
          ) : (
            <form onSubmit={handleSubmit} id="org-form">
              <FormGroup>
                <Label>Organization Name *</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter organization name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Contact Email *</Label>
                <Input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="contact@organization.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Contact Phone</Label>
                <Input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </FormGroup>

              <FormGroup>
                <Label>Address *</Label>
                <TextArea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter organization address"
                  rows={3}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Website</Label>
                <Input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.organization.com"
                />
              </FormGroup>

              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the organization..."
                  rows={4}
                />
              </FormGroup>
            </form>
          )}
        </PanelBody>
        <PanelFooter>
          {isViewMode ? (
            <>
              <SecondaryButton onClick={handleClosePanel}>Close</SecondaryButton>
              <PrimaryButton onClick={() => setIsViewMode(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit
              </PrimaryButton>
            </>
          ) : (
            <>
              <SecondaryButton type="button" onClick={handleClosePanel}>Cancel</SecondaryButton>
              <PrimaryButton type="submit" form="org-form">
                Update Organization
              </PrimaryButton>
            </>
          )}
        </PanelFooter>
      </SidePanel>
    </>
  );
};

export default ManageAllUsersPage;
