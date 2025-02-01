import PropTypes from "prop-types";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-shrink-0">
        <Header />
      </div>

      <main className="flex-1 overflow-auto">{children}</main>

      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
