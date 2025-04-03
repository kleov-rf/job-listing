import {APIJobDTO} from "@/modules/jobs/infrastructure/dtos/APIJobResponseDTO.ts";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";

export class JobEntityMapper {
    static toDomain(apiJob: APIJobDTO): Job {
        return;
    }
}