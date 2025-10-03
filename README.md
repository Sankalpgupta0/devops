# Todo App - Full Stack Application

A modern, full-stack todo application built with React, Node.js, Express, and MongoDB. This application features a clean, responsive UI with real-time task management capabilities, Docker containerization, and CI/CD pipeline integration.

## 🚀 Features

### Core Functionality
- ✅ **Create Tasks**: Add new todos with real-time validation
- ✅ **Edit Tasks**: Inline editing with keyboard shortcuts (Enter to save, Escape to cancel)
- ✅ **Delete Tasks**: Remove tasks with confirmation
- ✅ **Toggle Completion**: Mark tasks as complete/incomplete
- ✅ **Filter Tasks**: View all, active, or completed tasks
- ✅ **Task Counter**: Real-time count of remaining tasks
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile

### Technical Features
- 🔄 **Real-time Updates**: Optimistic UI updates with error handling
- 🎨 **Modern UI**: Built with Tailwind CSS and React 19
- 🐳 **Docker Support**: Full containerization with Docker Compose
- 🔧 **CI/CD Pipeline**: Jenkins integration for automated deployment
- 📱 **Progressive Web App**: Fast loading and offline-ready
- 🛡️ **Error Handling**: Comprehensive error management and user feedback

## 🏗️ Architecture

### Frontend (React + Vite)
- **Framework**: React 19 with Vite for fast development
- **Styling**: Tailwind CSS for modern, responsive design
- **HTTP Client**: Axios for API communication
- **State Management**: React hooks (useState, useEffect)
- **Build Tool**: Vite with hot module replacement

### Backend (Node.js + Express)
- **Runtime**: Node.js 20 with ES modules
- **Framework**: Express.js for RESTful API
- **Database**: MongoDB with Mongoose ODM
- **CORS**: Cross-origin resource sharing enabled
- **Validation**: Input validation and error handling

### Database
- **MongoDB**: NoSQL document database
- **Schema**: Simple todo schema with task and completion status
- **Connection**: Mongoose for database operations

### DevOps & Deployment
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Docker Compose for local development
- **CI/CD**: Jenkins pipeline for automated deployment
- **Environment**: Configurable environment variables

## 📁 Project Structure

```
todo_app/
├── backend/                 # Node.js API server
│   ├── controller.js       # Business logic and API handlers
│   ├── model.js           # MongoDB schema definition
│   ├── routes.js          # API route definitions
│   ├── index.js           # Express server setup
│   ├── Dockerfile         # Backend container configuration
│   └── package.json       # Backend dependencies
├── frontend/               # React application
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── Dockerfile         # Frontend container configuration
│   └── package.json       # Frontend dependencies
├── docker-compose.yaml    # Multi-container orchestration
├── Jenkinsfile           # CI/CD pipeline configuration
└── package.json          # Root project configuration
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 20+ 
- MongoDB 6.0+
- Docker & Docker Compose (optional)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo_app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. **Set up environment variables**
   
   Create `backend/.env`:
   ```env
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/taskdb
   ```

4. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:6.0
   
   # Or using local MongoDB installation
   mongod
   ```

5. **Run the application**
   ```bash
   # From root directory - runs both frontend and backend
   npm run dev
   
   # Or run separately:
   # Backend only
   npm run backend
   
   # Frontend only  
   npm run frontend
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Health Check: http://localhost:8000/

### Docker Deployment

1. **Using Docker Compose (Recommended)**
   ```bash
   # Start all services
   docker-compose up -d
   
   # View logs
   docker-compose logs -f
   
   # Stop services
   docker-compose down
   ```

2. **Manual Docker Build**
   ```bash
   # Build backend
   cd backend
   docker build -t todo_backend .
   docker run -p 8000:8000 todo_backend
   
   # Build frontend
   cd frontend
   docker build -t todo_frontend --build-arg VITE_API_URL=http://localhost:8000/todos .
   docker run -p 5173:5173 todo_frontend
   ```

## 🔧 API Documentation

### Base URL
```
http://localhost:8000/todos
```

### Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/todos` | Get all todos | - | `{ message: string, data: Todo[] }` |
| POST | `/todos` | Create new todo | `{ task: string }` | `{ message: string, data: Todo }` |
| PUT | `/todos/:id` | Update todo | `{ task?: string, completed?: boolean }` | `{ message: string, data: Todo }` |
| DELETE | `/todos/:id` | Delete todo | - | `{ message: string, data: Todo }` |

