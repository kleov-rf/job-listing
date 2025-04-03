import {FC, useMemo} from "react";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobCard} from "@/sections/jobs/components/JobCard.tsx";

interface JobListProps {
    jobs: Job[];
}

export const JobList: FC<JobListProps> = ({jobs}) => {
    const jobCards = useMemo(() => {
        return jobs.map(job => (
            <JobCard key={job.idValue()} job={job} />
        ));
    }, [jobs])

    return (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {jobCards}
        </ul>
    );
}