# GrantHub - Full-Stack Grant Management Platform

## Project Overview
GrantHub is a comprehensive grant management platform that connects applicants with funding opportunities. The platform features user authentication, grant applications with file uploads, admin dashboard with analytics, real-time chat support, and email notifications.

## Features Implemented

### MVP Features (Phase 1 - Complete)
- **Landing Page**: Professional hero section with trust indicators, grant program overview, how it works section, statistics, FAQ, and CTAs
- **Authentication System**: User registration and login with JWT and bcrypt password hashing
- **Grant Application Form**: Multi-step form with file upload support for proposals
- **User Dashboard**: View and track application status (Pending, Under Review, Approved, Rejected)
- **Admin Dashboard**: Manage all applications with filtering, status updates, and analytics with charts
- **Real-time Chat**: WebSocket-based chat widget for user-admin communication
- **Contact Page**: Multiple contact methods including WhatsApp, email, and social media
- **Responsive Design**: Mobile-first design with dark mode toggle
- **Navigation**: Sticky navbar with role-based menu items
- **Role-based Access**: User and admin roles with protected routes

### Tech Stack
- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI, Wouter (routing), React Query, Recharts
- **Backend**: Node.js, Express, JWT, bcrypt, WebSocket (Socket.io), Multer (file uploads)
- **Database**: In-memory storage (MemStorage) - ready for PostgreSQL migration
- **Build Tool**: Vite
- **Validation**: Zod with Drizzle-Zod integration

## Project Structure

```
├── client/                           # Frontend application
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── ui/                   # Shadcn components
│   │   │   ├── Navbar.tsx            # Main navigation
│   │   │   ├── Footer.tsx            # Site footer
│   │   │   ├── ThemeToggle.tsx       # Dark/light mode toggle
│   │   │   └── ChatWidget.tsx        # Real-time chat widget
│   │   ├── contexts/                 # React contexts
│   │   │   ├── AuthContext.tsx       # User authentication state
│   │   │   └── ThemeProvider.tsx     # Theme management
│   │   ├── pages/                    # Route pages
│   │   │   ├── Home.tsx              # Landing page
│   │   │   ├── Login.tsx             # Login page
│   │   │   ├── Register.tsx          # Registration page
│   │   │   ├── Grants.tsx            # Grant programs page
│   │   │   ├── About.tsx             # About us page
│   │   │   ├── Apply.tsx             # Application form
│   │   │   ├── Dashboard.tsx         # User dashboard
│   │   │   ├── Admin.tsx             # Admin dashboard
│   │   │   ├── Contact.tsx           # Contact page
│   │   │   └── not-found.tsx         # 404 page
│   │   ├── lib/                      # Utilities
│   │   │   └── queryClient.ts        # React Query setup
│   │   ├── App.tsx                   # Root component with routing
│   │   └── index.css                 # Global styles
│   └── index.html                    # HTML entry point
├── server/                           # Backend application
│   ├── routes.ts                     # API routes and WebSocket server
│   ├── storage.ts                    # In-memory storage implementation
│   └── index.ts                      # Server entry point
├── shared/                           # Shared types and schemas
│   └── schema.ts                     # Drizzle schemas and Zod validation
├── design_guidelines.md              # Design system documentation
└── replit.md                         # This file

```

## Data Models

### User
- id: UUID
- email: string (unique)
- password: string (hashed)
- fullName: string
- phoneNumber: string (optional)
- role: "user" | "admin"
- createdAt: timestamp

### Grant Application
- id: UUID
- userId: UUID (foreign key)
- fullName, email, phoneNumber, address: applicant info
- projectTitle: string
- projectDescription: text
- grantType: "education" | "business" | "community" | "research"
- requestedAmount: number
- fileUrl, fileName: optional file upload
- status: "pending" | "under_review" | "approved" | "rejected"
- adminNotes: text (optional)
- createdAt, updatedAt: timestamps

### Chat Message
- id: UUID
- userId: UUID
- senderRole: "user" | "admin"
- message: text
- createdAt: timestamp

## Grant Types
1. **Education Grant**: $1,000 - $25,000
2. **Small Business Grant**: $5,000 - $50,000
3. **Community Development**: $2,000 - $30,000
4. **Research & Innovation**: $10,000 - $100,000

## API Endpoints (To be implemented in Phase 2)

### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login

### Applications
- GET /api/applications - Get all applications (admin)
- GET /api/applications/user/:userId - Get user's applications
- POST /api/applications - Create new application
- PATCH /api/applications/:id/status - Update application status (admin)

### Users
- GET /api/users - Get all users (admin)

### WebSocket
- /ws - Real-time chat messages

## Default Accounts (Seeded Data)
- **Admin**: admin@granthub.com / admin123
- **User**: demo@example.com / password

## Environment Variables Required
- JWT_SECRET - Secret for JWT token signing
- SESSION_SECRET - Already configured

## Design Guidelines
See `design_guidelines.md` for detailed design system documentation including:
- Typography: Inter font family
- Color palette with primary blue theme
- Spacing system
- Component patterns
- Responsive breakpoints
- Dark mode support

## Development Workflow
1. Run `npm run dev` to start both frontend (Vite) and backend (Express)
2. Frontend accessible at http://localhost:5000
3. Backend API at http://localhost:5000/api
4. WebSocket server at ws://localhost:5000/ws

## Next Steps (Phase 2 - Backend Implementation)
1. Implement all API routes in server/routes.ts
2. Set up JWT authentication middleware
3. Add bcrypt password hashing
4. Configure WebSocket server for real-time chat
5. Implement file upload handling with Multer
6. Add rate limiting and input validation
7. Create email notification system (placeholder)

## Next Steps (Phase 3 - Integration & Polish)
1. Connect frontend to backend APIs
2. Test all user flows
3. Add comprehensive error handling
4. Implement loading states
5. Test real-time chat functionality
6. Final UX polish and testing

## Future Enhancements (Post-MVP)
- PostgreSQL database integration
- Cloudinary for file storage
- Email notifications with Nodemailer/SendGrid
- Password reset functionality
- CSV/PDF export for applications
- Social login (Google OAuth)
- Blog/announcements section
- Multi-language support
- AI Grant Advisor
