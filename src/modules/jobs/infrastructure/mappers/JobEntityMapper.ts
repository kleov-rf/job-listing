import {APIJobDTO} from "@/modules/jobs/infrastructure/dtos/APIJobResponseDTO.ts";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects/JobType.ts";

export class JobEntityMapper {
    static toDomain(apiJob: APIJobDTO): Job {
        return Job.create({
            id: apiJob.id.toString(),
            title: apiJob.job_title,
            companyName: apiJob.company,
            location: apiJob.short_location,
            type: this.mapEmploymentStatusToJobType(apiJob.employment_statuses[0]),
            description: apiJob.long_description
        });
    }

    private static mapEmploymentStatusToJobType(type: string): JobTypeEnum {
        return JobTypeEnum.FULL_TIME;
    }
}