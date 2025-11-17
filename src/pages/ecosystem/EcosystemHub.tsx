import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import { ChangePasswordModal } from '../../components/auth/ChangePasswordModal';

// Animation keyframes
const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 60px rgba(255, 255, 255, 0.5);
  }
  100% {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  }
`;

const orbitRotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2332 0%, #2c5282 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }

  &::after {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    right: 20%;
    bottom: 20%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: ${orbitRotate} 60s linear infinite;
  }
`;

/**
 * Home Button - Upper left corner
 */
const HomeButton = styled.button`
  position: fixed;
  top: 2rem;
  left: 2rem;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

/**
 * Ornamental Center Hub - No click functionality
 */
const CenterHub = styled.div`
  width: 180px;
  height: 180px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 100%);
  border: 3px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a2332;
  font-size: 1.1rem;
  font-weight: 700;
  position: relative;
  animation: ${glowPulse} 4s infinite;
  z-index: 2;
  text-align: center;
  line-height: 1.3;
  letter-spacing: -0.5px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 8px 32px rgba(255, 255, 255, 0.2),
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: ${orbitRotate} 30s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: -25px;
    left: -25px;
    right: -25px;
    bottom: -25px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    animation: ${orbitRotate} 45s linear infinite reverse;
  }
`;

/**
 * Hub Container for better positioning
 */
const HubContainer = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 350px;
    height: 350px;
  }
  
  @media (max-width: 480px) {
    width: 300px;
    height: 300px;
  }
`;

/**
 * Module Orbit Container
 */
const ModuleOrbit = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

/**
 * Individual Module positioned around the center
 */
