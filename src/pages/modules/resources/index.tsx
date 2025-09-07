import React from "react"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import {
  BookOpen,
  Users,
  GraduationCap,
  Search,
  ExternalLink,
  Briefcase,
  TrendingUp,
  FileText,
  Video,
  MessageCircle,
  Star,
  Clock,
  Target,
  Heart,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react"
import { ResourcesService, IResource } from "../../../services/ResourcesService"

// Types
interface Resource {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  type: string;
  rating: number;
  link: string;
  icon?: LucideIcon;
  featured?: boolean;
  image: string;
  features: string[];
  duration: string;
  difficulty: string;
  tags?: string[];
  free?: boolean;
}

type TabType = "students" | "parents" | "counselors";

interface ResourceCardProps {
  resource: Resource;
}
// import luminateLogo from '../img/luminate-logo.png';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f0f7ff, #e6eeff);
  font-family: 'Nunito', 'Segoe UI', sans-serif;
`

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const LogoIcon = styled.div`
  padding: 0.5rem;
  /* background-color: #4f46e5; */
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LogoText = styled.div`
  h2 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }
  
  p {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0;
  }
`

const UpdatedInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
`

const HeroSection = styled.section`
  padding: 1.5rem 1rem;
  text-align: center;
`

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.25rem;
    color: #64748b;
    margin-bottom: 4rem;
  }
`

const SearchContainer = styled.div`
  position: relative;
  max-width: 30rem;
  margin: 0 auto 1rem;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 50px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }
`

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
`

const TabsContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`

const TabsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 2rem;
  background-color: #f1f5f9;
  padding: 0.25rem;
  border-radius: 0.5rem;
`

const TabButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: none;
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  color: ${(props) => (props.active ? "#4f46e5" : "#64748b")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${(props) => (props.active ? "0 2px 4px rgba(0, 0, 0, 0.05)" : "none")};
  
  &:hover {
    background-color: ${(props) => (props.active ? "white" : "#e2e8f0")};
  }
`

const TabContent = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
`

const LogoImg = styled.img`
  width: 5rem;  
`

const TabHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #64748b;
  }
`

const ResourceGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ResourceCardWrapper = styled.div<{ featured?: boolean }>`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
  border: ${(props) => (props.featured ? "2px solid #bfdbfe" : "1px solid #e2e8f0")};
  background-color: ${(props) => (props.featured ? "#f0f7ff" : "white")};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`

const CardHeader = styled.div`
  padding: 1.25rem 1.25rem 0.75rem;
`

const CardHeaderTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const IconBadge = styled.div`
  padding: 0.5rem;
  background-color: #dbeafe;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
`

const FeaturedBadge = styled.span`
  background-color: #dbeafe;
  color: #1d4ed8;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #64748b;
`

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
  line-height: 1.3;
`

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
`

const CardContent = styled.div`
  padding: 0 1.25rem 1.25rem;
`

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BadgeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Badge = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  color: #64748b;
`

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #4f46e5;
  background: none;
  border: none;
  padding: 0.375rem 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  
  &:hover {
    background-color: #f8fafc;
    color: #4338ca;
  }
`

const StatsSection = styled.section`
  margin-top: 4rem;
  background-color: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

const StatsTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #1e293b;
  margin-bottom: 2rem;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const StatItem = styled.div`
  text-align: center;
  
  .value {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${(props) => props.color || "#4f46e5"};
  }
  
  .label {
    font-size: 0.875rem;
    color: #64748b;
  }
`

const Footer = styled.footer`
  background-color: #1e293b;
  color: white;
  padding: 2rem 0;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
`

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  span {
    font-size: 1.25rem;
    font-weight: 700;
  }
`

const FooterDescription = styled.p`
  color: #94a3b8;
  margin-bottom: 1rem;
`

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  font-size: 0.875rem;
  
  a {
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: white;
    }
  }
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
  gap: 1rem;
`

const PageButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  background: ${props => props.active ? '#4f46e5' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active ? '#4f46e5' : '#e2e8f0'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.2s ease;
  font-weight: ${props => props.active ? '600' : 'normal'};
  
  &:hover {
    background: ${props => props.disabled ? (props.active ? '#4f46e5' : 'white') : (props.active ? '#4338ca' : '#f1f5f9')};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
  }
`

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #64748b;
  font-size: 1.125rem;
`

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #ef4444;
  font-size: 1.125rem;
  text-align: center;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  margin: 1rem 0;
  padding: 1rem;
`

const PageInfo = styled.div`
  color: #64748b;
  font-size: 0.875rem;
  padding: 0 1rem;
  background: #f8fafc;
  height: 2.5rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
`

