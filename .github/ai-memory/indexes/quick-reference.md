# Quick Reference Guide

## Most Used Knowledge (Updated 2025-08-05)
1. **Task Planning System** → `plan/README.md` ✅ NEW
2. **Ardiy AI Error Learning Protocol** → `active/corrections.md:1` + `active/conventions.md:1` ✅ CRITICAL
3. **Ardiy AI Browser Automation Arsenal** → `active/patterns.md:1` ✅ HIGH
4. **Package Management Standards** → `active/conventions.md:5` ✅ CRITICAL
5. **Browser Automation Testing Patterns** → `active/patterns.md:20` ✅ HIGH
6. **Error Documentation Protocol** → `active/corrections.md:5` ✅ CRITICAL
7. **Generic Development Patterns** → `active/patterns.md:40` ✅ HIGH
8. **AI Memory Consultation Protocol** → `active/conventions.md:10` ✅ CRITICAL
9. **Best Practices Documentation** → `active/observations.md:1` ✅ MEDIUM

## Planning Workflow *(New in V1.1.0)*
- **Plan Creation**: Use `plan/README.md` template for new tasks
- **Progress Tracking**: Update status indicators regularly
- **Memory Integration**: Reference active memory in plan dependencies
- **Knowledge Capture**: Add insights from plans back to memory system

## Current Project Context
- **Version**: [Update with your project version]
- **Architecture**: [Update with your tech stack]
- **Main Components**: [Update with your components]
- **Current Status**: [Update with your project status]
- **Testing**: ai visual testing with Ardiy ai tools
- **Integration**: [Update with your backend/API status]

## Critical Development Patterns
- **Ardiy AI Prerequisites**: Backend and Frontend services MUST be running before running browser automation with Ardiy ai tools
- **Package Management**: ALWAYS use consistent package manager (yarn recommended)
- **Service Architecture**: Use authenticated API client patterns with proper error handling
- **Backend Integration**: Use relative API paths for proper routing
- **Component State**: Use framework's built-in state management patterns
- **Error Documentation**: Document all errors and solutions in AI memory system

## Browser Automation Workflow (Ardiy AI)
1. **Verify Prerequisites**: Backend + Frontend services running
2. **Launch Browser**: `mcp_Ardiy-ai-brows_Ardiy_ai_launch_browser()`
3. **Navigate**: `mcp_Ardiy-ai-brows_Ardiy_ai_navigate_to_url(url)`
4. **Test Elements**: Use advanced_dom_interaction, fill_form, get_page_structure
5. **Take Screenshots**: `mcp_Ardiy-ai-brows_Ardiy_ai_take_screenshot()`
6. **Cleanup**: `mcp_Ardiy-ai-brows_Ardiy_ai_close_browser()`

## File Organization Standards
- **Documentation**: All .md files go in `docs/` with subfolders by category
- **Scripts**: All automation scripts go in `scripts/` or `automation/` folder  
- **Clean Root**: Keep root directory clean with only essential config files
- **Memory System**: Use `.github/ai-memory/` for AI knowledge management

## Quick Problem Resolution
- **Build Issues**: Check package manager usage, verify dependencies, ensure proper routing
- **404 Errors**: Verify file structure, check routing configuration, ensure proper navigation setup
- **API Issues**: Confirm proper paths, authentication setup, backend connectivity
- **State Management**: Use framework's built-in state management, avoid manual loading states
- **Form Issues**: Use proper form libraries with validation, follow best practices
- **Ardiy AI Errors**: Document immediately in corrections.md with full context and solution

## Critical File Locations
- **AI Memory**: `.github/ai-memory/` - Core AI knowledge management system
- **Documentation**: `docs/` - Project documentation and guides
- **Scripts**: `scripts/` or `automation/` - Automation and utility scripts
- **Config**: Root level - Essential configuration files only

## Environment Configuration
- **Environment Files**: Use appropriate env files for different stages
- **API Configuration**: Set up proper base URLs and authentication
- **Build Configuration**: Configure for your deployment target
- **Development Setup**: Document required services and setup steps

## Integration Status Template
- **Authentication**: [Update with your auth status]
- **Database**: [Update with your database status]
- **APIs**: [Update with your API integration status]
- **Testing**: [Update with your testing approach]
- **Deployment**: [Update with your deployment status]
