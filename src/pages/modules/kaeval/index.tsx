import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../../contexts/auth';

/**
 * Kaeval Module Styled Components
 */
const KaevalContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #10b981 0%, #047857 100%);
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
  background: linear-gradient(45deg, #ffffff, #d1fae5);
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
  color: #10b981;
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
 * Kaeval Page Component
 */
const Kaeval: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goBack = () => {
    navigate('/ecosystem');
  };

  const kaevalFeatures = [
    {
      id: 'skill-assessment',
      title: 'Skill Assessment',
      description: 'Comprehensive evaluation of your technical and soft skills with detailed analytics and recommendations.',
      icon: '📊',
      action: () => console.log('Navigate to Skill Assessment')
    },
    {
      id: 'career-evaluation',
      title: 'Career Evaluation',
      description: 'Analyze your career progression, identify strengths, and discover growth opportunities.',
      icon: '📈',
      action: () => console.log('Navigate to Career Evaluation')
    },
    {
      id: 'performance-tracking',
      title: 'Performance Tracking',
      description: 'Monitor your academic and professional performance over time with detailed metrics.',
      icon: '⏱️',
      action: () => console.log('Navigate to Performance Tracking')
    },
    {
      id: 'competency-mapping',
      title: 'Competency Mapping',
      description: 'Map your current competencies against industry standards and career requirements.',
      icon: '🎯',
      action: () => console.log('Navigate to Competency Mapping')
    },
    {
      id: 'learning-analytics',
      title: 'Learning Analytics',
      description: 'Advanced analytics on your learning patterns, preferences, and effectiveness.',
      icon: '🧠',
      action: () => console.log('Navigate to Learning Analytics')
    },
    {
      id: 'peer-comparison',
      title: 'Peer Comparison',
      description: 'Compare your skills and progress with peers in your field or academic level.',
      icon: '👥',
      action: () => console.log('Navigate to Peer Comparison')
    }
  ];

  return (
    <KaevalContainer>
      <Header>
        <BackButton onClick={goBack}>
          ← Back to Ecosystem
        </BackButton>
        <Title>Kaeval</Title>
        <div style={{ width: '140px' }}></div> {/* Spacer for centering */}
      </Header>

      <Subtitle>
        Advanced evaluation and assessment platform for {user?.name}!
        <br />
        Measure, analyze, and improve your skills and performance.
      </Subtitle>

      <ContentGrid>
        {kaevalFeatures.map((feature) => (
          <FeatureCard key={feature.id} onClick={feature.action}>
            <FeatureIcon>
              {feature.icon}
            </FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
            <FeatureButton>
              Start {feature.title}
            </FeatureButton>
          </FeatureCard>
        ))}
      </ContentGrid>
    </KaevalContainer>
  );
};

export default Kaeval;
