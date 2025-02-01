import { createContext, useContext } from "react";

export const GlobalContext = createContext();

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("Wrap components with ContextProvider!");
    }
    return context;
}