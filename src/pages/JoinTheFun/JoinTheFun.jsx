import React, { useState, useEffect } from 'react'; // React core imports

// JSX Components
import TeaserNextEvent from '../TeaserNextEvent/TeaserNextEvent.jsx';
import DetailNextEvent from '../DetailNextEvent/DetailNextEvent.jsx';

// Utils
import { getTimeRemaining } from '../../utils/DateUtils.js';

// Styles
import './JoinTheFunStyle.css';

// Configs
import siteConfig from '../../config/SiteConfig.js';

// Event date loaded from config
const EVENT_DATE = siteConfig.nextEventDate;
// Optional admin override to force mode
const ADMIN_OVERRIDE = siteConfig.joinTheFunOverride;

// Helper function to determine display mode based on remaining time
function determineMode(timeRemaining) {
    if (timeRemaining <= 0) {
        // If time is up or past, show details
        return 'details';
    } else {
        // Otherwise show teaser countdown
        return 'teaser';
    }
}

// Helper function to determine the actual mode considering an admin override
function determineActualMode(adminOverride, defaultMode) {
    if (adminOverride !== null && adminOverride !== undefined) {
        // If override is set, use it no matter what
        return adminOverride;
    } else {
        // Else use calculated mode based on countdown
        return defaultMode;
    }
}

function JoinTheFun() {
    // Initialize countdown state with time remaining till event
    const initialRemaining = getTimeRemaining(EVENT_DATE);
    const [timeLeft, setTimeLeft] = useState(initialRemaining);

    // Initialize mode state based on whether event has passed or not
    const [mode, setMode] = useState(determineMode(initialRemaining.total));

    // useEffect runs once to start a timer updating every second
    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = getTimeRemaining(EVENT_DATE); // get fresh remaining time
            if (remaining.total <= 0) {
                // If countdown finished, switch mode to details and stop timer
                setMode('details');
                clearInterval(timer);
            } else {
                // Else update timeLeft state with current countdown
                setTimeLeft(remaining);
            }
        }, 1000); // update every second

        // Cleanup interval when component unmounts
        return () => clearInterval(timer);
    }, []);

    // Decide actual mode: either admin override or calculated mode
    const actualMode = determineActualMode(ADMIN_OVERRIDE, mode);

    // Render teaser or details component based on mode
    if (actualMode === 'teaser') {
        return (<TeaserNextEvent countDown={timeLeft} />);
    } else {
        return (<DetailNextEvent />);
    }
}

export default JoinTheFun;
