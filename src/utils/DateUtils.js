// Calculates the time remaining between now and a future date
export function getTimeRemaining(date) {
    const now = new Date(); // Get the current date and time
    const diff = date - now; // Difference in milliseconds between target date and now

    // If the target date has passed or is exactly now, return all zeros
    if (diff <= 0) {
        return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // Calculate remaining seconds (mod 60 for seconds within a minute)
    const seconds = Math.floor((diff / 1000) % 60);
    // Calculate remaining minutes (mod 60 for minutes within an hour)
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    // Calculate remaining hours (mod 24 for hours within a day)
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    // Calculate total remaining days
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Return an object containing the total milliseconds and breakdown of time units
    return { total: diff, days, hours, minutes, seconds };
}