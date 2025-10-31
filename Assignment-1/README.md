
# 📋 Task Manager - Assignment 1

A full-stack task management application built with **ASP.NET Core 8** and **React + TypeScript**. This project demonstrates fundamental skills in building RESTful APIs, implementing CRUD operations, and creating interactive user interfaces.

## 🚀 Live Demo

- **Frontend**: [Coming Soon - Deploy on Vercel]
- **Backend API**: [Coming Soon - Deploy on Railway]
- **API Documentation**: [Access Swagger UI when backend is running]

## ✨ Features

### Core Functionality
- ✅ **Display Task List**: View all tasks with their completion status
- ✅ **Add New Tasks**: Create tasks with descriptions
- ✅ **Toggle Completion**: Mark tasks as completed or uncompleted with a single click
- ✅ **Delete Tasks**: Remove tasks from the list
- ✅ **Persistent Storage**: Tasks are stored in-memory (persists during app runtime)

### Additional Enhancements
- 🎨 **Modern UI**: Clean, responsive design
- 🔍 **Task Filtering**: Filter tasks by All / Active / Completed
- 💾 **LocalStorage**: Optional persistence across browser sessions
- 📱 **Mobile Responsive**: Works seamlessly on all device sizes

## 🛠️ Tech Stack

### Backend
- **Framework**: ASP.NET Core 8 Web API
- **Language**: C# 12
- **Storage**: In-Memory Data Store
- **Documentation**: Swagger/OpenAPI
- **Architecture**: RESTful API with Clean Architecture principles

### Frontend
- **Framework**: React 18
- **Language**: TypeScript 5
- **HTTP Client**: Axios / Fetch API
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Create React App (Webpack)

### Development Tools
- **IDE**: Visual Studio Code
- **Version Control**: Git & GitHub
- **API Testing**: Swagger UI / Postman
- **Package Manager**: npm (Frontend), NuGet (Backend)

## 📁 Project Structure

```
Task-Manager/
│
├── Assignment_1/                 # Backend (.NET 8 API)
│   ├── Controllers/
│   │   └── TasksController.cs   # API endpoints
│   ├── Models/
│   │   └── TaskItem.cs          # Task data model
│   ├── Services/
│   │   ├── ITaskService.cs      # Service interface
│   │   └── TaskService.cs       # Business logic
│   ├── Program.cs               # App configuration
│   └── Assignment_1.csproj
│
└── task-manager-frontend/            # Frontend (React + TS)
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/          # Reusable components
    │   ├── services/            # API integration
    │   ├── types/               # TypeScript interfaces
    │   ├── App.tsx              # Main component
    │   └── index.tsx            # Entry point
    └── package.json
```

## 🎯 API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/tasks` | Get all tasks | - | `200 OK` Array of tasks |
| POST | `/api/tasks` | Create new task | `{ description, isCompleted }` | `201 Created` Task object |
| PUT | `/api/tasks/{id}` | Update task | `{ description, isCompleted }` | `200 OK` Updated task |
| DELETE | `/api/tasks/{id}` | Delete task | - | `204 No Content` |

### Example Request/Response

**Create Task (POST /api/tasks):**
```json
// Request
{
  "description": "Complete the backend API",
  "isCompleted": false
}

// Response (201 Created)
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "description": "Complete the backend API",
  "isCompleted": false
}
```

## 🚦 Getting Started

### Prerequisites

