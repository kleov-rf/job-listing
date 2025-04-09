import {SaveJobApplicationDTO} from "@/modules/job-applications/application/dtos.ts";

export interface JobApplicationRepository {
    save(jobApplication: SaveJobApplicationDTO): Promise<void>
}