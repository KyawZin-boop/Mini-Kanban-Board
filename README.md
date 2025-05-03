# 📝 Mini Kanban Board

A clean and interactive Kanban-style task manager built with **React**, **TypeScript**, and **Tailwind CSS**. You can add, edit, delete, and move tasks between columns — with full drag-and-drop support and persistent data using localStorage.

---

## 🚀 Tech Stack

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chakra UI](https://chakra-ui.com/)
- [Zustand](https://github.com/pmndrs/zustand) (state management)
- [dnd-kit](https://github.com/clauderic/dnd-kit) (drag-and-drop)
- `localStorage` (for persistence)

---

## ✨ Features

✅ Add new task  
📝 Edit existing task  
❌ Delete task  
🔀 Drag-and-drop tasks across `To Do`, `In Progress`, and `Completed` columns  
💾 Data is persisted using `localStorage`

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/KyawZin-boop/Mini-Kanban-Board.git
cd mini-kanban-board

### 2. Install Dependencies

```bash
npm install

### 3.  Run Tailwind CLI

Tailwind CSS is configured to compile manually. Open a new terminal and run:

```bash
npx tailwindcss -i ./src/index.css -o ./src/main.css --watch

This will generate the main.css file and watch for changes.

### 4. Start Development Server

```bash
npm run dev

## Project Structure

Below is an abbreviated folder structure:

<pre>
src/
├── components/       # Reusable UI components (dialog, navbar, loader, etc.)
├── layouts/          # Default Layout
├── modules/          # Multiple Pages
├── store/            # Zustand store setup
├── App.tsx           # Main application component
├── index.css         # Tailwind CSS entry
├── main.css          # Output from Tailwind build
├── main.tsx          # App entry point
</pre>

For a complete view, please refer to the project root.

## 🧠 Notes

Zustand makes global state simple and boilerplate-free.
dnd-kit enables lightweight and customizable drag-and-drop behavior.
Chakra UI components complement Tailwind styling when needed.
Data is saved in localStorage, so it survives page reloads or browser restarts.
