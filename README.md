# 📝 PasteIt - A Simple and Secure Paste Sharing App

PasteIt is a full-stack web app that lets users create, share, update, and manage text pastes (like code snippets, notes, etc.). Authenticated users can make their pastes public or private, track views, and securely edit/delete their own content.

---

## 🚀 Features

- 🔐 Authentication using JWT
- 📝 Create new public or private pastes
- 🌍 View all public pastes
- 👤 View your own pastes only
- ✏️ Edit & ❌ Delete your own pastes
- 📊 Track paste views
- 📎 Copy-paste link with one click
- 🌟 Popular & Recent paste sections
- 🎨 Modern responsive UI (Tailwind CSS)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pasteit-app.git
cd pasteit-app

cd Servers
npm install


PORT=5000
JWT_SECRET=your-secret-key

npm start
cd ../
npm install
npm run dev

| Method | Route                   | Description           |
| ------ | ----------------------- | --------------------- |
| GET    | `/api/paste/getall`     | Get all public pastes |
| GET    | `/api/paste/user/:id`   | Get pastes by user    |
| GET    | `/api/paste/popular`    | Get popular pastes    |
| GET    | `/api/paste/recent`     | Get recent pastes     |
| POST   | `/api/paste/new`        | Create new paste      |
| PUT    | `/api/paste/update/:id` | Update existing paste |
| DELETE | `/api/paste/delete/:id` | Delete your paste     |
