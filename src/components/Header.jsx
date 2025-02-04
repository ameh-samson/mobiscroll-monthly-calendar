import PropTypes from "prop-types";
import { PiLessThanBold, PiGreaterThanBold } from "react-icons/pi";
import DatePicker from "./DatePicker";

const Header = ({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
}) => {
  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 0 ? 11 : prevMonth - 1;
      if (newMonth === 11) {
        setCurrentYear(currentYear - 1);
      }
      return newMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 11 ? 0 : prevMonth + 1;
      if (newMonth === 0) {
        setCurrentYear(currentYear + 1);
      }
      return newMonth;
    });
  };

  return (
    <header className="relative flex justify-between items-center p-4">
      {/* Date Picker Component */}
      <DatePicker
        currentMonth={currentMonth}
        currentYear={currentYear}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
      />

      {/* Navigation */}
      <div className="flex items-center gap-4 text-lg">
        <span className="cursor-pointer p-2" onClick={goToPreviousMonth}>
          <PiLessThanBold />
        </span>
        <span>Today</span>
        <span className="cursor-pointer p-2" onClick={goToNextMonth}>
          <PiGreaterThanBold />
        </span>
      </div>
    </header>
  );
};

Header.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
  setCurrentYear: PropTypes.func.isRequired,
};

export default Header;
