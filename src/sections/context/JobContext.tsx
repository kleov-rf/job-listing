import {createContext, useContext} from "react";
import {GetJobsUseCase} from "@/modules/jobs/application/use-cases/GetJobsUseCase.ts";

export interface JobContextType {
    getJobsUseCase: GetJobsUseCase;
}

export const JobContext = createContext<JobContextType | undefined>(undefined)

export const useJobContext = (): JobContextType => {
    const context = useContext(JobContext)
    if (context === undefined) {
        throw new Error('useJobContext must be used within a JobProvider')
    }
    return context
}