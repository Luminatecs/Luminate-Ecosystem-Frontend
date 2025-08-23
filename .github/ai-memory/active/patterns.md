# Active Patterns [v2.0 - Updated 2025-08-05]

## Browser Automation Patterns
### [Pattern] - Window Confirmation Dialog Handling [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: critical
**Source**: Browser automation dialog interaction requirements
**Content**: **WINDOW CONFIRMATION INTERACTION METHODS**: When actions trigger browser confirmation dialogs, use these Ardiy AI approaches: 1) **Method 1 - JavaScript Dialog Handling**: Use `evaluate_javascript` to programmatically accept/dismiss: `window.confirm = () => true; // Auto-accept` or `window.confirm = () => false; // Auto-dismiss` 2) **Method 2 - Dialog Event Listeners**: Use evaluate_javascript to intercept and handle dialog events before they appear 3) **Method 3 - DOM-based Confirmation**: If using custom modal confirmations (not native browser dialogs), use standard Ardiy AI interaction tools (advanced_dom_interaction, text selectors) 4) **Detection Strategy**: Use evaluate_javascript to check if confirmation dialog is present 5) **Best Practice**: Take screenshot before triggering action, set up dialog handler, perform action, verify result 6) **Validation**: After confirmation handling, verify expected result and success feedback
**References**: Delete operations, confirmation dialogs, browser automation
**Related**: UI interaction, confirmation handling, user feedback

### [Pattern] - Modal Confirmation Implementation [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: critical
**Source**: Modern UX patterns for confirmation handling
**Content**: **MODAL CONFIRMATION REPLACEMENT STRATEGY**: Replace native browser confirmations with custom modal components: 1) **Component-based Confirmations**: Use framework-specific modal components instead of window.confirm 2) **Hook Patterns**: Implement confirmation hooks for consistent UX 3) **Action Handlers**: Wrap destructive actions with confirmation dialogs 4) **Success Notifications**: Provide clear feedback after action completion 5) **Error Handling**: Show appropriate error messages with retry options 6) **Accessibility**: Ensure modal confirmations are accessible and follow ARIA guidelines **RESULT**: Professional user experience with consistent design patterns
**References**: Modal confirmations, notification systems, modern UX patterns
**Related**: User experience, accessibility, component design

### [Pattern] - Ardiy AI Prerequisites Verification [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: critical
**Source**: Automation reliability requirements
**Content**: MANDATORY workflow before ANY Ardiy AI automation execution: 1) Verify Backend Status: Check backend service is running on designated port 2) Verify Frontend Status: Check frontend service is running on designated port 3) Confirm Connectivity: Ensure frontend can communicate with backend APIs 4) Only THEN proceed with Ardiy AI browser automation tools. Include service verification in automation scripts for reliability.
**References**: All Ardiy AI automation runs, browser testing workflows
**Related**: Service verification, automation prerequisites, testing reliability

### [Pattern] - Browser Memory Management Protocol [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: critical
**Source**: Resource management for automation sessions
**Content**: MANDATORY browser management workflow: 1) ALWAYS check browser status before opening new browsers 2) ALWAYS close previous browsers before opening new ones 3) Use proper browser cleanup methods for each connected browser 4) Monitor browser count - more than 2-3 connected browsers indicates memory leak 5) Clean up disconnected browsers periodically 6) Log browser lifecycle in testing documentation. NEVER open multiple browsers without cleanup to prevent system memory exhaustion.
**References**: All browser automation testing, Ardiy AI workflows, memory management
**Related**: Browser automation, resource management, system performance

### [Pattern] - Dynamic Form Automation Strategy [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: critical
**Source**: Complex form automation requirements
**Content**: Advanced Ardiy AI automation strategy for dynamic forms: 1) **Code Analysis First**: Review component structure to understand field requirements and validation rules 2) **Required Fields Priority**: Focus on required fields and their constraints 3) **Dynamic Selector Strategy**: Use multiple selector approaches: CSS selectors (data-testid), XPath selectors (::-p-xpath), Text-based (::-p-text), ARIA selectors (::-p-aria), Shadow DOM (>>>) 4) **Complex Form Handling**: When encountering difficulties: a) Analyze component structure thoroughly b) Review available automation tools for best approach c) Use evaluate_javascript for complex state inspection d) Try alternative selector types e) Use fill_form for comprehensive form automation 5) **Success Criteria**: Complete form submission with all required fields, verify expected results 6) **Persistence Protocol**: Use analytical thinking to overcome complex challenges
**References**: Form automation, dynamic components, complex DOM interaction
**Related**: User interface testing, form validation, automation reliability

