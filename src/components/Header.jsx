import { PiLessThanBold, PiGreaterThanBold } from "react-icons/pi";

const Header = () => {
  return (
    <header className="sticky bg-lightGray text-blue flex justify-between items-center p-4">
      {/* month and year  */}
      <h1 className="text-2xl">February 2025</h1>

      {/* day */}
      <div className="flex items-center gap-2 font-medium text-base">
        <span>
          <PiLessThanBold />
        </span>
        <span className="">Today</span>
        <span>
          <PiGreaterThanBold />
        </span>
      </div>
    </header>
  );
};

export default Header;
