import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

const Calendar = ({ currentMonth, currentYear, theme }) => {
  const [resources, setResources] = useState([]);

  // Load resources from local storage on mount
  useEffect(() => {
    const storedResources = JSON.parse(localStorage.getItem("resources"));
    if (storedResources) {
      setResources(storedResources);
    }
  }, []);

  // Save resources to local storage whenever they change
  useEffect(() => {
    if (resources.length > 0) {
      localStorage.setItem("resources", JSON.stringify(resources));
    }
  }, [resources]);

  const getResourceName = (count) => {
    let name = "";
    let index = count;

    // Convert index to letters (A-Z, then AA, AB, AC...)
    while (index >= 0) {
      name = String.fromCharCode((index % 26) + 65) + name; // Convert remainder to a letter
      index = Math.floor(index / 26) - 1; // Move to the next "digit"
    }

    return `Resource ${name}`;
  };

  const addResource = () => {
    const newResource = getResourceName(resources.length);
    const updatedResources = [...resources, newResource];

    setResources(updatedResources);
    localStorage.setItem("resources", JSON.stringify(updatedResources));
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-8">
        {/* Header Row */}
        <div
          className={`col-span-1 border-[0.5px] p-2 sticky top-0 z-10 ${
            theme === "dark"
              ? "bg-black border-[#333333]"
              : "bg-white border-gray300"
          }`}
        >
          Resources
        </div>
        {[...Array(7)].map((_, index) => {
          const date = new Date(currentYear, currentMonth, index + 1);
          return (
            <div
              key={index}
              className={`border-[0.5px] border-l-0 ${
                theme === "dark" ? "border-[#333333]" : "border-gray300"
              } p-2 text-center sticky top-0 z-10 ${
                theme === "dark" ? "bg-black" : "bg-white"
              }`}
            >
              {date.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
              })}
            </div>
          );
        })}

        {/* Resources & Events */}
        {resources.map((resource, rowIndex) => (
          <div key={rowIndex} className="contents">
            <div
              className={`border-r-[0.5px] border-b-[0.5px] border-l-[0.5px] ${
                theme === "dark" ? "border-[#333333]" : "border-gray300"
              } p-2`}
            >
              {resource}
            </div>
            {[...Array(7)].map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`h-16 relative border-r-[0.5px] border-b-[0.5px] ${
                  theme === "dark" ? "border-[#333333]" : "border-gray300"
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={addResource}
        className={`mb-4 p-2 bg-blue-500 rounded text-3xl ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        <CiCirclePlus />
      </button>
    </div>
  );
};

Calendar.propTypes = {
  currentMonth: PropTypes.node.isRequired,
  currentYear: PropTypes.node.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Calendar;
