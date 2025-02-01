export const generateMonthDays = (currentDate) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First and last day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Determine the starting position (0 = Sunday, 6 = Saturday)
    const startDay = firstDay.getDay();

    // Create an array to store all the days
    let days = [];

    // Add empty slots for previous month's days
    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push(new Date(year, month, i));
    }

    return days;
};
