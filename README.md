# 🔗 Linktree Clone (Full Stack SaaS)

A production-ready Linktree-style web application built with Next.js (App Router), NextAuth, MongoDB Atlas, and Cloudinary.

Users can authenticate, create a unique handle, upload a profile picture, add custom links, and manage everything from a protected dashboard.

---

## Live Demo

 https://linktree-ruby-two.vercel.app

---

##  Features

### Authentication
- Credentials login
- Google OAuth login
- JWT session management
- Protected routes
- Custom post-login redirect control

### Handle System
- Unique user handle
- Dynamic routing (`/[handle]`)
- Validation (alphanumeric + underscore only)

### Profile Image Upload
- Image upload via Cloudinary
- Client-side validation
- Secure cloud storage
- No local file storage

### Link Management (Dashboard)
- Add links
- Edit links
- Delete links
- Click counter support
- Responsive layout

### Responsive Design
- Desktop optimized layout
- Mobile-friendly UI
- Overlay navbar on small screens

### Database Architecture
- MongoDB Atlas (Cloud)
- Separate collections:
  - `users`
  - `links`
- Proper relational reference (`links.userId → users._id`)

---

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- React
- Tailwind CSS
- React Hook Form
- React Toastify

### Backend
- NextAuth (JWT Strategy)
- MongoDB Native Driver
- Cloudinary API

### Deployment
- Vercel
- MongoDB Atlas
- Google Cloud Console (OAuth)

---

## Environment Variables

Create a `.env.local` file for development:

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=your_secret_here

MONGODB_URI=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret



In production, add the same variables inside Vercel Environment Settings.

---
## Architecture Overview
User → Auth → Handle Creation → Cloudinary Upload → MongoDB Storage → Public Route

## Google login redirect control
Google → /post-login → DB check → /dashboard or /generate

## Future Improvements

Drag & drop link reordering
Analytics dashboard
Theme customization
Custom domain support
Premium plan system

## Author
-Sohail Khan

## Installation (Local Development)

```bash
git clone https://github.com/Developer-Sohail786/linktree_.git
cd linktree_
npm install
npm run dev

