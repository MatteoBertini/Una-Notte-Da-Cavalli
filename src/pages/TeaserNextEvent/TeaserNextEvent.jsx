import React from 'react'; // React core imports
import { useNavigate } from 'react-router-dom'; // Allow to navigate to another page

// JSX components
import MainButton from '../../components/elements/MainButton/MainButton.jsx';

// Assets
import ConstructionCavalli2 from '../../assets/ConstructionCavalli2.png';

// Styles
import './TeaserNextEventStyle.css';

// Functional component receiving countdown object as prop
function TeaserNextEvent({ countDown }) {
    const navigate = useNavigate(); // Get navigate function from react-router-dom

    // Handler function to navigate back to home page on button click
    const handleBack = () => {
        navigate('/'); // Redirect to root URL (home)
    };

    // JSX structure for teaser event view
    return (
        <div className="teaser-mode">
            {/* Event preview banner image */}
            <img
                src={ConstructionCavalli2}
                alt="Anteprima evento"
                className="teaser-banner-raw"
            />

            {/* Main heading announcing upcoming event */}
            <h1>Prossimo evento in costruzione...</h1>

            {/* Countdown display showing days, hours, minutes, seconds */}
            <div className="countdown-raw">
                <span> {countDown.days}g</span>
                <span> {countDown.hours}h</span>
                <span> {countDown.minutes}m</span>
                <span> {countDown.seconds}s</span>
            </div>

            {/* Supporting teaser text */}
            <p className="teaser-text">
                Segna la data. Sta per succedere qualcosa di grande.
            </p>

            {/* Button component to return to home, triggers handleBack on click */}
            <MainButton text={"Torna alla home"} onClick={handleBack} />
        </div>
    );
}

export default TeaserNextEvent;