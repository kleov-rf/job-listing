import {FC, useMemo} from "react";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";

interface JobListProps {
    jobs: Job[];
}

export const JobList: FC<JobListProps> = ({jobs}) => {
    const jobCards = useMemo(() => {
        return jobs.map(job => (
            <div key={job.idValue()} data-testid="job-card"></div>
        ));
    }, [jobs])

    return (
        <main>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
                {jobCards}
            </ul>
        </main>
    );
}