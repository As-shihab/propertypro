import { createContext } from "react";
export const GlobalContext = createContext<any>({
    user: null,
    setUser: () => {},
});
