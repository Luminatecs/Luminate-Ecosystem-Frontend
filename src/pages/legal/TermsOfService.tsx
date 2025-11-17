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
            ("<Strong>Platform</Strong>", "<Strong>Service</Strong>", or "<Strong>Ecosystem</Strong>"), including all integrated services such as:
          </Text>
          <List>
            <li><Strong>Kaeval:</Strong> Psychometric assessment and career profiling tools</li>
            <li><Strong>LumiCourses:</Strong> Educational content and learning management features</li>
            <li><Strong>Assessment Tools:</Strong> RIASEC profiling, personality tests, and career matching algorithms</li>
            <li><Strong>Administrative Dashboards:</Strong> Institution management, student enrollment, and analytics tools</li>
            <li><Strong>AI-Powered Services:</Strong> Machine learning recommendations and automated guidance systems</li>
            <li><Strong>Mobile and Web Applications:</Strong> All client applications and interfaces</li>
          </List>
          <Text>
            These services are provided by Luminate Ecosystem ("<Strong>Company</Strong>", "<Strong>we</Strong>", 
            "<Strong>our</Strong>", or "<Strong>us</Strong>"), a technology company based in Ghana.
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
          
          <SubsectionTitle>2.1 AI and Technology Disclaimers</SubsectionTitle>
          <Text>
            <Strong>Important:</Strong> Our AI-powered recommendations and assessment results are generated using algorithms 
            and machine learning models. While these tools are designed to provide helpful guidance:
          </Text>
          <List>
            <li>AI recommendations may not always be accurate or suitable for every individual</li>
            <li>Results should be interpreted by qualified educational or career professionals</li>
            <li>Institutions and users remain responsible for making informed decisions based on multiple factors</li>
            <li>Career predictions and labor market projections may change over time</li>
            <li>Individual circumstances, personal growth, and market conditions can affect outcomes</li>
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
          
          <SubsectionTitle>3.3 Age Requirements and Child Protection</SubsectionTitle>
          <Text>
            In compliance with Ghana's Children's Act, 1998 (Act 560), Ghana's Data Protection Act, 2012 (Act 843), 
            and COPPA-equivalent international standards:
          </Text>
          <List>
            <li>Users under 18 years of age may only use the Platform with verified parental or guardian consent and supervision</li>
            <li>Educational institutions must verify and maintain records of parental/guardian information for minor students</li>
            <li>Institutions are responsible for obtaining explicit consent before enrolling minor students</li>
            <li>We implement additional privacy protections for users under 18, prioritizing their best interests</li>
            <li>Parents and guardians have the right to access, review, and control their child's data at any time</li>
            <li>Minors' accounts require enhanced security measures and data minimization practices</li>
          </List>
          
          <SubsectionTitle>3.4 Verification Requirements</SubsectionTitle>
          <Text>
            Educational institutions must:
          </Text>
          <List>
            <li>Verify the identity and authority of parent/guardian contacts</li>
            <li>Maintain up-to-date emergency contact information</li>
            <li>Ensure proper documentation for student enrollment</li>
            <li>Regularly review and update parental consent records</li>
          </List>
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
            <li>Deliberately burden our infrastructure through excessive requests or resource consumption</li>
            <li>Misuse AI-generated content to deceive, harm, or mislead others</li>
            <li>Attempt to reverse-engineer our AI algorithms or assessment methodologies</li>
            <li>Use our Platform to generate content for competing services</li>
          </List>
          
          <SubsectionTitle>4.1 AI Usage Guidelines</SubsectionTitle>
          <Text>When using AI-powered features:</Text>
          <List>
            <li>Verify AI-generated recommendations with qualified professionals</li>
            <li>Do not rely solely on AI output for critical decisions</li>
            <li>Understand that AI responses are based on patterns in training data and may contain biases</li>
            <li>Do not attempt to manipulate AI systems to generate inappropriate content</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Educational Institution Responsibilities</SectionTitle>
          <Text>
            Educational institutions using the Platform for student management agree to:
          </Text>
          <List>
            <li>Comply with Ghana's Data Protection Act, 2012 (Act 843), Children's Act, 1998 (Act 560), and applicable local data protection laws</li>
            <li>Comply with FERPA (if applicable to international students) and equivalent educational privacy regulations</li>
            <li>Obtain explicit, documented parental consent for all minor students before enrollment</li>
            <li>Verify parent/guardian identity and maintain accurate contact records</li>
            <li>Ensure accurate student information in bulk enrollments and regular updates</li>
            <li>Maintain security of administrative accounts and temporary credentials</li>
            <li>Provide appropriate supervision for minor users and monitor their platform usage</li>
            <li>Notify us immediately of any security incidents, data breaches, or unauthorized access</li>
            <li>Train staff members on proper data handling and privacy protection procedures</li>
            <li>Conduct regular audits of student data and remove unnecessary or outdated information</li>
            <li>Respect students' and parents' rights regarding data access, correction, and deletion</li>
          </List>
          
          <SubsectionTitle>5.1 Parental Consent Requirements</SubsectionTitle>
          <Text>
            Institutions must obtain and maintain:
          </Text>
          <List>
            <li>Written consent from parents/guardians for data collection and processing</li>
            <li>Consent for specific uses of student data, including assessments and career guidance</li>
            <li>Regular reconfirmation of consent as students progress through educational levels</li>
            <li>Clear documentation of consent withdrawal procedures</li>
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
            <li>Individual results may vary based on user input, mood, circumstances, and honesty of responses</li>
            <li>Users should consider multiple factors when making career decisions</li>
            <li>We recommend consulting with qualified career counselors for important decisions</li>
            <li>Career recommendations are not guarantees of future job availability, success, or outcomes</li>
            <li>Labor market conditions, economic factors, and industry changes can affect career prospects</li>
            <li>Assessment results reflect current interests and abilities but may change over time</li>
          </List>
          
          <SubsectionTitle>6.1 Result Limitations</SubsectionTitle>
          <Text>
            <Strong>Important Disclaimers:</Strong>
          </Text>
          <List>
            <li>Assessments are tools for exploration, not definitive determinations of capability or future success</li>
            <li>Cultural, socioeconomic, and educational backgrounds may influence results</li>
            <li>Results should be interpreted within the context of local job markets and educational opportunities</li>
            <li>Retaking assessments may yield different results as interests and circumstances evolve</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>7. Data Security and Platform Security</SectionTitle>
          
          <SubsectionTitle>7.1 Our Security Commitments</SubsectionTitle>
          <Text>
            We implement industry-standard security measures to protect your data, including encryption, 
            access controls, and regular security audits. Our security practices are designed to meet or exceed 
            standards reasonable for an organization of our size and the nature of data we process.
          </Text>
          
          <SubsectionTitle>7.2 Privacy Policy Integration</SubsectionTitle>
          <Text>
            Your privacy is important to us. Our collection, use, and protection of personal information is governed 
            by our <Link to="/privacy" style={{color: '#2563eb', textDecoration: 'none'}}>Privacy Policy</Link>, 
            which is incorporated into these Terms by reference.
          </Text>
          
          <SubsectionTitle>7.3 Data Collection and Usage</SubsectionTitle>
          <Text>
            <Strong>We collect and process the following types of data:</Strong>
          </Text>
          <List>
            <li><Strong>Personal Information:</Strong> Name, email, educational details, contact information</li>
            <li><Strong>Assessment Data:</Strong> Test responses, scores, career interests, and progress tracking</li>
            <li><Strong>Usage Data:</Strong> Platform interactions, feature usage, and performance metrics</li>
            <li><Strong>Technical Data:</Strong> Device information, IP addresses, and system logs</li>
          </List>
          <Text>
            <Strong>Important:</Strong> We do not sell personal data to third parties. Data is used to provide services, 
            improve our platform, and generate anonymized insights for research and development.
          </Text>
          
          <SubsectionTitle>7.4 Data Retention</SubsectionTitle>
          <Text>
            Personal data is retained as specified in our Privacy Policy, typically for the duration of your account 
            plus applicable legal retention periods. You may request data deletion subject to legal and operational requirements.
          </Text>
          
          <SubsectionTitle>7.5 Third-Party Processors</SubsectionTitle>
          <Text>
            We may use trusted third-party service providers for hosting, analytics, communication, and payment processing. 
            All third parties are bound by appropriate data protection agreements.
          </Text>
          
          <SubsectionTitle>7.6 Security Limitations</SubsectionTitle>
          <Text>
            While we maintain robust security measures, no system is completely secure. We cannot guarantee absolute 
            security against all possible threats, particularly those involving sophisticated attacks, zero-day 
            exploits, or circumstances beyond our reasonable control.
          </Text>
        </Section>

        <Section>
          <SectionTitle>8. AI Usage Disclosure</SectionTitle>
          
          <SubsectionTitle>8.1 How Our AI Features Work</SubsectionTitle>
          <Text>
            Our Platform uses artificial intelligence and machine learning in several ways:
          </Text>
          <List>
            <li><Strong>Career Matching:</Strong> Algorithms analyze assessment responses to suggest compatible careers</li>
            <li><Strong>Personalized Recommendations:</Strong> AI suggests resources, courses, and next steps based on user profiles</li>
            <li><Strong>Progress Tracking:</Strong> Machine learning identifies patterns in learning and skill development</li>
            <li><Strong>Content Curation:</Strong> AI helps organize and recommend relevant educational materials</li>
          </List>
          
          <SubsectionTitle>8.2 AI Limitations and Biases</SubsectionTitle>
          <Text>
            <Strong>Important to understand:</Strong>
          </Text>
          <List>
            <li>AI systems are trained on historical data that may contain societal biases</li>
            <li>Recommendations reflect patterns in training data, not guaranteed outcomes</li>
            <li>AI may not account for unique individual circumstances or emerging career fields</li>
            <li>Cultural and regional factors may not be fully represented in AI models</li>
            <li>AI-generated content should always be reviewed by qualified professionals</li>
          </List>
          
          <SubsectionTitle>8.3 User Verification Expectations</SubsectionTitle>
          <Text>
            Users and institutions should:
          </Text>
          <List>
            <li>Treat AI recommendations as starting points for exploration, not final decisions</li>
            <li>Consult with career counselors, teachers, or industry professionals</li>
            <li>Consider local job market conditions and educational opportunities</li>
            <li>Regularly update assessment responses as interests and circumstances change</li>
            <li>Report any obviously inappropriate or biased AI recommendations</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>9. Intellectual Property</SectionTitle>
          
          <SubsectionTitle>9.1 Our Intellectual Property</SubsectionTitle>
          <Text>
            The Platform and its content, including assessment tools, algorithms, text, graphics, logos, and software, 
            are owned by Luminate Ecosystem and protected by intellectual property laws. You may not:
          </Text>
          <List>
            <li>Copy, modify, or distribute our content without permission</li>
            <li>Reverse engineer or attempt to extract our algorithms</li>
            <li>Use our trademarks or branding without authorization</li>
            <li>Create derivative works based on our Platform</li>
            <li>Resell, sublicense, or redistribute the Platform or its services</li>
            <li>Use our Platform to develop competing services</li>
          </List>
          
          <SubsectionTitle>9.2 Institutional Usage Restrictions</SubsectionTitle>
          <Text>
            Educational institutions and organizations are granted a limited license to use our Platform 
            for their educational purposes only. Institutions may not:
          </Text>
          <List>
            <li>Resell or sublicense Platform access to other organizations</li>
            <li>Share institutional accounts across multiple unaffiliated institutions</li>
            <li>Use our Platform to provide commercial career counseling services to non-students</li>
            <li>Extract or repurpose our assessment content for other platforms</li>
          </List>
          
          <SubsectionTitle>9.3 User-Generated Content</SubsectionTitle>
          <Text>
            You retain ownership of content you create or upload to the Platform (such as profile information, 
            assessment responses, or notes). However, you grant us a functional license to:
          </Text>
          <List>
            <li>Process and analyze your data to provide personalized services</li>
            <li>Use anonymized, aggregated data for research and platform improvement</li>
            <li>Store and back up your content to ensure service reliability</li>
            <li>Share relevant data with your educational institution (where applicable)</li>
          </List>
          <Text>
            This license is non-exclusive, limited to our service provision, and terminates when you delete your account 
            (subject to legal retention requirements).
          </Text>
        </Section>

        <Section>
          <SectionTitle>10. Subscription and Payment Terms</SectionTitle>
          <Text>
            Certain features may require subscription or payment. By subscribing:
          </Text>
          <List>
            <li>You agree to pay all applicable fees as described at the time of purchase</li>
            <li>Subscriptions automatically renew unless canceled before the renewal date</li>
            <li>Refunds are provided according to our refund policy</li>
            <li>We may change pricing with 30 days' advance notice to affected users</li>
            <li>Educational institutions receive 30 days' notice for significant pricing changes</li>
          </List>
          
          <SubsectionTitle>10.1 Institutional Payment Terms</SubsectionTitle>
          <Text>
            For educational institutions:
          </Text>
          <List>
            <li>Payment terms are specified in individual institutional agreements</li>
            <li>Delayed payments may result in restricted platform access after a 15-day grace period</li>
            <li>Student accounts may be converted to limited-access mode during payment disputes</li>
            <li>Full service restoration occurs within 24 hours of payment resolution</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>11. Service Availability and Modifications</SectionTitle>
          <Text>
            We strive to provide reliable service but cannot guarantee uninterrupted access. We reserve the right to:
          </Text>
          <List>
            <li>Modify, suspend, or discontinue any part of the Platform with reasonable notice</li>
            <li>Perform scheduled maintenance that may temporarily affect availability</li>
            <li>Update features and functionality to improve user experience</li>
            <li>Suspend accounts that violate these Terms</li>
            <li>Limit or restrict service access immediately for security reasons without prior notice</li>
          </List>
          
          <SubsectionTitle>11.1 Third-Party Outages</SubsectionTitle>
          <Text>
            We are not liable for service interruptions caused by:
          </Text>
          <List>
            <li>Internet service provider outages or network connectivity issues</li>
            <li>Cloud hosting provider failures or maintenance</li>
            <li>Third-party service integrations (payment processors, email providers, etc.)</li>
            <li>Government-mandated internet restrictions or blackouts</li>
            <li>Cyberattacks on infrastructure providers beyond our control</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>11. Limitation of Liability</SectionTitle>
          
          <SubsectionTitle>11.2 General Limitations</SubsectionTitle>
          <Text>
            To the maximum extent permitted by law in your jurisdiction, Luminate Ecosystem shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages, including lost profits, data loss, or business interruption, 
            arising from your use of the Platform, even if we have been informed of the possibility of such damages.
          </Text>
          
          <SubsectionTitle>11.2 Force Majeure and External Circumstances</SubsectionTitle>
          <Text>
            We shall not be liable for any failure to perform our obligations under these Terms if such failure 
            results from circumstances reasonably beyond our control, including but not limited to:
          </Text>
          <List>
            <li>Natural disasters, severe weather, or other acts of nature</li>
            <li>Government actions, laws, regulations, or sanctions</li>
            <li>War, terrorism, civil unrest, or political instability</li>
            <li>Cyberattacks, hacking, or sophisticated security breaches by third parties</li>
            <li>Infrastructure failures by internet service providers or hosting services</li>
            <li>Power outages, telecommunications failures, or technical issues beyond our control</li>
            <li>Pandemics, epidemics, or other public health emergencies</li>
          </List>
          
          <SubsectionTitle>11.3 Damage Cap</SubsectionTitle>
          <Text>
            Our total liability for any claims arising from these Terms or your use of the Platform shall not exceed 
            the amount you paid us in the twelve months preceding the claim, or GHS 1,000 (One Thousand Ghana Cedis), 
            whichever is greater.
          </Text>
          
          <SubsectionTitle>11.4 User Responsibilities</SubsectionTitle>
          <Text>
            Users acknowledge that they bear responsibility for protecting their own data and account security, 
            and we are not liable for losses resulting from user negligence, sharing of credentials, or failure 
            to follow security best practices.
          </Text>
        </Section>

        <Section>
          <SectionTitle>13. Disclaimer of Warranties</SectionTitle>
          <Text>
            The Platform is provided "as is" and "as available" without warranties of any kind, either express or implied. 
            We disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose, 
            and non-infringement.
          </Text>
          
          <SubsectionTitle>13.1 Career and Labor Market Disclaimers</SubsectionTitle>
          <Text>
            We make no guarantees regarding:
          </Text>
          <List>
            <li>Accuracy of career projections or labor market trends over time</li>
            <li>Availability of recommended career paths in your local market</li>
            <li>Success in recommended educational programs or career fields</li>
            <li>Employment opportunities or salary expectations based on our recommendations</li>
            <li>Long-term accuracy of AI-generated career guidance as markets evolve</li>
          </List>
          
          <Text>
            Economic conditions, technological changes, and market dynamics can significantly impact career prospects 
            and educational opportunities. Users should conduct independent research and seek professional guidance.
          </Text>
        </Section>

        <Section>
          <SectionTitle>14. Indemnification</SectionTitle>
          <Text>
            You agree to defend, indemnify, and hold harmless Luminate Ecosystem from any claims, damages, losses, 
            and expenses (including reasonable attorney fees) arising from your use of the Platform, violation of these Terms, 
            or infringement of any third-party rights.
          </Text>
          
          <SubsectionTitle>14.1 Institutional Indemnification</SubsectionTitle>
          <Text>
            Educational institutions additionally agree to indemnify us against claims arising from:
          </Text>
          <List>
            <li>Privacy breaches related to their handling of student data outside our Platform</li>
            <li>Failure to obtain proper parental consent or violating local educational privacy laws</li>
            <li>Misuse of our Platform by their staff or unauthorized account sharing</li>
            <li>Claims by students or parents related to institutional data handling practices</li>
            <li>Violations of their own institutional policies using our Platform</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>15. Termination</SectionTitle>
          <Text>
            Either party may terminate these Terms at any time. You may delete your account through the Platform settings. 
            We may suspend or terminate accounts that violate these Terms. Upon termination:
          </Text>
          <List>
            <li>Your access to the Platform will cease</li>
            <li>Data retention will be governed by our Privacy Policy</li>
            <li>Certain provisions will survive termination as necessary</li>
          </List>
          
          <SubsectionTitle>15.1 Institutional Termination Effects</SubsectionTitle>
          <Text>
            When an educational institution terminates their account:
          </Text>
          <List>
            <li>Individual student accounts may be converted to limited-access mode rather than deleted</li>
            <li>Students may choose to maintain individual accounts with their own credentials</li>
            <li>Assessment history and personal progress data may be preserved for student access</li>
            <li>Institutional administrative features and bulk management tools will be disabled</li>
            <li>Students have 90 days to transition to individual accounts or download their data</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>15. Governing Law and Disputes</SectionTitle>
          <Text>
            These Terms are governed by the laws of Ghana without regard to conflict of law principles. 
            Any disputes arising from these Terms or your use of the Platform shall be resolved through binding 
            arbitration in accordance with the rules of the Ghana Arbitration Centre, or through the competent 
            courts of Ghana.
          </Text>
        </Section>

        <Section>
          <SectionTitle>17. Changes to Terms</SectionTitle>
          <Text>
            We may update these Terms periodically to reflect changes in our services or legal requirements. 
            We will notify users of material changes through the Platform, email, or other appropriate means. 
            Continued use of the Platform after changes constitutes acceptance of the updated Terms.
          </Text>
          
          <SubsectionTitle>17.1 Special Notice for Minors</SubsectionTitle>
          <Text>
            For material changes affecting users under 18 years of age, we will:
          </Text>
          <List>
            <li>Notify parents/guardians directly via email when possible</li>
            <li>Notify educational institutions responsible for minor students</li>
            <li>Provide a 5-day notice period before changes take effect</li>
            <li>Allow withdrawal of consent if parents/guardians object to changes</li>
          </List>
        </Section>

        <ContactInfo>
          <SubsectionTitle>19. Contact Information</SubsectionTitle>
          <Text style={{marginBottom: 0}}>
            If you have questions about these Terms, please contact us at:
          </Text>
          <Text style={{marginBottom: 0}}>
            <Strong>Legal Inquiries:</Strong> legal@luminatecs.com<br />
            <Strong>Data Protection Officer:</Strong> dpo@luminatecs.com<br />
            <Strong>General Support:</Strong> support@luminatecs.com<br />
            <Strong>Mailing Address:</Strong><br />
            Luminate Ecosystem Legal Department<br />
            P.O. Box [Number]<br />
            Accra, Ghana<br />
            <Strong>Website:</Strong> https://hub.luminatecs.com
          </Text>
        </ContactInfo>

        <Section>
          <SectionTitle>18. Research and Insights</SectionTitle>
          <Text>
            We may use anonymized or aggregated data derived from Platform usage for research and product improvement purposes:
          </Text>
          <List>
            <li><Strong>Educational Research:</Strong> Studying career guidance effectiveness and student outcomes</li>
            <li><Strong>Platform Improvement:</Strong> Analyzing usage patterns to enhance user experience</li>
            <li><Strong>Industry Insights:</Strong> Contributing to career guidance research and best practices</li>
            <li><Strong>Public Benefit:</Strong> Supporting educational policy research and workforce development</li>
          </List>
          
          <Text>
            <Strong>Data Protection:</Strong> All research uses anonymized, aggregated data that cannot be traced back to 
            individual users. We never share identifiable personal information for research purposes without explicit consent.
          </Text>
        </Section>

        <Section>
          <SectionTitle>19. Children's Data Protection</SectionTitle>
          
          <SubsectionTitle>19.1 Child-Safety Provisions</SubsectionTitle>
          <Text>
            In addition to our general privacy protections, we implement enhanced safeguards for users under 18:
          </Text>
          <List>
            <li><Strong>Data Minimization:</Strong> Collecting only essential information necessary for educational purposes</li>
            <li><Strong>Enhanced Security:</Strong> Additional authentication and monitoring for minor accounts</li>
            <li><Strong>Limited Data Sharing:</Strong> Restricted sharing with approved educational personnel only</li>
            <li><Strong>Regular Review:</Strong> Automatic deletion of unnecessary data every 12 months</li>
            <li><Strong>No Commercial Use:</Strong> Child data never used for marketing or commercial purposes</li>
          </List>
          
          <SubsectionTitle>19.2 Parental Rights</SubsectionTitle>
          <Text>
            Parents and legal guardians have the right to:
          </Text>
          <List>
            <li>Access all data collected about their child</li>
            <li>Request correction of inaccurate information</li>
            <li>Demand deletion of their child's account and data</li>
            <li>Restrict certain data processing activities</li>
            <li>Receive notifications about data practices affecting their child</li>
            <li>File complaints with relevant data protection authorities</li>
          </List>
          
          <SubsectionTitle>19.3 Institutional Responsibilities for Minors</SubsectionTitle>
          <Text>
            Educational institutions managing minor student accounts must:
          </Text>
          <List>
            <li>Act in the best interests of the child at all times</li>
            <li>Obtain and maintain valid parental consent</li>
            <li>Provide proper supervision of minor users</li>
            <li>Report any concerning behavior or safety issues</li>
            <li>Respect parental requests regarding their child's data</li>
          </List>
        </Section>
      </ContentWrapper>
    </Container>
  );
};

export default TermsOfService;