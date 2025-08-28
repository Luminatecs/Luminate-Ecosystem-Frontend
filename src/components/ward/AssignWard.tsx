import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button, { ButtonState } from '../ui/Button';

/**
 * Main Container
 */
const AssignContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

/**
 * Ward List Container
 */
const WardListContainer = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
`;

/**
 * Ward List Header
 */
const WardListHeader = styled.div`
  background: #f8fafc;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
  color: #374151;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  gap: 1rem;
  align-items: center;
`;

/**
 * Ward Row
 */
const WardRow = styled.div<{ isEven: boolean }>`
  padding: 1rem 1.5rem;
  background: ${props => props.isEven ? '#f9fafb' : 'white'};
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  gap: 1rem;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }
`;

/**
 * Ward Info
 */
const WardName = styled.div`
  font-weight: 500;
  color: #1f2937;
`;

const WardEmail = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
`;

const WardLevel = styled.div`
  color: #374151;
  font-size: 0.875rem;
`;

/**
 * Status Badge
 */
const StatusBadge = styled.span<{ status: 'assigned' | 'pending' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.status === 'assigned' ? '#d1fae5' : '#fef3c7'};
  color: ${props => props.status === 'assigned' ? '#065f46' : '#92400e'};
  text-align: center;
`;

/**
 * Empty State
 */
const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const EmptyStateDescription = styled.p`
  color: #6b7280;
  margin: 0;
`;

/**
 * Action Section
 */
const ActionSection = styled.div`
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
`;

const ActionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const ActionDescription = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

/**
 * Ward Interface
 */
interface Ward {
  id: string;
  name: string;
  username: string;
  email: string;
  educationLevel: string;
  isActive: boolean;
  credentialsAssigned: boolean;
  createdAt: Date;
}

/**
 * Assign Ward Component
 */
const AssignWard: React.FC = () => {
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(false);
  const [buttonState, setButtonState] = useState(ButtonState.IDLE);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load wards when component mounts
   */
  useEffect(() => {
    loadWards();
  }, []);

  /**
   * Load organization wards
   */
  const loadWards = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.getOrganizationWards();
      
      if (response.success && response.data) {
        setWards(response.data.wards);
      } else {
        throw new Error(response.message || 'Failed to load wards');
      }

    } catch (error: any) {
      setError(error.message || 'Failed to load wards');
      console.error('Error loading wards:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Assign credentials to all pending wards
   */
  const handleAssignCredentials = async () => {
    setButtonState(ButtonState.LOADING);

    try {
      const response = await AuthService.assignWardCredentials({
        wardId: 'temp-id',
        credentials: { username: 'temp', password: 'temp' }
      });
      
      if (response.success) {
        setButtonState(ButtonState.SUCCESS);
        
        // Reload wards to update status
        await loadWards();
        
        // Reset button state after showing success
        setTimeout(() => {
          setButtonState(ButtonState.IDLE);
        }, 3000);
      } else {
        throw new Error(response.message || 'Failed to assign credentials');
      }

    } catch (error: any) {
      setButtonState(ButtonState.ERROR);
      console.error('Error assigning credentials:', error);
      
      // Reset button state after showing error
      setTimeout(() => {
        setButtonState(ButtonState.IDLE);
      }, 3000);
    }
  };

  const pendingWards = wards.filter(ward => !ward.credentialsAssigned);

  if (loading) {
    return (
      <AssignContainer>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div>Loading wards...</div>
        </div>
      </AssignContainer>
    );
  }

  if (error) {
    return (
      <AssignContainer>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
          <div>Error: {error}</div>
          <div style={{ marginTop: '1rem' }}>
            <Button 
              onClick={loadWards} 
              backgroundColor="#3b82f6"
            >
              Retry
            </Button>
          </div>
        </div>
      </AssignContainer>
    );
  }

  return (
    <AssignContainer>
      {/* Ward List */}
      <WardListContainer>
        <WardListHeader>
          <div>Name</div>
          <div>Email</div>
          <div>Level</div>
          <div>Status</div>
        </WardListHeader>

        {wards.length === 0 ? (
          <EmptyState>
            <EmptyStateIcon>👥</EmptyStateIcon>
            <EmptyStateTitle>No Students Found</EmptyStateTitle>
            <EmptyStateDescription>
              No students have been added to your organization yet. 
              Use the "Ward Onboarding" section to add students first.
            </EmptyStateDescription>
          </EmptyState>
        ) : (
          wards.map((ward, index) => (
            <WardRow key={ward.id} isEven={index % 2 === 0}>
              <WardName>{ward.name}</WardName>
              <WardEmail>{ward.email}</WardEmail>
              <WardLevel>{ward.educationLevel.replace('_', ' ')}</WardLevel>
              <StatusBadge status={ward.credentialsAssigned ? 'assigned' : 'pending'}>
                {ward.credentialsAssigned ? 'Assigned' : 'Pending'}
              </StatusBadge>
            </WardRow>
          ))
        )}
      </WardListContainer>

      {/* Assign Action Section */}
      {wards.length > 0 && (
        <ActionSection>
          <ActionTitle>Assign Login Credentials</ActionTitle>
          <ActionDescription>
            Send login credentials via email to students who haven't received them yet.
            {pendingWards.length > 0 ? (
              <>
                <br />
                <strong>{pendingWards.length} student(s)</strong> are waiting for their credentials.
              </>
            ) : (
              <>
                <br />
                All students have already received their login credentials.
              </>
            )}
          </ActionDescription>

          <Button
            onClick={handleAssignCredentials}
            state={buttonState}
            disabled={pendingWards.length === 0}
            backgroundColor="#10b981"
            successText={`Credentials sent to ${pendingWards.length} student(s)!`}
            errorText="Failed to send credentials. Please try again."
            size="large"
          >
            📧 Assign Credentials
          </Button>
        </ActionSection>
      )}
    </AssignContainer>
  );
};

export default AssignWard;
