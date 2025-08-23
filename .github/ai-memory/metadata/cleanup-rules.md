# Memory Cleanup Rules

## File Size Management
### Active File Limits
- **Maximum entries per file**: 30-60 entries
- **Current thresholds**:
  - conventions.md: Max 40 entries (currently 5)
  - corrections.md: Max 50 entries (currently 6) 
  - patterns.md: Max 35 entries (currently 7)
  - observations.md: Max 60 entries (currently 8)

### Archive Triggers
- **Quarterly archive cycle**: Every 3 months compress oldest entries
- **Size-based archiving**: When active files exceed 2000 lines
- **Relevance-based**: Archive entries not referenced in 6 months

## Entry Lifecycle Management
### Status Transitions
- **Active → Archived**: After 6 months or when superseded
- **Active → Deprecated**: When contradicted by new information
- **Archived → Purged**: After 2 years if no references

### Compression Strategy
1. **Group similar entries**: Combine related corrections/patterns
2. **Create summaries**: Quarterly digest with key learnings
3. **Preserve critical knowledge**: Never archive high-confidence, frequently referenced entries
4. **Update indexes**: Ensure all archived content remains discoverable

## Content Quality Control
### Required Metadata Validation
- **Status**: Must be active|archived|deprecated|conflicted
- **Confidence**: Must be high|medium|low
- **Classification**: Must be public|internal|confidential|restricted
- **Source**: Must include session context or explicit source
- **Content**: Must be actionable and specific
- **References**: Must include usage examples where applicable

### Conflict Resolution
- **Contradictory entries**: Mark conflicted, investigate, resolve with new entry
- **Outdated patterns**: Update status to deprecated, create new active entry
- **Duplicate knowledge**: Merge entries, update references

## Archive Structure
### Quarterly Summaries Format
```
# 2025-Q[X] Memory Archive

## Major Patterns Established
- [Pattern name]: [Summary] → Referenced in: [locations]

## Critical Corrections Applied  
- [Issue resolved]: [Solution] → Applied to: [components]

## Key Observations
- [Insight]: [Impact] → Influenced: [decisions]
```

### Archive Naming Convention
- **Format**: `YYYY-qX-summary.md` (e.g., `2025-q1-summary.md`)
- **Content**: Compressed summaries with preserved references
- **Index updates**: All archived content must remain searchable

## Maintenance Schedule
### Weekly Tasks
- Review entry-log.md for usage patterns
- Identify entries with low reference counts
- Update quick-reference.md with trending knowledge

### Monthly Tasks
- Check active file sizes against limits
- Review and resolve any conflicted entries
- Update topic-index.md with new patterns

### Quarterly Tasks
- Create archive summary for previous quarter
- Move low-reference entries to archived folder
- Compress similar entries to reduce active file sizes
- Update project-timeline.md with major milestones

## Privacy and Security Cleanup
### Sensitive Information Removal
- **API keys/tokens**: Never store, sanitize immediately
- **Personal information**: Remove names, emails, personal details
- **Internal URLs**: Replace with generic references
- **Business specifics**: Generalize proprietary information

### Classification Enforcement
- **Public**: Safe for open source, documentation
- **Internal**: Project-specific, no external sharing
- **Confidential**: Limited access, business sensitive
- **Restricted**: Highly sensitive, immediate review required

## Emergency Cleanup Procedures
### File Corruption Recovery
1. **Restore from backup**: Use git history or manual backups
2. **Rebuild from indexes**: Use topic-index and entry-log to reconstruct
3. **Validate integrity**: Check all entries have required metadata

### Rapid Size Reduction
1. **Identify oldest entries**: Sort by date, archive 6+ month old content
2. **Merge duplicates**: Combine similar patterns/corrections
3. **Create emergency archive**: Compress to single quarterly summary
