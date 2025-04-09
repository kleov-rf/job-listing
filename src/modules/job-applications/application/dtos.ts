import {JobId} from "@/modules/jobs/domain/value-objects";
import {JobApplication} from "@/modules/jobs/domain/entities/JobApplication.ts";

export interface SaveJobApplicationDTO {
    jobId: JobId,
    jobApplication: JobApplication
}