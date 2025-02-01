import { useState } from "react";
import PropTypes from "prop-types";
import { GlobalContext } from "@/hooks/useGlobalContext";

export const GlobalContextProvider = ({ children }) => {
  const [data, setData] = useState([1, 2, 3, 4]);

  const value = { data, setData };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
