import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";
import {JobApplication} from "@/modules/job-applications/domain/entities/JobApplication.ts";
import {JobId} from "@/modules/jobs/domain/value-objects";

export class GetJobApplicationByJobIdUseCase {
    constructor(private readonly repository: JobApplicationRepository) {}

    async execute(jobId: string): Promise<JobApplication[]> {
        return await this.repository.getByJobId(new JobId(jobId))
    }
}