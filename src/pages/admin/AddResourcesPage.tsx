import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IResource, CreateResourceInput } from '../../models/Resource';
import ResourcesService from '../../services/ResourcesService';

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
 * Header Actions
 */
const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

/**
 * Primary Button
 */
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

  svg {
    width: 18px;
    height: 18px;
  }
`;

/**
 * View Toggle Button
 */
const ViewToggle = styled.div`
  display: flex;
  background: white;
  border-radius: 8px;
  border: 1px solid #dadce0;
  overflow: hidden;
`;

const ViewButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  background: ${props => props.isActive ? '#e8f0fe' : 'white'};
  color: ${props => props.isActive ? '#1967d2' : '#5f6368'};
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: ${props => props.isActive ? '#e8f0fe' : '#f1f3f4'};
  }

  svg {
    width: 18px;
    height: 18px;
  }

  &:not(:last-child) {
    border-right: 1px solid #dadce0;
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
 * Grid View
 */
const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/**
 * Resource Card
 */
const ResourceCard = styled.div`
  background: white;
  border: 1px solid #dadce0;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    border-color: #1967d2;
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 8px 0;
  flex: 1;
`;

const CardMenu = styled.button`
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

const CardDropdown = styled.div<{ isOpen: boolean }>`
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

  &.danger {
    color: #d93025;
    
    &:hover {
      background: #fce8e6;
    }
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #5f6368;
  margin: 0 0 12px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const Badge = styled.span<{ variant?: 'primary' | 'success' | 'warning' }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => 
    props.variant === 'success' ? '#e6f4ea' :
    props.variant === 'warning' ? '#fef7e0' :
    '#e8f0fe'
  };
  color: ${props => 
    props.variant === 'success' ? '#137333' :
    props.variant === 'warning' ? '#b45309' :
    '#1967d2'
  };
`;

/**
 * List View (Table)
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

const TableActions = styled.div`
  display: flex;
  gap: 8px;
  position: relative;
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
  right: ${props => props.isOpen ? '0' : '-900px'};
  width: 900px;
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
  width: 85%;
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

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  color: #202124;
  font-family: inherit;
  transition: all 0.15s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #1967d2;
    background: #f8f9fa;
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
 * Confirmation Modal
 */
const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.2s ease;
  z-index: 1001;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 12px 0;
`;

const ModalText = styled.p`
  font-size: 14px;
  color: #5f6368;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const DangerButton = styled(PrimaryButton)`
  background: #d93025;

  &:hover {
    background: #b31412;
  }
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

const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  min-height: 42px;
  cursor: text;

  &:focus-within {
    border-color: #1967d2;
    background: #f8f9fa;
  }
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #e8f0fe;
  color: #1967d2;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;

  button {
    background: none;
    border: none;
    color: #1967d2;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
    font-size: 16px;
    line-height: 1;

    &:hover {
      color: #1557b0;
    }
  }
`;

const TagInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: inherit;
  min-width: 120px;
  background: transparent;

  &::placeholder {
    color: #9aa0a6;
  }
`;

/**
 * Main Component
 */
