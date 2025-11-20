# 🌐 Live Links
- **Client Blog:** [https://blogist.vercel.app](https://blogist-two.vercel.app/)
- **Admin Dashboard:** [https://blogist-admin.vercel.app](https://blogist-admin.vercel.app/)

---
# Screenshots
<img width="1845" height="884" alt="image" src="https://github.com/user-attachments/assets/a7388beb-d3da-47a5-9afd-bfd082469673" />
<img width="1839" height="885" alt="image" src="https://github.com/user-attachments/assets/05cd814e-da3b-4bd8-a5f4-0faf7f72ccd8" />
<img width="1834" height="883" alt="image" src="https://github.com/user-attachments/assets/6115f2a6-4498-4315-b964-6452d4ab0057" />
<img width="1835" height="886" alt="image" src="https://github.com/user-attachments/assets/55f98e51-95bb-4aaa-959d-a5df4bf64e52" />
<img width="1829" height="880" alt="image" src="https://github.com/user-attachments/assets/2ab5346e-b8bd-4616-bc1a-a9fc1ce388e0" />
<img width="1832" height="883" alt="image" src="https://github.com/user-attachments/assets/49b062aa-cf6a-4821-a541-e9746fa54553" />


## **Blogist — Full-Stack Blogging Platform (React + Node.js + MongoDB + Cloudinary)**

A modern, fast, fully customizable blogging platform built with:

* **React (Vite) — Client**
* **React (Vite) — Client Admin Dashboard**
* **Node.js + Express — Backend API**
* **MongoDB Atlas — Database**
* **Cloudinary — Media Storage**
* **Vercel + Render — Deployment**

This project includes a **public blog**, a **content management admin panel**, and a **REST API** powering all blog functionality.

---

## 🚀 **Live Links**

| Service                      | URL                      |
| ---------------------------- | ------------------------ |
| **Client (Public Blog)**     | *your-vercel-client-url* |
| **Client Admin (Dashboard)** | *your-vercel-admin-url*  |
| **Server API (Render)**      | *your-render-api-url*    |

---

# 📌 **Features**

## 🌐 Public Client (User-Facing Blog)

* Clean, modern UI with hero banner & animations
* Browse posts with grid layout
* Category & Tag-based filtering
* Full-text search with live results
* Sidebar with author card, categories & tags
* Individual blog post pages
* Dynamic accent color system
* Archive page with timeline display
* Mobile responsive layout

---

## 🔐 Client Admin (CMS Dashboard)

* Secure admin login with secret key
* Create, edit, delete blog posts
* Upload cover images via **Cloudinary**
* TipTap rich-text editor
* Category & tag management
* Live preview for images + metadata
* Fully responsive management UI

---

## 🛠️ Backend API (Node.js + Express)

* REST API with CRUD for posts
* Advanced filtering:

  * `?search=`
  * `?category=`
  * `?tag=`
* MongoDB using Mongoose models
* Image upload route with Cloudinary
* Auto-generated post metadata (excerpt, reading time)
* Slug generation & sorting
* CORS enabled

---

# 📂 **Project Structure**

```
project-root/
│
├── client/             # Public user blog (React + Vite)
│
├── client-admin/       # Admin dashboard (React + Vite)
│
└── server/             # Backend API (Node.js + Express)
```

---

# ⚙️ **Environment Variables**

## Client / Client Admin (`.env`)

```
VITE_API_BASE=https://your-render-backend-url/api
```

## Server (`.env`)

```
MONGO_URI=your-mongodb-atlas-uri
CLOUDINARY_CLOUD=your-cloudinary-cloud-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
CLOUDINARY_FOLDER=blogist
ADMIN_SECRET=your-admin-login-secret
PORT=5000
```

---

# 🧩 **Tech Stack**

### **Frontend**

* React (Vite)
* React Router DOM
* Tailwind CSS
* TipTap Editor
* React Icons

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* Cloudinary SDK
* Multer (for uploads)

### **Deployment**

* **Vercel** — Frontend
* **Render.com** — Backend
* **Cloudinary** — Media storage
* **MongoDB Atlas** — Database

---

# ▶️ **Running Locally**

## 1️⃣ Install dependencies

### Client:

```
cd client
npm install
npm run dev
```

### Client Admin:

```
cd client-admin
npm install
npm run dev
```

### Server:

```
cd server
npm install
npm run dev
```

---

# 🧪 **API Routes**

### **Posts**

| Method | Endpoint         | Description                      |
| ------ | ---------------- | -------------------------------- |
| GET    | `/api/posts`     | Get all posts (supports filters) |
| GET    | `/api/posts/:id` | Get one post                     |
| POST   | `/api/posts`     | Create post                      |
| PUT    | `/api/posts/:id` | Update post                      |
| DELETE | `/api/posts/:id` | Delete post                      |

### **Upload**

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| POST   | `/api/upload` | Upload image to Cloudinary |

---

# 🎨 **Key Features in UI**

* Slide-down animations for pages
* Accent color picker (CSS variables)
* Sidebar acts as filtering system
* Custom Archive timeline
* Clean typography & shadowing

---

# 📘 **About the Project**

This project is a complete end-to-end full-stack portfolio-grade blogging system.
It demonstrates:

* Modern UI design
* Frontend + Backend integration
* Real image upload handling
* Scalable API architecture
* Secure admin panel design
* Cloud deployment & configuration

---

# ⭐ **Author**

**Rounak Bag**
Developer • Blogger • AI Enthusiast
Portfolio: [https://www.rounakkrbag.me](https://www.rounakkrbag.me)
GitHub: [https://github.com/rounak-codes](https://github.com/rounak-codes)

---

# 📄 License

This project is licensed under the **MIT License**.

---
