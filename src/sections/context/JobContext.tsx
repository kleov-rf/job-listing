import {createContext, ReactNode, useContext} from "react";
import {GetJobsUseCase} from "@/modules/jobs/application/use-cases/GetJobsUseCase.ts";
import {APIJobRepository} from "@/modules/jobs/infrastructure/repositories/APIJobRepository.ts";
import {GetJobByIdUseCase} from "@/modules/jobs/application/use-cases/GetJobByIdUseCase.ts";

export interface JobContextType {
    getJobsUseCase: GetJobsUseCase;
    getJobByIdUseCase: GetJobByIdUseCase;
}

export const JobContext = createContext<JobContextType | undefined>(undefined)

export const JobProvider = ({children}: { children: ReactNode }) => {
    const jobRepository = new APIJobRepository();
    const getJobsUseCase = new GetJobsUseCase(jobRepository);
    const getJobByIdUseCase = new GetJobByIdUseCase(jobRepository);

    const value = {
        getJobsUseCase,
        getJobByIdUseCase
    }

    return <JobContext.Provider value={value}>{children}</JobContext.Provider>
}

export const useJobContext = (): JobContextType => {
    const context = useContext(JobContext)
    if (context === undefined) {
        throw new Error('useJobContext must be used within a JobProvider')
    }
    return context
}