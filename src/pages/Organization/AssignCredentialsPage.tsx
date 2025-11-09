import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AuthService from '../../services/auth/AuthService';
import { useAuth } from '../../contexts/auth/AuthContext';
import OrganizationSelector from '../../components/common/OrganizationSelector';

const PageContainer = styled.div`
  padding: 24px;
  background: white;
  min-height: calc(100vh - 80px);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 4px 0;
  letter-spacing: 0;
`;

const PageDescription = styled.p`
  font-size: 14px;
  color: #5f6368;
  margin: 0;
  line-height: 20px;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e8eaed;
  overflow: hidden;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  
  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const TableHead = styled.thead`
  background: linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e8eaed;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f8f9fa;
  }
`;

const TableHeader = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: 500;
  color: white;
  white-space: nowrap;
`;

const TableCell = styled.td`
  padding: 16px;
  color: #202124;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  background: #1967d2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: #1557b0;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  }

  &:disabled {
    background: #dadce0;
    color: #80868b;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: #5f6368;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: #5f6368;
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: #fce8e6;
  border-left: 4px solid #d93025;
  border-radius: 4px;
  color: #c5221f;
  font-size: 14px;
  margin-bottom: 16px;
`;

const SuccessMessage = styled.div`
  padding: 12px 16px;
  background: #e6f4ea;
  border-left: 4px solid #1e8e3e;
  border-radius: 4px;
  color: #137333;
  font-size: 14px;
  margin-bottom: 16px;
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
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

const PageButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  background: ${props => props.active ? '#1967d2' : 'white'};
  color: ${props => props.active ? 'white' : '#5f6368'};
  border: 1px solid ${props => props.active ? '#1967d2' : '#dadce0'};
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: ${props => props.active ? '#1557b0' : '#f1f3f4'};
    border-color: ${props => props.active ? '#1557b0' : '#dadce0'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface Student {
  id: string;
  name: string;
  email: string;
  education_level: string;
  created_at: string;
}

/**
 * Assign Credentials Page
 */
const AssignCredentialsPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [sendingCredentials, setSendingCredentials] = useState<Set<string>>(new Set());
  
  const isSuperOrAccessAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ACCESS_ADMIN';
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await AuthService.getOrganizationWards(
        isSuperOrAccessAdmin ? selectedOrganizationId : undefined
      );
      
      if (response.success && response.data) {
        setStudents(response.data.wards || []);
      } else {
        throw new Error(response.message || 'Failed to fetch students');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSuperOrAccessAdmin || selectedOrganizationId) {
      fetchStudents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);

  const handleSendCredentials = async (studentId: string, studentEmail: string) => {
    setSendingCredentials(prev => new Set(prev).add(studentId));
    setError('');
    setSuccessMessage('');

    try {
      // Backend endpoint sends to all unassigned wards, not individual ones
      const response = await AuthService.assignWardsCredentials(
        isSuperOrAccessAdmin ? selectedOrganizationId : undefined
      );
      
      if (response.success) {
        setSuccessMessage(`Credentials sent successfully to all unassigned students`);
        // Refresh the list to show updated status
        await fetchStudents();
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        throw new Error(response.message || 'Failed to send credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send credentials');
      setTimeout(() => setError(''), 5000);
    } finally {
      setSendingCredentials(prev => {
        const newSet = new Set(prev);
        newSet.delete(studentId);
        return newSet;
      });
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = students.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle>Assign Student Credentials</PageTitle>
          <PageDescription>
            Send login credentials to students via email
          </PageDescription>
        </PageHeader>
        <LoadingContainer>Loading students...</LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Assign Student Credentials</PageTitle>
        <PageDescription>
          Send login credentials to students via email
        </PageDescription>
      </PageHeader>

      {isSuperOrAccessAdmin && (
        <div style={{ marginBottom: '24px' }}>
          <OrganizationSelector
            selectedOrganizationId={selectedOrganizationId}
            onOrganizationSelect={setSelectedOrganizationId}
          />
        </div>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <TableContainer>
        {students.length === 0 ? (
          <EmptyState>
            <p>No students found. Add students first before assigning credentials.</p>
          </EmptyState>
        ) : (
          <>
            <TableWrapper>
              <Table>
                <TableHead>
                  <tr>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Education Level</TableHeader>
                    <TableHeader>Date Added</TableHeader>
                    <TableHeader>Action</TableHeader>
                  </tr>
                </TableHead>
                <tbody>
                  {currentStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.education_level?.replace('_', ' ') || 'N/A'}</TableCell>
                      <TableCell>
                        {new Date(student.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <ActionButton
                          onClick={() => handleSendCredentials(student.id, student.email)}
                          disabled={sendingCredentials.has(student.id)}
                        >
                          {sendingCredentials.has(student.id) ? 'Sending...' : 'Send Credentials'}
                        </ActionButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>

            {totalPages > 1 && (
              <PaginationContainer>
                <PaginationInfo>
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, students.length)} of {students.length} students
                </PaginationInfo>
                <PaginationButtons>
                  <PageButton
                    onClick={() => goToPage(currentPage - 1)}
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
                        active={currentPage === pageNum}
                        onClick={() => goToPage(pageNum)}
                      >
                        {pageNum}
                      </PageButton>
                    );
                  })}
                  
                  <PageButton
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </PageButton>
                </PaginationButtons>
              </PaginationContainer>
            )}
          </>
        )}
      </TableContainer>
    </PageContainer>
  );
};

export default AssignCredentialsPage;
