# Todo App

A simple full-stack Todo application with an Express + MongoDB backend and a React + Vite + Tailwind frontend. The project includes Dockerfiles for both services and a `docker-compose.yaml` to run the stack.

---

## Features
- RESTful CRUD API for todos
- React UI with filtering (all/active/completed)
- Tailwind CSS styling
- CORS enabled for local/dev
- Dockerized services with compose

---

## Tech Stack
- Backend: Node.js 20, Express 5, Mongoose 8, Nodemon
- Frontend: React 19, Vite 7, Tailwind CSS 4
- Tooling: ESLint, Prettier
- Infra: Docker, Docker Compose

---

## Project Structure
```
/ (repo root)
  docker-compose.yaml
  backend/
    index.js
    controller.js
    model.js
    routes.js
    Dockerfile
    package.json
  frontend/
    src/
      App.jsx
      main.jsx
      index.css
    index.html
    Dockerfile
    package.json
```

---

## Prerequisites
- Node.js >= 20 and npm
- A MongoDB instance (local or hosted) and connection string
- Optional: Docker and Docker Compose

---

## Environment Variables

Create `.env` files as below.

Backend (`backend/.env`):
```
MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<db>?authSource=admin
PORT=8000
```

Frontend (`frontend/.env`):
```
VITE_API_URL=http://localhost:8000/todos
```

Notes:
- The backend reads `MONGO_URI` and optional `PORT`.
- The frontend uses `VITE_API_URL` for API requests in `App.jsx` (see caveat below for one hardcoded POST).

---

## Local Development (no Docker)

Install dependencies:
```bash
cd backend && npm install
cd ../frontend && npm install
```

Run backend:
```bash
cd backend
npm run dev   # starts nodemon on PORT (default 8000)
```

Run frontend:
```bash
cd frontend
npm run dev   # starts Vite dev server on http://localhost:5173
```

Open the app at `http://localhost:5173`.

---

## Running with Docker Compose

Build and start:
```bash
docker compose up --build -d
```

Services:
- Backend on `http://localhost:8000`
- Frontend on `http://localhost:5173`

Compose configuration highlights (`docker-compose.yaml`):
- Backend mounts env from `backend/.env`
- Frontend may receive a build arg `VITE_API_URL` pointing to the backend

Important Vite note:
- The frontend `Dockerfile` currently comments out the `ARG/ENV` propagation for `VITE_API_URL`. To enable passing the value from compose during build, uncomment these lines in `frontend/Dockerfile`:
  ```
  ARG VITE_API_URL
  ENV VITE_API_URL=$VITE_API_URL
  ```
  Alternatively, keep a `frontend/.env` with `VITE_API_URL` set appropriately.

---

## Docker Volumes

For data persistence and development, consider adding volumes to your `docker-compose.yaml`:

```yaml
services:
  backend:
    # ... other config
    volumes:
      - ./backend:/app
      - /app/node_modules
    # For MongoDB data persistence (if using local MongoDB):
  mongodb:
    image: mongo:latest
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password

volumes:
  mongodb_data:
```

Benefits:
- **Development**: Mount source code for live reloading
- **Data persistence**: MongoDB data survives container restarts
- **Performance**: Avoid copying large `node_modules` directories

---

## Docker Registry

