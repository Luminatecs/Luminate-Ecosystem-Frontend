import React, { useEffect } from "react"
import styled from "styled-components"
import { ExternalLink, ArrowLeft } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

const DetailPageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DetailCard = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid #dadce0;
  max-width: 1000px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  
  @media (min-width: 768px) {
    flex-direction: row;
    min-height: 400px;
  }
`

const CardImage = styled.div<{ src: string }>`
  flex: 1;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  min-height: 250px;
  
  @media (min-width: 768px) {
    min-height: auto;
    min-width: 40%;
  }
`

const CardContent = styled.div`
  padding: 32px;
  flex: 1.5;
  display: flex;
  flex-direction: column;
`

const CardTitle = styled.h2`
  font-size: 32px;
  font-weight: 400;
  color: #202124;
  margin-bottom: 16px;
  letter-spacing: 0;
`

const CardDescription = styled.p`
  font-size: 16px;
  color: #5f6368;
  margin-bottom: 24px;
  line-height: 1.6;
  flex-grow: 1;
`

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
`

const FeatureItem = styled.li`
  font-size: 14px;
  color: #202124;
  display: flex;
  align-items: center;
  
  &:before {
    content: "•";
    color: #1967d2;
    font-size: 24px;
    margin-right: 8px;
  }
`

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`

const MetaItem = styled.div`
  background-color: #f8f9fa;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  color: #5f6368;
  border: 1px solid #dadce0;
`

const LinkButton = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: white;
  background-color: #1967d2;
  text-decoration: none;
  padding: 10px 24px;
  border-radius: 4px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  align-self: flex-start;
  font-weight: 500;
  
  &:hover {
    background-color: #1558b0;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  }
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  color: #5f6368;
  border: none;
  padding: 8px 0;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 24px;
  font-weight: 500;

  &:hover {
    color: #202124;
    background: #f1f3f4;
    padding: 8px 12px;
  }
`

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-bottom: 1.5rem;
`

export default function ResourceDetail() {
  const location = useLocation()
  const navigate = useNavigate()
  const resource = location.state?.resource

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate('/resources')
  }

  if (!resource) {
    return (
      <DetailPageContainer>
        <HeaderContainer>
          <BackButton onClick={handleBack}>
            <ArrowLeft size={20} />
            Back to Resources
          </BackButton>
        </HeaderContainer>
        <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '0.75rem' }}>
          <h2>Resource not found</h2>
          <p>The resource you're looking for could not be found. Please return to the resources page.</p>
        </div>
      </DetailPageContainer>
    )
  }

  return (
    <DetailPageContainer>
      <HeaderContainer>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={20} />
          Back to Resources
        </BackButton>
      </HeaderContainer>
      
      <DetailCard>
        <CardImage src={resource.image} />
        <CardContent>
          <CardTitle>{resource.title}</CardTitle>
          
          <MetaInfo>
            {resource.category && <MetaItem>{resource.category}</MetaItem>}
            {resource.type && <MetaItem>{resource.type}</MetaItem>}
            {resource.difficulty && <MetaItem>Level: {resource.difficulty}</MetaItem>}
            {resource.duration && <MetaItem>Duration: {resource.duration}</MetaItem>}
          </MetaInfo>
          
          <CardDescription>{resource.fullDescription}</CardDescription>
          
          {resource.features && resource.features.length > 0 && (
            <>
              <h3>Key Features:</h3>
              <FeaturesList>
                {resource.features.map((feature: string, index: number) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </FeaturesList>
            </>
          )}
          
          <LinkButton href={resource.link} target="_blank" rel="noopener noreferrer">
            Learn More <ExternalLink size={16} />
          </LinkButton>
        </CardContent>
      </DetailCard>
    </DetailPageContainer>
  )
}
