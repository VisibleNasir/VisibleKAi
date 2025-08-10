# Backend API – Express + PostgreSQL

This backend service is built with **Express.js** and **PostgreSQL**, designed to support authentication, media processing, and AI integrations.  
It uses **Clerk** for authentication, **Cloudinary** for file storage, **Gemini API** for AI features, and **ClipDrop** for image editing tools.

---

## 🚀 Features
- **PostgreSQL + Prisma ORM** for database management
- **Clerk** for secure authentication
- **Gemini API** for AI-powered features
- **ClipDrop API** for image background/object removal
- **Cloudinary** for image storage
- REST API endpoints with Express.js

---

## 📦 Tech Stack
- **Node.js** – Backend runtime
- **Express.js** – Web framework
- **PostgreSQL** – Relational database
- **Prisma** – ORM for DB queries
- **Clerk** – Authentication & user management
- **Cloudinary** – Cloud media storage
- **Gemini API** – AI-powered tools
- **ClipDrop API** – Image editing

---

## ⚙️ Setup Instructions

### 1 Clone the Repository
```bash
git clone https://github.com/your-username/your-backend-repo.git
cd your-backend-repo
npm install
```

## 2 Set Up Environment Variables
Create a .env file in the root directory and add the following:

DATABASE_URL=your_database_url_here

CLERK_PUBLISHABLE_KEY=pk_test_bXVzaWNhbC1lbGVwaGFudC0zNy5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=your_clerk_secret_key_here

GEMINI_API_KEY=your_gemini_api_key_here
CLIPDROP_API_KEY=your_clipdrop_api_key_here

CLOUDINARY_CLOUD_NAME=dzfcg6llr
CLOUDINARY_API_KEY=your_cloudinary_api_key_here
CLOUDINARY_API_SECRET=your_cloudinary_api_secret_here

```bash
cd your-backend-repo
npm run server
```

