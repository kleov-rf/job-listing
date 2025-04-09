import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobId} from "@/modules/jobs/domain/value-objects";

export interface JobRepository {
    findAll(): Promise<Job[]>
    findById(id: JobId): Promise<Job[]>
}