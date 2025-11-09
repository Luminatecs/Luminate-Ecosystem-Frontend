import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(to right, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: 4px;
`;

export const SkeletonText = styled(SkeletonBase)<{ width?: string; height?: string }>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '1rem'};
`;

export const SkeletonCard = styled(SkeletonBase)`
  width: 100%;
  height: 120px;
  border-radius: 8px;
`;

export const SkeletonCircle = styled(SkeletonBase)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const StatsSkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TableSkeletonContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
`;

const TableRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const FormSkeletonContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  max-width: 600px;
`;

const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

/**
 * Stats Cards Skeleton
 */
export const StatsCardsSkeleton: React.FC = () => (
  <StatsSkeletonGrid>
    {[1, 2, 3, 4].map(i => (
      <SkeletonCard key={i} />
    ))}
  </StatsSkeletonGrid>
);

/**
 * Table Skeleton
 */
export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <TableSkeletonContainer>
    <SkeletonText width="30%" height="1.5rem" style={{ marginBottom: '1rem' }} />
    {Array.from({ length: rows }).map((_, i) => (
      <TableRow key={i}>
        <SkeletonCircle />
        <div style={{ flex: 1 }}>
          <SkeletonText width="60%" style={{ marginBottom: '0.5rem' }} />
          <SkeletonText width="40%" height="0.75rem" />
        </div>
      </TableRow>
    ))}
  </TableSkeletonContainer>
);

/**
 * Form Skeleton
 */
export const FormSkeleton: React.FC = () => (
  <FormSkeletonContainer>
    <SkeletonText width="40%" height="1.5rem" style={{ marginBottom: '1.5rem' }} />
    {[1, 2, 3].map(i => (
      <FormField key={i}>
        <SkeletonText width="30%" height="0.875rem" style={{ marginBottom: '0.5rem' }} />
        <SkeletonText width="100%" height="3rem" />
      </FormField>
    ))}
    <SkeletonText width="100%" height="2.5rem" />
  </FormSkeletonContainer>
);

/**
 * Page Loading Skeleton
 */
export const PageSkeleton: React.FC<{ type?: 'dashboard' | 'table' | 'form' }> = ({ type = 'dashboard' }) => {
  return (
    <div style={{ padding: '1.5rem' }}>
      <SkeletonText width="40%" height="1.5rem" style={{ marginBottom: '0.5rem' }} />
      <SkeletonText width="60%" height="0.875rem" style={{ marginBottom: '1.5rem' }} />
      
      {type === 'dashboard' && <StatsCardsSkeleton />}
      {type === 'table' && <TableSkeleton />}
      {type === 'form' && <FormSkeleton />}
    </div>
  );
};
