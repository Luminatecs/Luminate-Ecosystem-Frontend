import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, MapPin, Mail, Users, GraduationCap, Home } from 'lucide-react';
import { ISchool } from '../../../services/LibraryService';

/**
 * Clean, professional page container
 */
const PageContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

/**
 * Header section
 */
const Header = styled.div`
  background: #f8f9fa;
  border-bottom: 2px solid #1e40af;
  padding: 1rem 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #1e40af;
  border: 1px solid #1e40af;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #1e3a8a;
  }
`;

const PageTitle = styled.h1`
  color: #1e40af;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

/**
 * Main content area
 */
const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

/**
 * School information section
 */
const SchoolHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #1e40af;
`;

const SchoolName = styled.h1`
  color: #212529;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
`;

const SchoolLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const SchoolType = styled.div`
  display: inline-block;
  background: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
`;

/**
 * Information grid
 */
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const InfoSection = styled.div`
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-left: 3px solid #1e40af;
  border-radius: 8px;
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: #1e40af;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoItem = styled.div`
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.div`
  color: #1e40af;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  color: #212529;
  font-size: 16px;
`;

/**
 * Subjects section
 */
const SubjectsSection = styled.div`
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-left: 3px solid #1e40af;
  border-radius: 8px;
  padding: 1.5rem;
`;

const SubjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SubjectTag = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  color: #495057;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
`;

/**
 * Loading state
 */
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  color: #6c757d;
  font-size: 1.1rem;
`;

interface SearchResultsProps {}

const SearchResults: React.FC<SearchResultsProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [school, setSchool] = useState<ISchool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const schoolData = location.state?.school as ISchool;
    
    if (schoolData) {
      setSchool(schoolData);
      setLoading(false);
    } else {
      navigate('/library');
    }
  }, [location.state, navigate]);

  const handleGoBack = () => {
    navigate('/library');
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>Loading school information...</LoadingContainer>
      </PageContainer>
    );
  }

  if (!school) {
    return (
      <PageContainer>
        <LoadingContainer>School information not found</LoadingContainer>
      </PageContainer>
    );
  }

  // Parse subjects if available
  const coreSubjects = school.core ? school.core.split(',').map((s: string) => s.trim()) : [];
  const electiveSubjects = school.electives ? school.electives.split(',').map((s: string) => s.trim()) : [];

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <BackButton onClick={handleGoBack}>
            <ArrowLeft size={16} />
            Back to Search
          </BackButton>
          <PageTitle>School Details</PageTitle>
        </HeaderContent>
      </Header>

      <MainContent>
        <SchoolHeader>
          <SchoolName>{school.SCHOOL}</SchoolName>
          <SchoolLocation>
            <MapPin size={16} />
            {school.LOCATION}, {school.DISTRICT}, {school.REGION}
          </SchoolLocation>
          {school.GENDER && (
            <SchoolType>{school.GENDER} School</SchoolType>
          )}
        </SchoolHeader>

        <InfoGrid>
          <InfoSection>
            <SectionTitle>
              <Home size={18} />
              Basic Information
            </SectionTitle>
            <InfoItem>
              <InfoLabel>School Name</InfoLabel>
              <InfoValue>{school.SCHOOL}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>District</InfoLabel>
              <InfoValue>{school.DISTRICT}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Region</InfoLabel>
              <InfoValue>{school.REGION}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Location</InfoLabel>
              <InfoValue>{school.LOCATION}</InfoValue>
            </InfoItem>
            {school.GENDER && (
              <InfoItem>
                <InfoLabel>Gender</InfoLabel>
                <InfoValue>{school.GENDER}</InfoValue>
              </InfoItem>
            )}
          </InfoSection>

          <InfoSection>
            <SectionTitle>
              <GraduationCap size={18} />
              Academic Information
            </SectionTitle>
            {school.Categories2 && (
              <InfoItem>
                <InfoLabel>Categories</InfoLabel>
                <InfoValue>{school.Categories2}</InfoValue>
              </InfoItem>
            )}
            {school.RESIDENCY && (
              <InfoItem>
                <InfoLabel>Residency</InfoLabel>
                <InfoValue>{school.RESIDENCY}</InfoValue>
              </InfoItem>
            )}
          </InfoSection>

          {school["EMAIL ADDRESS"] && (
            <InfoSection>
              <SectionTitle>
                <Mail size={18} />
                Contact Information
              </SectionTitle>
              <InfoItem>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{school["EMAIL ADDRESS"]}</InfoValue>
              </InfoItem>
            </InfoSection>
          )}
        </InfoGrid>

        {(coreSubjects.length > 0 || electiveSubjects.length > 0) && (
          <SubjectsSection>
            <SectionTitle>
              <Users size={18} />
              Available Subjects
            </SectionTitle>
            <SubjectsGrid>
              {coreSubjects.map((subject: string, index: number) => (
                <SubjectTag key={`core-${index}`}>Core: {subject}</SubjectTag>
              ))}
              {electiveSubjects.map((subject: string, index: number) => (
                <SubjectTag key={`elective-${index}`}>Elective: {subject}</SubjectTag>
              ))}
            </SubjectsGrid>
          </SubjectsSection>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default SearchResults;
