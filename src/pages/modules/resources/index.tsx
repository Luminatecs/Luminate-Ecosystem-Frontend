import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../../contexts/auth';

/**
 * Resources Module Styled Components
 */
const ResourcesContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
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
  background: linear-gradient(45deg, #ffffff, #fef3c7);
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
  color: #f59e0b;
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
 * Resources Page Component
 */
const Resources: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goBack = () => {
    navigate('/ecosystem');
  };

  const resourcesFeatures = [
    {
      id: 'templates-forms',
      title: 'Templates & Forms',
      description: 'Pre-designed templates and forms for academic projects, reports, and professional documents.',
      icon: '📋',
      action: () => console.log('Navigate to Templates & Forms')
    },
    {
      id: 'study-guides',
      title: 'Study Guides',
      description: 'Comprehensive study materials and guides for various subjects and certification exams.',
      icon: '📖',
      action: () => console.log('Navigate to Study Guides')
    },
    {
      id: 'toolkits',
      title: 'Toolkits & Utilities',
      description: 'Essential tools and utilities for research, writing, calculations, and project management.',
      icon: '🛠️',
      action: () => console.log('Navigate to Toolkits & Utilities')
    },
    {
      id: 'career-resources',
      title: 'Career Resources',
      description: 'Resume templates, interview guides, career planning tools, and industry insights.',
      icon: '💼',
      action: () => console.log('Navigate to Career Resources')
    },
    {
      id: 'learning-materials',
      title: 'Learning Materials',
      description: 'Curated learning resources, tutorials, and educational content across various disciplines.',
      icon: '🎓',
      action: () => console.log('Navigate to Learning Materials')
    },
    {
      id: 'support-help',
      title: 'Support & Help',
      description: 'Help documentation, FAQs, tutorials, and technical support resources.',
      icon: '🆘',
      action: () => console.log('Navigate to Support & Help')
    }
  ];

  return (
    <ResourcesContainer>
      <Header>
        <BackButton onClick={goBack}>
          ← Back to Ecosystem
        </BackButton>
        <Title>Resources</Title>
        <div style={{ width: '140px' }}></div> {/* Spacer for centering */}
      </Header>

      <Subtitle>
        Essential tools and materials for {user?.name}!
        <br />
        Access templates, guides, utilities, and support resources.
      </Subtitle>

      <ContentGrid>
        {resourcesFeatures.map((feature) => (
          <FeatureCard key={feature.id} onClick={feature.action}>
            <FeatureIcon>
              {feature.icon}
            </FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
            <FeatureButton>
              Access {feature.title}
            </FeatureButton>
          </FeatureCard>
        ))}
      </ContentGrid>
    </ResourcesContainer>
  );
};

export default Resources;
