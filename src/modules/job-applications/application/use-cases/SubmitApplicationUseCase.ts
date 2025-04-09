import {JobApplication} from "@/modules/jobs/domain/entities/JobApplication.ts";
import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";

export class SubmitApplicationUseCase {
    constructor(
        private readonly jobApplicationRepository: JobApplicationRepository,
        private readonly jobRepository: JobRepository
    ) {}

    async execute(
        jobApplication: JobApplication,
        jobId: string
    ): Promise<JobApplication> {
        throw new Error('Method not implemented.')
    }
}