export default function Resources(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [activeTab, setActiveTab] = useState<TabType>("students")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [resourcesPerPage] = useState<number>(6)
  const [apiResources, setApiResources] = useState<IResource[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // Fetch resources on component mount and when activeTab changes
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await ResourcesService.getResourcesByType(activeTab)
        setApiResources(response.data || [])
      } catch (err: any) {
        console.error('Error fetching resources:', err)
        setError(err.message || 'Failed to fetch resources')
        // Fallback to dummy data if API fails
        setApiResources([])
      } finally {
        setLoading(false)
      }
    }

    // Reset pagination when tab changes
    setCurrentPage(1)
    fetchResources()
  }, [activeTab])

  // Helper function to convert API resource to component Resource format
  const convertApiResourceToComponentResource = (apiResource: IResource): Resource => {
    // Map category to appropriate icon
    const getIconByCategory = (category: string): LucideIcon => {
      switch (category.toLowerCase()) {
        case 'assessment': return Target
        case 'job prep': return Briefcase
        case 'guide': return BookOpen
        case 'exploration': return Search
        case 'financial': return TrendingUp
        case 'networking': return Users
        case 'guidance': return Heart
        case 'education': return GraduationCap
        case 'video': return Video
        case 'communication': return MessageCircle
        case 'professional': return UserCheck
        case 'activities': return Users
        case 'data': return TrendingUp
        case 'diversity': return Heart
        case 'technology': return Briefcase
        case 'quiz': return Target
        case 'self-assessment': return BookOpen
        case 'questionnaire': return Target
        default: return FileText
      }
    }

    return {
      id: apiResource.id,
      title: apiResource.title,
      description: apiResource.description,
      fullDescription: apiResource.full_description,
      category: apiResource.category,
      type: apiResource.type,
      rating: apiResource.rating,
      link: apiResource.link || '',
      icon: getIconByCategory(apiResource.category),
      featured: apiResource.featured,
      image: apiResource.image || "/placeholder.svg?height=400&width=600",
      features: apiResource.features || [],
      duration: apiResource.duration || '',
      difficulty: apiResource.difficulty || 'Beginner',
      tags: apiResource.tags,
      free: apiResource.free
    }
  }

  const getResourcesByTab = (): Resource[] => {
    // If loading or error, return empty array (or you could return dummy data as fallback)
    if (loading || error || !apiResources.length) {
      return []
    }

    // Convert API resources to component resources
    return apiResources.map(convertApiResourceToComponentResource)
  }

  const filteredResources = getResourcesByTab().filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleResourceClick = (resource: Resource): void => {
    if (resource && typeof resource === "object") {
      // Create a serializable version of the resource without the icon component
      const serializableResource = { ...resource };
      
      // Remove the icon property which contains a React component
      delete serializableResource.icon;
      
      // Navigate to the detail page with the serializable resource
      navigate(`/resources/${resource.id}`, { state: { resource: serializableResource } });
    } else {
      console.error("Invalid resource clicked:", resource)
    }
  }

  // Pagination logic
  const indexOfLastResource = currentPage * resourcesPerPage
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage
  const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource)

  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage)
  
  // Generate page numbers
  const pageNumbers = []
  const maxPageButtons = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1)
  
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
    const IconComponent = resource.icon

    return (
      <ResourceCardWrapper featured={resource.featured} onClick={() => handleResourceClick(resource)}>
        <CardHeader>
          <CardHeaderTop>
            <IconContainer>
              <IconBadge>
                {IconComponent && <IconComponent size={16} />}
              </IconBadge>
              {resource.featured && <FeaturedBadge>Featured</FeaturedBadge>}
            </IconContainer>
            <RatingContainer>
              <Star size={12} fill="#FBBF24" stroke="#FBBF24" />
              {resource.rating}
            </RatingContainer>
          </CardHeaderTop>
          <CardTitle>{resource.title}</CardTitle>
          <CardDescription>{resource.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <CardFooter>
            <BadgeContainer>
              <Badge>{resource.category}</Badge>
              <Badge>{resource.type}</Badge>
            </BadgeContainer>
            <ViewButton>
              View Details <ExternalLink size={12} />
            </ViewButton>
          </CardFooter>
        </CardContent>
      </ResourceCardWrapper>
    )
  }

  return (
    <PageContainer>
      {/* Header */}
      <Header>
        <HeaderContent>
          <LogoContainer>
            <LogoIcon>
              {/* <LogoImg src={luminateLogo} alt="Raisec Test"  /> */}
            </LogoIcon>
            <LogoText>

              <h2>EduPathways Portal</h2>
              <p>Your Gateway to Learning Success</p>
            </LogoText>
          </LogoContainer>
          <UpdatedInfo>
            <Clock size={16} />
            <span>Updated Daily</span>
          </UpdatedInfo>
        </HeaderContent>
      </Header>

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <h2>Empowering Learning Success for Everyone</h2>
          <p>Comprehensive educational resources for students, parents, and counselors</p>

          {/* Search Bar */}
          <SearchContainer>
            <SearchIconWrapper>
              <Search size={16} />
            </SearchIconWrapper>
            <SearchInput
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
        </HeroContent>
      </HeroSection>

      {/* Main Content */}
      <MainContent>
        <TabsContainer>
          <TabsList>
            <TabButton active={activeTab === "students"} onClick={() => setActiveTab("students")}>
              <GraduationCap size={16} />
              Students
            </TabButton>
            <TabButton active={activeTab === "parents"} onClick={() => setActiveTab("parents")}>
              <Heart size={16} />
              Parents
            </TabButton>
            <TabButton active={activeTab === "counselors"} onClick={() => setActiveTab("counselors")}>
              <UserCheck size={16} />
              Counselors
            </TabButton>
          </TabsList>

          <TabContent active={activeTab === "students"}>
            <TabHeader>
              <h3>Student Resources</h3>
              <p>Tools and guidance to help you discover and pursue your ideal learning path</p>
            </TabHeader>
            
            {loading && (
              <LoadingSpinner>
                Loading resources...
              </LoadingSpinner>
            )}
            
            {error && (
              <ErrorMessage>
                {error}
              </ErrorMessage>
            )}
            
            {!loading && !error && (
              <>
                <ResourceGrid>
                  {currentResources.map((resource, index) => (
                    <ResourceCard key={resource.id || index} resource={resource} />
                  ))}
                </ResourceGrid>

                {/* Modern Pagination Controls */}
                {totalPages > 1 && (
                  <PaginationContainer>
                    <PageButton 
                      onClick={() => setCurrentPage(currentPage - 1)} 
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={18} />
                    </PageButton>
                    
                    {startPage > 1 && (
                      <>
                        <PageButton onClick={() => setCurrentPage(1)}>1</PageButton>
                        {startPage > 2 && <span>...</span>}
                      </>
                    )}
                    
                    {pageNumbers.map(number => (
                      <PageButton
                        key={number}
                        active={currentPage === number}
                        onClick={() => setCurrentPage(number)}
                      >
                        {number}
                      </PageButton>
                    ))}
                    
                    {endPage < totalPages && (
                      <>
                        {endPage < totalPages - 1 && <span>...</span>}
                        <PageButton onClick={() => setCurrentPage(totalPages)}>
                          {totalPages}
                        </PageButton>
                      </>
                    )}
                    
                    <PageButton 
                      onClick={() => setCurrentPage(currentPage + 1)} 
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight size={18} />
                    </PageButton>
                  </PaginationContainer>
                )}
              </>
            )}
          </TabContent>

          <TabContent active={activeTab === "parents"}>
            <TabHeader>
              <h3>Parent Resources</h3>
              <p>Support your child's learning journey with expert guidance and practical tools</p>
            </TabHeader>
            
            {loading && (
              <LoadingSpinner>
                Loading resources...
              </LoadingSpinner>
            )}
            
            {error && (
              <ErrorMessage>
                {error}
              </ErrorMessage>
            )}
            
            {!loading && !error && (
              <ResourceGrid>
                {filteredResources.map((resource, index) => (
                  <ResourceCard key={resource.id || index} resource={resource} />
                ))}
              </ResourceGrid>
            )}
          </TabContent>

          <TabContent active={activeTab === "counselors"}>
            <TabHeader>
              <h3>Counselor Resources</h3>
              <p>Professional development and practical tools for effective educational counseling</p>
            </TabHeader>
            
            {loading && (
              <LoadingSpinner>
                Loading resources...
              </LoadingSpinner>
            )}
            
            {error && (
              <ErrorMessage>
                {error}
              </ErrorMessage>
            )}
            
            {!loading && !error && (
              <ResourceGrid>
                {filteredResources.map((resource, index) => (
                  <ResourceCard key={resource.id || index} resource={resource} />
                ))}
              </ResourceGrid>
            )}
          </TabContent>
        </TabsContainer>

        {/* Quick Stats */}
        <StatsSection>
          <StatsTitle>Portal Statistics</StatsTitle>
          <StatsGrid>
            <StatItem color="#4f46e5">
              <div className="value">500+</div>
              <div className="label">Learning Resources</div>
            </StatItem>
            <StatItem color="#10b981">
              <div className="value">50K+</div>
              <div className="label">Students Helped</div>
            </StatItem>
            <StatItem color="#8b5cf6">
              <div className="value">1K+</div>
              <div className="label">Counselors</div>
            </StatItem>
            <StatItem color="#f59e0b">
              <div className="value">95%</div>
              <div className="label">Satisfaction Rate</div>
            </StatItem>
          </StatsGrid>
        </StatsSection>
      </MainContent>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterLogo>
            {/* <LogoImg src={luminateLogo} alt="Raisec Test"  /> */}
          </FooterLogo>
          <FooterDescription>
            Empowering learning success through comprehensive guidance and resources
          </FooterDescription>
          {/* <FooterLinks>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </FooterLinks> */}
        </FooterContent>
      </Footer>
    </PageContainer>
  )
}
