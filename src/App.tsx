import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { UserRole } from './models';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import IndividualRegistrationPage from './pages/auth/IndividualRegistrationPage';
import OrganizationRegistrationPage from './pages/auth/OrganizationRegistrationPage';
import OrganizationSetup from './pages/auth/OrganizationSetup';
import OrgWardRegistrationPage from './pages/auth/OrgWardRegistrationPage';
import TempLogin from './pages/auth/TempLogin';
import { ForgotPasswordPage, ResetPasswordPage } from './pages/auth';

// Enrollment Pages
import { StudentEnrollmentPage, EnrollmentListPage } from './pages/enrollment';

// Main Pages
import EcosystemHub from './pages/ecosystem/EcosystemHub';
import URLConversion from './pages/ecosystem/URLConversion';
import OrganizationDashboard from './pages/Organization/OrganizationDashboard';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import AdminSettings from './pages/admin/AdminSettings';

// Module Pages
import Library from './pages/modules/library/index';
import SearchResults from './pages/modules/library/SearchResults';
import Kaeval from './pages/modules/kaeval/index';
import Resources from './pages/modules/resources/index';
import ResourceDetail from './pages/modules/resources/resourcesDetails';

// Documentation Pages
import DocumentationPage from './pages/Documentation/DocumentationPage';

// Legal Pages
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';

