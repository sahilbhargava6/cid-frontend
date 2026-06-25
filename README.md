# Consider It Done (CID) Frontend

A premium, modern web portal for **Consider It Done** (CID), featuring a sleek glassmorphic design and modular widget dashboards. Built on Next.js 16 (App Router), React 19, Tailwind CSS v4, and TypeScript, it connects seamlessly with the CID Laravel backend API.

---

## 🎨 Design & Aesthetic Features

- **Glassmorphism Layout**: Translucent panel styling, blur-behind backdrops, and subtle border highlights.
- **Dynamic Theme Customization**: Custom color palette, elegant typography (Outfit/Inter), and micro-animations on interactive cards.
- **Responsive Navigation**: Smooth mobile sidebar drawers, responsive top bars, and adaptive widget layouts.
- **Client & Admin Dashboards**:
  - **Client Dashboard**: Beautiful card grid showing services, requests, document statuses, and active projects in a glass container.
  - **Admin Dashboard**: Consolidated requests review, statistics cards overview (bookings, files, active users), and simple management panels.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State & HTTP**: [Axios](https://github.com/axios/axios) with Context API (Auth & Theme)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (v18.x or later) installed.

### Installation

1. Install package dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

3. Run the Next.js development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Admin Layout and Dashboard pages
│   ├── dashboard/        # Client Dashboard page
│   ├── login/            # Authentication Portal
│   ├── globals.css       # Core design styles and custom glassmorphism styles
│   └── layout.tsx        # Application root layout with Context Providers
├── components/           # Reusable UI & Layout Components
│   └── dashboard/        # Sidebar, Topbar, Overlay, and DashboardLayout shell
├── context/              # React Context Providers (AuthContext, ThemeContext)
├── lib/                  # Library configurations (Axios client)
└── services/             # API services for bookings, documents, etc.
```

---

## ⚙️ Backend Integration

This frontend is designed to work with the **CID Laravel Backend** API. Ensure your backend server is active:
```bash
php artisan serve
```
Make sure the ports match your configuration (default: port `8000`).
