# Nexura - Student Gig Platform

![Nexura Banner](./public/vite.svg) <!-- Replace with actual banner if available -->

Nexura is a hyper-local gig economy application tailored specifically for students. It connects local customers needing help with small tasks (yard work, cleaning, tech support, etc.) directly with students in their area. 

Instead of taking a large cut or charging a subscription, Nexura operates on a **Micro-Unlock Model**: students pay a tiny $2-$3 unlock fee only *after* they are specifically selected for a job, revealing the customer's contact details.

## 🚀 Key Features

*   **Role-Based Dashboards**: Distinct experiences for `Customers` (job posters) and `Students` (gig workers).
*   **Job Discovery & Matching**: Customers can post jobs within predefined Canadian price tiers (e.g., $15-$25, $25-$40). Students can browse local jobs and "Show Interest".
*   **Micro-Unlock Payment Flow**: Simulated gateway where selected students pay a small mock fee to unlock the customer's direct contact information.
*   **Public Profiles & Verification**: Detailed profiles showing location, college/university details, skills, and simulated ID-verified badges.
*   **Premium Glassmorphism UI**: Built with a custom Vanilla CSS design system featuring mesh gradients, glass cards, and smooth micro-animations.

## 🛠️ Technology Stack

*   **Frontend**: React.js (via Vite)
*   **Styling**: Vanilla CSS (Custom Glassmorphism Design System)
*   **Routing**: React Router DOM
*   **Icons**: Lucide React
*   **Database**: Simulated backend using `LocalStorage` (for MVP phase)

## 📦 Local Setup & Installation

To run this project locally on your machine:

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

4. **Open in browser:**
   Navigate to `http://localhost:5173` in your web browser.

## 💡 MVP Usage Guide

Since this MVP uses `LocalStorage` to mock a database, all data remains in your browser. Here is how to test the flow:

1. **Create a Customer Account**: Sign up as a Customer, fill in your details, and post a new job.
2. **Create a Student Account**: Log out, then sign up as a Student. Make sure to specify your College and Skills.
3. **Show Interest**: As the Student, browse the job feed and click "Show Interest" on the job you created in Step 1.
4. **Select Student**: Log back in as the Customer. View your posted job, review the student's profile, and click "Select & Hire".
5. **Unlock Details**: Log back in as the Student. Go to "My Applications" and click the prompt to pay the $2.99 fee. This will simulate a payment and reveal the Customer's contact info.

## 👨‍💻 Developed By

**Badusha PN**
