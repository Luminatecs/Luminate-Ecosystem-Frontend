import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { ResourcesService } from '../../services/ResourcesService';
import { IResource } from '../../types/resources';

// Styled Components (matching organization dashboard)
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const SidePanel = styled.div<{ isExpanded: boolean }>`
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  width: ${props => props.isExpanded ? '280px' : '80px'};
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  color: white;
  position: relative;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
`;

const SidePanelHeader = styled.div<{ isExpanded: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const OrgTitle = styled.h2<{ isExpanded: boolean }>`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  opacity: ${props => props.isExpanded ? 1 : 0};
  transition: opacity 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
`;

const NavigationList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavigationItem = styled.div<{ isActive: boolean; isExpanded: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  border: ${props => props.isActive ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .icon {
    font-size: 1.5rem;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    font-weight: 500;
    opacity: ${props => props.isExpanded ? 1 : 0};
    transition: opacity 0.3s ease;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  margin-top: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  overflow: auto;
  background: #f8fafc;
  padding: 2rem;
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
`;

const PageHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
`;

const PageDescription = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 1.1rem;
`;

// Create Resources Component
const CreateResources: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    full_description: '',
    category: '',
    type: '',
    resource_type: 'students' as 'students' | 'parents' | 'counselors',
    link: '',
    features: [''],
    difficulty: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    duration: '',
    rating: 5,
    featured: false,
    free: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Process features array
      const features = formData.features.filter(f => f.trim() !== '');
      
      const resourceData = {
        ...formData,
        features
      };

      await ResourcesService.createResource(resourceData);
      alert('Resource created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        full_description: '',
        category: '',
        type: '',
        resource_type: 'students',
        link: '',
        features: [''],
        difficulty: 'Beginner',
        duration: '',
        rating: 5,
        featured: false,
        free: true
      });
    } catch (error: any) {
      alert('Error creating resource: ' + error.message);
    }
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Resource Type</label>
            <select
              value={formData.resource_type}
              onChange={(e) => setFormData(prev => ({ ...prev, resource_type: e.target.value as any }))}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
            >
              <option value="students">Students</option>
              <option value="parents">Parents</option>
              <option value="counselors">Counselors</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Type</label>
            <input
              type="text"
              required
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Full Description</label>
          <textarea
            required
            rows={5}
            value={formData.full_description}
            onChange={(e) => setFormData(prev => ({ ...prev, full_description: e.target.value }))}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Link (Optional)</label>
          <input
            type="url"
            value={formData.link}
            onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Features</label>
          {formData.features.map((feature, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                style={{ flex: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                placeholder="Enter a feature"
              />
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  style={{ padding: '0.75rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.5rem' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            style={{ padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Plus size={16} />
            Add Feature
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as any }))}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
              placeholder="e.g., 30 minutes"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
            />
            Featured Resource
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={formData.free}
              onChange={(e) => setFormData(prev => ({ ...prev, free: e.target.checked }))}
            />
            Free Resource
          </label>
        </div>

        <button
          type="submit"
          style={{ 
            padding: '1rem 2rem', 
            background: '#4f46e5', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0.5rem', 
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Save size={20} />
          Create Resource
        </button>
      </form>
    </div>
  );
};

// Manage Resources Component  
const ManageResources: React.FC = () => {
  const [resources, setResources] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ResourcesService.getAllResources();
      setResources(response.data || []);
    } catch (err: any) {
      console.error('Error fetching resources:', err);
      setError(err.message || 'Failed to fetch resources');
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || resource.resource_type === filterType;

    return matchesSearch && matchesType;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        // TODO: Implement delete API call
        console.log('Delete resource:', id);
        // await ResourcesService.deleteResource(id);
        // fetchResources();
      } catch (err: any) {
        console.error('Error deleting resource:', err);
        setError('Failed to delete resource');
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading resources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#dc2626' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.5rem',
              paddingLeft: '2.5rem'
            }}
          />
          <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
        </div>
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
        >
          <option value="all">All Types</option>
          <option value="students">Students</option>
          <option value="parents">Parents</option>
          <option value="counselors">Counselors</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            style={{
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '600' }}>
                {resource.title}
              </h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
                <span style={{
                  background: resource.resource_type === 'students' ? '#dbeafe' : 
                           resource.resource_type === 'parents' ? '#fef3c7' : '#d1fae5',
                  color: resource.resource_type === 'students' ? '#1e40af' : 
                         resource.resource_type === 'parents' ? '#b45309' : '#059669',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontWeight: '500',
                  textTransform: 'capitalize'
                }}>
                  {resource.resource_type}
                </span>
                <span>⭐ {resource.rating.toFixed(1)}</span>
                <span>{resource.category}</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <p style={{ color: '#6b7280', margin: '0 0 1rem 0', lineHeight: '1.5' }}>
                {resource.description}
              </p>

              {resource.features && resource.features.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem' }}>
                    {resource.features.slice(0, 3).map((feature: string, index: number) => (
                      <li key={index} style={{ color: '#6b7280', marginBottom: '0.25rem', paddingLeft: '1rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#4f46e5' }}>•</span>
                        {feature}
                      </li>
                    ))}
                    {resource.features.length > 3 && (
                      <li style={{ color: '#6b7280', marginBottom: '0.25rem', paddingLeft: '1rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#4f46e5' }}>•</span>
                        +{resource.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                {resource.link && (
                  <button
                    onClick={() => window.open(resource.link, '_blank')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      background: 'white',
                      color: '#6b7280',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    <Eye size={16} />
                    View
                  </button>
                )}
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #4f46e5',
                    borderRadius: '0.375rem',
                    background: '#4f46e5',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(resource.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #ef4444',
                    borderRadius: '0.375rem',
                    background: '#ef4444',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No resources found</h3>
          <p style={{ marginBottom: '1.5rem' }}>There are no resources matching your current filters.</p>
        </div>
      )}
    </div>
  );
};

// Navigation items configuration
interface NavigationItemConfig {
  id: string;
  label: string;
  icon: string;
  component: React.ComponentType<any>;
  description: string;
}

const navigationItems: NavigationItemConfig[] = [
  {
    id: 'create-resources',
    label: 'Create Resources',
    icon: '➕',
    component: CreateResources,
    description: 'Create new educational resources for students, parents, and counselors'
  },
  {
    id: 'manage-resources',
    label: 'Manage Resources',
    icon: '📚',
    component: ManageResources,
    description: 'View, edit, and manage existing resources in the system'
  }
];

/**
 * Admin Settings Component
 */
const AdminSettings: React.FC = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState<string>('create-resources');

  const currentNavItem = navigationItems.find(item => item.id === activeItem);
  const CurrentComponent = currentNavItem?.component;

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBackToDashboard = () => {
    navigate('/super-admin-dashboard');
  };

  return (
    <DashboardContainer>
      <SidePanel isExpanded={isExpanded}> 
        <SidePanelHeader isExpanded={isExpanded}>
          <HamburgerButton onClick={toggleSidebar}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </HamburgerButton>
          
          <OrgTitle isExpanded={isExpanded}>
            Settings & Resources
          </OrgTitle>
        </SidePanelHeader>

        <NavigationList>
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              isActive={activeItem === item.id}
              isExpanded={isExpanded}
              onClick={() => setActiveItem(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span className="text">{item.label}</span>
            </NavigationItem>
          ))}
        </NavigationList>

        <BackButton onClick={handleBackToDashboard}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Dashboard
        </BackButton>
      </SidePanel>

      <ContentArea>
        <ContentCard>
          <PageHeader>
            <PageTitle>{currentNavItem?.label}</PageTitle>
            <PageDescription>{currentNavItem?.description}</PageDescription>
          </PageHeader>

          {CurrentComponent && <CurrentComponent />}
        </ContentCard>
      </ContentArea>
    </DashboardContainer>
  );
};

export default AdminSettings;
