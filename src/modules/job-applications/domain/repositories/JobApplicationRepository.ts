import {JobApplication} from "@/modules/job-applications/domain/entities/JobApplication.ts";
import {JobId} from "@/modules/jobs/domain/value-objects";

export interface JobApplicationRepository {
    save(jobApplication: JobApplication): Promise<void>
    getByJobId(jobId: JobId): Promise<JobApplication[]>
}