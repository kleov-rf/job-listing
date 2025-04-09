import {JobApplication} from "@/modules/job-applications/domain/entities/JobApplication.ts";

export interface JobApplicationRepository {
    save(jobApplication: JobApplication): Promise<void>
}