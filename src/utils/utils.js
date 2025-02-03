// Generates a random time range between 8 AM and 8 PM
export const generateRandomTime = () => {
    const startHour = Math.floor(Math.random() * 12) + 8; // Random hour between 8 AM and 8 PM
    const endHour =
        startHour + Math.floor(Math.random() * (12 - (startHour - 8))); // End hour must be later than start hour
    const startTime = `${startHour % 12 === 0 ? 12 : startHour % 12} ${startHour < 12 ? "AM" : "PM"}`;
    const endTime = `${endHour % 12 === 0 ? 12 : endHour % 12} ${endHour < 12 ? "AM" : "PM"}`;
    return `${startTime} - ${endTime}`;
};

// Generates an array of default events based on the provided resources, month, and year
export const generateDefaultEvents = (resourceList, currentMonth, currentYear, daysInMonth) => {
    const defaultEvents = [];
    resourceList.forEach((resource, index) => {
        const randomDay = Math.floor(Math.random() * daysInMonth) + 1; // Random day of the month
        const randomTime = generateRandomTime(); // Generate a random time for the event
        const newEvent = {
            resource,
            date: new Date(currentYear, currentMonth, randomDay).toLocaleDateString(),
            title: `Event ${index + 1}`,
            color: getRandomColor(),
            time: randomTime,
            id: Date.now() + index, // Unique event ID using timestamp and index
        };
        defaultEvents.push(newEvent);
    });
    return defaultEvents;
};

// Generates a random color from a predefined list of colors
export const getRandomColor = () => {
    const colors = [
        "#FF5733", "#33FF57", "#5733FF", "#F1C40F", "#9B59B6",
        "#FF6347", "#FFD700", "#ADFF2F", "#8A2BE2", "#FF1493",
        "#00FF7F", "#FF4500", "#32CD32", "#6A5ACD", "#FF8C00",
        "#FF00FF", "#D2691E", "#A52A2A", "#40E0D0", "#2E8B57"
    ];

    return colors[Math.floor(Math.random() * colors.length)]; // Select a random color from the list
};
