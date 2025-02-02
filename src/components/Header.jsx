import PropTypes from "prop-types";
import { PiLessThanBold, PiGreaterThanBold } from "react-icons/pi";
const Header = ({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
}) => {
  const today = new Date();
  const currentMonthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Check if today is in the selected month
  const isToday =
    today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  return (
    <header className="flex justify-between items-center p-4">
      {/* Month and year */}
      <h1 className="text-2xl">
        {currentMonthName} {currentYear}
      </h1>

      {/* Navigation */}
      <div className="flex items-center gap-2 font-medium text-base">
        <span className="cursor-pointer" onClick={goToPreviousMonth}>
          <PiLessThanBold />
        </span>

        <span>
          {isToday ? "Today" : `Viewing: ${currentMonthName}, ${currentYear}`}
        </span>

        <span className="cursor-pointer" onClick={goToNextMonth}>
          <PiGreaterThanBold />
        </span>
      </div>
    </header>
  );
};

Header.propTypes = {
  currentMonth: PropTypes.node.isRequired,
  currentYear: PropTypes.node.isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
  setCurrentYear: PropTypes.func.isRequired,
};

export default Header;
