# 📝 Next.js Blog PWA

A modern full-featured Blog application built with **Next.js**, **TypeScript**, and **Tailwind CSS** with full **PWA (Progressive Web App)** support.

This project includes authentication, role-based access control, article management, comment system, and a complete admin dashboard.

---

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login
- Role-based Access (User / Admin)
- Protected Routes
- Secure Admin Access

---

### 📰 Blog System
- Create Article
- Edit Article
- Delete Article
- Category Management
- Article Listing Page
- Dynamic Article Detail Page

---

### 💬 Comment System
- Users can submit comments under articles
- Admin can manage (approve/delete) comments

---

### 🛠 Admin Panel

Admin has full CRUD access to:

- 👥 Users (Create, Edit, Delete)
- 📰 Articles (Create, Edit, Delete)
- 🗂 Categories (Create, Edit, Delete)
- 💬 Comments (Moderate / Delete)

Admin Route:
```
/p-admin
```

---

### 📱 PWA Support

- Installable on Mobile & Desktop
- Offline Support
- Custom Offline Page
- Web App Manifest
- Service Worker
- Optimized for Performance

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **PWA:** Service Worker + Manifest
- **Authentication:** Custom Auth System
- **Architecture:** Component-Based Structure

---

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/danialmousavi/blog-project

# Navigate to project folder
cd blog-front-end

# Install dependencies
npm install

# Run development server
npm run dev

# Navigate to project folder
cd blog-back-end

# Install dependencies
npm install

# Run development server
npm run start
```

The app will run on:

```
http://localhost:3000
```

---

## 🔐 Admin Access

To access the admin panel, a user must have the `admin` role.

Admin dashboard route:

```
/p-admin

username:daniuf
password:123456
```

---


## 📌 Future Improvements

- Article Like System
- Advanced Search
- Pagination
- SEO Optimization
- Image Upload Optimization

---

## 🧪 Production Build

```bash
npm run build
npm start
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Danial**

If you like this project, feel free to ⭐ the repository.
