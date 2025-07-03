import { createContext, useContext } from "react";

export const ResumeInfoContext = createContext(null);

export const ResumeInfoContextProvider = ResumeInfoContext.Provider

export const useInfoContext = () => {
    return useContext(ResumeInfoContext)
}
