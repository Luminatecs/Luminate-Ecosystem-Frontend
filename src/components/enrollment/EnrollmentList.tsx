/**
 * Enrollment List Component
 * Display, filter, search, and manage student enrollments
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { EnrollmentService } from '../../services/EnrollmentService';

interface EnrollmentListProps {
  organizationId: string;
  onEnrollmentClick?: (enrollmentId: string) => void;
}

interface Enrollment {
  id: string;
  studentName: string;
  guardianName: string;
  guardianEmail: string;
  gradeLevel: string;
  academicYear: string;
  status: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'TRANSFERRED';
  enrollmentDate: string;
}

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'GRADUATED', label: 'Graduated' },
  { value: 'TRANSFERRED', label: 'Transferred' }
];

const GRADE_LEVELS = [
  { value: '', label: 'All Grades' },
  { value: '1', label: 'Grade 1' },
  { value: '2', label: 'Grade 2' },
  { value: '3', label: 'Grade 3' },
  { value: '4', label: 'Grade 4' },
  { value: '5', label: 'Grade 5' },
  { value: '6', label: 'Grade 6' },
  { value: '7', label: 'Grade 7' },
  { value: '8', label: 'Grade 8' },
  { value: '9', label: 'Grade 9' },
  { value: '10', label: 'Grade 10' },
  { value: '11', label: 'Grade 11' },
  { value: '12', label: 'Grade 12' }
];

export const EnrollmentList: React.FC<EnrollmentListProps> = ({
  organizationId,
  onEnrollmentClick
}) => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Statistics
  const [stats, setStats] = useState<any>(null);
  
  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadEnrollments = async () => {
    setLoading(true);
    setError('');

    try {
      const filters: any = {};
      if (statusFilter) filters.status = statusFilter;
      if (gradeFilter) filters.gradeLevel = gradeFilter;
      if (yearFilter) filters.academicYear = yearFilter;

      const response = await EnrollmentService.getEnrollmentsByOrganization(organizationId, filters);

      if (response.success && response.data) {
        setEnrollments(response.data);
      } else {
        setError(response.error || 'Failed to load enrollments');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await EnrollmentService.getEnrollmentStats(organizationId);
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  useEffect(() => {
    loadEnrollments();
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId, statusFilter, gradeFilter, yearFilter]);

  const handleStatusChange = async (enrollmentId: string, newStatus: string) => {
    try {
      const response = await EnrollmentService.updateEnrollmentStatus(
        enrollmentId, 
        newStatus as 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'TRANSFERRED' | 'WITHDRAWN'
      );

      if (response.success) {
        // Update local state
        setEnrollments(prev =>
          prev.map(e => e.id === enrollmentId ? { ...e, status: newStatus as any } : e)
        );
        
        // Reload stats
        loadStats();
      } else {
        setError(response.error || 'Failed to update status');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    }
  };

  const handleDelete = async (enrollmentId: string) => {
    try {
      const response = await EnrollmentService.deleteEnrollment(enrollmentId);

      if (response.success) {
        // Remove from local state
        setEnrollments(prev => prev.filter(e => e.id !== enrollmentId));
        setDeleteConfirm(null);
        
        // Reload stats
        loadStats();
      } else {
        setError(response.error || 'Failed to delete enrollment');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete enrollment');
    }
  };

  // Filter enrollments by search term
  const filteredEnrollments = enrollments.filter(enrollment => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      enrollment.studentName.toLowerCase().includes(searchLower) ||
      enrollment.guardianName.toLowerCase().includes(searchLower) ||
      enrollment.guardianEmail.toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEnrollments = filteredEnrollments.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, gradeFilter, yearFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return '#48bb78';
      case 'PENDING': return '#ed8936';
      case 'INACTIVE': return '#718096';
      case 'GRADUATED': return '#4299e1';
      case 'TRANSFERRED': return '#9f7aea';
      default: return '#718096';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Container>
      {/* Statistics Cards */}
      {stats && (
        <StatsGrid>
          <StatCard color="#4299e1">
            <StatNumber>{stats.totalEnrollments}</StatNumber>
            <StatLabel>Total Enrollments</StatLabel>
          </StatCard>
          <StatCard color="#48bb78">
            <StatNumber>{stats.activeEnrollments}</StatNumber>
            <StatLabel>Active Students</StatLabel>
          </StatCard>
          <StatCard color="#ed8936">
            <StatNumber>{stats.pendingEnrollments}</StatNumber>
            <StatLabel>Pending</StatLabel>
          </StatCard>
          <StatCard color="#9f7aea">
            <StatNumber>{stats.currentAcademicYear}</StatNumber>
            <StatLabel>Current Year</StatLabel>
          </StatCard>
        </StatsGrid>
      )}

      {/* Filters and Search */}
      <FiltersSection>
        <SearchBox>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search by student name, guardian name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <ClearButton onClick={() => setSearchTerm('')}>✗</ClearButton>
          )}
        </SearchBox>

        <FiltersRow>
          <FilterGroup>
            <FilterLabel>Status</FilterLabel>
            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Grade Level</FilterLabel>
            <FilterSelect
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
            >
              {GRADE_LEVELS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Academic Year</FilterLabel>
            <FilterInput
              type="text"
              placeholder="e.g., 2024-2025"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            />
          </FilterGroup>

          {(searchTerm || statusFilter || gradeFilter || yearFilter) && (
            <ClearFiltersButton
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
                setGradeFilter('');
                setYearFilter('');
              }}
            >
              Clear All Filters
            </ClearFiltersButton>
          )}
        </FiltersRow>
      </FiltersSection>

      {/* Results Count */}
      <ResultsInfo>
        Showing {paginatedEnrollments.length} of {filteredEnrollments.length} enrollments
        {filteredEnrollments.length !== enrollments.length && 
          ` (filtered from ${enrollments.length} total)`
        }
      </ResultsInfo>

      {/* Error Message */}
      {error && <ErrorBanner>{error}</ErrorBanner>}

      {/* Loading State */}
      {loading && (
        <LoadingContainer>
          <LoadingSpinner>⏳</LoadingSpinner>
          <LoadingText>Loading enrollments...</LoadingText>
        </LoadingContainer>
      )}

      {/* Empty State */}
      {!loading && filteredEnrollments.length === 0 && (
        <EmptyState>
          <EmptyIcon>📋</EmptyIcon>
          <EmptyTitle>No Enrollments Found</EmptyTitle>
          <EmptyText>
            {searchTerm || statusFilter || gradeFilter || yearFilter
              ? 'Try adjusting your filters or search term'
              : 'Start by creating your first student enrollment'
            }
          </EmptyText>
        </EmptyState>
      )}

      {/* Enrollments Table */}
      {!loading && paginatedEnrollments.length > 0 && (
        <>
          <TableContainer>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Student Name</TableHeader>
                  <TableHeader>Grade</TableHeader>
                  <TableHeader>Guardian</TableHeader>
                  <TableHeader>Contact</TableHeader>
                  <TableHeader>Academic Year</TableHeader>
                  <TableHeader>Enrolled Date</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {paginatedEnrollments.map(enrollment => (
                  <TableRow key={enrollment.id}>
                    <TableCell>
                      <StudentName 
                        onClick={() => onEnrollmentClick?.(enrollment.id)}
                      >
                        {enrollment.studentName}
                      </StudentName>
                    </TableCell>
                    <TableCell>Grade {enrollment.gradeLevel}</TableCell>
                    <TableCell>{enrollment.guardianName}</TableCell>
                    <TableCell>{enrollment.guardianEmail}</TableCell>
                    <TableCell>{enrollment.academicYear}</TableCell>
                    <TableCell>{formatDate(enrollment.enrollmentDate)}</TableCell>
                    <TableCell>
                      <StatusSelect
                        value={enrollment.status}
                        onChange={(e) => handleStatusChange(enrollment.id, e.target.value)}
                        color={getStatusColor(enrollment.status)}
                      >
                        {STATUS_OPTIONS.slice(1).map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </StatusSelect>
                    </TableCell>
                    <TableCell>
                      {deleteConfirm === enrollment.id ? (
                        <ConfirmButtons>
                          <ConfirmButton onClick={() => handleDelete(enrollment.id)}>
                            ✓ Confirm
                          </ConfirmButton>
                          <CancelConfirmButton onClick={() => setDeleteConfirm(null)}>
                            ✗ Cancel
                          </CancelConfirmButton>
                        </ConfirmButtons>
                      ) : (
                        <DeleteButton onClick={() => setDeleteConfirm(enrollment.id)}>
                          🗑️ Delete
                        </DeleteButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationButton
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                ← Previous
              </PaginationButton>

              <PageInfo>
                Page {currentPage} of {totalPages}
              </PageInfo>

              <PaginationButton
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next →
              </PaginationButton>
            </Pagination>
          )}
        </>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div<{ color: string }>`
  padding: 24px;
  background: white;
  border: 2px solid ${props => props.color};
  border-radius: 12px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
`;

const FiltersSection = styled.div`
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  font-size: 18px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 48px 12px 48px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #718096;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #f56565;
  }
`;

const FiltersRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
  gap: 16px;
  align-items: end;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
`;

const FilterSelect = styled.select`
  padding: 10px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const FilterInput = styled.input`
  padding: 10px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const ClearFiltersButton = styled.button`
  padding: 10px 20px;
  background: white;
  color: #f56565;
  border: 2px solid #f56565;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    background: #fff5f5;
  }
`;

const ResultsInfo = styled.div`
  font-size: 14px;
  color: #718096;
  font-weight: 500;
`;

const ErrorBanner = styled.div`
  padding: 16px 20px;
  background: #fff5f5;
  border: 2px solid #f56565;
  border-radius: 8px;
  color: #c53030;
  font-size: 14px;
  font-weight: 500;
`;

const LoadingContainer = styled.div`
  padding: 80px 40px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #718096;
`;

const EmptyState = styled.div`
  padding: 80px 40px;
  text-align: center;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
`;

const EmptyText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #718096;
`;

const TableContainer = styled.div`
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:hover {
    background: #f7fafc;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
`;

const TableHeader = styled.th`
  padding: 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  color: #2d3748;
  text-transform: uppercase;
  background: #f7fafc;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
`;

const TableCell = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #4a5568;
`;

const StudentName = styled.button`
  background: none;
  border: none;
  color: #4299e1;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

const StatusSelect = styled.select<{ color: string }>`
  padding: 6px 12px;
  background: white;
  color: ${props => props.color};
  border: 2px solid ${props => props.color};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    filter: brightness(0.95);
  }

  &:focus {
    outline: none;
  }
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  background: white;
  color: #f56565;
  border: 2px solid #f56565;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    background: #fff5f5;
  }
`;

const ConfirmButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ConfirmButton = styled.button`
  padding: 8px 12px;
  background: #f56565;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #e53e3e;
  }
`;

const CancelConfirmButton = styled.button`
  padding: 8px 12px;
  background: white;
  color: #718096;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #f7fafc;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const PaginationButton = styled.button`
  padding: 10px 20px;
  background: white;
  color: #4299e1;
  border: 2px solid #4299e1;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #ebf8ff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
`;
