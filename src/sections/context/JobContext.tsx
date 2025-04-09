import {createContext, ReactNode, useContext} from "react";
import {GetJobsUseCase} from "@/modules/jobs/application/use-cases/GetJobsUseCase.ts";
import {APIJobRepository} from "@/modules/jobs/infrastructure/repositories/APIJobRepository.ts";
import {GetJobByIdUseCase} from "@/modules/jobs/application/use-cases/GetJobByIdUseCase.ts";
import {
    LocalStorageJobApplicationRepository
} from "@/modules/job-applications/infrastructure/repositories/LocalStorageJobApplicationRepository.ts";
import {SubmitApplicationUseCase} from "@/modules/job-applications/application/use-cases/SubmitApplicationUseCase.ts";

export interface JobContextType {
    getJobsUseCase: GetJobsUseCase;
    getJobByIdUseCase: GetJobByIdUseCase;
    submitApplicationUseCase: SubmitApplicationUseCase;
}

export const JobContext = createContext<JobContextType | undefined>(undefined)

export const JobProvider = ({children}: { children: ReactNode }) => {
    const jobRepository = new APIJobRepository();
    const jobApplicationRepository = new LocalStorageJobApplicationRepository();
    const getJobsUseCase = new GetJobsUseCase(jobRepository);
    const getJobByIdUseCase = new GetJobByIdUseCase(jobRepository);
    const submitApplicationUseCase = new SubmitApplicationUseCase(jobApplicationRepository, jobRepository);

    const value = {
        getJobsUseCase,
        getJobByIdUseCase,
        submitApplicationUseCase
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