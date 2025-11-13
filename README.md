# CareerGoti Backend

## Project Overview

CareerGoti is an online one-stop destination for students and freshers to explore suitable job openings and learning resources. This backend API connects the dots on skills, education, and aspirations, inspiring sustainable employment and growth.

The platform provides:
- Job posting and discovery features for organizations
- Learning resource management for career development
- User authentication and authorization system
- Role-based access control (Admin, Organization, User)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Environment Management:** dotenv
- **CORS:** Enabled for cross-origin requests

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login with credentials
- `GET /jwt` - Login with JWT token (requires authentication)
- `GET /users` - Get all users

### Job Routes (`/api/jobs`)
- `POST /` - Create a new job (requires authentication & organization role)
- `GET /` - Get all jobs
- `GET /:id` - Get single job by ID
- `DELETE /:id` - Delete a job (requires authentication & organization role)

### Resource Routes (`/api/resource`)
- `POST /` - Create a learning resource (requires authentication & admin role)
- `GET /` - Get all resources
- `DELETE /:id` - Remove a resource (requires authentication & admin role)

## Setup and Run Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd career-goti-server
``` 
2. Install dependencies
```bash
npm install `or` pnpm install
``` 
2. Configure environment variables
```bash
# === Server Configuration ===
PORT=5000

# === MongoDB Connection ===
MONGO_URI=your_mongodb_connection_string_here

# === JWT Secret Key ===
JWT_SECRET=your_jwt_secret_key_here

# === Default Admin Credentials ===
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=your_password
ADMIN_PHONE=0123456789

``` 
2. Run the development server
```bash
npm run dev
``` 
