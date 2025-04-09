import {JobApplication} from "@/modules/jobs/domain/entities/JobApplication.ts";

export interface JobApplicationRepository {
    save(jobApplication: JobApplication): Promise<void>
}