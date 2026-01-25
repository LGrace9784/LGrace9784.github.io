# Task Management Web App

A full-stack task management application built with Python (FastAPI) backend and React frontend. Features user authentication, task CRUD operations, and a modern responsive UI.

## Features

- **User Authentication**: JWT-based login and registration
- **Task Management**: Create, read, update, and delete tasks
- **Task Properties**: Title, description, priority levels, due dates, completion status
- **Responsive Design**: Modern, clean UI that works on all devices
- **RESTful API**: Well-documented backend API
- **Database**: SQLite for development (easily configurable for PostgreSQL)

## Tech Stack

### Backend

- **Python 3.8+**
- **FastAPI**: Modern, fast web framework
- **SQLAlchemy**: ORM for database operations
- **SQLite**: Database (development)
- **JWT**: Authentication tokens
- **Pydantic**: Data validation

### Frontend

- **React 18**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **CSS**: Custom styling

## Project Structure

```
task-manager/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── auth.py
│   │   ├── crud.py
│   │   └── routers/
│   │       ├── auth.py
│   │       └── tasks.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── TaskList.js
│   │   │   ├── TaskForm.js
│   │   │   └── NavBar.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd task-manager/backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd task-manager/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`

## API Documentation

When the backend is running, visit `http://localhost:8000/docs` for interactive API documentation powered by Swagger UI.

### Key Endpoints

#### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get access token
- `GET /auth/me` - Get current user info

#### Tasks

- `GET /tasks/` - Get all tasks for current user
- `POST /tasks/` - Create a new task
- `GET /tasks/{id}` - Get a specific task
- `PUT /tasks/{id}` - Update a task
- `DELETE /tasks/{id}` - Delete a task

## Usage

1. **Register**: Create a new account or login with existing credentials
2. **Create Tasks**: Use the "Add Task" button to create new tasks
3. **Manage Tasks**: View, edit, complete, or delete your tasks
4. **Organize**: Use priorities and due dates to stay organized

## Development

### Running Tests

```bash
# Backend tests (if implemented)
cd backend
python -m pytest

# Frontend tests
cd frontend
npm test
```

### Database Migrations

The app uses SQLAlchemy with auto-migration on startup. For production, consider using Alembic for proper migrations.

### Environment Variables

Create a `.env` file in the backend directory:

```
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///./taskmanager.db
```

## Deployment

### Backend Deployment

- Use Gunicorn for production: `gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker`
- Configure PostgreSQL for production database
- Set proper environment variables

### Frontend Deployment

- Build the production bundle: `npm run build`
- Serve the `build` folder with any static file server
- Configure the API base URL for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Future Enhancements

- Email notifications for due tasks
- Task categories/tags
- File attachments
- Team collaboration features
- Mobile app version
- Advanced filtering and search
- Data export functionality
- API rate limiting
- User profile management
