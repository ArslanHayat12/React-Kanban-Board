import { createContext } from "react";

//Reducer updatestate content
export const initialContent = {
  value: "",
  message: ""
};
export const AppContext = createContext<any>(initialContent);
