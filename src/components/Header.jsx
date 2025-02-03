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
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <header className="relative flex justify-between items-center p-4 bg-white">
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
