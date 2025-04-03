import {Job} from "@/modules/jobs/domain/entities/Job.ts";

export interface JobRepository {
    findAll(): Promise<Job[]>
}