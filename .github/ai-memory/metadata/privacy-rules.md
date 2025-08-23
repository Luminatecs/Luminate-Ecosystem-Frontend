# Privacy and Security Rules

## Security Classification Framework

### Information Sensitivity Levels

#### Public (GREEN)
**Definition**: Information safe for public repositories and documentation
- **Examples**: 
  - Standard coding patterns and conventions
  - Open source library usage patterns
  - Generic architectural decisions
  - Industry best practices and standards
- **Handling**: Can be freely shared, referenced in documentation
- **Review**: Self-review sufficient
- **Retention**: Permanent retention allowed

#### Internal (YELLOW)
**Definition**: Project-specific information for team use only
- **Examples**:
  - Project-specific configurations (non-sensitive)
  - Internal development workflows
  - Team conventions and standards
  - Architecture decisions specific to this project
- **Handling**: Share within development team only
- **Review**: Team lead approval recommended
- **Retention**: Retain for project lifetime

#### Confidential (ORANGE)
**Definition**: Business-sensitive information requiring protection
- **Examples**:
  - Proprietary business logic patterns
  - Performance metrics and benchmarks
  - Strategic technical decisions
  - Integration patterns with proprietary systems
- **Handling**: Core team access only, no external sharing
- **Review**: Security team approval required
- **Retention**: Business-defined retention policy

#### Restricted (RED)
**Definition**: Highly sensitive information requiring strict controls
- **Examples**:
  - Security implementation details
  - Authentication mechanisms
  - API keys, tokens, or credentials (should never be stored)
  - Vulnerability information
- **Handling**: Immediate review and possible removal
- **Review**: Security officer approval required
- **Retention**: Audit trail required, time-limited access

## Data Protection Protocols

### Sensitive Information Detection
#### Automated Scanning Patterns
```regex
# Credentials and Secrets
(password|passwd|pwd|secret|key|token|api_key|auth|credential)
(bearer|authorization|authentication|session|jwt|oauth)

# Infrastructure Details
(localhost|127\.0\.0\.1|192\.168\.|10\.|172\.)
(\.env|environment|config|settings)\..*=.*

# Business Logic
(algorithm|formula|calculation|business_rule)
(pricing|revenue|cost|profit|financial)

# Personal Information
(email|phone|address|ssn|id_number)
(name|personal|private|confidential)
```

#### Manual Review Triggers
- Any mention of external vendor names or partnerships
- Performance metrics that could reveal system capacity
- Error messages that could expose system internals
- Database schema or query patterns
- Network architecture or topology details

### Information Sanitization

#### Safe Transformation Patterns
```markdown
# UNSAFE - Contains sensitive information
"Connected to database: postgresql://user:pass@prod-db.company.com:5432/assets"

# SAFE - Sanitized version
"Connected to database: [DATABASE_CONNECTION_STRING]"

# UNSAFE - Exposes business logic
"Apply 15% markup for electronics category, 8% for furniture"

# SAFE - Generalized pattern
"Apply configurable markup based on category rules"

# UNSAFE - Reveals system capacity
"System handles 10,000 concurrent users with 2GB RAM"

# SAFE - Pattern focused
"System performance optimized for concurrent user handling"
```

#### Redaction Guidelines
- **Replace specific values**: Use placeholder patterns [VALUE_TYPE]
- **Generalize patterns**: Focus on the approach, not specific details
- **Abstract business rules**: Describe pattern without exposing logic
- **Remove performance metrics**: Keep optimization patterns only

## Access Control and Audit

### Role-Based Access
#### Developer Access
- **Permissions**: Read/write public and internal classifications
- **Restrictions**: Cannot create confidential or restricted entries
- **Review required**: For any entries containing system internals

#### Team Lead Access
- **Permissions**: Full access to public, internal, and confidential
- **Responsibilities**: Review and approve confidential entries
- **Audit**: Must log rationale for confidential classifications

#### Security Officer Access
- **Permissions**: Full access including restricted information
- **Responsibilities**: Review restricted entries, security implications
- **Mandate**: Can declassify or remove entries for security reasons

