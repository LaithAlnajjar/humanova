# Humanova 🌍

**Volunteering. Training. Accessibility.**

Humanova is a unified ecosystem connecting students, volunteers, charities, companies, and universities. It features specialized workflows for **Students with Disabilities (POD)**, ensuring accessibility is at the core of the experience.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)

### Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/your-org/humanova.git](https://github.com/your-org/humanova.git)
    cd humanova
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```
    The app will run at `http://localhost:5173`.

### 🧪 Running Tests

Humanova uses **Vitest** for unit testing.

````bash
npm test
🏗 Project Structure
The project follows a modular, role-based architecture:

src/
├── components/       # UI Components
│   ├── ui/           # Reusable atoms (Buttons, Inputs, Cards)
│   ├── layout/       # Navbar, Sidebar, Footers
│   └── [role]/       # Domain-specific components (e.g., /charity, /pod)
├── pages/            # Route Pages
│   ├── Dashboard/    # Role-specific dashboards
│   └── [Feature]/    # Feature-specific pages (e.g., /Opportunities)
├── services/         # API Layer (Currently using Mock Data)
├── context/          # Global State (Auth, Theme, Lang)
├── types/            # TypeScript Interfaces
└── hooks/            # Custom React Hooks
🛠 Tech Stack
Framework: React 18 + Vite

Language: TypeScript

Styling: Tailwind CSS (Custom "Humanova" Design Tokens)

State Management: React Context + TanStack Query (React Query)

Routing: React Router DOM v6

Animations: Framer Motion

Internationalization: i18next (English & Arabic support)


---

### **2. SYSTEM_ARCHITECTURE.md**

This document outlines the technical design, data flow, and architectural decisions.

```markdown
# Humanova System Architecture

## 1. Architectural Overview
Humanova is designed as a **Single Page Application (SPA)** using a **Client-Side Rendering (CSR)** strategy. It currently operates in a "Mock Mode" where the service layer simulates backend latency and database operations, making it ready for rapid prototyping before backend integration.

### Core Design Principles
* **Role-Based Access Control (RBAC):** The frontend strictly segregates dashboards and features based on the user role (`student`, `volunteer`, `charity`, `company`, `university`, `disabled_student`).
* **Service-Repository Pattern:** UI components never access data directly. They utilize custom hooks (e.g., `useQuery`), which call `services/*.ts`, acting as an abstraction layer over the API.
* **Atomic Design System:** A shared library of glassmorphism-styled UI components (`src/components/ui`) ensures visual consistency.

## 2. Data Flow Architecture

### Read Operations (Query)
1.  **Page Load:** Component mounts (e.g., `StudentDashboard`).
2.  **Hook Trigger:** `useQuery` (TanStack Query) fires.
3.  **Service Call:** `studentService.getStudentProfile()` is invoked.
4.  **Abstraction:** The service creates a Promise, simulates network delay, and returns typed Mock Data.
5.  **Render:** Component receives data and renders the UI.

### Write Operations (Mutation)
1.  **User Action:** User submits a form (e.g., `TrackingPage`).
2.  **Hook Trigger:** `useMutation` fires.
3.  **Optimistic/Pessimistic Update:** The service updates the in-memory mock database.
4.  **Invalidation:** `queryClient.invalidateQueries` is called to refetch fresh data immediately.

## 3. Technology Standards

### Frontend Stack
| Component | Technology | Reasoning |
| :--- | :--- | :--- |
| **Build Tool** | **Vite** | Fast HMR and optimized production builds. |
| **State (Server)** | **TanStack Query** | Handles caching, loading states, and deduplication of requests. |
| **State (Global)** | **React Context** | Used strictly for low-frequency updates: Auth, Theme, Language. |
| **Styling** | **Tailwind CSS** | Utility-first styling with a centralized `DesignTokens.md` configuration. |

### Future Backend Integration Strategy
The `src/services` folder is the **Anti-Corruption Layer**. To connect a real backend:
1.  Replace mock return statements in `services/*.ts` with `axios.get/post`.
2.  Configure `VITE_API_BASE_URL` in `.env`.
3.  No changes will be required in the UI components.

````
