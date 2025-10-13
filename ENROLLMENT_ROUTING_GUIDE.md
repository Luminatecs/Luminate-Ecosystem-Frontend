# Enrollment System - Routing Documentation

**Last Updated:** October 12, 2025

---

## 🗺️ New Routes Added

### **Public Routes** (No Authentication Required)

| Route | Component | Description |
|-------|-----------|-------------|
| `/temp-login` | TempCodeLoginPage | Guardian first-time login with temporary code |
| `/forgot-password` | ForgotPasswordPage | Request password reset email |
| `/reset-password` | ResetPasswordPage | Reset password with token (from email link) |

### **Protected Routes** (Requires Authentication)

#### **Enrollment Management** (ORG_ADMIN & SUPER_ADMIN only)

| Route | Component | Description |
|-------|-----------|-------------|
| `/enrollment/create` | StudentEnrollmentPage | Create student enrollments (Single or Bulk) |
| `/enrollment/list` | EnrollmentListPage | View and manage all enrollments |

---

## 🔐 Role-Based Access Control

### Route Guards Applied:
```typescript
// Public - Anyone can access
/temp-login
/forgot-password  
/reset-password

// Protected - Requires ORG_ADMIN or SUPER_ADMIN role
/enrollment/create
/enrollment/list
```

### ProtectedRoute Configuration:
```typescript
<ProtectedRoute requiredRoles={[UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN]}>
  <StudentEnrollmentPage />
</ProtectedRoute>
```

---

## 📍 Complete Route Structure

### App.tsx Routes (After Update):

```typescript
// ========== PUBLIC ROUTES ==========
<Route path="/" element={<LoginPage />} />
<Route path="/login" element={<Navigate to="/" replace />} />
<Route path="/register" element={<RegisterPage />} />
<Route path="/register/individual" element={<IndividualRegistrationPage />} />
<Route path="/register/organization" element={<OrganizationRegistrationPage />} />
<Route path="/register/student" element={<OrgWardRegistrationPage />} />

// Guardian & Password Reset (Public)
<Route path="/temp-login" element={<TempCodeLoginPage />} />
<Route path="/forgot-password" element={<ForgotPasswordPage />} />
<Route path="/reset-password" element={<ResetPasswordPage />} />

// ========== PROTECTED ROUTES ==========

// Organization Setup (ORG_ADMIN only)
<Route path="/organization/setup" element={<ProtectedRoute requiredRoles={[ORG_ADMIN]}><OrganizationSetup /></ProtectedRoute>} />

// Dashboards
<Route path="/organization-dashboard" element={<ProtectedRoute requiredRoles={[ORG_ADMIN, SUPER_ADMIN]}><OrganizationDashboard /></ProtectedRoute>} />
<Route path="/super-admin-dashboard" element={<ProtectedRoute requiredRoles={[SUPER_ADMIN]}><SuperAdminDashboard /></ProtectedRoute>} />
<Route path="/ecosystem" element={<ProtectedRoute><EcosystemHub /></ProtectedRoute>} />

// Enrollment Management (NEW - ORG_ADMIN & SUPER_ADMIN)
<Route path="/enrollment/create" element={<ProtectedRoute requiredRoles={[ORG_ADMIN, SUPER_ADMIN]}><StudentEnrollmentPage /></ProtectedRoute>} />
<Route path="/enrollment/list" element={<ProtectedRoute requiredRoles={[ORG_ADMIN, SUPER_ADMIN]}><EnrollmentListPage /></ProtectedRoute>} />

// Module Routes (All authenticated users)
<Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
<Route path="/library/search-results" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
<Route path="/kaeval" element={<ProtectedRoute><Kaeval /></ProtectedRoute>} />
<Route path="/resources" element={<ProtectedRoute allowedRoles={[INDIVIDUAL, ORG_WARD, SUPER_ADMIN]}><Resources /></ProtectedRoute>} />

// Other Admin Routes
<Route path="/admin/tokens" element={<ProtectedRoute requiredRoles={[ORG_ADMIN, SUPER_ADMIN]}><div>Generate Tokens</div></ProtectedRoute>} />
<Route path="/admin/students" element={<ProtectedRoute requiredRoles={[ORG_ADMIN, SUPER_ADMIN]}><div>Manage Students</div></ProtectedRoute>} />
<Route path="/admin/analytics" element={<ProtectedRoute requiredRoles={[ORG_ADMIN, SUPER_ADMIN]}><div>Analytics</div></ProtectedRoute>} />
<Route path="/admin/organization" element={<ProtectedRoute requiredRoles={[ORG_ADMIN, SUPER_ADMIN]}><div>Organization Settings</div></ProtectedRoute>} />

// Error Routes
<Route path="/unauthorized" element={<UnauthorizedPage />} />
<Route path="*" element={<NotFoundPage />} />
```

