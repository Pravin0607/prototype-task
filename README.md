# Prototype Task Management System

## App Description
This is a task management system designed to help users efficiently manage their tasks. The application provides features such as task creation, editing and deletion. It also includes user authentication and a responsive user interface.

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
4. Set up the MySQL database:
   - Create a new MySQL database:
     ```sql
     CREATE DATABASE myproject_db;
     ```
   - Create a MySQL user and grant privileges:
     ```sql
     CREATE USER 'project_admin'@'localhost' IDENTIFIED BY '1234';
     GRANT ALL PRIVILEGES ON task_management.* TO 'project_admin'@'localhost';
     FLUSH PRIVILEGES;
     ```
   - Update the `DATABASES` configuration in `settings.py` to match your MySQL credentials.

5. Apply migrations to set up the database schema:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Run the Django development server:
   ```bash
   python manage.py runserver
   ```

7. Create a superuser to access the admin panel:
   ```bash
   python manage.py createsuperuser
   ```
   Follow the prompts to set up a username, email, and password.

8. Access the admin panel at:
   [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) to manage users and other data.

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

## Additional Notes
- Users will be automatically logged out if their session token expires after 30 minutes. A notification will be displayed to inform them about the session expiration.

### API Testing with Postman

A Postman collection has been provided to simplify API testing. Follow the steps below to use it:

1. Download the Postman collection file:
   [Prototype Task API.postman_collection.json](./Prototype%20Task%20API.postman_collection.json)

2. Open Postman and import the collection:
   - Click on "Import" in the top-left corner of Postman.
   - Select the downloaded `Prototype Task API.postman_collection.json` file.

3. Set up the environment variables:
   - Add a new environment in Postman.
   - Define the following variables:
     - `base_url`: `http://127.0.0.1:8000/api/`
     - `access_token`: Your JWT access token.

4. Use the imported collection to test the API endpoints.
   - Ensure the backend server is running before making requests.
   - Replace placeholder values (e.g., `{{access_token}}`) with actual values.

## Repository Link
[GitHub Repository](https://github.com/Pravin0607/prototype-task.git)
