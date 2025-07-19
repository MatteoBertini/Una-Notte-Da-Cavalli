import React from 'react'; // React core imports
import { useNavigate } from 'react-router-dom'; // Allow to navigate to another page

// JSX components
import MainButton from '../../components/elements/MainButton/MainButton.jsx';

// Styles
import './DetailNextEventStyle.css';

// Configs
import siteConfig from '../../config/SiteConfig.js';

// Functional component for detailed next event page
function DetailNextEvent() {
    const navigate = useNavigate(); // Hook for navigation

    // Handler to navigate back to home page
    const handleBack = () => {
        navigate('/'); // Redirect user to homepage
    };

    // Handler to redirect user to Instagram page for ticket buying
    const handleBuyTicket = () => {
        window.location.href = siteConfig.instaramLinkCavalli;
    };

    // Handler to redirect user to Instagram page for VIP table requests
    const handleVIPTable = () => {
        window.location.href = siteConfig.instaramLinkCavalli;
    };

    return (
        <div className="details-container">
            {/* Wrapper for the event poster image */}
            <div className="image-wrapper">
                <img src={siteConfig.nextEventPoster} alt="Locandina Evento" className="event-poster" />
            </div>

            {/* Container for all event details and info */}
            <div className="event-info">
                <h1>Una Notte Da Cavalli</h1>

                {/* Section with key event details */}
                <div className="event-details">
                    <div><strong> Data:</strong> {siteConfig.nextEventDataString}</div>
                    <div><strong> Luogo:</strong> {siteConfig.nextEventLocation}</div>
                    <div><strong> Costo:</strong> {siteConfig.nextEventCost}</div>
                    <div><strong> Apertura porte:</strong> {siteConfig.nextEventOpeningHour}</div>
                </div>

                {/* Event description paragraph */}
                <p className="event-description">
                    Preparati per una notte indimenticabile di musica, luci e ricordi selvaggi.
                    DJ set, zone VIP, sorprese
                </p>

                {/* Button to buy tickets */}
                <div className="button-section">
                    <MainButton text="Prevendite in DM" onClick={handleBuyTicket} />
                </div>

                {/* VIP Table section with info and button */}
                <div className="vip-section">
                    <h2> Tavoli e Bottiglie VIP</h2>
                    <p>
                        Prenota la tua area privata e goditi un servizio premium per tutta la notte.
                        Tavoli limitati, prenota ora prima che finiscano.
                    </p>
                    <div className="button-section">
                        <MainButton text="Richiedi Tavolo VIP in DM" onClick={handleVIPTable} />
                    </div>
                </div>

                {/* Special guest section with a list of performers */}
                <div className="guest-section">
                    <h2> Ospiti Speciali</h2>
                    <ul className="guest-list">
                        {siteConfig.nextEventGuests.map((guest, index) => (
                            <li key={index}>
                                <strong>{guest.name}</strong> {guest.description}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Back button to return to homepage */}
                <div className="back-button-wrapper">
                    <MainButton text="Torna alla home" onClick={handleBack} />
                </div>
            </div>
        </div>
    );
}

export default DetailNextEvent; // Export component for use elsewhere
