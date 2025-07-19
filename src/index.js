import React from 'react'; // React core imports
import ReactDOM from 'react-dom/client'; // Handles ReactDOM creation
import { HashRouter } from 'react-router-dom'; // Router that uses URL hashes (#) for navigation

// JSX components
import AppRoutes from './routes/AppRoutes.jsx';


// Create a React root inside the HTML element with id="root" from index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the entire React app inside a <HashRouter>
// HashRouter is used instead of BrowserRouter because it's compatible with GitHub Pages
// It handles client-side routing using the hash portion of the URL (e.g., #/page)
root.render(
    <HashRouter>
        <AppRoutes />
    </HashRouter>
);