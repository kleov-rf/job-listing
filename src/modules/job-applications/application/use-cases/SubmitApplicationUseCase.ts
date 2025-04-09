import {JobApplication} from "@/modules/jobs/domain/entities/JobApplication.ts";
import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";
import {JobId} from "@/modules/jobs/domain/value-objects";
import {SaveJobApplicationDTO} from "@/modules/job-applications/application/dtos.ts";

export class SubmitApplicationUseCase {
    constructor(
        private readonly jobApplicationRepository: JobApplicationRepository,
        private readonly jobRepository: JobRepository
    ) {}

    async execute(
        jobApplication: JobApplication,
        jobId: string
    ): Promise<void> {
        const saveJobApplicationDTO = {
            jobId: new JobId(jobId),
            jobApplication
        } as SaveJobApplicationDTO
        await this.jobApplicationRepository.save(saveJobApplicationDTO)
    }
}