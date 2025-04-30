# Note Flip Flow 📝

A visually engaging, responsive note-taking application built with **React**, **Context API**, **Tailwind CSS**, and **shadcn/ui**. It features beautiful 3D animations, local storage persistence, and modern UI/UX patterns—all without a backend.

## 🚀 Core Features

### 📝 Note Creation and Storage
- Create notes with a **title** and **content**.
- Stored in **localStorage** for persistence between sessions.
- Each note has a **unique ID**, **timestamp**, and **random color** from a predefined pastel palette.

### 📋 Note Visualization
- Responsive **grid layout**: 1 column on mobile, up to 3 columns on larger screens.
- Notes show **creation time** in human-readable format (e.g., _“2 hours ago”_).
- Visually distinct with **soft pastel backgrounds**.

### ✨ Animated UI Transitions
- **3D flip animation** between Add and View modes using CSS perspective/transform.
- Notes appear with **staggered slide-up animation**.
- Smooth **hover effects** on buttons and cards.

### 🧠 Data Management
- Global state handled using **React Context API**.
- `Toast` notifications for user actions (e.g., note creation, deletion).
- “**Clear All**” function with **confirmation dialog**.

---

## ⚙️ Technical Implementation

### 🔄 State Management
- `NoteContext.tsx` provides note state and CRUD methods.
- `useNotes` custom hook simplifies context access.
- `useEffect` ensures **localStorage sync** on every update.
- Graceful fallback for parsing errors.

### 🧩 Component Structure

#### 📖 FlipBook Component
- Main container managing **Add/View mode**.
- CSS **3D perspective and transform** for flip effect.

#### ➕ AddNoteForm
- Form with **controlled inputs** and validation.
- Uses **shadcn/ui** for consistent and accessible styling.

#### 🗂 NotesList
- **Responsive grid** of animated cards.
- **Note deletion** with confirmation.
- Handles **empty states** gracefully.

---

## 🎨 Animation Details

- Flip animations with custom keyframes:
  - `animate-flip-in`, `animate-flip-out`
  - Maintains 3D perspective via `preserve-3d`
- Staggered entrance for note cards:
  ```css
  animation-delay: ${index * 0.05}s;
