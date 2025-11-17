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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  
  th, td {
    border: 1px solid #e5e7eb;
    padding: 0.75rem;
    text-align: left;
  }
  
  th {
    background-color: #f9fafb;
    font-weight: 600;
    color: #1a2332;
  }
  
  td {
    color: #4b5563;
  }
`;

const PrivacyPolicy: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <BackLink to="/register">← Back to Registration</BackLink>
        
        <Header>
          <Title>Privacy Policy</Title>
          <LastUpdated>Last Updated: November 17, 2025</LastUpdated>
        </Header>

        <Section>
          <SectionTitle>1. Introduction</SectionTitle>
          <Text>
            Luminate Ecosystem ("<Strong>we</Strong>", "<Strong>our</Strong>", or "<Strong>us</Strong>") is committed to protecting 
            your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, 
            use, store, and share information when you use our career guidance platform and assessment services 
            ("<Strong>Platform</Strong>" or "<Strong>Services</Strong>").
          </Text>
          <Text>
            This policy applies to all users of our Platform, including students, educational institutions, 
            parents/guardians, and organizational administrators.
          </Text>
        </Section>

        <Section>
          <SectionTitle>2. Information We Collect</SectionTitle>
          
          <SubsectionTitle>2.1 Personal Information</SubsectionTitle>
          <Text>We collect personal information that you provide directly to us:</Text>
          <List>
            <li><Strong>Account Information:</Strong> Name, email address, phone number, date of birth, and password</li>
            <li><Strong>Educational Information:</Strong> School/institution affiliation, grade level, student ID, academic interests</li>
            <li><Strong>Profile Data:</Strong> Career interests, goals, preferences, and biographical information</li>
            <li><Strong>Contact Details:</Strong> Mailing address and emergency contact information</li>
          </List>

          <SubsectionTitle>2.2 Assessment and Usage Data</SubsectionTitle>
          <List>
            <li><Strong>Assessment Responses:</Strong> Answers to psychometric tests, RIASEC profiling, personality assessments</li>
            <li><Strong>Performance Data:</Strong> Test results, scores, completion times, and progress tracking</li>
            <li><Strong>Interaction Data:</Strong> Pages visited, features used, time spent on platform, click patterns</li>
            <li><Strong>Device Information:</Strong> IP address, browser type, operating system, device identifiers</li>
          </List>

          <SubsectionTitle>2.3 Educational Institution Data</SubsectionTitle>
          <List>
            <li><Strong>Institutional Information:</Strong> School name, administrator details, enrollment numbers</li>
            <li><Strong>Student Records:</Strong> Bulk enrollment data, ward management information, academic progress</li>
            <li><Strong>Administrative Data:</Strong> User management, temporary credentials, system configurations</li>
          </List>

          <SubsectionTitle>2.4 Automatically Collected Information</SubsectionTitle>
          <List>
            <li><Strong>Log Data:</Strong> Server logs, error reports, system performance metrics</li>
            <li><Strong>Analytics Data:</Strong> Usage patterns, feature adoption, engagement metrics</li>
            <li><Strong>Technical Data:</Strong> Browser settings, screen resolution, connection information</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. How We Use Your Information</SectionTitle>
          
          <SubsectionTitle>3.1 Primary Purposes</SubsectionTitle>
          <List>
            <li><Strong>Assessment Services:</Strong> Provide personalized career assessments and recommendations</li>
            <li><Strong>AI Recommendations:</Strong> Generate career suggestions using machine learning algorithms</li>
            <li><Strong>Educational Support:</Strong> Facilitate student enrollment, progress tracking, and institutional management</li>
            <li><Strong>Account Management:</Strong> Create and maintain user accounts, authentication, and security</li>
          </List>

          <SubsectionTitle>3.2 Service Improvement</SubsectionTitle>
          <List>
            <li><Strong>Platform Enhancement:</Strong> Improve assessment accuracy and user experience</li>
            <li><Strong>Research and Development:</Strong> Develop new features and career guidance tools</li>
            <li><Strong>Quality Assurance:</Strong> Monitor system performance and identify technical issues</li>
            <li><Strong>Data Analytics:</Strong> Generate insights for educational institutions and career guidance</li>
          </List>

          <SubsectionTitle>3.3 Communication</SubsectionTitle>
          <List>
            <li><Strong>Service Notifications:</Strong> Account updates, assessment results, system announcements</li>
            <li><Strong>Educational Content:</Strong> Career guidance materials, resource recommendations</li>
            <li><Strong>Support Services:</Strong> Respond to inquiries and provide technical assistance</li>
            <li><Strong>Administrative Communications:</Strong> Policy updates, terms changes, security alerts</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. Legal Basis for Processing</SectionTitle>
          <Text>We process your personal information based on the following legal grounds:</Text>
          <List>
            <li><Strong>Consent:</Strong> When you voluntarily provide information and agree to our terms</li>
            <li><Strong>Contract Performance:</Strong> To provide the services you've requested</li>
            <li><Strong>Legitimate Interests:</Strong> For service improvement, security, and business operations</li>
            <li><Strong>Legal Obligations:</Strong> To comply with applicable laws and regulations</li>
            <li><Strong>Educational Purpose:</Strong> For legitimate educational assessment and career guidance</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Information Sharing and Disclosure</SectionTitle>
          
          <SubsectionTitle>5.1 Educational Institutions</SubsectionTitle>
          <Text>
            When you are enrolled through an educational institution, we may share relevant information with authorized 
            school personnel, including:
          </Text>
          <List>
            <li>Assessment results and career recommendations</li>
            <li>Academic progress and engagement metrics</li>
            <li>Account status and completion records</li>
          </List>

          <SubsectionTitle>5.2 Parents and Guardians</SubsectionTitle>
          <Text>
            For users under 18, we may share information with parents/guardians as appropriate for educational 
            and safety purposes.
          </Text>

          <SubsectionTitle>5.3 Service Providers</SubsectionTitle>
          <Text>We work with trusted third-party providers who assist in:</Text>
          <List>
            <li>Cloud hosting and data storage services</li>
            <li>Analytics and performance monitoring</li>
            <li>Email delivery and communication services</li>
            <li>Payment processing and subscription management</li>
          </List>

          <SubsectionTitle>5.4 Legal Requirements</SubsectionTitle>
          <Text>We may disclose information when required by law or to:</Text>
          <List>
            <li>Comply with legal processes, subpoenas, or court orders</li>
            <li>Protect the safety and security of our users</li>
            <li>Prevent fraud, abuse, or violations of our terms</li>
            <li>Defend our legal rights and interests</li>
          </List>

          <SubsectionTitle>5.5 What We Don't Share</SubsectionTitle>
          <Text>We never sell personal information to third parties or share it for commercial marketing purposes unrelated to our educational mission.</Text>
        </Section>

        <Section>
          <SectionTitle>6. Data Security and Protection</SectionTitle>
          
          <SubsectionTitle>6.1 Technical Safeguards</SubsectionTitle>
          <List>
            <li><Strong>Encryption:</Strong> Data transmitted and stored using industry-standard encryption</li>
            <li><Strong>Access Controls:</Strong> Role-based permissions and multi-factor authentication</li>
            <li><Strong>Regular Audits:</Strong> Security assessments and vulnerability testing</li>
            <li><Strong>Secure Infrastructure:</Strong> Protected servers and network monitoring</li>
          </List>

          <SubsectionTitle>6.2 Administrative Safeguards</SubsectionTitle>
          <List>
            <li><Strong>Employee Training:</Strong> Privacy and security awareness programs</li>
            <li><Strong>Access Limitations:</Strong> Need-to-know basis for data access</li>
            <li><Strong>Incident Response:</Strong> Procedures for security breach management</li>
            <li><Strong>Data Minimization:</Strong> Collecting only necessary information</li>
          </List>

          <SubsectionTitle>6.3 Physical Safeguards</SubsectionTitle>
          <List>
            <li><Strong>Secure Facilities:</Strong> Protected data centers with controlled access</li>
            <li><Strong>Equipment Security:</Strong> Secure disposal of hardware and media</li>
            <li><Strong>Environmental Controls:</Strong> Climate and power monitoring systems</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>7. Data Retention</SectionTitle>
          <Text>We retain your information for as long as necessary to provide our services and comply with legal obligations:</Text>
          
          <Table>
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Retention Period</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Account Information</td>
                <td>Duration of account plus 3 years</td>
                <td>Service provision and support</td>
              </tr>
              <tr>
                <td>Assessment Results</td>
                <td>7 years or until deletion request</td>
                <td>Career guidance and research</td>
              </tr>
              <tr>
                <td>Usage Analytics</td>
                <td>2 years</td>
                <td>Service improvement</td>
              </tr>
              <tr>
                <td>Educational Records</td>
                <td>As required by institution policy</td>
                <td>Academic compliance</td>
              </tr>
              <tr>
                <td>Log Files</td>
                <td>1 year</td>
                <td>Security and troubleshooting</td>
              </tr>
            </tbody>
          </Table>
        </Section>

        <Section>
          <SectionTitle>8. Your Privacy Rights</SectionTitle>
          
          <SubsectionTitle>8.1 Access and Control</SubsectionTitle>
          <Text>You have the right to:</Text>
          <List>
            <li><Strong>Access:</Strong> Request copies of your personal information</li>
            <li><Strong>Correction:</Strong> Update inaccurate or incomplete information</li>
            <li><Strong>Deletion:</Strong> Request removal of your personal data</li>
            <li><Strong>Portability:</Strong> Receive your data in a machine-readable format</li>
            <li><Strong>Restriction:</Strong> Limit how we process your information</li>
            <li><Strong>Objection:</Strong> Opt-out of certain processing activities</li>
          </List>

          <SubsectionTitle>8.2 Educational Records Rights</SubsectionTitle>
          <Text>
            Under FERPA, students and parents have specific rights regarding educational records, including 
            the right to inspect, request amendments, and control disclosure of educational information.
          </Text>

          <SubsectionTitle>8.3 Exercising Your Rights</SubsectionTitle>
          <Text>
            To exercise these rights, contact us at <Strong>privacy@luminatecs.com</Strong> or through your 
            account settings. We will respond within 30 days of receiving a valid request.
          </Text>
        </Section>

        <Section>
          <SectionTitle>9. Children's Privacy</SectionTitle>
          
          <SubsectionTitle>9.1 COPPA Compliance</SubsectionTitle>
          <Text>
            For children under 13, we comply with the Children's Online Privacy Protection Act (COPPA). 
            We obtain parental consent before collecting personal information from children and allow 
            parents to review, delete, and control their child's information.
          </Text>

          <SubsectionTitle>9.2 Educational Exception</SubsectionTitle>
          <Text>
            When schools use our Platform for educational purposes, we may collect student information 
            under COPPA's educational exception, with the school acting as the agent for parental consent.
          </Text>

          <SubsectionTitle>9.3 Parental Controls</SubsectionTitle>
          <Text>Parents and guardians can:</Text>
          <List>
            <li>Review their child's personal information</li>
            <li>Request deletion of their child's account</li>
            <li>Refuse further collection or use of their child's information</li>
            <li>Access their child's assessment results and progress</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>10. International Data Transfers</SectionTitle>
          <Text>
            Our Platform may process information in countries other than where you reside. When we transfer 
            personal information internationally, we implement appropriate safeguards, including:
          </Text>
          <List>
            <li>Standard contractual clauses approved by regulatory authorities</li>
            <li>Adequacy decisions for countries with equivalent protection</li>
            <li>Certification schemes and codes of conduct</li>
            <li>Strong encryption and security measures</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>11. Cookies and Tracking Technologies</SectionTitle>
          
          <SubsectionTitle>11.1 Types of Cookies</SubsectionTitle>
          <Text>We use various types of cookies and similar technologies:</Text>
          <List>
            <li><Strong>Essential Cookies:</Strong> Required for basic platform functionality</li>
            <li><Strong>Performance Cookies:</Strong> Help us understand how you use our Platform</li>
            <li><Strong>Functional Cookies:</Strong> Remember your preferences and settings</li>
            <li><Strong>Analytics Cookies:</Strong> Provide insights for service improvement</li>
          </List>

          <SubsectionTitle>11.2 Cookie Management</SubsectionTitle>
          <Text>
            You can manage cookie preferences through your browser settings or our cookie consent tool. 
            Note that disabling certain cookies may limit platform functionality.
          </Text>
        </Section>

        <Section>
          <SectionTitle>12. Third-Party Services</SectionTitle>
          <Text>
            Our Platform may contain links to third-party websites or integrate with external services. 
            This Privacy Policy does not cover third-party practices, and we encourage you to review 
            their privacy policies before sharing information.
          </Text>
          <Text>
            We integrate with educational systems and career databases to enhance our services, 
            ensuring these partnerships maintain appropriate privacy protections.
          </Text>
        </Section>

        <Section>
          <SectionTitle>13. Data Breach Notification</SectionTitle>
          <Text>
            In the unlikely event of a data breach that poses a risk to your personal information, 
            we will notify affected users and relevant authorities as required by applicable laws, 
            typically within 72 hours of discovering the breach.
          </Text>
        </Section>

        <Section>
          <SectionTitle>14. Privacy Policy Updates</SectionTitle>
          <Text>
            We may update this Privacy Policy periodically to reflect changes in our practices, 
            services, or legal requirements. We will notify users of material changes through 
            the Platform, email, or other appropriate means.
          </Text>
          <Text>
            The "Last Updated" date at the top of this policy indicates when the latest changes were made. 
            Continued use of the Platform after changes constitutes acceptance of the updated policy.
          </Text>
        </Section>

        <Section>
          <SectionTitle>15. Regional Privacy Rights</SectionTitle>
          
          <SubsectionTitle>15.1 European Users (GDPR)</SubsectionTitle>
          <Text>
            If you are in the European Economic Area, you have additional rights under the General Data 
            Protection Regulation (GDPR), including enhanced data portability, the right to be forgotten, 
            and the right to lodge complaints with supervisory authorities.
          </Text>

          <SubsectionTitle>15.2 California Users (CCPA)</SubsectionTitle>
          <Text>
            California residents have specific rights under the California Consumer Privacy Act (CCPA), 
            including the right to know what personal information is collected and the right to opt-out 
            of the sale of personal information (though we do not sell personal information).
          </Text>

          <SubsectionTitle>15.3 Other Jurisdictions</SubsectionTitle>
          <Text>
            We comply with applicable privacy laws in all jurisdictions where we operate and provide 
            appropriate protections based on local requirements.
          </Text>
        </Section>

        <ContactInfo>
          <SubsectionTitle>16. Contact Information</SubsectionTitle>
          <Text style={{marginBottom: '0.5rem'}}>
            If you have questions about this Privacy Policy or our data practices, please contact us:
          </Text>
          <Text style={{marginBottom: 0}}>
            <Strong>Privacy Officer:</Strong> privacy@luminatecs.com<br />
            <Strong>Data Protection Officer:</Strong> dpo@luminatecs.com<br />
            <Strong>General Inquiries:</Strong> support@luminatecs.com<br />
            <Strong>Mailing Address:</Strong><br />
            Luminate Ecosystem Privacy Department<br />
            [Address Line 1]<br />
            [Address Line 2]<br />
            <Strong>Website:</Strong> https://hub.luminatecs.com
          </Text>
        </ContactInfo>
      </ContentWrapper>
    </Container>
  );
};

export default PrivacyPolicy;