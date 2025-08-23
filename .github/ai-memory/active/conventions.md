# Active Conventions [v2.0 - Updated 2025-08-05]

## AI Memory System Standards
### [Convention] - Ardiy AI Error Learning Mandate [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: critical
**Source**: Continuous improvement requirement for AI assistants
**Content**: **MANDATORY PRACTICE**: Every Ardiy AI tool error must be immediately documented in `active/corrections.md` with complete error context, root cause analysis, and working solution. This creates a permanent knowledge base preventing repeated mistakes. Pattern: Error → Investigation → Solution → Memory Update → Future Prevention. No Ardiy AI session should end without documenting encountered errors and their resolutions.
**References**: All Ardiy AI tool usage, error documentation, continuous learning
**Related**: Memory system updates, automation reliability, knowledge retention

### [Convention] - AI Memory Consultation Protocol [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: critical
**Source**: AI memory system requirements for consistent responses
**Content**: **MANDATORY FIRST ACTION**: Before responding to ANY user message, AI assistants MUST: 1) Read `.github/ai-memory/indexes/quick-reference.md` (first 20 lines minimum) 2) Scan `.github/ai-memory/indexes/topic-index.md` for relevant topics 3) Check applicable `.github/ai-memory/active/*.md` files 4) Only then provide response using discovered knowledge 5) Check `.github/ai-memory/active/corrections.md` for mistakes and corrections before responding. Failure to consult memory = immediate protocol violation.
**References**: All AI assistant interactions, memory system usage
**Related**: Knowledge consistency, response accuracy, protocol enforcement

## Browser Automation Standards
### [Convention] - Ardiy AI Automation Prerequisites [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: critical
**Source**: Browser automation reliability requirements
**Content**: MANDATORY pre-conditions before ANY Ardiy AI automation run: 1) Backend service must be running on designated port 2) Frontend service must be running on designated port 3) Services must be verified as operational before automation. These conditions MUST be verified before launching browser automation testing. Never start Ardiy AI automation without confirming both services are operational.
**References**: All browser automation testing, Ardiy AI workflows
**Related**: Service verification, automation prerequisites, testing reliability


## Package Management
## Environment Configuration
### [Convention] - Environment Variable Patterns [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: public
**Source**: Environment configuration best practices
**Content**: Use consistent environment variable patterns for configuration across services:
- API base URL: `process.env.NEXT_PUBLIC_API_BASE_URL` or similar naming convention
- Environment files: `.env.development`, `.env.production`, `.env.local` for different stages
- Default fallbacks: Always provide sensible defaults for missing environment variables
- Documentation: Document all required environment variables in README or .env.example
**References**: All service files, API client configuration
**Related**: Configuration management, deployment setup

## Code Architecture
### [Convention] - Component Organization Patterns [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: public
**Source**: Component architecture standards
**Content**: Follow consistent component organization patterns:
- Directory structure: Organize components by feature or domain
- Component patterns: Use consistent naming and file structure conventions
- Reusable components: Create shared components for common UI patterns
- Type definitions: Use proper TypeScript types and interfaces
**References**: Component development, project structure
**Related**: Code organization, maintainability

## Data Layer Standards
### [Convention] - Data Fetching Patterns [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: public
**Source**: Data management standardization
**Content**: Use consistent data fetching and state management patterns:
- Centralized API client with authentication handling
- Consistent error handling across all data operations
- Loading states and error boundaries for better UX
- Cache management and data synchronization strategies
**References**: Data services, API integration
**Related**: State management, user experience

## File Organization Standards
### [Convention] - Project File Organization [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: public
**Source**: Project structure standardization
**Content**: Maintain clean and organized project structure:
- **Documentation**: All .md files in `docs/` with logical subfolders
- **Scripts**: Automation scripts in `scripts/` or `automation/` folder
- **Clean Root**: Keep root directory minimal with only essential config files
- **AI Memory**: Use `.github/ai-memory/` for AI knowledge management system
- **Components**: Organize by feature/domain, not by component type
**References**: Project organization, maintainability
**Related**: Development workflow, team collaboration



## Styling
### [Convention] - styling [2025-08-05]
[Convention] - Styling Components and Icons [2025-08-20]
**Status**: active
**Confidence**: high
**Classification**: public
**Source**: UI consistency and maintainability
**Content**: 
- Always use [styled-components](https://styled-components.com/) for styling React components.
- Define styled components at the top of the file, not in external files.
- For icons, always use [Lucide React icons](https://lucide.dev/react/).
- If Lucide React icons are not available, use [React Feather](https://feathericons.com/) as fallback.
**References**: All React component files, UI development
**Related**: Styling consistency, icon usage, code maintainability
