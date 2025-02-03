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

  // Function to generate default events
  const generateDefaultEvents = (resourceList) => {
    const defaultEvents = [];
    resourceList.forEach((resource, index) => {
      const randomDay = Math.floor(Math.random() * daysInMonth) + 1; // Random day in the month
      const newEvent = {
        resource,
        date: new Date(
          currentYear,
          currentMonth,
          randomDay
        ).toLocaleDateString(),
        title: `Event ${index + 1}`,
        color: getRandomColor(),
        id: Date.now() + index,
      };
      defaultEvents.push(newEvent);
    });
    return defaultEvents;
  };

  const addResource = () => {
    const newResource = `Resource ${String.fromCharCode(
      65 + resources.length
    )}`;
    const updatedResources = [...resources, newResource];
    setResources(updatedResources);
    localStorage.setItem("resources", JSON.stringify(updatedResources));

    // Add a default event for the new resource
    const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
    const newEvent = {
      resource: newResource,
      date: new Date(currentYear, currentMonth, randomDay).toLocaleDateString(),
      title: `Event ${events.length + 1}`,
      color: getRandomColor(),
      id: Date.now(),
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const addEvent = (resource, date) => {
    const newEvent = {
      resource,
      date,
      title: "New Event",
      color: getRandomColor(),
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
              className={`sticky left-0 top-0 z-20 p-2 border font-normal text-start  ${
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
                const date = new Date(currentYear, currentMonth, colIndex + 1);
                return (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className={`h-16 border ${
                      theme === "dark" ? "border-[#333333]" : "border-gray-300"
                    }`}
                    style={{ minWidth: "150px" }}
                    onClick={() =>
                      addEvent(resource, date.toLocaleDateString())
                    }
                  >
                    {events
                      .filter(
                        (event) =>
                          event.resource === resource &&
                          event.date === date.toLocaleDateString()
                      )
                      .map((event, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: event.color,
                            height: "50px",
                            margin: "5px",
                            cursor: "move",
                          }}
                          className="p-2 rounded-md"
                        >
                          <div>
                            <h2 className="text-xs font-semibold">
                              {event.title}
                            </h2>

                            <button
                              className="text-[10px] mr-4"
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
                              className="text-[10px]"
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

      <button
        onClick={addResource}
        className="mt-4 p-2 bg-blue-500 rounded-md text-white"
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
