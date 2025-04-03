import {Primitives} from "@codelytv/primitives-type";
import {JobId} from "@/modules/jobs/domain/value-objects/JobId.ts";
import {JobTitle} from "@/modules/jobs/domain/value-objects/JobTitle.ts";
import {CompanyName} from "@/modules/jobs/domain/value-objects/CompanyName.ts";
import {JobLocation} from "@/modules/jobs/domain/value-objects/JobLocation.ts";
import {JobType} from "@/modules/jobs/domain/value-objects/JobType.ts";
import {JobDescription} from "@/modules/jobs/domain/value-objects/JobDescription.ts";

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