import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 30px rgba(66, 153, 225, 0.2);
  }
  50% {
    box-shadow: 0 0 50px rgba(66, 153, 225, 0.4);
  }
  100% {
    box-shadow: 0 0 30px rgba(66, 153, 225, 0.2);
  }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #f0f4f8 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, #2c5282 0%, transparent 100%);
    opacity: 0.05;
  }
`;

const CenterCircle = styled.div`
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #2c5282 0%, #4299e1 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  position: relative;
  animation: \${glowPulse} 3s infinite;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid rgba(66, 153, 225, 0.2);
    border-radius: 50%;
  }
`;

const NavigationContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const NavigationItem = styled.div<{ angle: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(\${props => props.angle}deg) translateX(300px) rotate(-\${props => props.angle}deg);
  pointer-events: auto;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translate(-50%, -50%) rotate(\${props => props.angle}deg) translateX(310px) rotate(-\${props => props.angle}deg) scale(1.1);
  }
`;

const ItemText = styled.span`
  color: #2d3748;
  font-weight: 600;
  font-size: 1.1rem;
  white-space: nowrap;
`;

const Modal = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 16px;
  width: 400px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  opacity: \${props => props.isVisible ? 1 : 0};
  pointer-events: \${props => props.isVisible ? 'auto' : 'none'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-50%, -50%) \${props => props.isVisible ? 'scale(1)' : 'scale(0.95)'};
`;

const ModalImage = styled.div<{ imageUrl: string }>`
  height: 200px;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const ModalContent = styled.div`
  padding: 2rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
  background: linear-gradient(90deg, #2c5282 0%, #4299e1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ModalDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
`;

interface Module {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
  angle: number;
}

const modules: Module[] = [
  {
    id: 'kwaeval',
    title: 'KwaEval Assessment',
    description: 'Comprehensive student evaluation and performance tracking system.',
    image: '/images/kwaeval-banner.jpg',
    path: '/kwaeval',
    angle: 0
  },
  {
    id: 'library',
    title: 'Digital Library',
    description: 'Access to educational resources and materials.',
    image: '/images/library-banner.jpg',
    path: '/library',
    angle: 72
  },
  // Add more modules as needed
];

const EcosystemHub: React.FC = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<Module | null>(null);

  const handleModuleClick = (module: Module) => {
    setActiveModule(module);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Container>
      <CenterCircle>
        Luminate Ecosystem
      </CenterCircle>
      
      <NavigationContainer>
        {modules.map(module => (
          <NavigationItem 
            key={module.id}
            angle={module.angle}
            onMouseEnter={() => handleModuleClick(module)}
            onMouseLeave={() => setActiveModule(null)}
            onClick={() => handleNavigate(module.path)}
          >
            <ItemText>{module.title}</ItemText>
          </NavigationItem>
        ))}
      </NavigationContainer>

      <Modal isVisible={!!activeModule}>
        {activeModule && (
          <>
            <ModalImage imageUrl={activeModule.image} />
            <ModalContent>
              <ModalTitle>{activeModule.title}</ModalTitle>
              <ModalDescription>{activeModule.description}</ModalDescription>
            </ModalContent>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default EcosystemHub;
