# 📦 Uthao Parcel Delivery - Frontend

This is the frontend for the Uthao Parcel Delivery System, a secure, role-based, and user-friendly application built with React, Redux Toolkit, and Tailwind CSS.

**Live Site URL:** [https://your-frontend-deployment-link.com](https://your-frontend-deployment-link.com)  
**Backend API URL:** [https://uthao-parcel-del.vercel.app](https://uthao-parcel-del.vercel.app)

---

## 🚀 Project Overview

This project is a comprehensive frontend application that consumes the Uthao Parcel Delivery API. It provides a seamless and responsive user interface for three distinct user roles: **Admins**, **Senders**, and **Receivers**. The application features a public-facing website with service information and a secure, protected dashboard with tailored functionality for each authenticated user.

State management and API communication are handled robustly by Redux Toolkit and RTK Query, ensuring a predictable state container and efficient data fetching with automatic caching and UI updates.

---

## ✨ Features Implemented

### Public & Authentication
-   **Public Pages**: A beautiful landing page, an informative "About Us" page, and a functional (simulated) "Contact Us" form.
-   **User Registration**: A clean form for new users to register as either a `Sender` or `Receiver`.
-   **Secure Login**: JWT-based authentication with persisted state, so users remain logged in after a page refresh.
-   **Public Parcel Tracking**: A dedicated page for anyone to track a parcel's status using its unique tracking ID.

### Role-Based Dashboards
-   **Protected Routes**: All dashboard pages are protected and accessible only to authenticated users.
-   **Dynamic Navigation**: The dashboard sidebar menu changes automatically based on the logged-in user's role.
-   **Role-Based Redirection**: Users are automatically redirected to their specific dashboard overview upon login.

### Sender Dashboard
-   **Dashboard Overview**: View key statistics like total parcels sent, delivered, and in-transit, visualized with cards and charts.
-   **Create Parcel**: An intuitive form to create new parcel delivery requests.
-   **My Parcels**: A paginated table displaying all parcels created by the sender with their current status.

### Receiver Dashboard
-   **Dashboard Overview**: View statistics for incoming parcels.
-   **My Deliveries**: A paginated table of all parcels addressed to the receiver.
-   **Confirm Delivery**: Functionality to mark an `in-transit` parcel as `delivered`, completing the delivery cycle.

### Admin Dashboard
-   **Dashboard Overview**: A comprehensive view of all system-wide statistics.
-   **Manage Users**: A paginated table of all users in the system, with the ability to `block` and `unblock` any user.
-   **Manage All Parcels**: A paginated table displaying every parcel from all senders.

---

## 🛠️ Technology Stack

-   **Framework**: React (with Vite)
-   **Language**: TypeScript
-   **State Management**: Redux Toolkit & RTK Query
-   **Routing**: React Router DOM
-   **Styling**: Tailwind CSS
-   **Component Library**: daisyUI
-   **Data Visualization**: Recharts
-   **Notifications**: React Hot Toast

---

## ⚙️ Setup and Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites
-   Node.js (v18 or later)
-   npm or yarn

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://your-repo-link/uthao-frontend.git
    cd uthao-frontend
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env.local` file in the root of the project and add the URL of your running backend API:
    ```env
    VITE_API_URL=http://localhost:5000
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 🔑 Provided Credentials for Testing

You can use the following credentials to test the functionality for each role.

-   **Admin:**
    -   **Email:** `sidney@example.com`
    -   **Password:** `your_password`
-   **Sender:**
    -   **Email:** `testd@example.com`
    -   **Password:** `your_password`
-   **Receiver:**
    -   **Email:** `receiver1@example.com`
    -   **Password:** `your_password`



---