import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobId} from "@/modules/jobs/domain/value-objects";

export class GetJobByIdUseCase {
    constructor(private readonly jobRepository: JobRepository) {
    }

    async execute(id: string): Promise<Job[]> {
        const jobId = new JobId(id)
        return await this.jobRepository.findById(jobId)
    }
}