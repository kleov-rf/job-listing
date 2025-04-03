import {FC} from "react";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";

interface JobCardProps {
    job: Job;
}

export const JobCard: FC<JobCardProps> = ({ job }) => {
    return (
        <li key={job.idValue()} data-testid="job-card"></li>
    )
}