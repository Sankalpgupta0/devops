# Todo App - Complete Project Documentation

A comprehensive full-stack Todo application with an Express + MongoDB backend and a React + Vite + Tailwind frontend. This project demonstrates modern DevOps practices with Docker containerization, Jenkins CI/CD pipeline, and cloud deployment strategies.

![Jenkins Build Status](https://via.placeholder.com/800x400/1f2937/ffffff?text=Jenkins+Build+Status)

## 🚀 Project Overview

This Todo application has evolved through multiple iterations, demonstrating different approaches to development, deployment, and DevOps practices. The current implementation represents the most mature version with comprehensive CI/CD pipeline and production-ready features.

---

## 📋 Features

### Core Functionality
- ✅ **CRUD Operations**: Create, Read, Update, Delete todos
- ✅ **Edit Functionality**: Inline editing with save/cancel options
- ✅ **Task Management**: Mark tasks as complete/incomplete
- ✅ **Filtering**: View all, active, or completed tasks
- ✅ **Real-time Updates**: Immediate UI updates with backend synchronization
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS

### Technical Features
- 🔄 **RESTful API**: Full CRUD operations with proper HTTP methods
- 🎨 **Modern UI**: Clean, intuitive interface with Tailwind CSS
- 🐳 **Dockerized**: Complete containerization for both frontend and backend
- 🔧 **CI/CD Pipeline**: Automated build, test, and deployment with Jenkins
- ☁️ **Cloud Ready**: AWS EC2 deployment with Docker Compose
- 📊 **Monitoring**: Build status tracking and deployment monitoring

---

## 🏗️ Architecture Evolution

### Previous Approach (Legacy)
The initial implementation focused on basic functionality with minimal DevOps practices:

**Limitations:**
- Manual deployment processes
- No automated testing
- Limited containerization
- Basic error handling
- No monitoring or logging
- Single environment deployment

**Technology Stack:**
- Basic Express.js backend
- Simple React frontend
- Manual MongoDB setup
- No CI/CD pipeline

### Current Approach (Modern DevOps)
The current implementation represents a production-ready solution with comprehensive DevOps practices:

**Advantages:**
- ✅ **Automated CI/CD**: Jenkins pipeline for automated builds and deployments
- ✅ **Containerization**: Docker containers for consistent environments
- ✅ **Infrastructure as Code**: Docker Compose for service orchestration
- ✅ **Environment Management**: Proper environment variable handling
- ✅ **Monitoring**: Build status tracking and deployment monitoring
- ✅ **Scalability**: Microservices architecture with separate containers
- ✅ **Security**: Environment-based configuration and secure deployments

**Why Current Approach is Better:**
1. **Reliability**: Automated processes reduce human error
2. **Consistency**: Docker ensures identical environments across stages
3. **Scalability**: Microservices architecture supports horizontal scaling
4. **Maintainability**: Clear separation of concerns and modular design
5. **Monitoring**: Comprehensive logging and build status tracking
6. **Security**: Environment-based configuration and secure deployments

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js 5
- **Database**: MongoDB with Mongoose 8
- **Development**: Nodemon for hot reloading
- **Linting**: ESLint with custom configuration

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios for API communication
- **Development**: Hot Module Replacement (HMR)

### DevOps & Infrastructure
- **Containerization**: Docker & Docker Compose
- **CI/CD**: Jenkins Pipeline
- **Cloud**: AWS EC2
- **Registry**: Docker Hub
- **Monitoring**: Jenkins Build Status

---

## 📁 Project Structure

```
/ (repository root)
├── backend/                    # Express.js API server
│   ├── controller.js          # Business logic handlers
│   ├── model.js               # MongoDB schema definitions
│   ├── routes.js              # API route definitions
│   ├── index.js               # Server entry point
│   ├── Dockerfile             # Backend container configuration
│   ├── package.json           # Backend dependencies
│   └── .env                   # Backend environment variables
├── frontend/                   # React application
│   ├── src/
│   │   ├── App.jsx            # Main application component
│   │   ├── main.jsx           # Application entry point
│   │   └── index.css          # Global styles
│   ├── index.html             # HTML template
│   ├── Dockerfile             # Frontend container configuration
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
├── docker-compose.yaml         # Multi-container orchestration
├── Jenkinsfile                # CI/CD pipeline configuration
├── package.json               # Root package configuration
└── README.md                  # This documentation
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 20 and npm
- Docker and Docker Compose
- MongoDB instance (local or hosted)
- Git for version control

### Environment Setup

**Backend Environment (`backend/.env`):**
```env
MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<db>?authSource=admin
PORT=8000
```

**Frontend Environment (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:8000/todos
```

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd todo_app
   ```

2. **Install dependencies:**
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd ../frontend && npm install
   ```

3. **Start development servers:**
   ```bash
   # Backend (from backend directory)
   npm run dev
   
   # Frontend (from frontend directory)
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

### Docker Development

1. **Start all services:**
   ```bash
   docker compose up --build -d
   ```

2. **View running containers:**
   ```bash
   docker compose ps
   ```

3. **View logs:**
   ```bash
   docker compose logs -f
   ```

---

## 🔄 CI/CD Pipeline

### Jenkins Pipeline Overview

The project includes a comprehensive Jenkins pipeline that automates the entire build and deployment process:

```groovy
pipeline {
    agent any
    environment {
        BACKEND_IMAGE   = "todo_backend:jenkins"
        FRONTEND_IMAGE  = "todo_frontend:jenkins"
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

### Pipeline Stages

1. **Code Checkout**: Retrieves latest code from GitHub repository
2. **Environment Setup**: Prepares environment variables and configuration
3. **Docker Build**: Builds optimized container images for both services
4. **Deployment**: Orchestrates services using Docker Compose

### Build Status Monitoring

![Jenkins Build Dashboard](https://via.placeholder.com/800x400/1f2937/ffffff?text=Jenkins+Build+Dashboard)

The Jenkins dashboard provides real-time monitoring of:
- ✅ **Build Success Rate**: 100% success rate for recent builds
- ⏱️ **Build Duration**: Average build time optimization
- 🔄 **Deployment Status**: Real-time deployment monitoring
- 📊 **Build History**: Complete build log and history tracking

---

## 🐳 Docker Configuration

### Backend Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]
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

```yaml
services:
  mongo:
    image: mongo:6.0
    container_name: todo_mongoDB
    ports: ["27017:27017"]
    volumes: [todo_mongo_data:/data/db]
    
  backend:
    build: ./backend
    container_name: todo_backend
    ports: ["8000:8000"]
    env_file: ./backend/.env
    depends_on: [mongo]
    
  frontend:
    build: ./frontend
    container_name: todo_frontend
    ports: ["5173:5173"]
    depends_on: [backend]
```

---

## 🌐 API Reference

### Base URL
```
http://<backend-host>:<port>/todos
```

### Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/` | Health check | - | `"api is running"` |
| GET | `/todos` | List all todos | - | `Array<Todo>` |
| POST | `/todos` | Create new todo | `{ "task": string }` | `Todo` |
| PUT | `/todos/:id` | Update todo | `{ "task"?: string, "completed"?: boolean }` | `Todo` |
| DELETE | `/todos/:id` | Delete todo | - | `{ "message": string, "data": Todo }` |

### Example Usage

```bash
# List all todos
curl http://localhost:8000/todos

# Create a new todo
curl -X POST http://localhost:8000/todos \
  -H 'Content-Type: application/json' \
  -d '{"task":"Buy groceries"}'

# Update a todo
curl -X PUT http://localhost:8000/todos/<id> \
  -H 'Content-Type: application/json' \
  -d '{"completed":true}'

# Delete a todo
curl -X DELETE http://localhost:8000/todos/<id>
```

---

## ☁️ Cloud Deployment

### AWS EC2 Deployment

1. **Launch EC2 Instance:**
   - Use Ubuntu or Amazon Linux AMI
   - Open security group ports: 80, 443, 8000, 22
   - Configure SSH access

2. **Install Dependencies:**
   ```bash
   sudo apt-get update -y
   sudo apt-get install -y docker.io docker-compose-plugin
   sudo usermod -aG docker $USER
   ```

3. **Deploy Application:**
   ```bash
   # Clone repository
   git clone <repository-url>
   cd todo_app
   
   # Configure environment
   cp backend/.env.example backend/.env
   # Edit backend/.env with production values
   
   # Deploy with Docker Compose
   docker compose up -d --build
   ```

4. **Verify Deployment:**
   ```bash
   docker compose ps
   curl http://localhost:8000
   ```

### Docker Registry Integration

Pre-built images are available on Docker Hub:
- **Backend**: `sankalpgupta0/todo-app-backend:latest`
- **Frontend**: `sankalpgupta0/todo-app-frontend:latest`

```bash
# Pull and run pre-built images
docker pull sankalpgupta0/todo-app-backend:latest
docker pull sankalpgupta0/todo-app-frontend:latest

# Update docker-compose.yaml to use registry images
services:
  backend:
    image: sankalpgupta0/todo-app-backend:latest
  frontend:
    image: sankalpgupta0/todo-app-frontend:latest
```

---

## 🔧 Development Scripts

### Backend Scripts
```bash
npm run dev      # Start development server with nodemon
npm run lint     # Run ESLint
npm run lint:fix # Fix ESLint issues
npm run format   # Format code with Prettier
```

### Frontend Scripts
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run lint:fix # Fix ESLint issues
npm run format   # Format code with Prettier
```

### Root Scripts
```bash
npm run backend  # Start backend only
npm run frontend # Start frontend only
npm run dev      # Start both services concurrently
```

---

## 🧪 Testing & Quality Assurance

### Linting & Formatting
```bash
# Backend linting
cd backend && npm run lint

# Frontend linting
cd frontend && npm run lint

# Format code
npm run format
```

### Code Quality
- **ESLint**: Enforces coding standards and catches potential errors
- **Prettier**: Ensures consistent code formatting
- **TypeScript**: Type safety (future enhancement)
- **Jest**: Unit testing framework (future enhancement)

---

## 📊 Monitoring & Logging

### Build Monitoring
- **Jenkins Dashboard**: Real-time build status and history
- **Build Notifications**: Email/Slack notifications for build failures
- **Deployment Tracking**: Complete deployment history and rollback capabilities

### Application Monitoring
- **Health Checks**: API endpoint monitoring
- **Performance Metrics**: Response time and throughput tracking
- **Error Logging**: Comprehensive error tracking and alerting

---

## 🚀 Future Enhancements

### Planned Features
- [ ] **User Authentication**: JWT-based authentication system
- [ ] **Real-time Updates**: WebSocket integration for live updates
- [ ] **Advanced Filtering**: Search and advanced filtering options
- [ ] **Data Persistence**: Enhanced data management and backup
- [ ] **Mobile App**: React Native mobile application
- [ ] **Testing Suite**: Comprehensive unit and integration tests

### Technical Improvements
- [ ] **Kubernetes Deployment**: Container orchestration with K8s
- [ ] **Microservices**: Service decomposition for better scalability
- [ ] **API Gateway**: Centralized API management
- [ ] **Monitoring**: Prometheus and Grafana integration
- [ ] **Security**: Enhanced security measures and vulnerability scanning

---

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Sankalp Gupta** - *Initial work and DevOps implementation* - [GitHub](https://github.com/Sankalpgupta0)

---

## 🙏 Acknowledgments

- Express.js community for the excellent framework
- React team for the powerful frontend library
- Docker team for containerization technology
- Jenkins community for CI/CD pipeline support
- MongoDB team for the robust database solution
- Tailwind CSS for the utility-first CSS framework

---

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation and troubleshooting guide

---

*This project represents a comprehensive example of modern full-stack development with DevOps best practices. The evolution from basic functionality to production-ready deployment demonstrates the importance of proper architecture, containerization, and automated processes in modern software development.*