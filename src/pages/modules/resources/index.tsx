import { useState } from "react"
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
  ArrowLeft,
} from "lucide-react"
// import luminateLogo from '../img/luminate-logo.png';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
`

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid #dadce0;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
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

const UpdatedInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #4338ca;
    transform: translateX(-2px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

const HeroSection = styled.section`
  padding: 48px 24px;
  text-align: center;
  background: white;
  border-bottom: 1px solid #dadce0;
`

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  h2 {
    font-size: 32px;
    font-weight: 400;
    color: #202124;
    margin-bottom: 8px;
    letter-spacing: 0;
  }
  
  p {
    font-size: 16px;
    color: #5f6368;
    margin-bottom: 32px;
    font-weight: 400;
  }
`

const SearchContainer = styled.div`
  position: relative;
  max-width: 30rem;
  margin: 0 auto 1rem;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 48px;
  border-radius: 24px;
  border: 1px solid #dadce0;
  font-size: 14px;
  background: #f1f3f4;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  
  &:hover {
    background: #e8eaed;
  }
  
  &:focus {
    outline: none;
    background: white;
    border-color: #1967d2;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  }

  &::placeholder {
    color: #5f6368;
  }
`

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #5f6368;
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
  gap: 8px;
  margin-bottom: 32px;
  background-color: white;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #dadce0;
`

const TabButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  background-color: ${(props) => (props.active ? "#1967d2" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#5f6368")};
  font-weight: ${(props) => (props.active ? "500" : "400")};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  
  &:hover {
    background-color: ${(props) => (props.active ? "#1558b0" : "#f1f3f4")};
  }
`

const TabContent = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
`

const TabHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
  
  h3 {
    font-size: 24px;
    font-weight: 400;
    color: #202124;
    margin-bottom: 8px;
    letter-spacing: 0;
  }
  
  p {
    color: #5f6368;
    font-size: 14px;
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

const ResourceCardWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid #dadce0;
  height: 100%;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  
  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
    transform: translateY(-2px);
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
  padding: 8px;
  background-color: #e8f0fe;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1967d2;
`

const FeaturedBadge = styled.span`
  background-color: #e8f0fe;
  color: #1967d2;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 12px;
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #64748b;
`

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #202124;
  margin-bottom: 4px;
  line-height: 1.3;
`

const CardDescription = styled.p`
  font-size: 14px;
  color: #5f6368;
  margin-bottom: 8px;
  line-height: 1.5;
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
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #dadce0;
  color: #5f6368;
  background: #f8f9fa;
`

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #1967d2;
  background: none;
  border: none;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #f1f3f4;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
  gap: 1rem;
`

const PageButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  background: ${props => props.active ? '#1967d2' : 'white'};
  color: ${props => props.active ? 'white' : '#5f6368'};
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active ? '#1967d2' : '#dadce0'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: ${props => props.active ? '500' : 'normal'};
  
  &:hover {
    background: ${props => props.disabled ? (props.active ? '#1967d2' : 'white') : (props.active ? '#1558b0' : '#f1f3f4')};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
  }