const AddResourcesPage: React.FC = () => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [resources, setResources] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<IResource | null>(null);
  const [deletingResource, setDeletingResource] = useState<IResource | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  const [formData, setFormData] = useState<CreateResourceInput>({
    title: '',
    description: '',
    full_description: '',
    category: '',
    type: '',
    resource_type: 'students',
    rating: 0,
    link: '',
    featured: false,
    image: '',
    features: [],
    duration: '',
    difficulty: undefined,
    tags: [],
    free: true
  });

  // Load resources
  useEffect(() => {
    loadResources();
  }, []);

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

  const loadResources = async () => {
    try {
      setLoading(true);
      const response = await ResourcesService.getAllResources();
      if (response.success && response.data) {
        setResources(response.data);
      }
    } catch (error) {
      console.error('Failed to load resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingResource(null);
    setFormData({
      title: '',
      description: '',
      full_description: '',
      category: '',
      type: '',
      resource_type: 'students',
      rating: 0,
      link: '',
      featured: false,
      image: '',
      features: [],
      duration: '',
      difficulty: undefined,
      tags: [],
      free: true
    });
    setIsPanelOpen(true);
  };

  const handleOpenEdit = (resource: IResource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      description: resource.description,
      full_description: resource.full_description,
      category: resource.category,
      type: resource.type,
      resource_type: resource.resource_type,
      rating: resource.rating,
      link: resource.link || '',
      featured: resource.featured,
      image: resource.image || '',
      features: resource.features || [],
      duration: resource.duration || '',
      difficulty: resource.difficulty,
      tags: resource.tags || [],
      free: resource.free
    });
    setIsPanelOpen(true);
    setOpenMenuId(null);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => {
      setEditingResource(null);
    }, 700);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingResource) {
        await ResourcesService.updateResource(editingResource.id, formData);
      } else {
        await ResourcesService.createResource(formData);
      }

      handleClosePanel();
      loadResources();
    } catch (error) {
      console.error('Failed to save resource:', error);
      alert('Failed to save resource. Please try again.');
    }
  };

  const handleDeleteClick = (resource: IResource) => {
    setDeletingResource(resource);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingResource) return;

    try {
      await ResourcesService.deleteResource(deletingResource.id);
      setIsModalOpen(false);
      setDeletingResource(null);
      loadResources();
    } catch (error) {
      console.error('Failed to delete resource:', error);
      alert('Failed to delete resource. Please try again.');
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (formData.tags && !formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      } else if (!formData.tags) {
        setFormData({ ...formData, tags: [tagInput.trim()] });
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (formData.tags) {
      setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
    }
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && featureInput.trim()) {
      e.preventDefault();
      if (!formData.features.includes(featureInput.trim())) {
        setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      }
      setFeatureInput('');
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFormData({ ...formData, features: formData.features.filter(f => f !== featureToRemove) });
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Resource Management</Title>
          <HeaderActions>
            <ViewToggle>
              <ViewButton isActive={view === 'list'} onClick={() => setView('list')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                List
              </ViewButton>
              <ViewButton isActive={view === 'grid'} onClick={() => setView('grid')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Grid
              </ViewButton>
            </ViewToggle>
            <PrimaryButton onClick={handleOpenCreate}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Resource
            </PrimaryButton>
          </HeaderActions>
        </Header>

        <Content>
          {loading ? (
            <LoadingSpinner />
          ) : resources.length === 0 ? (
            <EmptyState>
              <EmptyIcon>📚</EmptyIcon>
              <EmptyTitle>No resources yet</EmptyTitle>
              <EmptyText>Get started by creating your first resource</EmptyText>
            </EmptyState>
          ) : view === 'grid' ? (
            <GridView>
              {resources.map((resource) => (
                <ResourceCard key={resource.id}>
                  <CardHeader>
                    <div style={{ flex: 1 }}>
                      <CardTitle>{resource.title}</CardTitle>
                    </div>
                    <CardMenu 
                      data-menu 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === resource.id ? null : resource.id);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="2"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                        <circle cx="12" cy="19" r="2"></circle>
                      </svg>
                      <CardDropdown isOpen={openMenuId === resource.id}>
                        <DropdownItem onClick={() => handleOpenEdit(resource)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                          Edit
                        </DropdownItem>
                        <DropdownItem className="danger" onClick={() => handleDeleteClick(resource)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                          Delete
                        </DropdownItem>
                      </CardDropdown>
                    </CardMenu>
                  </CardHeader>
                  <CardDescription>{resource.description}</CardDescription>
                  <CardMeta>
                    <Badge variant="primary">{resource.category}</Badge>
                    <Badge variant="success">{resource.resource_type}</Badge>
                    {resource.difficulty && <Badge variant="warning">{resource.difficulty}</Badge>}
                    {resource.free && <Badge>Free</Badge>}
                  </CardMeta>
                </ResourceCard>
              ))}
            </GridView>
          ) : (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Resource Type</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map((resource) => (
                    <tr key={resource.id}>
                      <td><strong>{resource.title}</strong></td>
                      <td>{resource.category}</td>
                      <td>{resource.type}</td>
                      <td><Badge variant="success">{resource.resource_type}</Badge></td>
                      <td>⭐ {resource.rating ? Number(resource.rating).toFixed(1) : 'N/A'}</td>
                      <td>
                        <TableActions>
                          <CardMenu 
                            data-menu
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === resource.id ? null : resource.id);
                            }}
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <circle cx="12" cy="5" r="2"></circle>
                              <circle cx="12" cy="12" r="2"></circle>
                              <circle cx="12" cy="19" r="2"></circle>
                            </svg>
                            <CardDropdown isOpen={openMenuId === resource.id}>
                              <DropdownItem onClick={() => handleOpenEdit(resource)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Edit
                              </DropdownItem>
                              <DropdownItem className="danger" onClick={() => handleDeleteClick(resource)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                Delete
                              </DropdownItem>
                            </CardDropdown>
                          </CardMenu>
                        </TableActions>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          )}
        </Content>
      </Container>

      {/* Side Panel for Create/Edit */}
      <Overlay isOpen={isPanelOpen} onClick={handleClosePanel} />
      <SidePanel isOpen={isPanelOpen}>
        <PanelHeader>
          <PanelTitle>{editingResource ? 'Edit Resource' : 'Add New Resource'}</PanelTitle>
          <CloseButton onClick={handleClosePanel}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </CloseButton>
        </PanelHeader>
        <PanelBody>
          <form onSubmit={handleSubmit} id="resource-form">
            <FormGroup>
              <Label>Title *</Label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter resource title"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Short Description *</Label>
              <TextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the resource"
                rows={3}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Full Description *</Label>
              <TextArea
                value={formData.full_description}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                placeholder="Detailed description of the resource"
                rows={5}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Category *</Label>
              <Input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Career Planning, Skills Development"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Type *</Label>
              <Input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="e.g., Article, Video, Course"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Resource Type *</Label>
              <Select
                value={formData.resource_type}
                onChange={(e) => setFormData({ ...formData, resource_type: e.target.value as any })}
                required
              >
                <option value="students">Students</option>
                <option value="parents">Parents</option>
                <option value="counselors">Counselors</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Difficulty</Label>
              <Select
                value={formData.difficulty || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  difficulty: e.target.value ? e.target.value as 'Beginner' | 'Intermediate' | 'Advanced' : undefined 
                })}
              >
                <option value="">Select difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Link</Label>
              <Input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://example.com/resource"
              />
            </FormGroup>

            <FormGroup>
              <Label>Image URL</Label>
              <Input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </FormGroup>

            <FormGroup>
              <Label>Duration</Label>
              <Input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 2 hours, 5 weeks"
              />
            </FormGroup>

            <FormGroup>
              <Label>Rating (0-5)</Label>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
              />
            </FormGroup>

            <FormGroup>
              <Label>Features *</Label>
              <TagsInput onClick={() => document.getElementById('feature-input')?.focus()}>
                {formData.features.map((feature, index) => (
                  <Tag key={index}>
                    {feature}
                    <button type="button" onClick={() => removeFeature(feature)}>×</button>
                  </Tag>
                ))}
                <TagInput
                  id="feature-input"
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={handleFeatureKeyDown}
                  placeholder={formData.features.length === 0 ? "Type feature and press Enter" : "Add more..."}
                />
              </TagsInput>
            </FormGroup>

            <FormGroup>
              <Label>Tags</Label>
              <TagsInput onClick={() => document.getElementById('tag-input')?.focus()}>
                {(formData.tags || []).map((tag, index) => (
                  <Tag key={index}>
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>×</button>
                  </Tag>
                ))}
                <TagInput
                  id="tag-input"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={(formData.tags || []).length === 0 ? "Type tag and press Enter" : "Add more..."}
                />
              </TagsInput>
            </FormGroup>

            <FormGroup>
              <Label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                Featured Resource
              </Label>
            </FormGroup>

            <FormGroup>
              <Label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.free}
                  onChange={(e) => setFormData({ ...formData, free: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                Free Resource
              </Label>
            </FormGroup>
          </form>
        </PanelBody>
        <PanelFooter>
          <SecondaryButton type="button" onClick={handleClosePanel}>Cancel</SecondaryButton>
          <PrimaryButton type="submit" form="resource-form">
            {editingResource ? 'Update Resource' : 'Create Resource'}
          </PrimaryButton>
        </PanelFooter>
      </SidePanel>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalTitle>Delete Resource?</ModalTitle>
          <ModalText>
            Are you sure you want to delete "{deletingResource?.title}"? This action cannot be undone.
          </ModalText>
          <ModalActions>
            <SecondaryButton onClick={() => setIsModalOpen(false)}>Cancel</SecondaryButton>
            <DangerButton onClick={handleDeleteConfirm}>Delete</DangerButton>
          </ModalActions>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddResourcesPage;
