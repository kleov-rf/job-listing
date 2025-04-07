import {FC, useMemo} from "react";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobCard} from "@/sections/jobs/components/JobCard.tsx";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/sections/shared/components/Select.tsx";

interface JobListProps {
    jobs: Job[];
}

export const JobList: FC<JobListProps> = ({jobs}) => {
    const jobCards = useMemo(() => {
        return jobs.map(job => (
            <JobCard key={job.idValue()} job={job}/>
        ));
    }, [jobs])

    return (
        <section className="space-y-6" aria-label="Job listings">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label htmlFor="job-type-filter" className="sr-only">
                    Filter by job type
                </label>
                <Select>
                    <SelectTrigger id="job-type-filter" className="w-44">
                        <SelectValue placeholder="Select job type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Types</SelectItem>
                        <SelectItem value={JobTypeEnum.FULL_TIME}
                                    data-testid={`${JobTypeEnum.FULL_TIME}-option`}>Full-Time</SelectItem>
                    </SelectContent>
                </Select>
            </header>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
                {jobCards}
            </ul>
        </section>
    );
}