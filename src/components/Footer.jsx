import PropTypes from "prop-types";
import { FaApple } from "react-icons/fa";
import { BsAndroid2 } from "react-icons/bs";
import { DiWindows } from "react-icons/di";
import { IoMdArrowDropdown } from "react-icons/io";
import usaflag from "@/assets/png/usa-flag.png";

const Footer = ({ toggleDarkTheme, toggleLightTheme, theme }) => {
  return (
    <footer className="bg-mutedBlue text-white text-center px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* operating system icons */}
        <span className="text-3xl text-[#adbcda]">
          <FaApple />
        </span>
        <span className="text-3xl text-[#adbcda]">
          <BsAndroid2 />
        </span>
        <span className="text-3xl text-[#adbcda]">
          <DiWindows />
        </span>

        {/* light and dark mode button */}
        <div className="border border-[#777] rounded-md px-[3px]">
          <button
            className={`rounded px-2 py-1 uppercase text-xs ${
              theme === "light" ? "bg-white text-mutedBlue" : ""
            }`}
            onClick={toggleLightTheme}
          >
            Light
          </button>
          <button
            className={`rounded px-2 py-1 uppercase ${
              theme === "dark" ? "bg-white text-mutedBlue" : ""
            }`}
            onClick={toggleDarkTheme}
          >
            Dark
          </button>
        </div>

        {/* language selection */}
        <div className="border-l border-l-white">
          <div className="flex items-center cursor-pointer ml-2 px-5 py-2.5 gap-2 rounded-md hover:bg-white hover:text-mutedBlue">
            <div className="w-6 h-4 rounded-md">
              <img
                src={usaflag}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <span>English</span>
            <span className="text-2xl">
              <IoMdArrowDropdown />
            </span>
          </div>
        </div>
      </div>

      {/* go back to demos button */}
      <a className="border border-white rounded-full text-sm uppercase font-semibold px-3 py-1.5  cursor-pointer hover:bg-white hover:text-mutedBlue">
        Go back to demos
      </a>
    </footer>
  );
};

Footer.propTypes = {
  toggleDarkTheme: PropTypes.func.isRequired,
  toggleLightTheme: PropTypes.func.isRequired,
  theme: PropTypes.node.isRequired,
};

export default Footer;
