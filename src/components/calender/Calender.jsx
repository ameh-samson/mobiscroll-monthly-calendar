import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Calendar = ({ currentMonth, currentYear, theme }) => {
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Default resources A to O
  const defaultResources = Array.from(
    { length: 15 },
    (_, i) => `Resource ${String.fromCharCode(65 + i)}`
  );

  useEffect(() => {
    const storedResources = JSON.parse(localStorage.getItem("resources"));
    if (storedResources) {
      setResources(storedResources);
    } else {
      setResources(defaultResources);
      localStorage.setItem("resources", JSON.stringify(defaultResources));
    }

    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
    } else {
      const generatedEvents = generateDefaultEvents(defaultResources);
      setEvents(generatedEvents);
      localStorage.setItem("events", JSON.stringify(generatedEvents));
    }
  }, []);

  useEffect(() => {
    if (resources.length > 0) {
      localStorage.setItem("resources", JSON.stringify(resources));
    }
  }, [resources]);

  const addResource = () => {
    const newResource = `Resource ${String.fromCharCode(
      65 + resources.length
    )}`;
    setResources((prevResources) => [...prevResources, newResource]);
  };

  // Function to generate random time range
  const generateRandomTime = () => {
    const startHour = Math.floor(Math.random() * 12) + 8; // Random hour between 8 AM and 8 PM
    const endHour =
      startHour + Math.floor(Math.random() * (12 - (startHour - 8))); // End hour after start hour
    const startTime = `${startHour % 12 === 0 ? 12 : startHour % 12} ${
      startHour < 12 ? "AM" : "PM"
    }`;
    const endTime = `${endHour % 12 === 0 ? 12 : endHour % 12} ${
      endHour < 12 ? "AM" : "PM"
    }`;
    return `${startTime} - ${endTime}`;
  };

  // Function to generate default events
  const generateDefaultEvents = (resourceList) => {
    const defaultEvents = [];
    resourceList.forEach((resource, index) => {
      const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
      const randomTime = generateRandomTime(); // Generate random time for the event
      const newEvent = {
        resource,
        date: new Date(
          currentYear,
          currentMonth,
          randomDay
        ).toLocaleDateString(),
        title: `Event ${index + 1}`,
        color: getRandomColor(),
        time: randomTime, // Store the generated time range
        id: Date.now() + index,
      };
      defaultEvents.push(newEvent);
    });
    return defaultEvents;
  };

  const addEvent = (resource, date, title) => {
    const randomTime = generateRandomTime(); // Generate random time for the event
    const newEvent = {
      resource,
      date,
      title, // Use the title from the prompt input
      color: getRandomColor(),
      time: randomTime, // Add the random time to the event
      id: Date.now(),
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const changeEventTitle = (eventId, newTitle) => {
    const updatedEvents = events.map((ev) =>
      ev.id === eventId ? { ...ev, title: newTitle } : ev
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const deleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const updatedEvents = events.filter((ev) => ev.id !== eventId);
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    }
  };

  const moveEvent = (eventId, newDate, newResource) => {
    const updatedEvents = events.map((event) =>
      event.id.toString() === eventId
        ? { ...event, date: newDate, resource: newResource } // Change resource and date
        : event
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#5733FF", "#F1C40F", "#9B59B6"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="p-4">
      <table>
        <thead>
          <tr>
            <th
              className={`sticky left-0 top-0 z-20 p-2 border font-normal text-start ${
                theme === "dark"
                  ? "bg-black border-[#333333] text-white"
                  : "border-gray-300 bg-white"
              }`}
              style={{ minWidth: "200px", maxWidth: "200px" }}
            >
              Resources
            </th>
            {[...Array(daysInMonth)].map((_, index) => {
              const date = new Date(currentYear, currentMonth, index + 1);
              return (
                <th
                  key={index}
                  className={`sticky top-0 z-10 border p-2 text-center font-normal ${
                    theme === "dark"
                      ? "bg-black text-white border-[#333333]"
                      : "bg-white border-gray-300"
                  }`}
                  style={{ minWidth: "150px" }}
                >
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                  })}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {resources.map((resource, rowIndex) => (
            <tr key={rowIndex}>
              <td
                className={`select-none sticky left-0 z-10 p-2 border ${
                  theme === "dark"
                    ? "bg-black text-white border-[#333333]"
                    : "bg-white border-gray-300"
                }`}
                style={{ minWidth: "200px", maxWidth: "200px" }}
              >
                {resource}
              </td>
              {[...Array(daysInMonth)].map((_, colIndex) => {
                const date = new Date(
                  currentYear,
                  currentMonth,
                  colIndex + 1
                ).toLocaleDateString();
                return (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className={`h-16 border ${
                      theme === "dark" ? "border-[#333333]" : "border-gray-300"
                    }`}
                    style={{ minWidth: "150px", cursor: "pointer" }}
                    onClick={() => {
                      const title = prompt("Enter event title:", "New Event");
                      if (title) {
                        addEvent(resource, date, title);
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const eventId = e.dataTransfer.getData("eventId");
                      const targetResource = resource;
                      const targetDate = date;
                      moveEvent(eventId, targetDate, targetResource);
                    }}
                  >
                    {events
                      .filter(
                        (event) =>
                          event.resource === resource && event.date === date
                      )
                      .map((event) => (
                        <div
                          key={event.id}
                          draggable="true"
                          onDragStart={(e) =>
                            e.dataTransfer.setData("eventId", event.id)
                          }
                          style={{
                            backgroundColor: event.color,
                          }}
                          className="p-2 rounded-md h-auto min-h-[50px] m-[5px] flex flex-col justify-between cursor-move"
                        >
                          <h2 className="text-xs font-semibold">
                            {event.title}
                          </h2>
                          <p className="text-[10px]">{event.time}</p>{" "}
                          {/* Show random time */}
                          <div className="flex justify-between text-[10px]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const newTitle = prompt(
                                  "Enter new event title:",
                                  event.title
                                );
                                if (newTitle)
                                  changeEventTitle(event.id, newTitle);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteEvent(event.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Resource Button */}
      <button
        onClick={addResource}
        className={`mt-4 p-2 bg-blue-500 rounded-md border text-xs sticky left-0 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Add more resources
      </button>
    </div>
  );
};

Calendar.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Calendar;
