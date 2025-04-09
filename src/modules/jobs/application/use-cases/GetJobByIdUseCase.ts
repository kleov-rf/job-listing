import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";

export class GetJobByIdUseCase {
  constructor(private readonly jobRepository: JobRepository) {}

    async execute(jobId: string): Promise<Job> {
        throw new Error("Method not implemented.");
    }
}