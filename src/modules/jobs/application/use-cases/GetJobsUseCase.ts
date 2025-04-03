import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";

export class GetJobsUseCase {
    constructor(private readonly jobRepository: JobRepository) {}

    async execute(): Promise<void> {
        await this.jobRepository.findAll()
    }
}