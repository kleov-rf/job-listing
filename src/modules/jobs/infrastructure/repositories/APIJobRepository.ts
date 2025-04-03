import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";

export class APIJobRepository implements JobRepository {
    async findAll(): Promise<Job[]> {
        throw new Error("Method not implemented.");
    }
}