import React, { useRef } from 'react'; // React core imports

// JSX elements
import TextBox from '../../elements/TextBox/TextBox.jsx';
import useIsMobile from '../../../hooks/useIsMobile.js';

// Hooks
import useScrollY from '../../../hooks/useScrollY.js';
import useScrollZone from '../../../hooks/useScrollZone.js';

// Utils
import { clamp } from '../../../utils/InterpolationUtils.js';

// Styles
import './TextBoxSectionStyle.css';


function TextBoxSection() {
    // Check if we're on a mobile device
    const isMobile = useIsMobile();

    // Create a reference to the section DOM element
    const sectionRef = useRef(null);

    // Get the current scroll Y value
    const scrollY = useScrollY();

    // Define the scroll zone boundaries where this section animates
    // startOffset shifts the start point downward by 50% of section height
    // extraStart and extraEnd give pixel-based control for fine-tuning
    const [zoneStart, zoneEnd] = useScrollZone(sectionRef, {
        startOffset: 0.5,
        extraStart: -300,
        endMultiplier: 0.05,
        extraEnd: -250,
    });

    // Calculate raw animation progress based on scroll position
    const progressRaw = (scrollY - zoneStart) / (zoneEnd - zoneStart);

    // Clamp progress between 0 and 1 to avoid over/under-animation
    const progress = clamp(progressRaw, 0, 1);

    return (
        // Section element with reference attached
        <section className="TextBoxSection" ref={sectionRef}>
            <div className="text-box-row">
                <TextBox
                    id="boxA"
                    title="Cosa facciamo"
                    content={`Noi non organizziamo feste, creiamo ricordi.\nTu porti la crew, noi portiamo tutto il resto: musica, location, energia.\nÈ semplice: tu ti diverti, noi ci occupiamo del come.`}
                    progress={progress}     // Pass scroll progress to animate
                    side="left"             // Text alignment or animation side
                />
                <TextBox
                    id="boxB"
                    title="Chi siamo"
                    content={`Nati tra aule e after, portiamo la vita notturna direttamente nel mondo liceale.\nAbbiamo iniziato tutto per un motivo semplice: far divertire gli studenti come si deve.`}
                    progress={progress}                 // Pass scroll progress to animate
                    side={isMobile ? 'right' : 'left'}  // Responsive side adjustment
                />
            </div>
        </section>
    );
}

export default TextBoxSection;
