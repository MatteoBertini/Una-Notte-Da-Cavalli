// Assets
import CarouselCavalli5 from "../assets/CarouselCavalli5.png";
import CarouselCavalli6 from "../assets/CarouselCavalli6.png";
import CarouselCavalli1 from "../assets/CarouselCavalli1.png";
import CarouselCavalli7 from "../assets/CarouselCavalli7.png";
import CarouselCavalli8 from "../assets/CarouselCavalli8.png";

const siteConfig = {

    nextEventDate: new Date("2025-08-15T20:00:00"),
    joinTheFunOverride: 'detail', // 'teaser' | 'details' | null

    nextEventPoster: CarouselCavalli1,
    nextEventDataString:"30 Luglio 2025",
    nextEventLocation:"Casa Bernards, Milano",
    nextEventCost:"€25 standard / €60 VIP",
    nextEventOpeningHour:"21:00",
    nextEventGuests:[
        { name: "DJ Cavallo Nero", description: "Deep Tech / Resident Milano"},
        { name: "MC Blaze", description: "Voce Host / Leggenda della festa"},
        { name: "Guest DJ", description: "Set internazionale a sorpresa" }
    ],

    // Images of the 3D Carousel insite the Homepage
    mediaItems : [
        { src: CarouselCavalli5 },
        { src: CarouselCavalli6 },
        { src: CarouselCavalli1 },
        { src: CarouselCavalli7 },
        { src: CarouselCavalli8 }
    ],

    spotifyLink: "https://open.spotify.com/playlist/yourplaylistid",
    instaramLinkCavalli: "https://www.instagram.com/una_notte_da_cavalli",

    instagramLinkBerna: "https://www.instagram.com/dado.cecchiniii",
    instagramLinkTommy: "https://www.instagram.com/tommy_.weiss",
    instagramLinkPete: "https://www.instagram.com/tognasc",

    instagramLinkBert: "https://www.instagram.com/matteoobertini",

};

export default siteConfig;
