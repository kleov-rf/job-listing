import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";

export class GetJobsUseCase {
    constructor(private readonly jobRepository: JobRepository) {
    }

    async execute(): Promise<Job[]> {
        return await this.jobRepository.findAll()
    }
}