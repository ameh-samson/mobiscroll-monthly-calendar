import { useState, useEffect } from "react";
import { generateDefaultEvents, generateRandomTime, getRandomColor } from "@/utils/utils";

export const useEvents = (defaultResources, currentMonth, currentYear, daysInMonth) => {
    const [events, setEvents] = useState([]);

    // Load events from localStorage on component mount or generate default events if none are found
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events"));
        if (storedEvents) {
            setEvents(storedEvents);
        } else {
            const generatedEvents = generateDefaultEvents(defaultResources, currentMonth, currentYear, daysInMonth);
            setEvents(generatedEvents);
            localStorage.setItem("events", JSON.stringify(generatedEvents));
        }
    }, []); // Only run once on mount

    // Save events to localStorage whenever the events state changes
    useEffect(() => {
        if (events.length > 0) {
            localStorage.setItem("events", JSON.stringify(events));
        }
    }, [events]); // Runs every time the events state changes

    // Add a new event to the list and update localStorage
    const addEvent = (resource, date, title) => {
        const randomTime = generateRandomTime();
        const newEvent = {
            resource,
            date,
            title,
            color: getRandomColor(),
            time: randomTime,
            id: Date.now(), // Use current timestamp as a unique ID
        };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
    };

    // Change the title of an existing event and update localStorage
    const changeEventTitle = (eventId, newTitle) => {
        const updatedEvents = events.map((ev) =>
            ev.id === eventId ? { ...ev, title: newTitle } : ev
        );
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
    };

    // Delete an event after user confirmation and update localStorage
    const deleteEvent = (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            const updatedEvents = events.filter((ev) => ev.id !== eventId);
            setEvents(updatedEvents);
            localStorage.setItem("events", JSON.stringify(updatedEvents));
        }
    };

    // Move an event to a new date and/or resource and update localStorage
    const moveEvent = (eventId, newDate, newResource) => {
        const updatedEvents = events.map((event) =>
            event.id.toString() === eventId
                ? { ...event, date: newDate, resource: newResource }
                : event
        );
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
    };

    return { events, addEvent, changeEventTitle, deleteEvent, moveEvent };
};
