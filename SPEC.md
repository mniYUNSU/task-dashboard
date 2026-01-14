# Frontend Task Management App – Specification

## 1. Project Overview

This project is a **frontend technical assignment** to build a  
**task management application with a dashboard**.

The goal of this assignment is to evaluate:

- Frontend architecture and structure
- State management and data handling
- UI/UX implementation quality
- TypeScript usage and code readability

❗ Backend implementation is **NOT required** for this assignment.

---

## 2. Scope & Constraints

### In Scope

- Frontend-only implementation
- Task CRUD (Create / Read / Update / Delete)
- Dashboard with aggregated task data
- Filtering and searching tasks
- Local execution (required)
- Deployment (optional, bonus)

### Out of Scope

- Backend server or API
- Database setup
- Authentication / authorization
- Real-time sync or multi-user features

---

## 3. Tech Stack (Fixed)

The following stack is fixed and should not be changed:

- Framework: **Next.js (App Router)**
- Language: **TypeScript**
- Styling: **Tailwind CSS**
- UI Components: **shadcn/ui**
- Data Persistence: **Web Browser Storage (localStorage)**

### Library Usage Rules

- Do not introduce unnecessary libraries.
- If a new library is added, clearly explain the reason.
- Prefer native React / Next.js features first.

---

## 4. Required Screens & Features

### 4.1 Dashboard (`/`)

The dashboard is the top page and must display:

- **Completion rate**
  - Percentage of completed tasks
- **Task count by category**
  - e.g. Work / Personal / Study
- **Incomplete task count by priority**
  - Priority: High / Medium / Low

The dashboard should be derived from task data and updated automatically.

---

### 4.2 Task Management (`/tasks`)

This screen is responsible for managing tasks.

Required features:

- Create a new task
- Edit an existing task
- Delete a task
- Set task priority (High / Medium / Low)
- Set task category
- Toggle task completion status

---

### 4.3 Task List (`/list`)

This screen displays tasks in a list format.

Required features:

- Filter tasks by category
- Filter tasks by completion status (All / Completed / Incomplete)
- Search tasks by task title
- Filters and search must work together

---

## 5. Data Model (Guideline)

A task must include the following fields:

- `id`: string
- `title`: string
- `category`: string
- `priority`: "high" | "medium" | "low"
- `isCompleted`: boolean
- `createdAt`: timestamp
- `updatedAt`: timestamp

### Category Handling

- Provide default categories (e.g. Work / Personal / Study)
- Categories should be extensible without changing the core structure

---

## 6. Architecture Principles

The following architectural principles must be respected:

- Separate concerns clearly:
  - UI components
  - Domain logic (calculations, filters)
  - Storage access
- Dashboard calculations must be implemented as **pure functions**
- localStorage access must be **client-only** and SSR-safe
- State changes must automatically synchronize with storage
- Avoid over-engineering

---

## 7. UX & UI Guidelines

- Use shadcn/ui components consistently
- Provide clear empty states (no tasks, no results)
- Basic validation with user-friendly messages
- Keep interactions simple and intuitive
- Maintain consistent spacing, typography, and layout

---

## 8. Bonus Features (Optional)

The following features are optional and count as bonus points:

- Dark mode
- Task sorting (by date, priority, status)
- Priority badges with visual distinction
- Simple due date support
- UX polish (toast messages, confirmation dialogs)

⚠ Bonus features must not complicate the core architecture.

---

## 9. Development Rules for Codex

When using Codex:

- Always follow this `spec.md`
- Implement features step by step
- Avoid implementing features not described here
- Summarize changed files after each step
- Keep code readable and maintainable

---

## 10. Final Goal

The final result should be:

- A locally runnable frontend application
- All required features fully implemented
- Clean structure and clear design decisions
- Ready for evaluation without backend dependencies
