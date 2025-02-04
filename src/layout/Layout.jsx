import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useTheme from "@/hooks/useTheme";
import Calendar from "@/components/Calender";

const Layout = () => {
  const [theme, toggleLightTheme, toggleDarkTheme] = useTheme();

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  return (
    <div className="flex flex-col h-screen">
      <div
        className={`flex-shrink-0 ${
          theme === "dark"
            ? "bg-[#1C1C1C] text-[#FF9F0A]"
            : theme === "light"
            ? " bg-lightGray text-blue"
            : ""
        }`}
      >
        <Header
          currentMonth={currentMonth}
          currentYear={currentYear}
          setCurrentMonth={setCurrentMonth}
          setCurrentYear={setCurrentYear}
          theme={theme}
        />
      </div>

      <main
        className={`flex-1 overflow-auto ${
          theme === "dark" ? "bg-black text-white" : ""
        }`}
      >
        <Calendar
          currentMonth={currentMonth}
          currentYear={currentYear}
          theme={theme}
        />
      </main>

      <div className="flex-shrink-0">
        <Footer
          toggleDarkTheme={toggleDarkTheme}
          toggleLightTheme={toggleLightTheme}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default Layout;
