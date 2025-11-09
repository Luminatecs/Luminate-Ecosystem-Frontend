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
        <Label>Select Organization</Label>
        <Select disabled>
          <option>Loading organizations...</option>
        </Select>
      </SelectorContainer>
    );
  }

  if (error) {
    return (
      <SelectorContainer>
        <Label>Select Organization</Label>
        <ErrorMessage>{error}</ErrorMessage>
      </SelectorContainer>
    );
  }

  return (
    <SelectorContainer>
      <Label>Select Organization</Label>
      <Select
        value={selectedOrganizationId || ''}
        onChange={handleChange}
        required
      >
        <option value="">-- Select an organization --</option>
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

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #1967d2;
  }

  &:focus {
    border-color: #1967d2;
    box-shadow: 0 0 0 3px rgba(25, 103, 210, 0.1);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
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
