# Nexura

![Nexura Banner](./public/vite.svg) <!-- Replace with actual banner if available -->

Nexura is a modern, hyper-local gig economy web application. Built as a proof-of-concept MVP, it demonstrates a complete end-to-end flow for connecting local individuals needing help with specific tasks (yard work, tech support, etc.) to skilled students in their area.

This project showcases the ability to rapidly prototype complex, role-based workflows and build premium user interfaces from scratch without relying on heavy frontend UI libraries like Tailwind or Material UI.

## 🚀 Technical Highlights

*   **Custom Design System**: Built entirely with Vanilla CSS, featuring a deeply integrated glassmorphism aesthetic, mesh gradients, and smooth micro-animations.
*   **Role-Based Architecture**: Implements distinct, protected routing and dashboard experiences for two distinct user types (`Customer` and `Student`) using a centralized Context API.
*   **State Management & Persistence**: Utilizes a custom storage service wrapper around `LocalStorage` to simulate a fully functional backend database, handling complex relationships between Users, Jobs, and Applications.
*   **Dynamic Data Relationships**: Successfully mocks relational data handling on the client-side, allowing customers to view interested students, and students to view detailed customer profiles before engaging.

## 🛠️ Technology Stack

*   **Frontend Framework**: React.js 18 (Bootstrapped with Vite)
*   **Routing**: React Router DOM v6
*   **Styling**: Pure CSS3 (CSS Variables, Flexbox/Grid, Backdrop Filters)
*   **Icons**: Lucide React
*   **Data Layer**: Simulated REST-like service via LocalStorage API

## 📁 System Architecture

*   `src/context/AuthContext.jsx`: Global state container managing the simulated session tokens and user identity.
*   `src/services/storage.js`: The mock data layer. Abstracts all `localStorage` interactions into clean, reusable CRUD functions.
*   `src/pages/`: Contains the isolated view components (Dashboards, Auth Flow, Profile Viewer).
*   `src/index.css`: The foundational design token file driving the application's unique visual identity.

## 📦 Local Setup & Installation

To run this project locally on your machine and explore the code:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BadushaPN/Nexura.git
   cd Nexura
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Explore the App:**
   Navigate to `http://localhost:5173` in your web browser. 

*Note: Since the backend is simulated via the browser's LocalStorage, you can test the entire platform flow—from creating an account to matching a gig worker with a job poster—entirely on your local machine with zero external dependencies.*

## 👨‍💻 Developed By

**Badusha PN**
