# 📊 CiviDataset Explorer Dashboard

A responsive data explorer built using **Next.js, React, and TypeScript**, featuring dynamic filters, search, pagination, and multiple view modes.

---

## 🚀 Tech Stack & Tools Used

### 🧩 Frontend

* **Next.js (App Router)**
* **React.js**
* **TypeScript**
* **Tailwind CSS**

### 🎨 UI & Icons

* **Lucide React** (for icons)
* Custom **SVG assets** (stored in `/public`)

### ⚙️ State & Logic

* React Hooks (`useState`, `useEffect`)
* Custom Hooks (`useDatasets` for API handling)

### 🌐 API Handling

* Dynamic API integration
* Filter-based query building
* Pagination support

---

## ✨ Features

* 🔍 **Search Functionality**
* 🧭 **Dynamic Filters (Checkboxes)**

  * Built from API aggregations
* 📊 **Grid & List View Toggle**
* 📄 **Pagination (Fully Functional)**
* 🎯 **Sorting (Latest / Alphabetical)**
* 📱 **Fully Responsive Design**
* 🧩 **Reusable Components**
* ⚡ **Optimized API Calls via Custom Hooks**

---

## 📁 Project Structure

```
/components
  ├── Header.tsx
  ├── Sidebar.tsx
  ├── DataGrid.tsx
  ├── DataCard.tsx
  ├── DataListItem.tsx

/hooks
  ├── useDatasets.ts   // API logic

/public
  ├── icons/           // Custom SVG icons

/pages or /app
  ├── page.tsx         // Main page
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 🔹 2. Install Dependencies

```bash
npm install
```

---

### 🔹 3. Add Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_endpoint_here
```
not in use right now

---

### 🔹 4. Run Development Server

```bash
npm run dev
```

App will run on:
👉 http://localhost:3000

---

### 🔹 5. Build for Production

```bash
npm run build
npm start
```

---

## 🔗 API Integration

* Data is fetched using a custom hook: `useDatasets`
* Supports:

  * Search query
  * Filters (sectors, tags, formats, etc.)
  * Pagination (page + size)
  * Sorting

---

## 🧠 Key Implementations

### ✅ Dynamic Checkboxes

* Built using API `aggregations`
* Auto-updates UI based on backend data

### ✅ Pagination

* Fully functional with page navigation
* Controlled via API params

### ✅ View Toggle

* Grid & List layouts using same dataset

### ✅ Custom Hook

```ts
useDatasets({ query, page, size, sort, filters })
```

---

## 📦 Icons & Assets

* **Lucide React** used for all UI icons
* Custom SVGs stored in `/public/icons`

---

## 📱 Responsiveness

* Mobile-first design
* Sidebar stacks on small screens
* Grid adapts using Tailwind breakpoints

---

## 🚀 Deployment

Recommended platforms:

* **Vercel (Best for Next.js)**
* Netlify (with plugin support)

---

## 👨‍💻 Author

Developed using modern frontend best practices with focus on:

* Scalability
* Reusability
* Clean UI/UX

---

## 📌 Notes

* Fully dynamic UI driven by API
* Easily extendable for advanced filtering
* Optimized for performance and usability