Pre-built images are available on Docker Hub:
- **Repository**: [https://hub.docker.com/repositories/sankalpgupta0](https://hub.docker.com/repositories/sankalpgupta0)
- **Backend image**: `sankalpgupta0/todo-app-backend:latest`
- **Frontend image**: `sankalpgupta0/todo-app-frontend:latest`

### Using Pre-built Images

Instead of building locally, you can pull and run pre-built images:

```bash
# Pull latest images
docker pull sankalpgupta0/todo-app-backend:latest
docker pull sankalpgupta0/todo-app-frontend:latest

# Update docker-compose.yaml to use pre-built images
services:
  backend:
    image: sankalpgupta0/todo-app-backend:latest
    # ... other config
  frontend:
    image: sankalpgupta0/todo-app-frontend:latest
    # ... other config
```

### Building and Pushing to Registry

To build and push your own images:

```bash
# Build and tag images
docker build -t sankalpgupta0/todo-app-backend:latest ./backend
docker build -t sankalpgupta0/todo-app-frontend:latest ./frontend

# Push to Docker Hub
docker push sankalpgupta0/todo-app-backend:latest
docker push sankalpgupta0/todo-app-frontend:latest
```

**Note**: You'll need to be logged in to Docker Hub (`docker login`) and have push permissions to the repository.

---

## API Reference
Base URL: `http://<backend-host>:<port>/todos`

- GET `/` — health check (backend root): returns "api is running"

Todos endpoints (under `/todos`):
- GET `/` — list all todos
- POST `/` — create todo
  - Body: `{ "task": string }`
- PUT `/:id` — update todo (partial update)
  - Body: `{ "task"?: string, "completed"?: boolean }`
- DELETE `/:id` — delete todo

Example cURL:
```bash
# List
curl http://localhost:8000/todos

# Create
curl -X POST http://localhost:8000/todos \
  -H 'Content-Type: application/json' \
  -d '{"task":"Buy milk"}'

# Update
curl -X PUT http://localhost:8000/todos/<id> \
  -H 'Content-Type: application/json' \
  -d '{"completed":true}'

# Delete
curl -X DELETE http://localhost:8000/todos/<id>
```

---

## Frontend Notes
- Filtering tabs: all, active, completed
- Remaining tasks counter shown in header
- Tailwind utility classes are used via `@tailwindcss/vite` + Tailwind 4

Caveats to be aware of:
- In `frontend/src/App.jsx`, `handleFormSubmit` POSTs to a hardcoded `http://localhost:8000/todos` instead of `VITE_API_URL`. For portability, consider changing to:
  ```js
  axios.post(`${Backend_base_url}`, { task: newTask })
  ```
- In `handleToggleComplete`, the request body always sets `{ completed: true }`. If you want symmetric toggling server-side, send the inverse of the current value:
  ```js
  axios.put(`${Backend_base_url}/${id}`, { completed: !todo.completed })
  ```

---

## Scripts

Backend (`backend/package.json`):
- `dev`: run server with nodemon
- `lint`: ESLint check
- `lint:fix`: ESLint with `--fix`
- `format`: Prettier write

Frontend (`frontend/package.json`):
- `dev`: Vite dev server
- `build`: Vite build
- `preview`: Vite preview (served on 0.0.0.0:5173 in Docker)
- `lint`: ESLint check
- `lint:fix`: ESLint with `--fix`
- `format`: Prettier write

---

## Linting & Formatting
Run from the respective directories:
```bash
npm run lint
npm run lint:fix
npm run format
```

---

## Deployment Tips
- Build immutable images with the correct `VITE_API_URL` baked into the frontend at build time.
- Expose and map ports appropriately (`8000` for backend, `5173` for preview or serve behind a proper web server for production).
- Provide a production MongoDB `MONGO_URI` with user/password and TLS as required.

---

## AWS EC2 Deployment

High-level steps to deploy on a single EC2 instance:

1. Launch EC2:
   - Use an Ubuntu or Amazon Linux AMI.
   - Open security group ports: `80`/`443` for HTTP/HTTPS, `8000` (backend) if needed, and `22` for SSH.
2. Install dependencies:
   ```bash
   sudo apt-get update -y
   sudo apt-get install -y docker.io docker-compose-plugin
   sudo usermod -aG docker $USER
   ```
   Re-login to apply the docker group.
3. Provide environment:
   - Create `backend/.env` with production `MONGO_URI` and `PORT`.
   - Set `frontend/.env` or pass `VITE_API_URL` during image build.
4. Deploy with Compose:
   ```bash
   # Option 1: Use pre-built images from Docker Hub
   docker compose pull
   docker compose up -d
   
   # Option 2: Build locally (if you need custom changes)
   docker compose up -d --build
   ```
5. Optional reverse proxy + TLS:
   - Put NGINX/Traefik in front, terminate TLS via Let’s Encrypt (e.g., `certbot`).
   - Point your domain’s A record to the EC2 public IP.

Notes:
- **Recommended**: Use pre-built images from Docker Hub (`sankalpgupta0/todo-app-backend:latest`, `sankalpgupta0/todo-app-frontend:latest`) for faster deployments.
- If using MongoDB Atlas, allow the EC2 public egress IP in Atlas Network Access and use TLS in `MONGO_URI`.
- Update your `docker-compose.yaml` to reference the registry images instead of building locally.

---

## CI/CD

Example approach using GitHub Actions:

- CI (on pull requests):
  - Install, lint, and build both `backend` and `frontend`.
  - Optionally run unit/integration tests.
- CD (on main branch):
  - Build and push Docker images for `backend` and `frontend` to Docker Hub registry (`sankalpgupta0/todo-app-backend:latest`, `sankalpgupta0/todo-app-frontend:latest`).
  - Deploy:
    - EC2: SSH into instance and run `docker compose pull && docker compose up -d`.
    - Kubernetes: `kubectl apply -f k8s/` against the cluster.

Required secrets (typical): `REGISTRY_TOKEN`, `SSH_HOST`, `SSH_USER`, `SSH_KEY`, `KUBE_CONFIG` (or OIDC to cloud provider), and app secrets like `MONGO_URI`.

Minimal workflow outline:
```yaml
jobs:
  deploy:
    needs: build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Add EC2 host to known hosts
        run: |
          mkdir -p ~/.ssh
          ssh-keyscan -H "$EC2_HOST" >> ~/.ssh/known_hosts
        env:
          EC2_HOST: ${{ secrets.EC2_HOST }}

      - name: Write SSH key to file
        run: |
          echo "${{ secrets.EC2_KEY }}" > ec2_key.pem
          chmod 600 ec2_key.pem
        
      - name: Deploy to EC2 (git pull + docker compose up -d --build)
        run: |
          ssh -i ec2_key.pem ${EC2_USER}@${EC2_HOST} << EOF
            set -e
            cd ${EC2_APP_DIR}

            git fetch --all
            git reset --hard origin/main

            docker compose up -d --build
            docker image prune -f
            docker compose ps
          EOF
        env:
          EC2_HOST: ${{ secrets.EC2_HOST }}
          EC2_KEY: ${{ secrets.EC2_KEY }}
          EC2_USER: ${{ secrets.EC2_USER }}
          EC2_APP_DIR: ${{ secrets.EC2_APP_DIR }}
```
- Add secrets in get up for EC2

---

## Kubernetes Deployment

Deploying to a Kubernetes cluster (e.g., EKS, GKE, AKS, kind):

1. Container images:
   - Use pre-built images from Docker Hub: `sankalpgupta0/todo-app-backend:latest` and `sankalpgupta0/todo-app-frontend:latest`.
   - Or push your own `backend` and `frontend` images to a registry reachable by the cluster.
2. Manifests (suggested `k8s/` folder):
   - `deployment-backend.yaml`: Deployment + Service (ClusterIP) exposing port `8000`.
   - `deployment-frontend.yaml`: Deployment + Service (ClusterIP) exposing port `80` (or Vite preview behind a web server).
   - `ingress.yaml`: Route domain paths to frontend (e.g., `/`) and backend (e.g., `/todos`).
   - `configmap-frontend.yaml`: Provide `VITE_API_URL` pointing to backend service DNS, e.g., `http://backend.default.svc.cluster.local:8000/todos`.
   - `secret-backend.yaml`: Inject `MONGO_URI` as an environment variable for backend pods.
3. Apply:
   ```bash
   kubectl apply -f k8s/
   ```
4. Ingress & TLS:
   - Use an ingress controller (e.g., NGINX Ingress or Traefik) and cert-manager for Let’s Encrypt.

Tips:
- In Kubernetes, prefer internal service DNS (`<service>.<namespace>.svc.cluster.local`) for inter-service URLs.
- Keep secrets in `Secret` objects and avoid committing them to git.

---

## Troubleshooting
- Backend cannot connect to MongoDB: verify `MONGO_URI` in `backend/.env` and that the database is reachable from the container/host.
- Frontend cannot reach backend: ensure `VITE_API_URL` matches the backend origin and includes `/todos`.
- In Docker, environment not applied to frontend: uncomment `ARG/ENV` lines in the frontend `Dockerfile` or use `frontend/.env`.
- CORS errors in non-localhost scenarios: update the CORS configuration in `backend/index.js` to restrict or allow necessary origins.

---
