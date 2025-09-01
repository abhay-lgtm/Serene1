import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
/*
The favicon.ico file is typically placed in the public directory of your project, such as:
- public/favicon.ico
or
- src/assets/favicon.ico (if your build tool copies it to the output)

To use it, ensure your index.html (usually in the public folder) includes:
<link rel="icon" href="/favicon.ico" />

This is not set in main.tsx, but in your HTML template.
*/