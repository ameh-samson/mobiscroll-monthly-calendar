import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Calendar = ({ currentMonth, currentYear, theme }) => {
  const [resources, setResources] = useState([]);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Default resources A to O
  const defaultResources = Array.from(
    { length: 15 },
    (_, i) => `Resource ${String.fromCharCode(65 + i)}`
  );

  // Load resources from local storage or set defaults
  useEffect(() => {
    const storedResources = JSON.parse(localStorage.getItem("resources"));
    if (storedResources) {
      setResources(storedResources);
    } else {
      // Set default resources if no resources are found in local storage
      setResources(defaultResources);
      localStorage.setItem("resources", JSON.stringify(defaultResources));
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
    setResources([...resources, newResource]);
  };

  return (
    <div className="p-4">
      <table className="border-collapse">
        {/* Table Header */}
        <thead>
          <tr>
            {/* Fixed Resources Column */}
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

        {/* Table Body */}
        <tbody>
          {resources.map((resource, rowIndex) => (
            <tr key={rowIndex}>
              {/* Fixed Resource Column */}
              <td
                className={`sticky left-0 z-10 p-2 border ${
                  theme === "dark"
                    ? "bg-black text-white border-[#333333]"
                    : "bg-white border-gray-300"
                }`}
                style={{ minWidth: "200px", maxWidth: "200px" }}
              >
                {resource}
              </td>
              {[...Array(daysInMonth)].map((_, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className={`h-16 border ${
                    theme === "dark" ? "border-[#333333]" : "border-gray-300"
                  }`}
                  style={{ minWidth: "150px" }}
                ></td>
              ))}
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