### [Pattern] - Ardiy AI Error Documentation Protocol [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: critical
**Source**: Continuous improvement through error learning
**Content**: **SYSTEMATIC ERROR LEARNING**: Document every Ardiy AI tool error for future prevention: 1) **Issue**: Navigation/routing failures - Solution: Verify file structure and service status before testing 2) **Issue**: Timeout on complex interactions - Solution: Use text-based selectors and increase timeout values 3) **Issue**: Form submission failures - Solution: Use fill_form for multiple fields or advanced_type_text with validation 4) **Issue**: Modal/popup interactions - Solution: Wait for proper load states, verify element visibility 5) **Issue**: Dropdown/select interactions - Solution: Try text-based selection first, then programmatic approaches 6) **EFFICIENCY PRACTICES**: a) Always verify prerequisites b) Take screenshots for debugging c) Use evaluate_javascript for state checks d) Have fallback selector strategies e) Chain related actions efficiently
**References**: All Ardiy AI automation, error prevention, efficiency improvement  
**Related**: Automation reliability, debugging strategies, performance optimization

### [Pattern] - CRUD Testing Workflow [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: critical
**Source**: Comprehensive application testing requirements
**Content**: **COMPLETE CRUD TESTING STRATEGY**: 1) **Discovery Phase**: Navigate to feature, identify UI patterns and action elements 2) **Create Testing**: Test new record creation through forms and UI 3) **Read Testing**: Verify data display, listing, and detail views 4) **Update Testing**: Test edit functionality, form pre-population, and change persistence 5) **Delete Testing**: Test removal functionality, confirmation handling, and cleanup 6) **UI Pattern Recognition**: Use data-testid attributes, action buttons, dropdown menus 7) **Validation Methods**: Take before/after screenshots, verify record counts, check feedback messages 8) **Debugging Strategies**: Use multiple selector types, check for different UI layouts (tables vs cards)
**References**: Application testing, CRUD operations, UI validation
**Related**: Full-stack testing, user interface testing, data validation

### [Pattern] - Browser Testing Workflow Standards [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: public
**Source**: Standardized browser automation practices
**Content**: Consistent browser testing workflow: 1) **Initialize**: Launch browser and verify prerequisites 2) **Navigate**: Open target URL with appropriate wait conditions 3) **Document**: Take initial screenshot for reference 4) **Analyze**: Get page structure to understand layout 5) **Test**: Interact with elements systematically 6) **Validate**: Verify expected behaviors and results 7) **Document**: Take final screenshots and log results 8) **Cleanup**: Close browser and cleanup resources
**References**: All browser testing, automation workflows
**Related**: Quality assurance, testing standards, development workflow

### [Pattern] - Interactive Element Testing Protocol [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: public
**Source**: Systematic UI element validation
**Content**: Test interactive elements comprehensively: 1) **Element Discovery**: Use appropriate selectors to locate elements 2) **Visibility Validation**: Ensure elements are accessible and visible 3) **Interaction Testing**: Test clicks, form inputs, hover states 4) **State Validation**: Verify element state changes and responses 5) **Error Handling**: Test error conditions and edge cases 6) **Accessibility**: Verify keyboard navigation and screen reader compatibility
**References**: Component testing, form validation, user interaction testing
**Related**: Component development, user experience validation, accessibility

### [Pattern] - Full-Stack Development Workflow [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: public
**Source**: Comprehensive development and testing approach
**Content**: Complete development workflow using automation tools: 1) **Visual Testing**: Launch browser, navigate to features, take screenshots for context 2) **Functional Testing**: Test all CRUD operations through actual UI 3) **Network Analysis**: Monitor frontend-backend communication 4) **Code Analysis**: Review implementation details for understanding 5) **Issue Resolution**: Identify problems, modify code, retest 6) **Iteration**: Repeat test-debug-fix cycle until complete 7) **Documentation**: Log findings, solutions, and lessons learned
**References**: Full-stack development, comprehensive testing, debugging workflows
**Related**: Development lifecycle, quality assurance, documentation
**Related**: Software development lifecycle, testing methodology, debugging practices

