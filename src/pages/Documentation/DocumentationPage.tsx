import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target, 
  ChevronRight,
  Home,
  Brain,
  BarChart3,
  FileText,
  Globe,
  CheckCircle,
  ArrowRight,
  User,
  Building,
  GraduationCap
} from 'lucide-react';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #1a2332 0%, #2c5282 100%);
  color: white;
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
  
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
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const BackButton = styled.button`
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 2rem 0;
  line-height: 1.6;
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.25rem;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  .icon {
    width: 32px;
    height: 32px;
    color: #4299e1;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.75rem;
`;

const CardDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  
  .check-icon {
    width: 16px;
    height: 16px;
    color: #10b981;
  }
`;

const ProcessFlow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProcessStep = styled.div`
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin: 0 auto 1rem auto;
`;

const StepTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const UserTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const UserTypeCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const UserTypeIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
  color: white;
`;

const UserTypeTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.75rem;
`;

const UserTypeDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #64748b;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  
  .arrow-icon {
    width: 16px;
    height: 16px;
    color: #4299e1;
    margin-top: 0.1rem;
    flex-shrink: 0;
  }
`;

const CTASection = styled.div`
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  color: white;
  margin-top: 4rem;
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CTADescription = styled.p`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const CTAButton = styled.button`
  background: white;
  color: #2c5282;
  border: none;
  border-radius: 12px;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const TabNavigation = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: white;
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
`;

const TabButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'linear-gradient(135deg, #4299e1 0%, #2c5282 100%)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #4299e1 0%, #2c5282 100%)' : '#f8fafc'};
    color: ${props => props.active ? 'white' : '#2d3748'};
  }
