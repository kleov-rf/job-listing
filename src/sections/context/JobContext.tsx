import {createContext} from "react";

export interface JobContextType {
    getJobsUseCase: () => Promise<void>;
}

export const JobContext = createContext<JobContextType | undefined>(undefined)