---

## 🔄 User Flows

### **1. Guardian First-Time Login Flow**
```
1. Guardian receives email with temp code
2. Navigate to /temp-login
3. Enter temp code + temp password
4. Auto-redirected to change password modal
5. Create new permanent password
6. Redirected to ecosystem/dashboard
```

### **2. Password Reset Flow**
```
1. User clicks "Forgot Password" on login page
2. Navigate to /forgot-password
3. Enter email address
4. Receive email with reset link
5. Click link → Navigate to /reset-password?token=xxx
6. Enter new password (with strength validation)
7. Redirected to login page
```

### **3. Student Enrollment Flow (ORG_ADMIN)**
```
SINGLE ENROLLMENT:
1. Navigate to /enrollment/create
2. Click "Single Enrollment" tab
3. Fill student, guardian, and enrollment details
4. Submit → Creates student + guardian + temp credentials
5. Email sent to guardian with temp code
6. Success screen shows enrollment ID

BULK ENROLLMENT:
1. Navigate to /enrollment/create
2. Click "Bulk Upload" tab
3. Download CSV template
4. Fill template with multiple students
5. Upload CSV (drag & drop or browse)
6. Validate CSV → See errors (if any)
7. Process valid rows
8. Success screen shows success/failure counts
9. Emails sent to all guardians
```

### **4. Enrollment Management Flow**
```
1. Navigate to /enrollment/list
2. View all enrollments in table
3. Filter by: search, status, grade, academic year
4. Click student name → View details
5. Change status via dropdown
6. Delete enrollment (with confirmation)
7. Navigate between pages (pagination)
```

---

## 🎯 Navigation Menu Structure (Recommended)

### **For ORG_ADMIN Role:**
```
Dashboard
├── Organization Dashboard
├── Ecosystem Hub
│
Enrollments
├── Create Enrollment      → /enrollment/create
├── View Enrollments       → /enrollment/list
│
Admin
├── Generate Tokens        → /admin/tokens
├── Manage Students        → /admin/students
├── Analytics              → /admin/analytics
├── Organization Settings  → /admin/organization
│
Modules
├── Library               → /library
├── KAEval                → /kaeval
├── Resources             → /resources
```

### **For SUPER_ADMIN Role:**
```
Dashboards
├── Super Admin Dashboard
├── Organization Dashboard
├── Ecosystem Hub
│
Enrollments
├── Create Enrollment      → /enrollment/create
├── View Enrollments       → /enrollment/list
│
Admin
├── System Settings        → /admin/settings
├── Manage Organizations   → /admin/organizations
├── Manage Users           → /admin/users
```

---

## 🚦 Route Testing Checklist

### Public Routes
- [ ] `/temp-login` - Accessible without login
- [ ] `/forgot-password` - Accessible without login
- [ ] `/reset-password?token=xxx` - Token validation works
- [ ] Invalid token shows error message

### Protected Routes (ORG_ADMIN)
- [ ] `/enrollment/create` - Requires ORG_ADMIN login
- [ ] `/enrollment/list` - Requires ORG_ADMIN login
- [ ] Redirects to `/unauthorized` if accessed by other roles
- [ ] Organization ID properly loaded from user context

### Navigation
- [ ] "Create Enrollment" link works
- [ ] "View Enrollments" link works
- [ ] Breadcrumbs work correctly
- [ ] Back buttons navigate properly

### Forms & Functionality
- [ ] Single enrollment form submits
- [ ] Bulk CSV upload processes
- [ ] Enrollment list filters work
- [ ] Status updates work
- [ ] Delete confirmation works
- [ ] Pagination works

---

## 🔧 Configuration Notes

### **Import Statements Added to App.tsx:**
```typescript
import { TempCodeLoginPage, ForgotPasswordPage, ResetPasswordPage } from './pages/auth';
import { StudentEnrollmentPage, EnrollmentListPage } from './pages/enrollment';
```

### **Route Protection:**
- Uses existing `ProtectedRoute` component
- Supports `requiredRoles` prop for specific role access
- Auto-redirects to `/unauthorized` for insufficient permissions

### **URL Parameters:**
- Reset Password: `/reset-password?token={resetToken}`
  - Token validated on page load
  - Expires after 1 hour

---

## ✨ Integration Complete!

All enrollment system routes are now integrated into the application. The system supports:

✅ Guardian temporary login  
✅ Password reset flow  
✅ Single student enrollment  
✅ Bulk CSV enrollment  
✅ Enrollment list management  
✅ Role-based access control  
✅ Mobile responsive design  
✅ No box-shadow styling  

**Ready for testing and deployment! 🚀**