### Todo Schema
```javascript
{
  _id: ObjectId,        // MongoDB document ID
  task: String,         // Todo task description
  completed: Boolean   // Completion status (default: false)
}
```

### Example API Calls

**Create a todo:**
```bash
curl -X POST http://localhost:8000/todos \
  -H "Content-Type: application/json" \
  -d '{"task": "Learn React"}'
```

**Get all todos:**
```bash
curl http://localhost:8000/todos
```

**Update a todo:**
```bash
curl -X PUT http://localhost:8000/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Delete a todo:**
```bash
curl -X DELETE http://localhost:8000/todos/{id}
```

## 🎨 Frontend Features

### User Interface
- **Clean Design**: Modern, minimalist interface with Tailwind CSS
- **Responsive Layout**: Adapts to all screen sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: ARIA labels and keyboard navigation

### User Experience
- **Real-time Updates**: Instant UI feedback with optimistic updates
- **Error Handling**: User-friendly error messages and recovery
- **Keyboard Shortcuts**: Enter to add, Escape to cancel editing
- **Filter System**: Quick task filtering (All/Active/Completed)
- **Task Counter**: Live count of remaining tasks

### State Management
- **React Hooks**: useState for local state, useEffect for side effects
- **Optimistic Updates**: Immediate UI updates with server sync
- **Error Recovery**: Automatic state reversion on API failures

## 🐳 Docker Configuration

### Backend Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["node", "index.js"]
```

### Frontend Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

### Docker Compose Services
- **MongoDB**: Database service with persistent volume
- **Backend**: API server with environment configuration
- **Frontend**: React application with build-time API URL

## 🔄 CI/CD Pipeline
 -> first done using github Actions then using


### Jenkins Pipeline
The project includes a Jenkins pipeline (`Jenkinsfile`) that:

1. **Checkout Code**: Pulls from GitHub repository
2. **Environment Setup**: Creates `.env` file with configuration
3. **Docker Build**: Builds backend and frontend images
4. **Deployment**: Starts services with Docker Compose

### Pipeline Stages
```groovy
pipeline {
    agent any
    environment {
        BACKEND_IMAGE = "todo_backend:jenkins"
        FRONTEND_IMAGE = "todo_frontend:jenkins"
        PORT = 8000
        MONGO_URI = "mongodb://todo_mongoDB:27017/taskdb"
    }
    stages {
        stage('Checkout Code') { ... }
        stage('Prepare .env file') { ... }
        stage('Build Docker Images') { ... }
        stage('Run Docker Compose') { ... }
    }
}
```

## 🧪 Development

### Code Quality
- **ESLint**: Code linting with React and Node.js rules
- **Prettier**: Code formatting for consistent style
- **Git Hooks**: Pre-commit validation (if configured)

### Available Scripts

**Root Level:**
```bash
npm run dev        # Run both frontend and backend
npm run backend    # Run backend only
npm run frontend   # Run frontend only
```

**Backend:**
```bash
npm run dev        # Start with nodemon
npm run lint       # Run ESLint
npm run lint:fix   # Fix linting issues
npm run format     # Format code with Prettier
```

**Frontend:**
```bash
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run lint:fix   # Fix linting issues
npm run format     # Format code with Prettier
```

### Environment Configuration
```env
# Production .env
PORT=8000
MONGO_URI=mongodb://production-db:27017/taskdb
NODE_ENV=production
```

## 👨‍💻 Author

**Sankalp Gupta**
- GitHub: [@Sankalpgupta0](https://github.com/Sankalpgupta0)

---

**Happy Coding! 🚀**
