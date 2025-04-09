import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";
import {JobApplication} from "@/modules/job-applications/domain/entities/JobApplication.ts";

export class GetJobApplicationByJobIdUseCase {
    constructor(private readonly repository: JobApplicationRepository) {}

    async execute(jobId: string): Promise<JobApplication[]> {
        throw new Error("Method not implemented.");
    }
}