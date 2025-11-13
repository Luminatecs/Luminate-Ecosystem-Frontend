import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OrganizationService, { Organization } from '../../services/OrganizationService';

interface OrganizationSelectorProps {
  onOrganizationSelect: (organizationId: string) => void;
  selectedOrganizationId?: string;
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({
  onOrganizationSelect,
  selectedOrganizationId
}) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await OrganizationService.getOrganizations({ page: 1, limit: 100 });
      
      let orgs: Organization[] = [];
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        orgs = response.data;
      } else if (response.data && typeof response.data === 'object') {
        orgs = (response.data as any).data || [];
      }
      
      console.log('📋 Loaded organizations for selector:', orgs.length);
      setOrganizations(orgs);
    } catch (err) {
      console.error('❌ Failed to load organizations:', err);
      setError(err instanceof Error ? err.message : 'Failed to load organizations');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const orgId = e.target.value;
    if (orgId) {
      onOrganizationSelect(orgId);
    }
  };

  if (loading) {
    return (
      <SelectorContainer>
        <Select disabled>
          <option>Loading organizations...</option>
        </Select>
      </SelectorContainer>
    );
  }

  if (error) {
    return (
      <SelectorContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </SelectorContainer>
    );
  }

  return (
    <SelectorContainer>
      <Select
        value={selectedOrganizationId || ''}
        onChange={handleChange}
        required
      >
        <option value="" disabled style={{ color: '#9CA3AF' }}>
          Select an organization
        </option>
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </Select>
      {organizations.length === 0 && (
        <EmptyMessage>No organizations available</EmptyMessage>
      )}
    </SelectorContainer>
  );
};

export default OrganizationSelector;

// Styled Components
const SelectorContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #1f2937;
  background-color: #fff;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;

  /* Style for the placeholder option */
  option:disabled {
    color: #9CA3AF;
  }

  /* When no selection is made, show grey text */
  &:invalid {
    color: #9CA3AF;
  }

  /* When a value is selected, show normal text */
  &:valid {
    color: #1f2937;
  }

  &:hover:not(:disabled) {
    border-color: #cbd5e1;
  }

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background-color: #f8fafc;
    cursor: not-allowed;
    color: #9CA3AF;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 8px;
  padding: 12px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 6px;
  color: #c33;
  font-size: 13px;
`;

const EmptyMessage = styled.div`
  margin-top: 8px;
  padding: 12px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  color: #666;
  font-size: 13px;
  text-align: center;
`;