/**
 * Main Application Component
 * SECURITY: Comprehensive routing with JWT-based authentication
 * - "/" route is the login page as requested
 * - All routes except auth routes require JWT authentication
 * - Role-based access control through ProtectedRoute
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          {/* <UserRoleDebug /> */}
          <Routes>
            {/* Public Authentication Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register/individual" element={<IndividualRegistrationPage />} />
            <Route path="/register/organization" element={<OrganizationRegistrationPage />} />
            <Route path="/register/student" element={<OrgWardRegistrationPage />} />
            
            {/* Temporary Login for Wards - Public Route with optional temp code in URL */}
            <Route path="/temp-login/:tempCode?" element={<TempLogin />} />
            
            {/* Password Reset Routes - Public */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Public Documentation Route */}
            <Route path="/docs" element={<DocumentationPage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
            
            {/* Legal Pages - Public Routes */}
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            {/* Protected Routes - Require JWT Authentication */}
            
            {/* Organization Setup - Only for ORG_ADMIN users with incomplete setup */}
            <Route 
              path="/organization/setup" 
              element={
                <ProtectedRoute requiredRoles={[UserRole.ORG_ADMIN]}>
                  <OrganizationSetup />
                </ProtectedRoute>
              } 
            />
            
            {/* Organization Dashboard - Only for ORG_ADMIN - with nested routes */}
            <Route 
              path="/organization-dashboard/*" 
              element={
                <ProtectedRoute requiredRoles={[UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN]}>
                  <OrganizationDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Ecosystem (formerly Dashboard) - Available to all authenticated users */}
            {/* <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Ecosystem />
                </ProtectedRoute>
              } 
            /> */}
            <Route 
              path="/ecosystem" 
              element={
                <ProtectedRoute>
                  <EcosystemHub />
                </ProtectedRoute>
              } 
            />

            {/* URL Conversion Tool - Available to all authenticated users */}
            <Route 
              path="/urlconversion" 
              element={
                  <URLConversion />
              } 
            />

            {/* Module Routes - Available to all authenticated users */}
            <Route 
              path="/library" 
              element={
                <ProtectedRoute>
                  <Library />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/library/search-results" 
              element={
                <ProtectedRoute>
                  <SearchResults />
                </ProtectedRoute>
              } 
            />            
            <Route 
              path="/kaeval" 
              element={
                <ProtectedRoute>
                  <Kaeval />
                </ProtectedRoute>
              } 
            />

            {/* Individual User Routes */}
            <Route 
              path="/assessment" 
              element={
                <ProtectedRoute allowedRoles={[UserRole.INDIVIDUAL, UserRole.ORG_WARD]}>
                  <div>Assessment Page - Coming Soon</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/resources" 
              element={
                <ProtectedRoute allowedRoles={[UserRole.INDIVIDUAL, UserRole.ORG_WARD, UserRole.SUPER_ADMIN]}>
                  <Resources />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/resources/:id" 
              element={
                <ProtectedRoute allowedRoles={[UserRole.INDIVIDUAL, UserRole.ORG_WARD, UserRole.SUPER_ADMIN]}>
                  <ResourceDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/progress" 
              element={
                <ProtectedRoute allowedRoles={[UserRole.INDIVIDUAL, UserRole.ORG_WARD]}>
                  <div>Progress Page - Coming Soon</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <div>Profile Page - Coming Soon</div>
                </ProtectedRoute>
              } 
            />

            {/* Organization Admin Routes */}
            
            {/* Student Enrollment Routes - ORG_ADMIN & ACCESS_ADMIN */}
            <Route 
              path="/enrollment/create" 
              element={
                <ProtectedRoute requiredRoles={[UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN]}>
                  <StudentEnrollmentPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/enrollment/list" 
              element={
                <ProtectedRoute requiredRoles={[UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN]}>
                  <EnrollmentListPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/tokens" 
              element={
                <ProtectedRoute requiredRoles={[UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN]}>
                  <div>Generate Tokens Page - Coming Soon</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/students" 
              element={
                <ProtectedRoute requiredRoles={[UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN]}>
                  <div>Manage Students Page - Coming Soon</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/analytics" 
              element={
                <ProtectedRoute requiredRoles={[UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN]}>
                  <div>Analytics Page - Coming Soon</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/organization" 
              element={
                <ProtectedRoute requiredRoles={[UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN]}>
                  <div>Organization Settings Page - Coming Soon</div>
                </ProtectedRoute>
              } 
            />

            {/* Super Admin Routes */}
            <Route 
              path="/super-admin-dashboard" 
              element={
                <ProtectedRoute requiredRoles={[UserRole.SUPER_ADMIN]}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Settings - Accessible by SUPER_ADMIN and ACCESS_ADMIN */}
            <Route 
              path="/admin/settings/*" 
              element={
                <ProtectedRoute requiredRoles={[UserRole.SUPER_ADMIN, UserRole.ACCESS_ADMIN]}>
                  <AdminSettings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/organizations" 
              element={
                <ProtectedRoute requiredRoles={[UserRole.SUPER_ADMIN]}>
                  <div>Manage Organizations Page - Coming Soon</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute requiredRoles={[UserRole.SUPER_ADMIN]}>
                  <div>Manage Users Page - Coming Soon</div>
                </ProtectedRoute>
              } 
            />

            {/* Unauthorized Access Route */}
            <Route 
              path="/unauthorized" 
              element={
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100vh',
                  flexDirection: 'column',
                  background: '#f8fafc'
                }}>
                  <h1 style={{ color: '#e53e3e', marginBottom: '1rem' }}>403 - Unauthorized Access</h1>
                  <p style={{ color: '#718096', marginBottom: '2rem' }}>You do not have permission to access this page.</p>
                  <button 
                    onClick={() => window.location.href = '/ecosystem'}
                    style={{
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Go to Ecosystem
                  </button>
                </div>
              } 
            />

            {/* Catch-all route for 404 */}
            <Route 
              path="*" 
              element={
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100vh',
                  flexDirection: 'column',
                  background: '#f8fafc'
                }}>
                  <h1 style={{ color: '#2d3748', marginBottom: '1rem' }}>404 - Page Not Found</h1>
                  <p style={{ color: '#718096', marginBottom: '2rem' }}>The page you are looking for does not exist.</p>
                  <button 
                    onClick={() => window.location.href = '/ecosystem'}
                    style={{
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Go to Ecosystem
                  </button>
                </div>
              } 
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
