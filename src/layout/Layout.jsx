import PropTypes from "prop-types";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useTheme from "@/hooks/useTheme";

const Layout = ({ children }) => {
  const [theme, toggleLightTheme, toggleDarkTheme] = useTheme();

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
        <Header />
      </div>

      <main
        className={`flex-1 overflow-auto ${
          theme === "dark" ? "bg-black text-white" : ""
        }`}
      >
        {children}
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
