🔒 SecureVault Dashboard
Enterprise file explorer for law firms and banks. Navigate deeply nested folders instantly.
 
Live Demo: https://lambent-crepe-a81c7c.netlify.app

GitHub: https://github.com/iradukundanoella971-hash/AmaliTech-DEG-Project-based-challenges

Overview
High-performance file explorer that renders deeply nested folders (2–20+ levels) instantly. Built for legal and financial professionals.

Core Features
Feature	Description
Recursive Tree	Handles unlimited nested folders
Expand/Collapse	Click folders to show/hide contents
File Properties	Click any file → name, type, size
Keyboard Nav	↑ ↓ → ← Enter
Smart Search	Auto-expands folders to show matches
Password Vault	Secure folder requires 123
Why This Matters for SecureVault
SecureVault markets itself to law firms and banks. A password-protected vault is not just a "nice to have" - it's a requirement for their clients. This feature demonstrates:

Security awareness - Understanding client needs

Real-world applicability - Not just a mock project

Enterprise readiness - Can be extended to real authentication


Recursive Strategy
javascript
const flattenTree = (item, depth = 0) => {
  const items = [{ ...item, depth }];
  
  if (item.type === 'folder' && isExpanded && item.children) {
    for (const child of item.children) {
      items.push(...flattenTree(child, depth + 1));
    }
  }
  return items;
};
Each folder calls itself for children

depth controls indentation

Set() manages expand/collapse state

Search auto-expands matching folders

Wildcard Feature: Smart Search
Problem: Finding files in 5+ level folders takes too many clicks.

Solution: Search auto-expands parent folders to reveal matches instantly.

Value: Lawyers find documents in seconds, not minutes.

Bonus Feature: Password Vault
Secure Vault folder requires password 123 - demonstrates enterprise security.

Tech Stack
Category	Technology
Framework	React 18
Build Tool	Vite 5
Styling	Custom CSS
Libraries	None (built from scratch)
Setup
bash
git clone https://github.com/iradukundanoella971-hash/AmaliTech-DEG-Project-based-challenges.git
cd fullstack/secure-vault
npm install
npm run dev

Design System
Colors: #0A0E17, #00E5FF, #3B82F6

Typography: Inter + JetBrains Mono

Spacing: 8px grid

Keyboard Shortcuts
Key	Action
↑	Move up
↓	Move down
→	Expand folder
←	Collapse folder
Enter	Select file
Links
Live Demo	lambent-crepe-a81c7c.netlify.app
GitHub	iradukundanoella971-hash/AmaliTech-DEG-Project-based-challenges
MIT License | Built for SecureVault Inc. technical assessment




