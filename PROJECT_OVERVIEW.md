# Environmental Sustainability Platform - Project Overview

## 🌱 Project Description

This is a **full-stack environmental sustainability gamification platform** that connects organizations with environmentally-conscious users. Organizations can create eco-friendly tasks/challenges, while users participate to earn points, reduce their carbon footprint, and compete on leaderboards.

## 🏗️ Technology Stack

### Frontend (React)
- **React 19.0.0** with React Router DOM for navigation
- **Axios** for API calls
- **React Icons** for UI icons
- **Modern CSS** with responsive design

### Backend (Node.js/Express)
- **Express.js** server with RESTful APIs
- **MongoDB** with Mongoose ODM
- **JWT Authentication** with bcryptjs
- **OpenAI Integration** for AI chatbot
- **LangChain** for advanced AI functionality
- **CORS** enabled for cross-origin requests

## 🚀 How to Run the Project

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- OpenAI API key (for chatbot functionality)

### Step 1: Environment Setup
Create a `.env` file in the `server` directory:
```env
MONGODB_URI=mongodb://localhost:27017/sustainability-platform
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

### Step 2: Install Dependencies

**Backend Setup:**
```bash
cd server
npm install
```

**Frontend Setup:**
```bash
cd client
npm install
```

### Step 3: Run the Application

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
# Or if nodemon is not configured in scripts:
npx nodemon server.js
```
Backend will run on: `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```
Frontend will run on: `http://localhost:3000`

## 📱 Pages & Features Overview

### 🏠 **Home Page** (`/`)
- **Purpose**: Landing page for the platform
- **Features**: 
  - Welcome message and platform introduction
  - Call-to-action buttons for registration/login
  - Overview of environmental impact goals

### 🔐 **Authentication Pages**

#### **Login Page** (`/login`)
- **Purpose**: User authentication
- **Features**:
  - Email/password login form
  - Role-based authentication (Customer, Organization, Admin)
  - JWT token generation
  - Automatic redirect to dashboard after login

#### **Register Page** (`/register`)
- **Purpose**: New user registration
- **Features**:
  - User registration form with role selection
  - Input validation
  - Email uniqueness verification
  - Password hashing

### 🏡 **Dashboard** (`/dashboard`) - *Protected Route*
- **Purpose**: User's main control center
- **Features**:
  - Welcome message with user statistics
  - Quick access to main features
  - Points and carbon reduction summary
  - Recent activity overview

### 📋 **Tasks Page** (`/tasks`) - *Protected Route*
- **Purpose**: Browse and manage environmental tasks
- **Features**:
  - **For Customers**:
    - View all available tasks
    - Filter tasks by location, points, date
    - Participate in tasks
    - Submit proof of completion (images/documentation)
    - Track participation status
  - **For Organizations**:
    - View their created tasks
    - Verify submitted proofs
    - Approve/reject task completions
    - Award points to participants

### ➕ **Create Task Page** (`/create-task`) - *Organization/Admin Only*
- **Purpose**: Organizations create new environmental challenges
- **Features**:
  - Task creation form with:
    - Title and description
    - Points reward (10-100 points)
    - Location with coordinates
    - Start and end dates
    - Verification requirements
  - Geolocation integration
  - Task status management

### 🏆 **Leaderboard Page** (`/leaderboard`) - *Protected Route*
- **Purpose**: Gamification and competition
- **Features**:
  - User rankings based on points
  - Carbon reduction statistics
  - Badge system display
  - Filtering options (top 10, 50, 100 users)
  - Environmental impact visualization

### 👤 **Profile Page** (`/profile`) - *Protected Route*
- **Purpose**: User account management
- **Features**:
  - Personal information editing
  - Points and badges display
  - Carbon footprint tracking
  - Achievement history
  - Account settings
  - Profile picture upload

### 🤖 **AI Chatbot Page** (`/chatbot`) - *Protected Route*
- **Purpose**: AI-powered environmental assistant
- **Features**:
  - **OpenAI Integration**: Smart environmental advice
  - **LangChain Framework**: Advanced conversation handling
  - **Personalized Recommendations**: Based on user activity
  - **Environmental Tips**: Sustainability suggestions
  - **Task Recommendations**: AI suggests relevant tasks

## 🔧 System Architecture

### User Roles & Permissions

1. **Customer (Default Role)**
   - Participate in tasks
   - Submit proof of completion
   - View leaderboards and profiles
   - Access chatbot
   - Earn points and badges

2. **Organization**
   - All customer permissions
   - Create and manage tasks
   - Verify task completions
   - Award points to participants
   - View participant analytics

3. **Admin**
   - Full system access
   - User management
   - Task oversight
   - Platform analytics
   - Create admin accounts

### Data Models

#### User Model
- Personal information (name, email, password)
- Role-based access control
- Points and badges system
- Carbon reduction tracking
- JWT authentication

#### Task Model
- Task details (title, description, points)
- Geolocation data
- Participant tracking
- Proof submission system
- Status management (pending → active → completed)

## 🌟 Key Features

### 🎯 **Gamification System**
- Points-based rewards (10-100 per task)
- Badge collection system
- Leaderboard competitions
- Carbon footprint tracking

### 📍 **Location-Based Tasks**
- Geospatial indexing for task discovery
- Coordinate validation
- Address integration
- Location-based filtering

### ✅ **Verification System**
- Proof submission (image uploads)
- Organization verification workflow
- Automatic point awarding
- Status tracking (pending/approved/rejected)

### 🤖 **AI Integration**
- OpenAI-powered chatbot
- LangChain for conversation management
- Personalized environmental advice
- Smart task recommendations

### 🔒 **Security Features**
- JWT-based authentication
- Role-based access control
- Password hashing (bcryptjs)
- Input validation and sanitization

## 🚧 Development Status (70% Complete)

Based on the codebase analysis, the following components are implemented:
- ✅ Complete backend API structure
- ✅ Authentication system
- ✅ Database models and relationships
- ✅ Task management system
- ✅ User roles and permissions
- ✅ Basic frontend components
- ✅ Routing structure

**Areas that might need completion:**
- Frontend-backend integration testing
- UI/UX polish and styling
- Error handling and edge cases
- Image upload functionality for proof submission
- Real-time notifications
- Advanced analytics dashboard

## 📝 Next Steps

1. **Complete Integration**: Ensure all frontend components properly connect to backend APIs
2. **Styling**: Polish the UI/UX design
3. **Testing**: Add comprehensive testing for all features
4. **Deployment**: Set up production environment
5. **Documentation**: Add API documentation and user guides

This platform has the potential to make a real environmental impact by gamifying sustainability efforts and connecting organizations with motivated individuals!