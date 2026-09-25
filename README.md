# 🔗 Linktree Clone — Full-Stack SaaS

> A full-stack Linktree-style application built with Next.js, NextAuth, MongoDB Atlas, and Cloudinary.

Users can authenticate, create a unique public handle, upload a profile picture, add custom links, and manage their profile through a protected dashboard.

---

## 🚀 Live Demo

https://linktree-ruby-two.vercel.app

---

## ✨ Features

### 🔐 Authentication

- Credentials login
- Google OAuth login
- JWT session management
- Protected routes
- Custom post-login redirect control

### 👤 Handle System

- Unique user handles
- Dynamic routing with ` /[handle] `
- Handle validation
- Alphanumeric and underscore support

### 🖼️ Profile Image Upload

- Profile image upload through Cloudinary
- Client-side validation
- Secure cloud storage
- No local file storage

### 🔗 Link Management

- Add links
- Edit links
- Delete links
- Click counter support
- Responsive dashboard

### 📱 Responsive Design

- Desktop-optimized layout
- Mobile-friendly interface
- Responsive navigation
- Overlay navbar on smaller screens

### 🗄️ Database Architecture

- MongoDB Atlas
- Separate `users` and `links` collections
- User-to-link relationship through `links.userId`
- Cloud-based database storage

---

## 🏗️ Architecture

```text
User
  │
  ▼
Authentication
  │
  ▼
Handle Creation
  │
  ▼
Profile Management
  │
  ├── Profile Image ──► Cloudinary
  │
  └── Links ──────────► MongoDB Atlas
                           │
                           ▼
                      Public Profile
                       /[handle]
```

---

## 🔄 Google Login Flow

```text
Google OAuth
     │
     ▼
/post-login
     │
     ▼
Check User in Database
     │
     ├── Existing User ──► /dashboard
     │
     └── New User ───────► /generate
```

---

## 🛠️ Tech Stack

### Frontend

- Next.js 16 (App Router)
- React
- Tailwind CSS
- React Hook Form
- React Toastify

### Backend & Authentication

- NextAuth
- JWT Strategy
- MongoDB Native Driver
- Cloudinary API

### Deployment & Services

- Vercel
- MongoDB Atlas
- Google Cloud Console — OAuth

---

## 📁 Project Flow

```text
Authentication
      │
      ▼
Create Handle
      │
      ▼
Configure Profile
      │
      ├── Upload Profile Image
      │
      └── Add Custom Links
      │
      ▼
Protected Dashboard
      │
      ▼
Public Profile
/[handle]
```

---

## 🔐 Environment Variables

Create a `.env.local` file for local development:

```env
NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=your_secret_here

MONGODB_URI=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

For production, configure the same environment variables through the Vercel project settings.

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Developer-Sohail786/linktree_.git
cd linktree_
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
.env.local
```

Add the required environment variables listed above.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🔮 Future Improvements

- Drag-and-drop link reordering
- Analytics dashboard
- Theme customization
- Custom domain support
- Premium plan system

---

## 👨‍💻 Author

**Sohail Khan**

Full-Stack Developer | Next.js | Backend | AI

---

## 📜 License

This project is licensed under the MIT License.