Ensure you have the following installed:
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) (v8.0 or higher)
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [Git](https://git-scm.com/)

Verify installations:
```bash
dotnet --version  # Should show 8.0.x
node --version    # Should show v18.x or higher
npm --version     # Should show 9.x or higher
```

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/ziqIshika05/Task-Manager.git
cd Task-Manager
```

#### 2. Backend Setup

```bash
# Navigate to backend folder
cd Assignment_1

# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run the API
dotnet run
```

**Backend will be available at:**
- HTTP: `http://localhost:5256`
- HTTPS: `https://localhost:7254` (or check console for exact HTTPS port)
- Swagger UI: `http://localhost:5256/swagger` or `https://localhost:7254/swagger`

> **✅ Your backend is running on port 5256**

#### 3. Frontend Setup

Open a **new terminal** (keep backend running) and:

```bash
# Navigate to frontend folder
cd task-manager-frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Frontend will be available at:**
- Local: `http://localhost:3000` (or check console output)

The browser should automatically open to the frontend.

> **⚠️ Important**: Make sure the backend is running before starting the frontend!

## 💻 Usage

### Testing the API with Swagger

1. **Start the backend** (`dotnet run` in Assignment_1 folder)
2. Navigate to **`http://localhost:5256/swagger`**
3. Try the following operations:
   
   **GET /api/tasks**
   - Click "Try it out" → "Execute"
   - Should return 2 seeded tasks
   
   **POST /api/tasks**
   - Click "Try it out"
   - Request body:
   ```json
   {
     "description": "My new task",
     "isCompleted": false
   }
   ```
   - Click "Execute"
   
   **PUT /api/tasks/{id}**
   - Copy a task ID from GET response
   - Click "Try it out"
   - Paste the ID and update the task
   
   **DELETE /api/tasks/{id}**
   - Copy a task ID
   - Click "Try it out" → Paste ID → "Execute"

### Using the Frontend

1. **Ensure backend is running** on port 5256
2. **Start frontend** (`npm start`)
3. Open browser (should auto-open, or go to `http://localhost:3000`)
4. **Add tasks**: Type in the input field and click "Add" or press Enter
5. **Toggle completion**: Click the checkbox next to any task
6. **Filter tasks**: Use filter buttons (All / Active / Completed)
7. **Delete tasks**: Click the delete/remove button next to any task

### Testing with cURL

```bash
# Get all tasks
curl http://localhost:5256/api/tasks

# Create a new task (Windows Command Prompt)
curl -X POST http://localhost:5256/api/tasks ^
  -H "Content-Type: application/json" ^
  -d "{\"description\":\"New task from CLI\",\"isCompleted\":false}"

# Create a new task (PowerShell/Mac/Linux)
curl -X POST http://localhost:5256/api/tasks `
  -H "Content-Type: application/json" `
  -d '{"description":"New task from CLI","isCompleted":false}'

# Update a task (replace {id} with actual GUID)
curl -X PUT http://localhost:5256/api/tasks/{id} `
  -H "Content-Type: application/json" `
  -d '{"description":"Updated task","isCompleted":true}'

# Delete a task
curl -X DELETE http://localhost:5256/api/tasks/{id}
```

### Testing with Postman

1. Import collection or create requests manually
2. **Base URL**: `http://localhost:5256/api`
3. **Endpoints**: 
   - GET `/tasks`
   - POST `/tasks` (with JSON body)
   - PUT `/tasks/{id}` (with JSON body)
   - DELETE `/tasks/{id}`

## 🧪 Development

### Backend Development

```bash
# Navigate to backend
cd Assignment_1

# Watch mode (auto-reload on changes)
dotnet watch run

# Clean build artifacts
dotnet clean

# Rebuild project
dotnet build
```

### Frontend Development

```bash
# Navigate to frontend
cd [your-frontend-folder]

# Development server with hot reload
npm start

# Build for production
npm run build

# Test production build locally
npm install -g serve
serve -s build
```

## 🎨 Key Design Decisions

### Backend Architecture

1. **Service Layer Pattern**
   - `ITaskService` interface defines contract
   - `TaskService` implements business logic
   - Controllers delegate to services
   - Clean separation of concerns

2. **In-Memory Storage**
   - `List<TaskItem>` stores tasks
   - Singleton service lifetime preserves data during runtime
   - 2 seeded tasks for immediate testing
   - Simple and perfect for learning

3. **RESTful Design**
   - Standard HTTP verbs: GET, POST, PUT, DELETE
   - Meaningful status codes: 200, 201, 204, 404, 400
   - Resource-based URLs: `/api/tasks`
   - Consistent JSON responses

4. **CORS Configuration**
   - Allows requests from `localhost:3000` and `localhost:5256`
   - Necessary for frontend-backend communication
   - Configured in `Program.cs`

### Frontend Architecture

1. **Component-Based**
   - Modular, reusable components
   - Single responsibility principle
   - Easy to test and maintain

2. **TypeScript**
   - Type-safe interfaces for Task model
   - Compile-time error detection
   - Better IDE support

3. **State Management**
   - React hooks: `useState`, `useEffect`
   - API calls on component mount
   - Optional localStorage integration


## 🐛 Known Issues & Limitations

- **In-Memory Storage**: Data resets on API restart (by design)
- **No Authentication**: Anyone can access tasks
- **No Database**: Educational project, not production-ready
- **CORS**: Localhost only
- **No Pagination**: All tasks loaded at once

## 🚀 Future Enhancements

- [ ] User authentication (JWT)
- [ ] Database integration (SQLite/SQL Server)
- [ ] Task categories and tags
- [ ] Due dates and priorities
- [ ] Search and advanced filtering
- [ ] Drag-and-drop reordering
- [ ] Dark mode
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 📚 Learning Outcomes

### Backend Skills
✅ RESTful API design  
✅ ASP.NET Core Web API  
✅ Dependency Injection  
✅ Service-oriented architecture  
✅ Swagger documentation  
✅ CORS configuration  

### Frontend Skills
✅ React component development  
✅ TypeScript type safety  
✅ State management with hooks  
✅ Asynchronous API calls  
✅ Responsive UI design  
✅ Error handling  

### General Skills
✅ Git version control  
✅ Project structure  
✅ API testing  
✅ Full-stack integration  

## 🤝 Contributing

This is an educational project. Suggestions and improvements are welcome!

1. Fork the repository
2. Create feature branch: `git checkout -b feature/NewFeature`
3. Commit changes: `git commit -m 'Add NewFeature'`
4. Push to branch: `git push origin feature/NewFeature`
5. Open Pull Request

## 📝 License

This project is created for educational purposes.

## 👤 Author

**Ishika**
- GitHub: [@ziqIshika05](https://github.com/ziqIshika05)
- Project: [Task Manager](https://github.com/ziqIshika05/Task-Manager)

## 🙏 Acknowledgments

- Built with ASP.NET Core 8 and React 18
- Assignment guidelines provided for learning
- Inspired by modern task management applications

---

## 📞 Support

Having issues?

1. Check [Issues](https://github.com/ziqIshika05/Task-Manager/issues) page
2. Review Swagger docs at `http://localhost:5256/swagger`
3. Ensure both backend (5256) and frontend (3000) are running
4. Verify all prerequisites are installed

---

**⭐ If this project helped you learn, please give it a star!**

---

*Assignment 1 - Full Stack Development*  
*Last Updated: October 2025*


---
