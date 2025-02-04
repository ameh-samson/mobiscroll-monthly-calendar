/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import PropTypes from "prop-types";
import { PiLessThanBold, PiGreaterThanBold } from "react-icons/pi";

const DatePicker = ({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
  theme,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

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

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const toggleDatePicker = () => setShowDatePicker((prev) => !prev);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setTimeout(() => setShowDatePicker(false), 100);
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
    }
  };

  const getDaysInMonth = (year, month) => {
    if (month < 0) return new Date(year - 1, 12 + month, 0).getDate();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);

  const days = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, currentMonth: false });
  }

  for (let i = 1; i <= totalDays; i++) {
    days.push({ day: i, currentMonth: true });
  }

  while (days.length % 7 !== 0) {
    days.push({
      day: days.length - totalDays - firstDay + 1,
      currentMonth: false,
    });
  }

  return (
    <div className="relative">
      <button onClick={toggleDatePicker} className="text-2xl">
        {months[currentMonth]} {currentYear}
      </button>

      {showDatePicker && (
        <div
          className={`absolute top-12 left-0 z-30  shadow-lg rounded-md p-4 w-72 ${
            theme === "dark"
              ? "bg-[#1C1C1C]"
              : theme === "light"
              ? "bg-white"
              : ""
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span>
              {months[currentMonth]} {currentYear}
            </span>
            <div className="flex gap-2">
              <button onClick={prevMonth}>
                <PiLessThanBold />
              </button>

              <button onClick={nextMonth}>
                <PiGreaterThanBold />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center font-semibold mb-2">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 text-center">
            {days.map((dateObj, index) => {
              const isToday =
                dateObj.day === todayDate &&
                currentMonth === todayMonth &&
                currentYear === todayYear;
              return (
                <button
                  key={index}
                  className={`p-2 text-sm rounded-full 
                  ${dateObj.currentMonth ? "text-black" : "text-gray-400"} 
                  ${
                    isToday
                      ? theme === "dark"
                        ? "bg-[#FF9F0A] text-white"
                        : "bg-blue text-white"
                      : ""
                  }
                  ${
                    dateObj.day === selectedDate && dateObj.currentMonth
                      ? "text-white"
                      : "hover:bg-blue hover:text-white"
                  }
                  ${theme === "dark" ? "text-white" : ""} `}
                  onClick={() =>
                    dateObj.currentMonth && handleDateClick(dateObj.day)
                  }
                >
                  {dateObj.day}
                </button>
              );
            })}
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
  theme: PropTypes.string.isRequired,
};

export default DatePicker;
