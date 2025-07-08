# Complaint System

[![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/Abhishek-Jaiswar/complaints?utm_source=oss&utm_medium=github&utm_campaign=Abhishek-Jaiswar%2Fcomplaints&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)](https://coderabbit.ai)

A modern **Complaints System** built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **MongoDB** — providing users a smooth way to raise complaints and admins the tools to manage them efficiently.

---

## 🚀 Features

✅ User authentication (JWT, cookies, secure auth)  
✅ Role-based access (User & Admin)  
✅ Raise and manage complaints with priority & status  
✅ Admin dashboard for viewing, updating, and deleting complaints  
✅ Email notifications with **Resend** integration  
✅ Fully responsive design with clean UI  
✅ Deployed on **Vercel**

---

## 📂 Project Structure

```

├── app/
│   ├── api/                 # API Routes
│   ├── components/          # Reusable Components
│   ├── context/             # Auth Context
│   ├── docs/                # Implementation of features (e.g., RESEND)
│   ├── helpers/             # helper function (e.g., Verify token)
│   ├── lib/                 # Helpers (e.g., DB connection)
│   ├── models/              # Mongoose Models
│   ├── public/              # Public Assets
│   └── pages/               # Pages and Routes
├── middleware               # Middleware (e.g. authorization)
├── .env                     # Environment Variables
├── next.config.js           # Next.js Config
└── ...

```

---

## ⚙️ Tech Stack

- **Framework:** Next.js 15.3.5
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + Cookies
- **UI:** Tailwind CSS, shadcn/ui
- **Icons:** Lucide React
- **Emails:** Resend API
- **Deployment:** Vercel

---

## Documentation

- [Resend Email Integration](/docs/resend.md)
- [Database Connection](/docs/database.md)

## 📌 Getting Started

1️⃣ **Clone the repository**

```bash
git clone https://github.com/Abhishek-Jaiswar/complaints.git
cd complaints
```

2️⃣ **Install dependencies**

```bash
npm install
# or
yarn install
```

3️⃣ **Set up environment variables**

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
```

4️⃣ **Run the app locally**

```bash
npm run dev
# or
yarn dev
```

5️⃣ **Deploy**

Push to your GitHub and deploy to **[Vercel](https://vercel.com/)** — Vercel will auto-detect your Next.js project!


## 🧑‍💻 Author

- **Abhishek Jaiswar**
- [GitHub](https://github.com/Abhishek-Jaiswar)
---