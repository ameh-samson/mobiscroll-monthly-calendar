import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useEvents } from "@/hooks/useEvents";

const Calendar = ({ currentMonth, currentYear, theme }) => {
  const [resources, setResources] = useState([]);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const defaultResources = Array.from(
    { length: 15 },
    (_, i) => `Resource ${String.fromCharCode(65 + i)}`
  );

  // Get today's date
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  useEffect(() => {
    const storedResources = JSON.parse(localStorage.getItem("resources"));
    if (storedResources) {
      setResources(storedResources);
    } else {
      setResources(defaultResources);
      localStorage.setItem("resources", JSON.stringify(defaultResources));
    }
  }, []);

  const { events, addEvent, changeEventTitle, deleteEvent, moveEvent } =
    useEvents(defaultResources, currentMonth, currentYear, daysInMonth);

  const addResource = () => {
    const newResource = `Resource ${String.fromCharCode(
      65 + resources.length
    )}`;
    setResources((prevResources) => [...prevResources, newResource]);
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
              // Check if the current date matches today's date
              const isToday =
                todayDate === index + 1 &&
                todayMonth === currentMonth &&
                todayYear === currentYear;

              return (
                <th
                  key={index}
                  className={`sticky top-0 z-10 border p-2 text-center font-normal ${
                    theme === "dark"
                      ? "text-white border-[#333333] bg-black"
                      : "border-gray-300"
                  } ${
                    isToday
                      ? theme === "dark"
                        ? "bg-[#FF9F0A]"
                        : "bg-blue text-white"
                      : ""
                  }`} // Highlight today's date
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