const ModuleItem = styled.div<{ angle: number; distance?: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(${props => props.angle}deg) translateX(${props => props.distance || 250}px) rotate(-${props => props.angle}deg);
  pointer-events: auto;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 3;
  
  @media (max-width: 768px) {
    transform: translate(-50%, -50%) rotate(${props => props.angle}deg) translateX(180px) rotate(-${props => props.angle}deg);
  }
  
  @media (max-width: 480px) {
    transform: translate(-50%, -50%) rotate(${props => props.angle}deg) translateX(160px) rotate(-${props => props.angle}deg);
  }
  
  @media (min-width: 769px) {
    &:hover {
      transform: translate(-50%, -50%) rotate(${props => props.angle}deg) translateX(${props => (props.distance || 250) + 20}px) rotate(-${props => props.angle}deg) scale(1.15);
    }
  }
`;

/**
 * Module Circle
 */
const ModuleCircle = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 8px 20px rgba(255, 255, 255, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
  
  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
  }

  @media (min-width: 769px) {
    &:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 100%);
      border-color: rgba(255, 255, 255, 0.5);
      box-shadow: 
        0 12px 30px rgba(255, 255, 255, 0.2),
        0 6px 12px rgba(0, 0, 0, 0.15);
      transform: scale(1.05);

      .module-name {
        color: #1a2332;
        font-weight: 700;
      }
    }
  }
`;

/**
 * Module Name
 */
const ModuleName = styled.span`
  color: #2c5282;
  font-weight: 600;
  font-size: 0.95rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.3px;
`;

/**
 * Horizontal Modal Card
 */
const HoverModal = styled.div<{ isVisible: boolean; position: { x: number; y: number } }>`
  position: fixed;
  top: ${props => props.position.y}px;
  left: ${props => props.position.x}px;
  transform: translateX(-50%);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 0;
  min-width: 350px;
  max-width: 450px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 8px 20px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-50%) translateY(${props => props.isVisible ? '0' : '10px'});
  z-index: 1000;
  pointer-events: none;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%);
    border-radius: 16px;
    z-index: -1;
  }
`;

/**
 * Modal Image
 */
const ModalImage = styled.div<{ moduleId: string }>`
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, #1a2332 0%, #2c5282 100%);
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.05);
  }

  &::after {
    content: '📊';
    font-size: 3rem;
    z-index: 1;
    position: relative;
  }
`;

/**
 * Modal Content Container
 */
const ModalContent = styled.div`
  padding: 1.5rem 2rem;
`;

/**
 * Modal Content Components for the horizontal card
 */
const ModalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  background: linear-gradient(90deg, #1a2332 0%, #2c5282 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.3px;
`;

const ModalDescription = styled.p`
  color: #475569;
  line-height: 1.5;
  margin: 0;
  font-size: 0.95rem;
`;

interface Module {
  id: string;
  name: string;
  description: string;
  productionUrl: string;
  localUrl: string;
  angle: number;
}

const modules: Module[] = [
  {
    id: 'kaeval',
    name: 'Kaeval',
    description: 'Comprehensive student evaluation and performance tracking system with advanced analytics.',
    productionUrl: 'https://kaeval.luminatecs.com',
    localUrl: 'http://localhost:3000',
    angle: 0
  },
  {
    id: 'library',
    name: 'Library',
    description: 'Access to educational resources, digital materials, and collaborative learning tools.',
    productionUrl: 'https://library.luminatecs.com',
    localUrl: 'http://localhost:3003',
    angle: 120
  },
  {
    id: 'resources',
    name: 'Resources',
    description: 'Career guidance materials, planning tools, and professional development resources.',
    productionUrl: 'https://resources.luminatecs.com',
    localUrl: 'http://localhost:3004',
    angle: 240
  }
];

const EcosystemHub: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Check if user needs to change password (logged in with temp code)
  useEffect(() => {
    const needsPasswordChange = sessionStorage.getItem('needsPasswordChange');
    if (needsPasswordChange === 'true') {
      setShowPasswordModal(true);
    }
  }, []);

  // Determine if we're in development mode
  // const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';

  const handleModuleHover = (module: Module, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const modalHeight = 200; // Approximate modal height
    const modalWidth = 400; // Approximate modal width
    
    // Calculate optimal position to keep modal in viewport
    let x = rect.left + rect.width / 2;
    let y = rect.top - modalHeight - 20; // Position above by default
    
    // Adjust horizontal position if modal would go off screen
    if (x - modalWidth / 2 < 20) {
      x = modalWidth / 2 + 20; // Keep left margin
    } else if (x + modalWidth / 2 > window.innerWidth - 20) {
      x = window.innerWidth - modalWidth / 2 - 20; // Keep right margin
    }
    
    // Adjust vertical position if modal would go off screen
    if (y < 20) {
      y = rect.bottom + 20; // Position below if not enough space above
    }
    
    setModalPosition({ x, y });
    setActiveModule(module);
  };

  const handleModuleLeave = () => {
    setActiveModule(null);
  };

  const handleModuleClick = (module: Module) => {
    // Navigate internally for library and resources, externally for kaeval
    if (module.id === 'library') {
      navigate('/library');
    } else if (module.id === 'resources') {
      navigate('/resources');
    } else {
      // For kaeval and other modules, use external URL
      const targetUrl = module.productionUrl;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handlePasswordChanged = async () => {
    // Clear the temp login flags
    sessionStorage.removeItem('needsPasswordChange');
    sessionStorage.removeItem('tempLoginUser');
    sessionStorage.removeItem('tempCode');
    setShowPasswordModal(false);
    
    // Log out and redirect to login
    await handleLogout();
  };

  return (
    <Container>
      {/* Home/Logout Button */}
      <HomeButton onClick={handleLogout} title="Logout">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
        </svg>
      </HomeButton>

      <HubContainer>
        {/* Ornamental Center Hub */}
        <CenterHub>
          Luminate<br />Ecosystem
        </CenterHub>
        
        {/* Module Orbit */}
        <ModuleOrbit>
          {modules.map(module => (
            <ModuleItem 
              key={module.id}
              angle={module.angle}
              distance={280}
              onMouseEnter={(e) => handleModuleHover(module, e)}
              onMouseLeave={handleModuleLeave}
              onClick={() => handleModuleClick(module)}
            >
              <ModuleCircle>
                <ModuleName className="module-name">{module.name}</ModuleName>
              </ModuleCircle>
            </ModuleItem>
          ))}
        </ModuleOrbit>
      </HubContainer>

      {/* Horizontal Hover Modal */}
      <HoverModal 
        isVisible={!!activeModule}
        position={modalPosition}
      >
        {activeModule && (
          <>
            <ModalImage moduleId={activeModule.id} data-module={activeModule.id} />
            <ModalContent>
              <ModalTitle>{activeModule.name}</ModalTitle>
              <ModalDescription>{activeModule.description}</ModalDescription>
            </ModalContent>
          </>
        )}
      </HoverModal>

      {/* Password Change Modal for Temp Code Users */}
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => {}} // Cannot close until password is changed
        onPasswordChanged={handlePasswordChanged}
      />
    </Container>
  );
};

export default EcosystemHub;
