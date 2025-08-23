import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth';
import Logger from '../../utils/logUtils';

/**
 * Ecosystem Design - Circular layout like in the image
 */
const EcosystemContainer = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
  position: relative;
`;

const CircularLayout = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  background: #1f2937;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  z-index: 10;

  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
`;

const SurroundingCard = styled.div<{ position: number; isPhantom?: boolean }>`
  position: absolute;
  width: 120px;
  height: 120px;
  background: ${props => props.isPhantom ? '#f3f4f6' : 'white'};
  border: ${props => props.isPhantom ? '2px dashed #d1d5db' : 'none'};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.isPhantom ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: ${props => props.isPhantom ? 'none' : '0 4px 15px rgba(0, 0, 0, 0.1)'};
  opacity: ${props => props.isPhantom ? 0.5 : 1};

  ${props => {
    const angle = (props.position * 72) * Math.PI / 180; // 72 degrees apart (360/5)
    const radius = 200;
    const x = Math.cos(angle - Math.PI/2) * radius;
    const y = Math.sin(angle - Math.PI/2) * radius;
    
    return `
      left: calc(50% + ${x}px - 60px);
      top: calc(50% + ${y}px - 60px);
    `;
  }}

  &:hover {
    ${props => !props.isPhantom && `
      transform: scale(1.05);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    `}
  }
`;

const CenterCardIcon = styled.div`
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 8px;
`;

const CenterCardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin: 0;
  text-align: center;
  line-height: 1.2;
`;

const PhantomCardText = styled.div`
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
  font-weight: 500;
`;

const Title = styled.h1`
  color: #1e293b;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1rem;
  font-weight: 400;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Card = styled.div<{ accent?: string }>`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid ${props => props.accent || '#e2e8f0'};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    border-color: ${props => props.accent || '#cbd5e1'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.accent || '#6366f1'};
  }
`;

const CardIcon = styled.div<{ bgColor?: string }>`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: ${props => props.bgColor || '#6366f1'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: white;
  font-weight: 600;
`;

const CardTitle = styled.h3`
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

const CardDescription = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const CardButton = styled.button`
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
  }
`;

const UserSection = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 20;
`;

const WelcomeMessage = styled.span`
  color: #374151;
  font-weight: 500;
  font-size: 14px;
`;

const LogoutButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #dc2626;
  }
`;

/**
 * Ecosystem Page Component
 */
const Ecosystem: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      Logger.info('Ecosystem: User logged out successfully');
      navigate('/login');
    } catch (error) {
      Logger.error('Ecosystem: Logout failed', error);
    }
  };

  const navigateToSection = (section: string) => {
    Logger.info(`Ecosystem: Navigating to ${section}`);
    // Navigate to different sections based on the card clicked
    switch (section) {
      case 'library':
        navigate('/library');
        break;
      case 'kaeval':
        navigate('/kaeval');
        break;
      case 'resources':
        navigate('/resources');
        break;
      case 'unidex':
        navigate('/unidex');
        break;
      default:
        Logger.warn(`Ecosystem: Unknown section: ${section}`);
    }
  };

  // Main cards - your three core features
  const mainCards = [
    {
      id: 'library',
      title: 'LIBRARY',
      icon: '📚',
      bgColor: '#3b82f6'
    },
    {
      id: 'kaeval', 
      title: 'KAEVAL',
      icon: '📊',
      bgColor: '#10b981'
    },
    {
      id: 'resources',
      title: 'RESOURCES', 
      icon: '🛠️',
      bgColor: '#f59e0b'
    }
  ];

  // Center card will be the first one (Library)
  const centerCard = mainCards[0];
  const surroundingCards = mainCards.slice(1);

  return (
    <EcosystemContainer>
      <UserSection>
        <WelcomeMessage>
          Welcome, {user?.name || 'User'}!
        </WelcomeMessage>
        <LogoutButton onClick={handleLogout}>
          Logout
        </LogoutButton>
      </UserSection>

      <CircularLayout>
        {/* Center Card */}
        <CenterCard onClick={() => navigateToSection(centerCard.id)}>
          <CenterCardIcon>
            {centerCard.icon}
          </CenterCardIcon>
          <CenterCardTitle>{centerCard.title}</CenterCardTitle>
        </CenterCard>

        {/* Surrounding Cards */}
        {surroundingCards.map((card, index) => (
          <SurroundingCard 
            key={card.id}
            position={index}
            onClick={() => navigateToSection(card.id)}
          >
            <CardIcon bgColor={card.bgColor}>
              {card.icon}
            </CardIcon>
            <CardTitle>{card.title}</CardTitle>
          </SurroundingCard>
        ))}

        {/* Phantom Cards */}
        <SurroundingCard position={2} isPhantom>
          <CardIcon bgColor="#9ca3af">
            📱
          </CardIcon>
          <PhantomCardText>COMING SOON</PhantomCardText>
        </SurroundingCard>

        <SurroundingCard position={3} isPhantom>
          <CardIcon bgColor="#9ca3af">
            🎯
          </CardIcon>
          <PhantomCardText>COMING SOON</PhantomCardText>
        </SurroundingCard>
      </CircularLayout>
    </EcosystemContainer>
  );
};

export default Ecosystem;
