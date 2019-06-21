import { createContext } from "react";
import {AppContextType} from "../types/"
//Reducer updatestate content
export const initialContent = {content:"",dispatch:()=>{}};
export const AppContext = createContext<AppContextType>(initialContent);
