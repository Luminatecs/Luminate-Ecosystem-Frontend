# Memory Validation Rules

## Entry Format Standards
### Required Metadata Template
```markdown
### [Category] - [Title] [ISO Date YYYY-MM-DD]
**Status**: active|archived|deprecated|conflicted
**Confidence**: high|medium|low
**Classification**: public|internal|confidential|restricted
**Source**: [conversation context, session ID, or explicit source]
**Content**: [the actual memory/knowledge - must be actionable and specific]
**References**: [when/where this was used or applied]
**Related**: [links to related memories using file:line format]
```

### Content Quality Requirements
- **Actionable**: Must provide specific guidance or information
- **Contextual**: Include enough background for future understanding
- **Measurable**: Concrete patterns, not vague observations
- **Timely**: Include dates and version context where relevant

## Validation Checklist
### Entry Addition Validation
- [ ] **Format compliance**: All required metadata fields present
- [ ] **Unique title**: No duplicate entry titles in same category
- [ ] **Proper classification**: Appropriate security level assigned
- [ ] **Source attribution**: Clear origin of the knowledge
- [ ] **Content specificity**: Actionable information provided
- [ ] **Reference accuracy**: Valid usage examples included

### Content Validation
- [ ] **Technical accuracy**: Information is correct and current
- [ ] **Completeness**: Sufficient detail for implementation
- [ ] **Consistency**: Aligns with existing patterns and conventions
- [ ] **Privacy compliance**: No sensitive information exposed
- [ ] **Relevance**: Applicable to current project context

## Category-Specific Rules

### Conventions
- **Purpose**: Coding standards, naming patterns, tool preferences
- **Content requirements**: Clear guidelines, examples, rationale
- **Status transitions**: Update to deprecated when standards change
- **Confidence levels**: High for team-agreed standards, medium for suggestions

### Corrections
- **Purpose**: Bug fixes, issues resolved, lessons learned
- **Content requirements**: Problem description, root cause, solution
- **Status transitions**: Remain active until superseded by better solutions
- **Confidence levels**: High for verified fixes, low for untested solutions

### Patterns
- **Purpose**: Development practices, architecture decisions, best practices
- **Content requirements**: Implementation details, usage examples, benefits
- **Status transitions**: Evolve to more sophisticated patterns over time
- **Confidence levels**: High for proven patterns, medium for experimental

### Observations
- **Purpose**: Test results, implementation insights, project milestones
- **Content requirements**: Specific outcomes, metrics, context
- **Status transitions**: Archive after relevance period expires
- **Confidence levels**: High for measured results, low for subjective insights

## Conflict Detection and Resolution
### Identifying Conflicts
- **Direct contradictions**: Two entries giving opposite guidance
- **Outdated patterns**: Old practices superseded by new approaches
- **Context changes**: Solutions no longer applicable to current architecture

### Resolution Process
1. **Mark conflicted**: Update status of conflicting entries
2. **Investigate**: Determine which information is current/correct
3. **Create resolution**: New entry that resolves the conflict
4. **Update references**: Ensure indexes point to resolved entry
5. **Archive outdated**: Move superseded entries to archived status

## Quality Control Standards
### High Confidence Criteria
- **Verified implementation**: Actually used and tested in project
- **Multiple references**: Used in 3+ locations successfully
- **Team consensus**: Agreed upon by development team
- **Proven results**: Measurable positive outcomes

### Medium Confidence Criteria
- **Limited testing**: Used in 1-2 locations with success
- **Logical reasoning**: Sound approach but not extensively proven
- **Best practice alignment**: Follows established industry patterns
- **Conditional applicability**: Works in specific contexts

### Low Confidence Criteria
- **Experimental**: Untested or theoretical approach
- **Single source**: Information from one source only
- **Context dependent**: May not apply broadly
- **Needs validation**: Requires further testing or verification

## Classification Guidelines
### Public
- **Safe for documentation**: Can be shared in public repositories
- **General patterns**: Industry-standard practices and conventions
- **Open source friendly**: No proprietary or sensitive information
- **Educational value**: Useful for broader development community

### Internal
- **Project-specific**: Tailored to this specific codebase
- **Team knowledge**: Internal practices and decisions
- **Architecture details**: System-specific implementations
- **Development workflow**: Team-specific processes

### Confidential
- **Business sensitive**: Contains proprietary business logic
- **Limited access**: Only for core development team
- **Competitive advantage**: Gives insight into business strategy
- **Partner information**: Contains third-party confidential details

### Restricted
- **Highly sensitive**: Security-related or legally sensitive
- **Immediate review required**: Needs security team approval
- **Access control**: Very limited access even within team
- **Audit trail**: All access must be logged

## Validation Automation
### Format Checking
```bash
# Check entry format compliance
grep -r "### \[" ai-memory/active/ | wc -l  # Count entries
grep -r "**Status**:" ai-memory/active/ | wc -l  # Verify metadata
grep -r "**Classification**:" ai-memory/active/ | wc -l  # Check privacy
```

### Content Validation
```bash
# Check for sensitive information
grep -ri "password\|token\|key\|secret" ai-memory/
grep -ri "localhost\|127.0.0.1" ai-memory/  # Check for hardcoded URLs
```

### Reference Validation
- **Index consistency**: All entries referenced in topic-index.md
- **Reference accuracy**: Line numbers in topic-index match actual content
- **Link validity**: Related entries actually exist and are relevant
