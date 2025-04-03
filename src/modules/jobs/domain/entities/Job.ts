import {Primitives} from "@codelytv/primitives-type";
import {CompanyName, JobDescription, JobId, JobLocation, JobTitle, JobType} from "@/modules/jobs/domain/value-objects";

export class Job {
    private constructor(
        readonly id: JobId,
        readonly title: JobTitle,
        readonly companyName: CompanyName,
        readonly location: JobLocation,
        readonly type: JobType,
        readonly description: JobDescription
    ) {
    }

    public static create(
        {
            id,
            title,
            companyName,
            location,
            type,
            description,
        }: Primitives<Job>): Job {
        return new Job(
            new JobId(id),
            new JobTitle(title),
            new CompanyName(companyName),
            new JobLocation(location),
            new JobType(type),
            new JobDescription(description)
        )
    }
}