## Service Architecture Patterns
### [Pattern] - Standardized Service Template [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: technical
**Source**: Service layer standardization
**Content**: Consistent service architecture across all services:
- **HTTP Client**: Authenticated client with automatic token handling
- **Data Fetching**: Use appropriate data fetching library for read operations
- **Response Handling**: Consistent response handling patterns
- **Error Handling**: Robust error handling for different response formats
- **Type Safety**: Proper TypeScript typing throughout
**References**: Service layer, API client configuration
**Related**: Data management, backend integration

### [Pattern] - Data Transformation Architecture [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: technical
**Source**: Backend API integration patterns
**Content**: Systematic data transformation between frontend and backend:
- **Conversion Functions**: Standardized conversion between data formats
- **Property Mapping**: Consistent property naming convention mapping
- **Validation**: Enhanced data validation and sanitization
- **Required Fields**: Proper handling of required fields for backend validation
**References**: Data conversion, backend DTOs
**Related**: Backend compliance, data validation

### [Pattern] - Ardiy AI Browser Automation Arsenal [2025-08-05]
**Status**: active
**Confidence**: high
**Classification**: critical
**Source**: Comprehensive browser automation capabilities
**Content**: **COMPLETE Ardiy AI TOOLS MASTERY**: **BROWSER LIFECYCLE**: Launch browsers (visible/headless), monitor status, cleanup resources **NAVIGATION & CAPTURE**: Smart navigation with wait strategies, screenshot capabilities (full page, elements, quality control) **ADVANCED INTERACTION**: DOM interaction with Shadow DOM, XPath, Text, ARIA, Pierce selectors for modern frameworks **FORM AUTOMATION**: Advanced typing with delays, intelligent form completion **DATA EXTRACTION**: Content and attribute extraction, deep DOM analysis **UTILITIES**: JavaScript execution, file upload automation **EXPERT WORKFLOWS**: Complete app testing, modern SPA automation, CRUD testing, visual regression **SELECTOR STRATEGIES**: CSS→XPath→Shadow DOM→Text-based→ARIA **WAIT STRATEGIES**: load, domcontentloaded, networkidle0, networkidle2 **PREREQUISITES**: Verify backend and frontend services before automation
**References**: Browser automation, testing workflows, modern web apps
**Related**: UI testing, automation workflows, service verification

## Project Scaffolding Patterns
### [Pattern] - Frontend Project Structure [2025-08-20]
**Status**: active
**Confidence**: high
**Classification**: critical
**Source**: Project architecture standardization
**Content**: **MANDATORY FOLDER STRUCTURE** for new frontend projects:
- **models/**: All data models and TypeScript interfaces
- **services/**: API service layers and business logic
- **config/**: Configuration files including base URL setup
- **api/**: API client implementation using fetch (never axios)

**CONFIG PATTERN** - Always create `config/index.ts`:
```typescript
const API_BASE_URL = process.env.API_URL;

// Increase timeout for better reliability in production builds

export default {
  API_BASE_URL
};
```

**API CLIENT PATTERN** - Create fetch-based client in `api/client.ts`:
- Import config from '../config'
- Use fetch with proper token management
- Implement axios-like interface for consistency
- Handle authentication with Bearer tokens
- Include timeout and retry logic
- Comprehensive error handling
- Support for GET, POST, PUT, DELETE, PATCH methods
- FormData support for file uploads
- Proper TypeScript typing throughout

**TOKEN MANAGEMENT**:
- Use utils/tokenUtils for token operations
- Automatic token refresh handling
- Expired token detection
- Comprehensive logging for debugging

**ENVIRONMENT SETUP**:
- Clear variable naming: `API_URL` in .env files
- Fallback configurations for missing variables
- Separate env files for different stages

**References**: Project setup, API architecture, authentication
**Related**: Configuration management, service layer, token handling
