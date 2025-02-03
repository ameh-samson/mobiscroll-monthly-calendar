import { useState, useRef } from "react";
import PropTypes from "prop-types";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DatePicker = ({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);

  const selectDate = (year, month) => {
    setCurrentYear(year);
    setCurrentMonth(month);
    setShowDatePicker(false);
  };

  return (
    <div className="relative z-30">
      <button onClick={toggleDatePicker} className="text-2xl">
        {months[currentMonth]} {currentYear}
      </button>

      {showDatePicker && (
        <div
          ref={datePickerRef}
          className="absolute top-12 left-0 bg-white shadow-lg rounded-md p-4 z-20 w-56 border"
        >
          {/* Year Selection */}
          <div className="flex justify-between items-center mb-2">
            <button onClick={() => setCurrentYear(currentYear - 1)}>
              &lt;
            </button>
            <span>
              {months[currentMonth]} {currentYear}
            </span>
            <button onClick={() => setCurrentYear(currentYear + 1)}>
              &gt;
            </button>
          </div>

          {/* Month Selection */}
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <button
                key={index}
                className={`p-2 text-sm rounded ${
                  index === currentMonth
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => selectDate(currentYear, index)}
              >
                {month.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

DatePicker.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
  setCurrentYear: PropTypes.func.isRequired,
};

export default DatePicker;
