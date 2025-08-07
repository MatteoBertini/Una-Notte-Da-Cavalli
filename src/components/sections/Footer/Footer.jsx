import React, { forwardRef } from "react"; // React core imports
import { FaInstagram, FaSpotify } from "react-icons/fa"; // Instagram & Spotify icons

// Styles
import "./FooterStyle.css";

// Configs
import siteConfig from "../../../config/SiteConfig";

// Using forwardRef to allow parent components to attach a ref to the footer element
const Footer = forwardRef(({}, ref) => {
    return (
        // Main footer tag with class and forwarded ref
        <footer className="footer" ref={ref}>
            {/* Container for all footer sections, grid layout */}
            <div className="footer-container">

                {/* Brand section with name and description */}
                <div className="footer-section">
                    <h2 className="footer-brand">Una Notte da Cavalli</h2>
                    <p className="footer-description">
                        Un gruppo di amici che organizza feste epiche in discoteca: dove la notte non finisce mai e la musica non si ferma.
                    </p>
                </div>

                {/* Section showcasing brand motto and Spotify playlist link */}
                <div className="footer-section">
                    <h3 className="footer-heading">Le nostre Vibes</h3>
                    <p className="footer-description">
                        "Vivi selvaggio, balla forte, e rendi ogni notte indimenticabile."
                    </p>
                    {/* External link to Spotify playlist, opens in new tab safely */}
                    <a
                        href={siteConfig.spotifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link spotify-link"
                    >
                        {/* Spotify icon with styling */}
                        <FaSpotify className="footer-icon" />
                        La Nostra Playlist
                    </a>
                </div>

                {/* Main Instagram account with icon */}
                <div className="footer-section">
                    <h3 className="footer-heading">Seguici</h3>
                    <a
                        href={siteConfig.instaramLinkCavalli}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-social-link instagram-main"
                    >
                        <FaInstagram /> una_notte_da_cavalli
                    </a>
                </div>

                {/* Team Instagram profiles list */}
                <div className="footer-section">
                    <h3 className="footer-heading smaller-heading">Il Team</h3>
                    <ul className="footer-list personal-list">
                        {/* Each list item links to a team member's Instagram */}
                        <li>
                            <a
                                href={siteConfig.instagramLinkBerna}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link instagram-personal"
                            >
                                <FaInstagram /> dado.cecchiniii
                            </a>
                        </li>
                        <li>
                            <a
                                href={siteConfig.instagramLinkPete}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link instagram-personal"
                            >
                                <FaInstagram /> tognasc
                            </a>
                        </li>
                        <li>
                            <a
                                href={siteConfig.instagramLinkTommy}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link instagram-personal"
                            >
                                <FaInstagram /> tommy_.weiss
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom footer text with copyright */}
            <div className="footer-bottom">
                © 2025 Una Notte da Cavalli. Tutti i diritti riservati.
            </div>

            {/* Footer credits with link to developer's Instagram */}
            <div className="footer-credit">
                Sito realizzato da{" "}
                <a
                    href={siteConfig.instagramLinkBert}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-credit-link"
                >
                    Matteo Bertini
                </a>
            </div>
        </footer>
    );
});

export default Footer;