`

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("students")
  const [currentPage, setCurrentPage] = useState(1)
  const [resourcesPerPage] = useState(6)
  const navigate = useNavigate()

  const studentResources = [
    {
      id: "career-assessment",
      title: "Career Assessment Tools",
      description: "Discover your interests, skills, and potential career paths",
      fullDescription:
        "Our comprehensive career assessment tools help you understand your personality, interests, values, and skills to identify potential career paths that align with who you are. These scientifically-backed assessments provide detailed reports and personalized recommendations to guide your career exploration journey.",
      category: "Assessment",
      type: "Interactive",
      rating: 4.8,
      link: "https://example.com/career-assessment",
      icon: Target,
      featured: true,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Personality assessment based on Holland Code theory",
        "Skills inventory and gap analysis",
        "Values clarification exercises",
        "Personalized career recommendations",
        "Detailed PDF reports",
      ],
      duration: "30-45 minutes",
      difficulty: "Beginner",
    },
    {
      id: "resume-builder",
      title: "Resume Builder & Templates",
      description: "Professional resume templates and building tools",
      fullDescription:
        "Create professional, ATS-friendly resumes with our collection of modern templates and intuitive builder tool. Whether you're a recent graduate or changing careers, our platform provides step-by-step guidance to showcase your experience effectively.",
      category: "Job Prep",
      type: "Tool",
      rating: 4.7,
      link: "https://example.com/resume-builder",
      icon: FileText,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "20+ professional templates",
        "ATS-optimization checker",
        "Real-time editing and preview",
        "Export to PDF and Word formats",
        "Industry-specific examples",
      ],
      duration: "15-30 minutes",
      difficulty: "Beginner",
    },
    {
      id: "interview-prep",
      title: "Interview Preparation Guide",
      description: "Tips, common questions, and practice scenarios",
      fullDescription:
        "Master the art of interviewing with our comprehensive preparation guide. From behavioral questions to technical interviews, we provide strategies, sample answers, and practice opportunities to boost your confidence.",
      category: "Job Prep",
      type: "Guide",
      rating: 4.9,
      link: "https://example.com/interview-prep",
      icon: MessageCircle,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "500+ common interview questions",
        "STAR method framework",
        "Video practice sessions",
        "Industry-specific scenarios",
        "Mock interview scheduling",
      ],
      duration: "2-3 hours",
      difficulty: "Intermediate",
    },
    {
      id: "industry-exploration",
      title: "Industry Exploration Hub",
      description: "Explore different industries and career opportunities",
      fullDescription:
        "Dive deep into various industries to understand career opportunities, growth trends, salary expectations, and required skills. Our comprehensive database covers traditional and emerging fields.",
      category: "Exploration",
      type: "Database",
      rating: 4.6,
      link: "https://example.com/industry-hub",
      icon: Briefcase,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "50+ industry profiles",
        "Salary and growth data",
        "Required skills breakdown",
        "Day-in-the-life videos",
        "Professional interviews",
      ],
      duration: "1-2 hours per industry",
      difficulty: "Beginner",
    },
    {
      id: "scholarships",
      title: "Scholarship & Financial Aid",
      description: "Find funding opportunities for your education",
      fullDescription:
        "Access our comprehensive database of scholarships, grants, and financial aid opportunities. Filter by criteria that match your background, interests, and academic achievements.",
      category: "Financial",
      type: "Database",
      rating: 4.5,
      link: "https://example.com/scholarships",
      icon: GraduationCap,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "10,000+ scholarship opportunities",
        "Personalized matching algorithm",
        "Application deadline tracking",
        "Essay writing assistance",
        "Financial aid calculator",
      ],
      duration: "Ongoing",
      difficulty: "Beginner",
    },
    {
      id: "networking",
      title: "Networking & Mentorship",
      description: "Connect with professionals in your field of interest",
      fullDescription:
        "Build meaningful professional relationships through our networking platform. Connect with industry professionals, find mentors, and participate in virtual networking events.",
      category: "Networking",
      type: "Platform",
      rating: 4.4,
      link: "https://example.com/networking",
      icon: Users,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Professional mentor matching",
        "Industry networking events",
        "LinkedIn optimization tips",
        "Informational interview guides",
        "Professional communication templates",
      ],
      duration: "Ongoing",
      difficulty: "Intermediate",
    },
  ]

  const parentResources = [
    {
      id: "teen-career-support",
      title: "Supporting Your Teen's Career Journey",
      description: "A comprehensive guide for parents on career guidance",
      fullDescription:
        "Learn how to effectively support your teenager's career exploration without overwhelming them. This guide provides practical strategies for meaningful conversations, understanding their interests, and helping them make informed decisions.",
      category: "Guidance",
      type: "Guide",
      rating: 4.8,
      link: "https://example.com/teen-support",
      icon: Heart,
      featured: true,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Age-appropriate conversation starters",
        "Understanding generational differences",
        "Supporting without pressuring",
        "Recognizing signs of career anxiety",
        "Building confidence and independence",
      ],
      duration: "1-2 hours",
      difficulty: "Beginner",
    },
    {
      id: "assessment-understanding",
      title: "Understanding Career Assessments",
      description: "How to interpret and discuss career assessment results",
      fullDescription:
        "Decode career assessment results and learn how to have productive discussions with your teen about their findings. Understand the science behind assessments and how to use results constructively.",
      category: "Assessment",
      type: "Article",
      rating: 4.7,
      link: "https://example.com/assessment-guide",
      icon: BookOpen,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Assessment types explained",
        "Interpreting personality results",
        "Discussing strengths and challenges",
        "Action planning from results",
        "When to seek professional help",
      ],
      duration: "45 minutes",
      difficulty: "Beginner",
    },
    {
      id: "education-options",
      title: "College vs. Trade School Discussion",
      description: "Helping your child explore all post-secondary options",
      fullDescription:
        "Navigate the complex landscape of post-secondary education options. Understand the benefits of different paths and help your teen make decisions based on their goals, interests, and circumstances.",
      category: "Education",
      type: "Video",
      rating: 4.6,
      link: "https://example.com/education-options",
      icon: Video,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "4-year college overview",
        "Community college benefits",
        "Trade school opportunities",
        "Alternative education paths",
        "ROI analysis tools",
      ],
      duration: "2 hours",
      difficulty: "Intermediate",
    },
    {
      id: "financial-planning",
      title: "Financial Planning for Career Goals",
      description: "Budgeting for education and career development",
      fullDescription:
        "Create a comprehensive financial plan for your child's career journey. Learn about education costs, career investment strategies, and how to prepare financially for different career paths.",
      category: "Financial",
      type: "Calculator",
      rating: 4.5,
      link: "https://example.com/financial-planning",
      icon: TrendingUp,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Education cost calculators",
        "Career ROI analysis",
        "Savings strategies",
        "Financial aid planning",
        "Budget templates",
      ],
      duration: "1-2 hours",
      difficulty: "Intermediate",
    },
    {
      id: "communication-strategies",
      title: "Communication Strategies",
      description: "How to have productive career conversations with your teen",
      fullDescription:
        "Master the art of career conversations with your teenager. Learn communication techniques that encourage open dialogue, build trust, and support their decision-making process.",
      category: "Communication",
      type: "Workshop",
      rating: 4.9,
      link: "https://example.com/communication",
      icon: MessageCircle,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Active listening techniques",
        "Asking the right questions",
        "Avoiding common pitfalls",
        "Building trust and rapport",
        "Conflict resolution strategies",
      ],
      duration: "3 hours",
      difficulty: "Intermediate",
    },
  ]

  const counselorResources = [
    {
      id: "counseling-practices",
      title: "Career Counseling Best Practices",
      description: "Evidence-based approaches to career guidance",
      fullDescription:
        "Stay current with the latest evidence-based practices in career counseling. This comprehensive resource covers theoretical frameworks, practical techniques, and ethical considerations for effective career guidance.",
      category: "Professional",
      type: "Training",
      rating: 4.9,
      link: "https://example.com/best-practices",
      icon: UserCheck,
      featured: true,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Theoretical framework overview",
        "Evidence-based interventions",
        "Ethical guidelines and standards",
        "Cultural competency training",
        "Outcome measurement tools",
      ],
      duration: "8 hours",
      difficulty: "Advanced",
    },
    {
      id: "assessment-tools",
      title: "Assessment Tools & Interpretation",
      description: "Comprehensive guide to career assessment instruments",
      fullDescription:
        "Master the use of various career assessment tools and learn to interpret results effectively. This resource covers popular assessments, their applications, and how to communicate findings to clients.",
      category: "Assessment",
      type: "Manual",
      rating: 4.8,
      link: "https://example.com/assessment-tools",
      icon: Target,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Assessment tool comparison",
        "Administration guidelines",
        "Interpretation frameworks",
        "Report writing templates",
        "Client feedback strategies",
      ],
      duration: "6 hours",
      difficulty: "Advanced",
    },
    {
      id: "group-activities",
      title: "Group Career Counseling Activities",
      description: "Ready-to-use activities for group sessions",
      fullDescription:
        "Enhance your group career counseling sessions with these engaging, research-based activities. Each activity includes detailed instructions, materials needed, and learning objectives.",
      category: "Activities",
      type: "Resource Pack",
      rating: 4.7,
      link: "https://example.com/group-activities",
      icon: Users,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "50+ group activities",
        "Detailed facilitation guides",
        "Printable worksheets",
        "Age-appropriate variations",
        "Assessment rubrics",
      ],
      duration: "Varies",
      difficulty: "Intermediate",
    },
    {
      id: "labor-market",
      title: "Labor Market Information",
      description: "Current job market trends and salary data",
      fullDescription:
        "Access up-to-date labor market information to inform your career counseling practice. This resource provides current trends, salary data, and employment projections across various industries.",
      category: "Data",
      type: "Database",
      rating: 4.6,
      link: "https://example.com/labor-market",
      icon: TrendingUp,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Real-time job market data",
        "Salary benchmarking tools",
        "Employment projections",
        "Skills demand analysis",
        "Regional market comparisons",
      ],
      duration: "Ongoing",
      difficulty: "Intermediate",
    },
    {
      id: "special-populations",
      title: "Special Populations Guidance",
      description: "Career counseling for diverse student populations",
      fullDescription:
        "Develop culturally responsive career counseling approaches for diverse populations. This resource addresses unique challenges and provides strategies for working with various student groups.",
      category: "Diversity",
      type: "Guide",
      rating: 4.8,
      link: "https://example.com/special-populations",
      icon: Heart,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Cultural competency frameworks",
        "Population-specific strategies",
        "Bias recognition training",
        "Inclusive assessment practices",
        "Community resource mapping",
      ],
      duration: "4 hours",
      difficulty: "Advanced",
    },
    {
      id: "technology-counseling",
      title: "Technology in Career Counseling",
      description: "Digital tools and platforms for modern career guidance",
      fullDescription:
        "Integrate technology effectively into your career counseling practice. Explore digital tools, online platforms, and virtual counseling techniques that enhance client engagement and outcomes.",
      category: "Technology",
      type: "Review",
      rating: 4.5,
      link: "https://example.com/tech-counseling",
      icon: Briefcase,
      image: "/placeholder.svg?height=400&width=600",
      features: [
        "Digital tool evaluations",
        "Virtual counseling best practices",
        "Online assessment platforms",
        "Social media integration",
        "Privacy and security guidelines",
      ],
      duration: "3 hours",
      difficulty: "Intermediate",
    },
  ]

  // Add learning style resources from the JSON file
  const learningStyleResources = [
    {
      id: "learning-style-quiz",
      title: "LearningStyleQuiz.com",
      description: "Free online learning style quiz (J-KAV model) with instant results, no email or signup needed.",
      fullDescription:
        'LearningStyleQuiz.com offers a quick "What is Your Learning Style?" test that is free to take with no email or registration required. Aimed at students of all ages, this quiz assesses your preferred learning modality using the site\'s unique J-KAV™ framework – combining personality factors with the classic modalities (visual, auditory, kinesthetic). It only takes a few minutes to complete, after which you receive immediate feedback on how you learn best and tips to improve your learning effectiveness. The site is dedicated to helping users "make the most of their learning experiences", tailoring study strategies to whether you learn better by seeing, hearing, or doing.',
      category: "Assessment",
      type: "Quiz",
      rating: 4.7,
      link: "https://www.learningstylequiz.com",
      icon: Target,
      image: "https://image.thum.io/get/https://www.learningstylequiz.com",
      features: [
        "J-KAV learning style model",
        "No signup required",
        "Instant results",
        "Personalized study tips",
        "All ages appropriate",
      ],
      duration: "5-10 minutes",
      difficulty: "Beginner",
      tags: ["learning-styles", "VARK-model", "quiz", "no-signup", "all-ages"],
      free: true,
    },
    {
      id: "education-planner",
      title: "EducationPlanner – What's Your Learning Style?",
      description:
        "20-question self-assessment for students (visual, auditory, or tactile learner) with personalized tips, by EducationPlanner.org.",
      fullDescription:
        "EducationPlanner's \"What's Your Learning Style?\" quiz is a short, 20-question online assessment designed to help students discover their primary learning style and how it affects their understanding and problem-solving. After answering the questions, you receive instant results showing whether you are a visual, auditory, or tactile learner, along with a profile describing your style and study tips. This resource is straightforward and geared toward middle and high school students, with a printer-friendly results option. It's offered free on EducationPlanner.org and does not require any login or personal information.",
      category: "Assessment",
      type: "Self-Assessment",
      rating: 4.6,
      link: "https://www.educationplanner.org/students/self-assessments/learning-styles",
      icon: BookOpen,
      image: "https://image.thum.io/get/https://www.educationplanner.org/students/self-assessments/learning-styles",
      features: [
        "20-question assessment",
        "Visual, auditory, tactile classification",
        "Printer-friendly results",
        "K-12 student focused",
        "No login required",
      ],
      duration: "10-15 minutes",
      difficulty: "Beginner",
      tags: ["student-assessment", "visual-auditory-tactile", "educationplanner", "self-assessment", "K12"],
      free: true,
    },
    {
      id: "vark-questionnaire",
      title: "VARK Learning Styles Questionnaire",
      description:
        "Official VARK questionnaire (16 questions) that identifies your preference among Visual, Aural, Read/Write, and Kinesthetic learning modalities.",
      fullDescription:
        "The VARK Questionnaire is the classic assessment that presents 16 scenario-based questions – on each, you select one or more answers that match your preferred approach. When finished, you get an immediate result showing your learning preference profile across the four VARK modalities: Visual, Aural (Auditory), Read/Write, and Kinesthetic. The feedback indicates which modality (or combination) you prefer and often suggests study strategies aligned with your style. This official VARK quiz is freely accessible and doesn't require any sign-up: you simply choose answers and click \"OK\" to instantly see your results. It's widely used in education to help learners of all ages understand if they learn best by seeing, hearing, reading, or doing.",
      category: "Assessment",
      type: "Questionnaire",
      rating: 4.9,
      link: "http://vark-learn.com/english/page.asp?p=questionnaire",
      icon: Target,
      image: "https://image.thum.io/get/http://vark-learn.com/english/page.asp?p=questionnaire",
      features: [
        "16 scenario-based questions",
        "Four learning modalities assessment",
        "Immediate results",
        "Study strategy recommendations",
        "Widely used in education",
      ],
      duration: "5-10 minutes",
      difficulty: "Beginner",
      tags: ["VARK", "official-resource", "modalities", "self-assessment", "instant-feedback"],
      free: true,
    },
  ]

  // Add learning style resources to student resources
  const allStudentResources = [...studentResources, ...learningStyleResources]

  const getResourcesByTab = () => {
    switch (activeTab) {
      case "students":
        return allStudentResources
      case "parents":
        return parentResources
      case "counselors":
        return counselorResources
      default:
        return allStudentResources
    }
  }

  const filteredResources = getResourcesByTab().filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleResourceClick = (resource: any) => {
    // Remove the icon component completely as it can't be serialized
    const { icon, ...serializableResource } = resource;
    
    // Navigate to the detail page with only serializable data
    navigate(`/resources/${resource.id}`, { 
      state: { 
        resource: serializableResource
      } 
    });
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

  const ResourceCard = ({ resource }: { resource: any }) => {
    const IconComponent = resource.icon

    return (
      <ResourceCardWrapper onClick={() => handleResourceClick(resource)}>
        <CardHeader>
          <CardHeaderTop>
            <IconContainer>
              <IconBadge>
                <IconComponent size={16} />
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
            <img 
              src="/luminate-logo.png" 
              alt="Luminate Logo" 
              style={{ 
                width: '120px', 
                height: 'auto',
                objectFit: 'contain'
              }} 
            />
          </LogoContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <UpdatedInfo>
              <Clock size={16} />
              <span>Updated Daily</span>
            </UpdatedInfo>
            <BackButton onClick={() => navigate('/ecosystem')}>
              <ArrowLeft />
              Back to Ecosystem
            </BackButton>
          </div>
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
          </TabContent>

          <TabContent active={activeTab === "parents"}>
            <TabHeader>
              <h3>Parent Resources</h3>
              <p>Support your child's learning journey with expert guidance and practical tools</p>
            </TabHeader>
            <ResourceGrid>
              {filteredResources.map((resource, index) => (
                <ResourceCard key={resource.id || index} resource={resource} />
              ))}
            </ResourceGrid>
          </TabContent>

          <TabContent active={activeTab === "counselors"}>
            <TabHeader>
              <h3>Counselor Resources</h3>
              <p>Professional development and practical tools for effective educational counseling</p>
            </TabHeader>
            <ResourceGrid>
              {filteredResources.map((resource, index) => (
                <ResourceCard key={resource.id || index} resource={resource} />
              ))}
            </ResourceGrid>
          </TabContent>
        </TabsContainer>

        {/* Quick Stats */}
        <StatsSection>
          <StatsTitle>Portal Statistics</StatsTitle>
          <StatsGrid>
            <StatItem color="#4f46e5">
              <div className="value">10+</div>
              <div className="label">Learning Resources</div>
            </StatItem>
            <StatItem color="#10b981">
              <div className="value">10+</div>
              <div className="label">Students Helped</div>
            </StatItem>
            <StatItem color="#8b5cf6">
              <div className="value">10+</div>
              <div className="label">Counselors</div>
            </StatItem>
            <StatItem color="#f59e0b">
              <img src="/luminate-logo.png" alt="Luminate Logo" style={{ width: '60px', height: 'auto' }} />
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
