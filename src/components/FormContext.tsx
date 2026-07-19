import { createContext, useContext } from "react";

export const FormContext = createContext({ disabled: false });

export const useFormContext = () => useContext(FormContext);
