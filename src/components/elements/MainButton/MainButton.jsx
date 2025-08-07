import React from 'react'; // React core imports

// Styles
import './MainButtonStyle.css';

// Functional component that takes `text` and `onClick` props
const MainButton = ({ text, onClick }) => {
    return (
        <button type="button" className="main-button" onClick={onClick}>
            {text}  {/* Display the text passed via props */}
        </button>
    );
};

export default MainButton;
