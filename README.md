# Prototype Task Management System

## App Description
This is a task management system designed to help users efficiently manage their tasks. The application provides features such as task creation, editing, deletion, and categorization. It also includes user authentication and a responsive user interface.

## Tech Stack Used
### Frontend
- **Framework**: React
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS, shadcn
- **Build Tool**: Vite
- **Other Libraries**: React Router, React Hook Form, Axios, Framer Motion

### Backend
- **Framework**: Django
- **Database**: MySQL
- **Authentication**: Simple JWT
- **Other Libraries**: Django REST Framework

## Setup Instructions
### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python3 -m venv task_venv
   source task_venv/bin/activate
   ```
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Django development server:
   ```bash
   python manage.py runserver
   ```

### Backend (Additional Steps for Database Setup)
5. Set up the MySQL database:
   - Create a new MySQL database:
     ```sql
     CREATE DATABASE task_management;
     ```
   - Update the `DATABASES` configuration in `settings.py` to match your MySQL credentials.

6. Apply migrations to set up the database schema:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Repository Link
[GitHub Repository](https://github.com/Pravin0607/prototype-task.git)