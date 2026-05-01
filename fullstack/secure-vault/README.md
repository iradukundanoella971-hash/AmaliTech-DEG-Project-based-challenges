🔒 SecureVault Dashboard


 Overview
SecureVault Dashboard is a high-performance file explorer built for enterprise cloud security platforms serving law firms and banks. The application renders deeply nested folder structures (2 to 20+ levels) without performance degradation, providing instant access to case files, contracts, audit reports, and encrypted vaults.

Business Value: Legal professionals and financial auditors can locate documents in seconds rather than clicking through dozens of folders, thanks to intelligent search that auto-expands parent directories.

🎨 Design System
The UI follows a cyber-secure dark mode aesthetic designed to evoke trust, precision, and speed.

Design Element	Specification
Primary Colors	#0A0E17 (bg), #111827 (surface), #1F2937 (tertiary)
Accent Colors	Cyan #00E5FF, Blue #1E88E5, Purple #9C27B0
Typography	Inter (sans-serif), JetBrains Mono (monospace)
Font Scale	11px → 20px (8-step scale)
Spacing Grid	8px base unit
Component States	Default, Hover, Active, Focus, Selected
Figma Reference: View Design System (Dark mode, component variants, spacing grid)

Tech Stack

Category	Technology
Framework	React 18
Build Tool	Vite 5
Styling	Custom CSS (CSS Variables)
State Management	React Hooks (useState, useEffect)
Icons	Emoji-based (no external icon libraries)
Component Libraries	 None – all components built from scratch
Why no component libraries? To maintain complete control over performance, accessibility, and visual design. Every component—FileExplorer, PropertiesPanel, PasswordModal—is custom-built.

 Core Features

 Recursive File Explorer
Handles unlimited nested folders (2 to 20+ levels tested)

Each folder displays item count and dynamic icons

Expand/collapse with smooth state updates

 File Selection & Properties Panel

Click any file to view metadata in right sidebar

Displays: File name, type, size, security level (AES-256)

Visual highlight on selected file

 Smart Search with Auto-Expand

Real-time filtering of files and folders

Auto-expands parent folders to reveal matching files

No results state with friendly messaging

 Password-Protected Vault

Secure Vault folder requires authentication

Password: 123 (demo mode)

Modal dialog with cyber-security styling

 Full Keyboard Accessibility
↑ / ↓ – Navigate between items

→ – Expand current folder

← – Collapse current folder

Enter – Select file or toggle folder

 Recursive Strategy

The FileExplorer component uses a recursive flattening pattern to render deeply nested folder structures.

How It Works
javascript
const flattenTree = (item, depth = 0, parentPath = '') => {
  const items = [];
  const currentPath = parentPath ? `${parentPath}/${item.name}` : item.name;
  
  // Process current item
  items.push({ ...item, depth, path: currentPath, isExpanded });
  
  // RECURSION: Call itself for children
  if (item.type === 'folder' && isExpanded && item.children) {
    for (const child of item.children) {
      items.push(...flattenTree(child, depth + 1, currentPath));
    }
  }
  
  return items;
};
Key Decisions
Challenge	Solution
Infinite nesting	Recursive function calls itself for each child folder
Indentation	paddingLeft: ${depth * 20}px creates visual hierarchy
Expand/collapse state	Set data structure stores expanded folder names
Performance	Flattening happens only when expansion state changes
Search integration	Recursion checks child folders for matches before expanding
State Management
javascript
const [expandedFolders, setExpandedFolders] = useState(new Set());

const toggleFolder = (folder) => {
  const newExpanded = new Set(expandedFolders);
  if (newExpanded.has(folder.name)) {
    newExpanded.delete(folder.name);  // Collapse
  } else {
    newExpanded.add(folder.name);      // Expand
  }
  setExpandedFolders(newExpanded);
};
 Wildcard Feature: Smart Search with Auto-Expand

The Gap Identified: Traditional file explorers require users to manually click through multiple folder levels to find files, even when they know the file name. This is inefficient for legal and financial sectors where folders are often nested 5–10 levels deep.

The Solution: The search bar not only filters results but also automatically expands all parent folders containing matching files.

javascript
 Auto-expand logic during recursive traversal
const hasMatchingChild = (node) => {
  if (node.name.toLowerCase().includes(searchQuery)) return true;
  if (node.children) {
    return node.children.some(child => hasMatchingChild(child));
  }
  return false;
};

if (searchQuery && (matchesSearch || hasMatchingChild(item))) {
  isExpanded = true; 
}
Business Value: Lawyers and auditors find documents in seconds rather than minutes, reducing frustration and improving productivity.

 Bonus Feature: Password-Protected Vault
Why this matters: SecureVault serves law firms and banks that handle sensitive client data. The Password-Protected Vault demonstrates enterprise-grade security awareness.

Implementation:

The "Secure Vault" folder requires password 123 to access

Custom modal dialog with blur backdrop

Unlocked state persists for the session

javascript
const handleFolderAccess = (folder) => {
  if (folder.name === 'Secure Vault' && !unlockedVault) {
    setIsPasswordModalOpen(true);
    return false;
  }
  return true;
};
Keyboard Accessibility

Key	Action	Use Case
↑	Move focus up	Navigate through files
↓	Move focus down	Navigate through files
→	Expand folder	Drill down into nested structure
←	Collapse folder	Go back to parent level
Enter	Select file	Open/view file properties
Focus management: Uses useImperativeHandle to expose navigation methods, with scrollIntoView for automatic scrolling.

 Setup & Installation
Prerequisites
Node.js 18+ (v20.19+ recommended)

npm or yarn

Installation Steps
bash
# Clone the repository
git clone https://github.com/iradukundanoella971-hash/AmaliTech-DEG-Project-based-challenges/tree/main/fullstack/secure-vault

# Navigate to project directory
cd securevault-explorer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
The app will be available at: http://localhost:5174

📁 Project Structure
text
securevault/
├── src/
│   ├── components/
│   │   ├── FileExplorer.jsx      
│   │   ├── FileItem.jsx          
│   │   ├── Sidebar.jsx           
│   │   ├── PropertiesPanel.jsx   
│   │   ├── PasswordModal.jsx     
│   │   └── DashboardStats.jsx    
│   ├── styles/
│   │   └── design-system.css     
│   ├── data/
│   │   └── data.json             
│   ├── App.jsx                   
│   └── main.jsx                
├── public/
├── index.html
├── package.json
└── README.md
Design Decisions
Dark Mode as Default
Law firms and banks operate after hours; dark mode reduces eye strain

Cyan/blue accents convey trust and security

Matches "cyber-secure" brand identity

No External Component Libraries
Complete control over accessibility (ARIA attributes, focus management)

Smaller bundle size → faster load times

Easier debugging and customization

Recursive Flattening vs. Nested Rendering
Chosen: Flatten then render

Reason: Simplifies keyboard navigation (linear index)

Trade-off: Requires rebuilding list when expansion changes

Mitigation: useEffect dependencies optimized with Set

CSS Variables for Theming
Enables easy dark mode maintenance

Centralized design system (colors, spacing, typography)

Consistent 8px grid throughout


