# Shelf Picks

A fullstack book tracking web app. Search for books, add them to your personal shelf, rate them, and write reviews.

**Live site:** https://cmpe-131-term-project-production.up.railway.app/

---

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Redux Toolkit, React Router
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (Neon) via Prisma ORM
- **API:** Open Library

---

## Local Setup

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) account (free) for the database

### 1. Clone the repo

```bash
git clone https://github.com/your-username/CMPE-131-Term-Project.git
cd CMPE-131-Term-Project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```
DATABASE_URL=your_neon_connection_string
JWT_SECRET=any_random_secret_string
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 4. Set up the database

```bash
npx prisma db push
npx prisma generate
```

### 5. Run the app

Open two terminals:

```bash
# Terminal 1 — frontend
npm run dev

# Terminal 2 — backend
npm run server
```

The app will be available at `http://localhost:5173`.

---

## Features

- Search books via Open Library
- Register / log in with JWT cookie auth
- Add books to your personal shelf
- Set reading status (Want to Read, Reading, Completed, Dropped)
- Rate books 1–5 stars and write a review
- View your full shelf with status filters
- 3D book card hover effects

---

## Issues

If you run into any problems, please message **Kiernan Joyce** on Canvas.
