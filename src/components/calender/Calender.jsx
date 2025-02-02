import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

const Calendar = ({ currentMonth, currentYear, theme }) => {
  const [resources, setResources] = useState([]);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  useEffect(() => {
    const storedResources = JSON.parse(localStorage.getItem("resources"));
    if (storedResources) {
      setResources(storedResources);
    }
  }, []);

  useEffect(() => {
    if (resources.length > 0) {
      localStorage.setItem("resources", JSON.stringify(resources));
    }
  }, [resources]);

  const getResourceName = (count) => {
    let name = "";
    let index = count;
    while (index >= 0) {
      name = String.fromCharCode((index % 26) + 65) + name;
      index = Math.floor(index / 26) - 1;
    }
    return `Resource ${name}`;
  };

  const addResource = () => {
    const newResource = getResourceName(resources.length);
    setResources([...resources, newResource]);
    localStorage.setItem(
      "resources",
      JSON.stringify([...resources, newResource])
    );
  };

  return (
    <div className="p-4">
      <table className="border-collapse">
        {/* Table Header */}
        <thead>
          <tr>
            {/* Fixed Resources Column */}
            <th
              className={`sticky left-0 top-0 z-20 p-2 border  ${
                theme === "dark"
                  ? "bg-black border-[#333333] text-white"
                  : "border-gray-300 bg-white"
              }`}
              style={{ minWidth: "200px", maxWidth: "200px" }} // Fixed width for Resources column
            >
              Resources
            </th>
            {[...Array(daysInMonth)].map((_, index) => {
              const date = new Date(currentYear, currentMonth, index + 1);
              return (
                <th
                  key={index}
                  className={`sticky top-0 z-10 border p-2 text-center ${
                    theme === "dark"
                      ? "bg-black text-white border-[#333333]"
                      : "bg-white border-gray-300"
                  }`}
                  style={{ minWidth: "150px" }} // Fixed width for date headers
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
                style={{ minWidth: "200px", maxWidth: "200px" }} // Fixed width
              >
                {resource}
              </td>
              {[...Array(daysInMonth)].map((_, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className={`h-16 border ${
                    theme === "dark" ? "border-[#333333]" : "border-gray-300"
                  }`}
                  style={{ minWidth: "150px" }} // Fixed cell width
                ></td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* Add Resource Button */}
        <button
          onClick={addResource}
          className={`mt-4 p-2 bg-blue-500 rounded text-3xl sticky left-0 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          <CiCirclePlus />
        </button>
      </table>
    </div>
  );
};

Calendar.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Calendar;
