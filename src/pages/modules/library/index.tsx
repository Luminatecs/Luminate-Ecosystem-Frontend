import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../../contexts/auth';

/**
 * Library Module Styled Components
 */
const LibraryContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  padding: 2rem;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 3rem;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-2px);
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  flex: 1;
  background: linear-gradient(45deg, #ffffff, #e0f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const FeatureButton = styled.button`
  background: white;
  color: #3b82f6;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

/**
 * Library Page Component
 */
const Library: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goBack = () => {
    navigate('/ecosystem');
  };

  const libraryFeatures = [
    {
      id: 'digital-books',
      title: 'Digital Books',
      description: 'Access thousands of academic textbooks, research papers, and educational materials in digital format.',
      icon: '📚',
      action: () => console.log('Navigate to Digital Books')
    },
    {
      id: 'research-papers',
      title: 'Research Papers',
      description: 'Browse through peer-reviewed research papers and academic publications from leading institutions.',
      icon: '📄',
      action: () => console.log('Navigate to Research Papers')
    },
    {
      id: 'journals',
      title: 'Academic Journals',
      description: 'Explore academic journals across various disciplines and stay updated with latest research.',
      icon: '📰',
      action: () => console.log('Navigate to Journals')
    },
    {
      id: 'multimedia',
      title: 'Multimedia Resources',
      description: 'Video lectures, audio books, and interactive educational content for enhanced learning.',
      icon: '🎥',
      action: () => console.log('Navigate to Multimedia')
    },
    {
      id: 'archives',
      title: 'Digital Archives',
      description: 'Historical documents, theses, and institutional repositories for comprehensive research.',
      icon: '🗄️',
      action: () => console.log('Navigate to Archives')
    },
    {
      id: 'tools',
      title: 'Research Tools',
      description: 'Citation generators, reference managers, and other tools to support your academic work.',
      icon: '🛠️',
      action: () => console.log('Navigate to Tools')
    }
  ];

  return (
    <LibraryContainer>
      <Header>
        <BackButton onClick={goBack}>
          ← Back to Ecosystem
        </BackButton>
        <Title>Library</Title>
        <div style={{ width: '140px' }}></div> {/* Spacer for centering */}
      </Header>

      <Subtitle>
        Welcome to your comprehensive digital library, {user?.name}!
        <br />
        Discover a vast collection of academic resources and research materials.
      </Subtitle>

      <ContentGrid>
        {libraryFeatures.map((feature) => (
          <FeatureCard key={feature.id} onClick={feature.action}>
            <FeatureIcon>
              {feature.icon}
            </FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
            <FeatureButton>
              Explore {feature.title}
            </FeatureButton>
          </FeatureCard>
        ))}
      </ContentGrid>
    </LibraryContainer>
  );
};

export default Library;
