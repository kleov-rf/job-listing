import {JobApplication} from "@/modules/jobs/domain/entities/JobApplication.ts";
import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";
import {Primitives} from "@codelytv/primitives-type";

export class SubmitApplicationUseCase {
    constructor(
        private readonly jobApplicationRepository: JobApplicationRepository,
        private readonly jobRepository: JobRepository
    ) {
    }

    async execute(
        {
            id,
            name,
            email,
            cvUrl,
            jobId
        }: Primitives<JobApplication>,
    ): Promise<void> {
        const jobApplication = JobApplication.create({
            id,
            name,
            email,
            cvUrl,
            jobId,
        })
        await this.jobApplicationRepository.save(jobApplication)
    }
}