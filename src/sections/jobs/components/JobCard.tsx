import {FC} from "react";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";

interface JobCardProps {
    job: Job;
}

export const JobCard: FC<JobCardProps> = ({job}) => {
    return (
        <li key={job.idValue()} data-testid="job-card">
            <h2 className="text-lg font-semibold" data-testid="job-title">{job.titleValue()}</h2>
            <p className="text-sm text-muted-foreground" data-testid="job-company-name">{job.companyNameValue()}</p>
            <dl className="space-y-2">
                <dt className="font-medium text-sm text-muted-foreground">
                    Location
                </dt>
                <dd className="text-sm text-muted-foreground" data-testid="job-location">
                    {job.locationValue()}
                </dd>
                <dt className="font-medium text-sm text-muted-foreground">
                    Type
                </dt>
                <dd className="text-sm text-muted-foreground" data-testid="job-type">
                    {job.typeValue().replace('_', ' ')}
                </dd>
                <dt className="font-medium text-sm text-muted-foreground">
                    Description
                </dt>
                <dd className="text-sm text-muted-foreground line-clamp-3" data-testid="job-description">
                    {job.descriptionValue()}
                </dd>
            </dl>
        </li>
    )
}