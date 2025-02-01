import { FaApple } from "react-icons/fa";
import { BsAndroid2 } from "react-icons/bs";
import { DiWindows } from "react-icons/di";
import { IoMdArrowDropdown } from "react-icons/io";
import usaflag from "@/assets/png/usa-flag.png";

const Footer = () => {
  return (
    <footer className="bg-mutedBlue text-white text-center px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-3xl text-[#adbcda]">
          <FaApple />
        </span>
        <span className="text-3xl text-[#adbcda]">
          <BsAndroid2 />
        </span>
        <span className="text-3xl text-[#adbcda]">
          <DiWindows />
        </span>

        <div className="border border-[#777] rounded-md px-[3px]">
          <button className="rounded px-2 py-1 uppercase hover:bg-white hover:text-mutedBlue text-xs">
            Light
          </button>
          <button className="rounded px-2 py-1 uppercase hover:bg-white hover:text-mutedBlue text-xs">
            Dark
          </button>
        </div>
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

      <a className="border border-white rounded-full text-sm uppercase font-semibold px-3 py-1.5  cursor-pointer hover:bg-white hover:text-mutedBlue">
        Go back to demos
      </a>
    </footer>
  );
};

export default Footer;