`;

interface DocumentationPageProps {}

const DocumentationPage: React.FC<DocumentationPageProps> = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const applications = [
    {
      name: 'Ecosystem Hub',
      description: 'Central administrative platform for organizations to manage student enrollment, track progress, and oversee career development initiatives.',
      icon: <Building />,
      features: [
        'Organization registration and setup',
        'Student enrollment (single and bulk)',
        'Credential management and distribution',
        'Analytics and reporting dashboards',
        'Multi-role user management'
      ]
    },
    {
      name: 'Kaeval Assessments',
      description: 'Comprehensive psychometric evaluation platform providing scientifically-backed career assessments and personality profiling.',
      icon: <Brain />,
      features: [
        'RIASEC interest profiling',
        'Temperament analysis',
        'Personality assessments',
        'Career matching algorithms',
        'Detailed progress tracking'
      ]
    },
    {
      name: 'AI Recommendation Engine',
      description: 'Advanced machine learning system that continuously learns from user data to provide personalized career guidance.',
      icon: <Zap />,
      features: [
        'Intelligent career predictions',
        'Personalized learning paths',
        'Automated model retraining',
        'Adaptive recommendations',
        'Performance optimization'
      ]
    }
  ];

  const userTypes = [
    {
      title: 'Individual Students',
      description: 'Students seeking personalized career guidance and development',
      icon: <User />,
      benefits: [
        'Complete psychometric assessments',
        'Receive personalized career recommendations',
        'Access extensive resource libraries',
        'Track career development progress',
        'Get AI-powered insights and guidance'
      ]
    },
    {
      title: 'Educational Organizations',
      description: 'Schools, universities, and educational institutions',
      icon: <Building />,
      benefits: [
        'Bulk student enrollment and management',
        'Automated credential distribution',
        'Comprehensive analytics and reporting',
        'Multi-administrator access control',
        'Scalable student population management'
      ]
    },
    {
      title: 'Career Counselors',
      description: 'Professional counselors and guidance specialists',
      icon: <GraduationCap />,
      benefits: [
        'Access to detailed student assessments',
        'Data-driven counseling insights',
        'Progress tracking and monitoring',
        'Resource sharing capabilities',
        'Evidence-based guidance tools'
      ]
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Registration',
      description: 'Organizations register and set up their institutional profile with administrative access.'
    },
    {
      number: 2,
      title: 'Student Enrollment',
      description: 'Students are enrolled either individually or through bulk CSV uploads with automated credential generation.'
    },
    {
      number: 3,
      title: 'Assessment Completion',
      description: 'Students complete comprehensive psychometric assessments through the Kaeval platform.'
    },
    {
      number: 4,
      title: 'AI Analysis',
      description: 'Our machine learning engine analyzes responses to generate personalized career recommendations.'
    },
    {
      number: 5,
      title: 'Guidance & Growth',
      description: 'Students receive ongoing guidance through resources, progress tracking, and adaptive recommendations.'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <Section>
              <SectionTitle>
                <Target className="icon" />
                Platform Applications
              </SectionTitle>
              <SectionDescription>
                The Luminate Ecosystem consists of three interconnected applications that work seamlessly together to provide comprehensive career guidance solutions.
              </SectionDescription>
              <Grid>
                {applications.map((app, index) => (
                  <Card key={index}>
                    <CardIcon>
                      {app.icon}
                    </CardIcon>
                    <CardTitle>{app.name}</CardTitle>
                    <CardDescription>{app.description}</CardDescription>
                    <FeatureList>
                      {app.features.map((feature, idx) => (
                        <FeatureItem key={idx}>
                          <CheckCircle className="check-icon" />
                          {feature}
                        </FeatureItem>
                      ))}
                    </FeatureList>
                  </Card>
                ))}
              </Grid>
            </Section>
          </>
        );
      
      case 'users':
        return (
          <Section>
            <SectionTitle>
              <Users className="icon" />
              Who Benefits from Luminate
            </SectionTitle>
            <SectionDescription>
              Our platform is designed to serve various stakeholders in the career development ecosystem, each with unique needs and benefits.
            </SectionDescription>
            <UserTypeGrid>
              {userTypes.map((userType, index) => (
                <UserTypeCard key={index}>
                  <UserTypeIcon>
                    {userType.icon}
                  </UserTypeIcon>
                  <UserTypeTitle>{userType.title}</UserTypeTitle>
                  <UserTypeDescription>{userType.description}</UserTypeDescription>
                  <BenefitsList>
                    {userType.benefits.map((benefit, idx) => (
                      <BenefitItem key={idx}>
                        <ArrowRight className="arrow-icon" />
                        {benefit}
                      </BenefitItem>
                    ))}
                  </BenefitsList>
                </UserTypeCard>
              ))}
            </UserTypeGrid>
          </Section>
        );
      
      case 'process':
        return (
          <Section>
            <SectionTitle>
              <TrendingUp className="icon" />
              How It Works
            </SectionTitle>
            <SectionDescription>
              Our streamlined process ensures organizations and students can quickly begin their career development journey with minimal setup and maximum impact.
            </SectionDescription>
            <ProcessFlow>
              {processSteps.map((step, index) => (
                <ProcessStep key={index}>
                  <StepNumber>{step.number}</StepNumber>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </ProcessStep>
              ))}
            </ProcessFlow>
          </Section>
        );
      
      default:
        return null;
    }
  };

  return (
    <Container>
      <BackButton onClick={() => navigate('/')} title="Back to Login">
        <Home size={20} />
      </BackButton>

      <Header>
        <HeaderContent>
          <Title>Luminate Ecosystem</Title>
          <Subtitle>
            Comprehensive Career Guidance Platform - Revolutionizing how educational institutions 
            and students approach career development through AI-powered assessments and intelligent recommendations.
          </Subtitle>
          
          <QuickStats>
            <StatCard>
              <StatNumber>3</StatNumber>
              <StatLabel>Core Applications</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>5+</StatNumber>
              <StatLabel>User Types</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>AI</StatNumber>
              <StatLabel>Powered Engine</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Availability</StatLabel>
            </StatCard>
          </QuickStats>
        </HeaderContent>
      </Header>

      <Content>
        <TabNavigation>
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          >
            Platform Overview
          </TabButton>
          <TabButton 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')}
          >
            User Types
          </TabButton>
          <TabButton 
            active={activeTab === 'process'} 
            onClick={() => setActiveTab('process')}
          >
            How It Works
          </TabButton>
        </TabNavigation>

        {renderTabContent()}

        <Section>
          <SectionTitle>
            <Shield className="icon" />
            Key Advantages
          </SectionTitle>
          <Grid>
            <Card>
              <CardIcon>
                <BarChart3 />
              </CardIcon>
              <CardTitle>Data-Driven Insights</CardTitle>
              <CardDescription>
                Comprehensive analytics and reporting provide actionable insights for both students and administrators.
              </CardDescription>
            </Card>
            <Card>
              <CardIcon>
                <Globe />
              </CardIcon>
              <CardTitle>Scalable Architecture</CardTitle>
              <CardDescription>
                Built to support individual users and large educational institutions with thousands of students.
              </CardDescription>
            </Card>
            <Card>
              <CardIcon>
                <Shield />
              </CardIcon>
              <CardTitle>Secure & Compliant</CardTitle>
              <CardDescription>
                Enterprise-grade security with role-based access control and encrypted data storage.
              </CardDescription>
            </Card>
          </Grid>
        </Section>

        <CTASection>
          <CTATitle>Ready to Transform Career Guidance?</CTATitle>
          <CTADescription>
            Join educational institutions worldwide in providing their students with 
            AI-powered career development tools and comprehensive guidance platforms.
          </CTADescription>
          <CTAButton onClick={() => navigate('/register')}>
            Get Started Today
            <ChevronRight size={18} />
          </CTAButton>
        </CTASection>
      </Content>
    </Container>
  );
};

export default DocumentationPage;