import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../../contexts/auth';
import LibraryService, { ISchool } from '../../../services/LibraryService';

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
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
`;

/**
 * Back Button
 */
const BackButton = styled.button`
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
    color: #475569;
  }
`;

/**
 * Main Content Area
 */
const MainContent = styled.div<{ hasResults?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => props.hasResults ? 'flex-start' : 'center'};
  padding: ${props => props.hasResults ? '2rem' : '0'};
  transition: all 0.3s ease;
`;

/**
 * Google-style Logo
 */
const Logo = styled.div`
  font-size: 6rem;
  font-weight: 400;
  margin-bottom: 2rem;
  text-align: center;
  
  .luminate {
    background: linear-gradient(135deg, #4285f4 0%, #34a853 25%, #fbbc05 50%, #ea4335 75%, #4285f4 100%);
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
 * Search Container
 */
const SearchContainer = styled.div<{ hasResults?: boolean }>`
  width: 100%;
  max-width: 584px;
  position: relative;
  margin-bottom: ${props => props.hasResults ? '2rem' : '2rem'};
`;

/**
 * Google-style Search Input
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
  box-shadow: 0 2px 5px 1px rgba(64,60,67,.16);

  &:hover {
    box-shadow: 0 2px 8px 1px rgba(64,60,67,.24);
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
 * Search Icon
 */
const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9aa0a6;
  font-size: 18px;
  pointer-events: none;
`;

/**
 * Clear Button
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
  display: ${props => props.show ? 'block' : 'none'};
  
  &:hover {
    background: #f1f3f4;
  }
`;

/**
 * Search Buttons Container
 */
const SearchButtons = styled.div<{ hasResults?: boolean }>`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  opacity: ${props => props.hasResults ? 0 : 1};
  visibility: ${props => props.hasResults ? 'hidden' : 'visible'};
  transition: all 0.3s ease;
`;

/**
 * Google-style Search Button
 */
const SearchButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #f8f9fa;
  border-radius: 4px;
  color: #3c4043;
  cursor: pointer;
  font-size: 14px;
  margin: 11px 4px;
  min-width: 54px;
  padding: 0 16px;
  height: 36px;
  text-align: center;
  transition: all 0.1s ease;

  &:hover {
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    background-color: #f1f3f4;
    border: 1px solid #dadce0;
    color: #202124;
  }
`;

/**
 * Results Container
 */
const ResultsContainer = styled.div<{ show?: boolean }>`
  width: 100%;
  max-width: 652px;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

/**
 * Results Info
 */
const ResultsInfo = styled.div`
  color: #70757a;
  font-size: 14px;
  margin-bottom: 1rem;
  padding-left: 8px;
`;

/**
 * Individual Result Item
 */
const ResultItem = styled.div`
  margin-bottom: 1.5rem;
  padding: 0 8px;
`;

/**
 * Result School Name
 */
const ResultTitle = styled.h3`
  color: #1a0dab;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.3;
  margin: 0 0 4px 0;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

/**
 * Result URL/Location
 */
const ResultUrl = styled.div`
  color: #202124;
  font-size: 14px;
  line-height: 1.3;
  margin-bottom: 4px;
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
 * Library Component
 */
const Library: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ISchool[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
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

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleBackToEcosystem = () => {
    navigate('/ecosystem');
  };

  return (
    <LibraryContainer>
      <Header>
        <BackButton onClick={handleBackToEcosystem}>
          ← Back to Ecosystem
        </BackButton>
      </Header>

      <MainContent hasResults={hasSearched}>
        {!hasSearched && (
          <Logo>
            <span className="luminate">Luminate</span>
            <span className="library">Library</span>
          </Logo>
        )}

        <SearchContainer hasResults={hasSearched}>
          <form onSubmit={handleSearchSubmit}>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search for schools, districts, programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            <ClearButton 
              type="button"
              show={searchQuery.length > 0}
              onClick={handleClearSearch}
            >
              ✕
            </ClearButton>
          </form>
        </SearchContainer>

        {!hasSearched && (
          <SearchButtons hasResults={hasSearched}>
            <SearchButton type="button" onClick={() => handleSearch(searchQuery)}>
              Library Search
            </SearchButton>
            <SearchButton type="button" onClick={() => handleSearch('senior high school')}>
              I'm Feeling Lucky
            </SearchButton>
          </SearchButtons>
        )}

        {hasSearched && (
          <ResultsContainer show={hasSearched}>
            <ResultsInfo>
              {isLoading ? (
                'Searching...'
              ) : (
                `About ${searchResults.length} results${searchQuery ? ` for "${searchQuery}"` : ''}`
              )}
            </ResultsInfo>

            {!isLoading && searchResults.map((school, index) => (
              <ResultItem key={index}>
                <ResultTitle>{school.SCHOOL}</ResultTitle>
                <ResultUrl>
                  {school.DISTRICT}, {school.REGION} • {school.LOCATION}
                </ResultUrl>
                <ResultDescription>
                  {school.CATEGORIES} school offering {school.electives} electives and {school.core} core subjects. 
                  {school.GENDER && ` ${school.GENDER} school`}
                  {school.RESIDENCY && ` with ${school.RESIDENCY.toLowerCase()} facilities`}.
                  {school["EMAIL ADDRESS"] && ` Contact: ${school["EMAIL ADDRESS"]}`}
                </ResultDescription>
              </ResultItem>
            ))}

            {!isLoading && searchResults.length === 0 && searchQuery && (
              <ResultItem>
                <ResultDescription>
                  No schools found for "{searchQuery}". Try different search terms.
                </ResultDescription>
              </ResultItem>
            )}
          </ResultsContainer>
        )}
      </MainContent>
    </LibraryContainer>
  );
};

export default Library;
