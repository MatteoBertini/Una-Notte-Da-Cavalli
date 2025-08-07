import React from 'react'; // React core imports
import { Routes, Route } from 'react-router-dom'; // Route components

// JSX Components
import App from '../App.jsx';
import JoinTheFun from '../pages/JoinTheFun/JoinTheFun.jsx';
import TopScrollRouting from './TopScrollRouting.jsx';

function AppRoutes() {
    return (
        <>
            {/* Automatically scroll to top when changing pages */}
            <TopScrollRouting />
                {/* React Router handles client-side navigation between components */}
                <Routes>
                    {/* Home route: renders App, which wraps DesktopHome */}
                    <Route path="/" element={<App />} />
                    {/* JoinTheFun page route */}
                    <Route path="/JoinTheFun" element={<JoinTheFun />} />
                </Routes>
        </>
  );
}

export default AppRoutes;