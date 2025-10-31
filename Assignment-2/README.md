
# 🚀 Mini Project Manager - Assignment 2

A full-stack project manager with user authentication, project tracking, and task management capabilities. Implemented using ASP.NET Core 8, Entity Framework Core, SQLite, and React with TypeScript.

## 🌐 Live Demo

- Frontend: Coming soon (Vercel)
- Backend API: Coming soon (Render)
- API Documentation: Available via Swagger UI when backend is running

## ✨ Key Features

### Authentication
- User registration and login (JWT)
- Token-based access to protected routes
- Password hashing using BCrypt
- Automatic token storage and refresh

### Project Management
- Create, view, and delete projects
- Dashboard overview of all projects with task counts
- Cascading delete for project-related tasks
- Real-time UI updates on creation or deletion

### Task Management
- Add, edit, and delete tasks within projects
- Toggle completion status instantly
- Optional due dates for tasks
- Task validation and live status updates

### User Experience
- Responsive UI built with Tailwind CSS
- Instant feedback on API calls
- Error boundaries and loading animations
- Clean and minimal design

## 🧰 Tech Stack

### Backend
| Technology | Purpose |
|-------------|----------|
| ASP.NET Core 8 | Web API |
| C# 12 | Backend logic |
| Entity Framework Core | ORM |
| SQLite | Database |
| JWT | Authentication |
| BCrypt.Net | Password security |
| Swagger | API testing |

### Frontend
| Technology | Purpose |
|-------------|----------|
| React 18 | Frontend framework |
| TypeScript 5 | Type safety |
| React Router v6 | Navigation |
| Axios | API communication |
| Tailwind CSS | Styling |
| Context API | Global state management |

## 🗂 Project Structure

```
Assignment-2/
├── Backend/
│   ├── Controllers/
│   ├── Models/
│   ├── DTOs/
│   ├── Services/
│   ├── Data/
│   ├── Helpers/
│   ├── Migrations/
│   ├── Program.cs
│   ├── appsettings.json
│   └── Backend.csproj
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── contexts/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## ⚙️ Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js v18+
- Git

### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/ziqIshika05/Task-Manager.git
   cd Task-Manager/Assignment-2
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   dotnet restore
   dotnet ef database update
   dotnet run
   ```

   Access:
   - Swagger: http://localhost:5XXX/swagger  
   - Base API: http://localhost:5XXX/api

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   npm start
   ```

   Open: http://localhost:3000

## 🔑 Authentication Flow

| Endpoint | Method | Auth | Description |
|-----------|---------|------|-------------|
| /api/auth/register | POST | No | Register new user |
| /api/auth/login | POST | No | Login and receive JWT token |
| /api/projects | GET, POST, DELETE | Yes | Manage projects |
| /api/projects/{id}/tasks | POST, PUT, DELETE, PATCH | Yes | Manage project tasks |

## 🔒 Security Highlights
- Passwords hashed with salt (BCrypt)
- Secure JWT token authentication (7-day expiry)
- Route protection on frontend
- User-specific project and task access

## 🧭 Usage Workflow
1. Register or login
2. Create a new project
3. Add tasks inside the project
4. Mark tasks as complete or edit them
5. Delete tasks or projects as needed

## 🧪 Testing

### Backend
```
dotnet run
# Visit Swagger UI
http://localhost:5XXX/swagger
```

### Frontend
Manual checks:
- Register/login
- Create/delete project
- Add/edit/delete tasks
- Verify protected route handling

## 🩺 Troubleshooting

**dotnet ef not found:**  
`dotnet tool install --global dotnet-ef`

**Database locked:**  
Close all connections:
```
dotnet clean
rm projectmanager.db
dotnet ef database update
```

**Frontend API error:**  
Ensure API URL in `api.ts` matches backend origin.

## 📦 Deployment

### Backend (Render/)
Update `appsettings.json`, then deploy via GitHub integration or CLI:
```
ASPNETCORE_ENVIRONMENT=Production
JWT_KEY=<secure-random-key>
```

### Frontend (Vercel/Netlify)
```
REACT_APP_API_URL=https://your-api.Render.app
npm run build
vercel deploy --prod
```

## 📚 Learning Outcomes
- Integrated JWT authentication in ASP.NET Core
- Built RESTful APIs using Entity Framework Core
- Implemented CRUD operations for hierarchical data
- Managed state and routes securely in React
- Applied clean architecture and DTO design

## 🧩 Future Enhancements
- Email verification and password reset
- Project collaboration between users
- File attachments for tasks
- Real-time updates with SignalR
- Reporting and advanced filtering

## 🤝 Contributing
```
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature
```
Then create a Pull Request.

Follow backend C# conventions and TypeScript code style via Prettier and ESLint.

## 📝 License
This project is developed as an academic assignment for educational purposes.

## 👩‍💻 Author
**Ishika - 22105093**  
GitHub: [@ziqIshika05](https://github.com/ziqIshika05)  
Repository: [Task-Manager](https://github.com/ziqIshika05/Task-Manager)

