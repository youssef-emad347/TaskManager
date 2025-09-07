# 📝 Task Manager API

A RESTful Task Manager API built with **Node.js**, **Express.js**, and **MongoDB**, providing full user authentication and task management features.  
The API is documented with **Swagger** and deployed on **Vercel** with **MongoDB Atlas** as the database.

---

## 🚀 Features

### Authentication & User Management
- User registration
- Login with JWT authentication
- Get user profile
- Update profile details
- Change password
- Forgot/reset password
- Delete user account

### Task Management
- Create tasks
- Read tasks (with pagination & filtering)
- Update tasks
- Delete tasks

### Other
- Swagger UI documentation
- Health check endpoint

---

## ⚙️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Documentation:** Swagger (OpenAPI 3)
- **Deployment:** Vercel

---

## 📦 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/taskmanager.git
   cd taskmanager
   npm install
   ```
2.Create a .env file in the root directory with:
  ```bash
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
```
3.start with:
  ```bash
  npm start
```
