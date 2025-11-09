import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, X, Clock, ArrowLeft } from 'lucide-react';
import LibraryService, { ISchool } from '../../../services/LibraryService';
import { useAuth } from '../../../contexts/auth';

/**
 * Google-style Library Search Container
 */
const LibraryContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

/**
 * Header with Back Button
 */
const Header = styled.div`
  padding: 0;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UpdatedInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
`;

/**
 * Back Button
 */
const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #4338ca;
    transform: translateX(-2px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

/**
 * Main Content Area - Much higher positioning
 */
const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 1rem; /* Much less padding for higher positioning */
  padding-bottom: 4rem;
  position: relative;
`;

/**
 * Google-style Logo - Smaller and higher
 */
const Logo = styled.div`
  font-size: 4.5rem; /* Even smaller */
  font-weight: 400;
  margin-bottom: 1rem; /* Reduced margin */
  text-align: center;
  
  .luminate {
    background: linear-gradient(135deg, #4285f4 25%, #fbbc05 75%, #4285f4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -2px;
  }
  
  .library {
    color: #5f6368;
    font-size: 0.6em;
    display: block;
    margin-top: -1rem;
    font-weight: 300;
  }
`;

/**
 * Search Container with dropdown - Much higher
 */
const SearchContainer = styled.div`
  width: 100%;
  max-width: 584px;
  position: relative;
  margin-bottom: 2rem; /* Minimal margin */
`;

/**
 * Results Dropdown Container
 */
const ResultsDropdown = styled.div<{ show?: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #dfe1e5;
  border-radius: 8px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: ${props => props.show ? 'block' : 'none'};
  width: 100%;
`;

/**
 * Google-style Search Input with rounded border
 */
const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  padding: 0 20px 0 48px;
  font-size: 16px;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px 1px rgba(66,133,244,.24);

  &:hover {
    box-shadow: 0 2px 8px 1px rgba(66,133,244,.24);
    border-color: #dfe1e5;
  }

  &:focus {
    border-color: #4285f4;
    box-shadow: 0 2px 8px 1px rgba(66,133,244,.24);
  }

  &::placeholder {
    color: #9aa0a6;
  }
`;

/**
 * Search Icon using Lucide React
 */
const SearchIconContainer = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9aa0a6;
  pointer-events: none;
  display: flex;
  align-items: center;
`;

/**
 * Clear Button using Lucide React
 */
const ClearButton = styled.button<{ show?: boolean }>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9aa0a6;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #f1f3f4;
  }
`;

/**
 * Individual Result Item in dropdown
 */
const ResultItem = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #f1f3f4;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

/**
 * Result School Name
 */
const ResultTitle = styled.h3`
  color: #1a0dab;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.3;
  margin: 0 0 4px 0;
`;

/**
 * Result Description
 */
const ResultDescription = styled.div`
  color: #4d5156;
  font-size: 14px;
  line-height: 1.4;
  max-width: 600px;
`;

/**
 * Loading/No Results Message
 */
const MessageText = styled.div`
  padding: 16px;
  color: #70757a;
  font-size: 14px;
  text-align: center;
`;

/**
 * Library Component
 */
const Library: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ISchool[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    setIsLoading(true);
    setShowResults(true);
    
    try {
      const response = await LibraryService.searchSchoolData(query.trim());
      if (response.success && response.data) {
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Auto-search as user types (debounced)
    if (value.length > 2) {
      const timeoutId = setTimeout(() => {
        handleSearch(value);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else if (value.length === 0) {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleSchoolClick = (school: ISchool) => {
    // Navigate to SearchResults page with school data
    navigate('/library/search-results', { state: { school } });
  };

  const handleBackToEcosystem = () => {
    if (isSuperAdmin) {
      navigate('/super-admin-dashboard');
    } else {
      navigate('/ecosystem');
    }
  };

  return (
    <LibraryContainer>
      <Header>
        <HeaderContent>
          <LogoContainer>
            <img 
              src="/luminate-logo.png" 
              alt="Luminate Logo" 
              style={{ 
                width: '120px', 
                height: 'auto',
                objectFit: 'contain'
              }} 
            />
          </LogoContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <UpdatedInfo>
              <Clock size={16} />
              <span>Updated Daily</span>
            </UpdatedInfo>
            <BackButton onClick={handleBackToEcosystem}>
              <ArrowLeft />
              Back to Ecosystem
            </BackButton>
          </div>
        </HeaderContent>
      </Header>

      <MainContent>
        <Logo>
          <span className="luminate">Library</span>
        </Logo>

        <SearchContainer>
          <form onSubmit={handleSearchSubmit}>
            <SearchIconContainer>
              <Search size={18} />
            </SearchIconContainer>
            <SearchInput
              type="text"
              placeholder="Search for schools by region, courses..."
              value={searchQuery}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <ClearButton 
              type="button"
              show={searchQuery.length > 0}
              onClick={handleClearSearch}
            >
              <X size={16} />
            </ClearButton>
          </form>

          <ResultsDropdown show={showResults}>
            {isLoading ? (
              <MessageText>Searching...</MessageText>
            ) : searchResults.length > 0 ? (
              searchResults.map((school, index) => (
                <ResultItem 
                  key={index}
                  onClick={() => handleSchoolClick(school)}
                >
                  <ResultTitle>{school.SCHOOL}</ResultTitle>
                  <ResultDescription>
                    {school.DISTRICT}, {school.REGION} • {school.LOCATION}
                    {school.CATEGORIES && ` • ${school.CATEGORIES}`}
                    {school.GENDER && ` • ${school.GENDER} school`}
                  </ResultDescription>
                </ResultItem>
              ))
            ) : searchQuery.length > 0 ? (
              <MessageText>No schools found for "{searchQuery}"</MessageText>
            ) : null}
          </ResultsDropdown>
        </SearchContainer>
      </MainContent>
    </LibraryContainer>
  );
};

export default Library;
