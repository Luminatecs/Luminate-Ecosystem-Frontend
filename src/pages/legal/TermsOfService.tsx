import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a2332;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LastUpdated = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a2332;
  margin-bottom: 1rem;
  padding-top: 1rem;
`;

const SubsectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
`;

const Text = styled.p`
  color: #4b5563;
  margin-bottom: 1rem;
  text-align: justify;
`;

const List = styled.ul`
  color: #4b5563;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const Strong = styled.strong`
  color: #1a2332;
  font-weight: 600;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  
  &:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }
`;

const ContactInfo = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const TermsOfService: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <BackLink to="/register">← Back to Registration</BackLink>
        
        <Header>
          <Title>Terms of Service</Title>
          <LastUpdated>Last Updated: November 17, 2025</LastUpdated>
        </Header>

        <Section>
          <SectionTitle>1. Agreement and Acceptance</SectionTitle>
          <Text>
            These Terms of Service ("<Strong>Terms</Strong>") govern your access to and use of the Luminate Ecosystem platform 
            ("<Strong>Platform</Strong>", "<Strong>Service</Strong>"), including career assessment tools, educational resources, 
            and administrative services provided by Luminate Ecosystem ("<Strong>Company</Strong>", "<Strong>we</Strong>", 
            "<Strong>our</Strong>", or "<Strong>us</Strong>").
          </Text>
          <Text>
            By creating an account, accessing, or using our Platform, you agree to be bound by these Terms. 
            If you are using the Platform on behalf of an educational institution or organization, you represent 
            and warrant that you have the authority to bind such entity to these Terms.
          </Text>
        </Section>

        <Section>
          <SectionTitle>2. Platform Description</SectionTitle>
          <Text>
            Luminate Ecosystem is a comprehensive career guidance platform that provides:
          </Text>
          <List>
            <li><Strong>Psychometric Assessments:</Strong> RIASEC interest profiling, personality assessments, and career matching tools</li>
            <li><Strong>Educational Institution Management:</Strong> Student enrollment, ward management, and administrative tools</li>
            <li><Strong>AI-Powered Recommendations:</Strong> Machine learning algorithms for personalized career guidance</li>
            <li><Strong>Resource Libraries:</Strong> Career development materials, educational content, and guidance tools</li>
            <li><Strong>Analytics and Reporting:</Strong> Progress tracking and institutional analytics</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. User Accounts and Eligibility</SectionTitle>
          
          <SubsectionTitle>3.1 Account Requirements</SubsectionTitle>
          <Text>
            To use certain features of the Platform, you must create an account and provide accurate, complete information. 
            You are responsible for maintaining the security of your account credentials and all activities that occur under your account.
          </Text>
          
          <SubsectionTitle>3.2 User Types</SubsectionTitle>
          <List>
            <li><Strong>Individual Students:</Strong> Must be at least 13 years old or have parental consent</li>
            <li><Strong>Educational Organizations:</Strong> Authorized representatives of schools, colleges, or educational institutions</li>
            <li><Strong>Organizational Wards:</Strong> Students enrolled through educational institutions</li>
            <li><Strong>Guardians:</Strong> Parents or legal guardians managing student accounts</li>
          </List>
          
          <SubsectionTitle>3.3 Age Requirements</SubsectionTitle>
          <Text>
            Users under 18 years of age may only use the Platform with parental or guardian consent and supervision. 
            Educational institutions enrolling minor students must obtain appropriate consent and comply with applicable 
            educational privacy laws.
          </Text>
        </Section>

        <Section>
          <SectionTitle>4. User Responsibilities and Conduct</SectionTitle>
          <Text>You agree to use the Platform responsibly and in compliance with all applicable laws. You will not:</Text>
          <List>
            <li>Provide false, misleading, or inaccurate information</li>
            <li>Share your account credentials or allow unauthorized access</li>
            <li>Use the Platform for any unlawful or harmful purposes</li>
            <li>Attempt to circumvent security measures or access unauthorized areas</li>
            <li>Upload malicious code, viruses, or harmful content</li>
            <li>Harass, threaten, or abuse other users</li>
            <li>Violate intellectual property rights</li>
            <li>Use automated systems to access or collect data without permission</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Educational Institution Responsibilities</SectionTitle>
          <Text>
            Educational institutions using the Platform for student management agree to:
          </Text>
          <List>
            <li>Obtain necessary consents for student data collection and processing</li>
            <li>Comply with FERPA, COPPA, and other applicable educational privacy laws</li>
            <li>Ensure accurate student information in bulk enrollments</li>
            <li>Maintain security of administrative accounts and temporary credentials</li>
            <li>Provide appropriate supervision for minor users</li>
            <li>Notify us of any security incidents or unauthorized access</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>6. Assessment Results and Career Guidance</SectionTitle>
          <Text>
            Our assessment tools and career recommendations are provided for informational and educational purposes only. 
            While based on validated psychological frameworks and extensive career data:
          </Text>
          <List>
            <li>Results should not be considered professional counseling or definitive career advice</li>
            <li>Individual results may vary and should be interpreted in context</li>
            <li>Users should consider multiple factors when making career decisions</li>
            <li>We recommend consulting with qualified career counselors for important decisions</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>7. Data and Privacy</SectionTitle>
          <Text>
            Your privacy is important to us. Our collection, use, and protection of personal information is governed 
            by our <Link to="/privacy" style={{color: '#2563eb', textDecoration: 'none'}}>Privacy Policy</Link>, 
            which is incorporated into these Terms by reference.
          </Text>
          <Text>
            By using the Platform, you consent to our data practices as described in the Privacy Policy, including 
            the collection of assessment responses, educational progress, and platform usage data for improving our services.
          </Text>
        </Section>

        <Section>
          <SectionTitle>8. Intellectual Property</SectionTitle>
          <Text>
            The Platform and its content, including assessment tools, algorithms, text, graphics, logos, and software, 
            are owned by Luminate Ecosystem and protected by intellectual property laws. You may not:
          </Text>
          <List>
            <li>Copy, modify, or distribute our content without permission</li>
            <li>Reverse engineer or attempt to extract our algorithms</li>
            <li>Use our trademarks or branding without authorization</li>
            <li>Create derivative works based on our Platform</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>9. Subscription and Payment Terms</SectionTitle>
          <Text>
            Certain features may require subscription or payment. By subscribing:
          </Text>
          <List>
            <li>You agree to pay all applicable fees as described at the time of purchase</li>
            <li>Subscriptions automatically renew unless canceled</li>
            <li>Refunds are provided according to our refund policy</li>
            <li>We may change pricing with appropriate notice</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>10. Service Availability and Modifications</SectionTitle>
          <Text>
            We strive to provide reliable service but cannot guarantee uninterrupted access. We reserve the right to:
          </Text>
          <List>
            <li>Modify, suspend, or discontinue any part of the Platform</li>
            <li>Perform scheduled maintenance that may affect availability</li>
            <li>Update features and functionality to improve user experience</li>
            <li>Suspend accounts that violate these Terms</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>11. Limitation of Liability</SectionTitle>
          <Text>
            To the maximum extent permitted by law, Luminate Ecosystem shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages, including lost profits, data loss, or business interruption, 
            arising from your use of the Platform.
          </Text>
          <Text>
            Our total liability for any claims arising from these Terms or your use of the Platform shall not exceed 
            the amount you paid us in the twelve months preceding the claim.
          </Text>
        </Section>

        <Section>
          <SectionTitle>12. Disclaimer of Warranties</SectionTitle>
          <Text>
            The Platform is provided "as is" and "as available" without warranties of any kind, either express or implied. 
            We disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose, 
            and non-infringement.
          </Text>
        </Section>

        <Section>
          <SectionTitle>13. Indemnification</SectionTitle>
          <Text>
            You agree to defend, indemnify, and hold harmless Luminate Ecosystem from any claims, damages, losses, 
            and expenses (including reasonable attorney fees) arising from your use of the Platform, violation of these Terms, 
            or infringement of any third-party rights.
          </Text>
        </Section>

        <Section>
          <SectionTitle>14. Termination</SectionTitle>
          <Text>
            Either party may terminate these Terms at any time. You may delete your account through the Platform settings. 
            We may suspend or terminate accounts that violate these Terms. Upon termination:
          </Text>
          <List>
            <li>Your access to the Platform will cease</li>
            <li>Data retention will be governed by our Privacy Policy</li>
            <li>Certain provisions will survive termination as necessary</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>15. Governing Law and Disputes</SectionTitle>
          <Text>
            These Terms are governed by the laws of [Jurisdiction] without regard to conflict of law principles. 
            Any disputes arising from these Terms or your use of the Platform shall be resolved through binding 
            arbitration in accordance with the rules of [Arbitration Organization].
          </Text>
        </Section>

        <Section>
          <SectionTitle>16. Changes to Terms</SectionTitle>
          <Text>
            We may update these Terms periodically to reflect changes in our services or legal requirements. 
            We will notify users of material changes through the Platform or email. Continued use of the Platform 
            after changes constitutes acceptance of the updated Terms.
          </Text>
        </Section>

        <ContactInfo>
          <SubsectionTitle>17. Contact Information</SubsectionTitle>
          <Text style={{marginBottom: 0}}>
            If you have questions about these Terms, please contact us at:
          </Text>
          <Text style={{marginBottom: 0}}>
            Email: <Strong>legal@luminatecs.com</Strong><br />
            Address: <Strong>Luminate Ecosystem Legal Department</Strong><br />
            Website: <Strong>https://hub.luminatecs.com</Strong>
          </Text>
        </ContactInfo>
      </ContentWrapper>
    </Container>
  );
};

export default TermsOfService;