### Audit Trail Requirements
#### Entry Creation Logging
```markdown
**Audit Entry**: [YYYY-MM-DD HH:MM:SS]
- **Action**: CREATE
- **Category**: [conventions|corrections|patterns|observations]
- **Classification**: [public|internal|confidential|restricted]
- **Creator**: [role/identifier]
- **Review Status**: [pending|approved|rejected]
- **Justification**: [reason for classification level]
```

#### Access Logging
- **Read access**: Log when restricted entries are accessed
- **Modification tracking**: Full history of changes to entries
- **Classification changes**: Require approval and justification
- **Export/sharing**: Log any external sharing of internal+ information

## Compliance and Legal Protection

### Industry Standards Alignment
#### General Data Protection Regulation (GDPR)
- **Personal data**: Never store personal information in memory system
- **Right to erasure**: Ability to completely remove entries if required
- **Data minimization**: Only store necessary technical information
- **Purpose limitation**: Information used only for development purposes

#### SOC 2 Compliance
- **Access controls**: Role-based permissions implemented
- **Monitoring**: Audit trail for sensitive information access
- **Data integrity**: Validation rules ensure accuracy
- **Availability**: Backup and recovery procedures for memory system

### Legal Risk Mitigation
#### Intellectual Property Protection
- **Trade secrets**: Mark proprietary algorithms as confidential+
- **Third-party IP**: Never store copyrighted code or patterns
- **Attribution**: Properly cite sources for external patterns
- **Fair use**: Ensure usage complies with licensing terms

#### Liability Limitation
- **Disclaimer requirements**: All entries include confidence levels
- **Review processes**: Multi-level review for sensitive classifications
- **Retention policies**: Automatic archival of outdated information
- **Update protocols**: Regular review and validation cycles

## Privacy-by-Design Implementation

### Data Collection Principles
#### Minimal Collection
- **Purpose-driven**: Only collect information needed for development
- **Context-specific**: Information relevant to current project phase
- **Time-bound**: Remove information when no longer needed
- **Quality-focused**: Accurate and relevant information only

#### Transparent Processing
- **Clear categorization**: Obvious classification of sensitivity levels
- **Source attribution**: Always identify where information originated
- **Usage context**: Document when and how information should be used
- **Update notifications**: Track when information becomes outdated

### Technical Safeguards
#### Encryption Requirements
- **At rest**: Confidential+ entries should be encrypted when stored
- **In transit**: Secure transmission when sharing memory system
- **Key management**: Separate encryption keys for different classification levels
- **Access logging**: Monitor decryption events for audit trail

#### Data Segregation
- **Physical separation**: Different storage for different classification levels
- **Logical isolation**: Clear boundaries between sensitivity levels
- **Access controls**: Technical enforcement of role-based permissions
- **Backup isolation**: Separate backup procedures for sensitive data

## Incident Response Procedures

### Data Breach Response
#### Immediate Actions (0-1 hour)
1. **Identify scope**: Determine what information was exposed
2. **Classify impact**: Assess sensitivity level of exposed data
3. **Contain breach**: Prevent further unauthorized access
4. **Document incident**: Create detailed incident report

#### Short-term Response (1-24 hours)
1. **Notify stakeholders**: Inform relevant team members and management
2. **Assess damage**: Evaluate potential impact of exposure
3. **Implement controls**: Additional security measures if needed
4. **Legal consultation**: Involve legal team for compliance implications

#### Long-term Response (24+ hours)
1. **Root cause analysis**: Investigate how breach occurred
2. **Process improvement**: Update procedures to prevent recurrence
3. **Training updates**: Educate team on lessons learned
4. **Compliance reporting**: Submit required regulatory notifications

### Privacy Violation Handling
#### Self-Reporting Process
1. **Recognition**: Team member identifies potential privacy issue
2. **Documentation**: Record nature and scope of potential violation
3. **Assessment**: Evaluate sensitivity and potential impact
4. **Remediation**: Remove or reclassify problematic information
5. **Prevention**: Update processes to avoid similar issues

#### External Notification
- **Legal requirement**: Notify authorities if required by regulation
- **Stakeholder communication**: Inform affected parties if applicable
- **Transparency reporting**: Document incident in public report if appropriate
- **Continuous improvement**: Use incident as learning opportunity
