pipeline {
    agent any

    environment {
        BACKEND_IMAGE   = "todo_backend:jenkins"
        FRONTEND_IMAGE  = "todo_frontend:jenkins"
        PORT = 8000
        MONGO_URI = "mongodb://todo_mongoDB:27017/taskdb"
        
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo '🔄 Checking out source code from GitHub...'
                git branch: 'main', url: 'https://github.com/Sankalpgupta0/devops.git'
            }
        }

        stage('prepare .env file') {
            steps {
                sh '''
            echo "Preparing .env file for backend..."
            mkdir -p ./backend
            cat > ./backend/.env <<EOF
PORT=${PORT}
MONGO_URI=${MONGO_URI}
EOF

            echo "Contents of .env file:"
            cat ./backend/.env
        '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    echo "Building backend Docker image..."
                    docker build -t ${BACKEND_IMAGE} ./backend 

                    echo "Building frontend Docker image..."
                    docker build -t ${FRONTEND_IMAGE} ./frontend --build-arg VITE_API_URL=http://localhost:8000/todos
                '''
            }
        }

        stage('run docker compose') {
            steps {
                sh '''
                    echo "Starting application using Docker Compose..."
                    docker compose up -d
                    echo "listing running containers..."
                    docker ps

                    echo "===Backend Logs==="
                    docker logs $(docker ps -q --filter "ancestor=${BACKEND_IMAGE}")

                    echo "===Frontend Logs==="
                    docker logs $(docker ps -q --filter "ancestor=${FRONTEND_IMAGE}")
                '''
            }
        }
    }
}
