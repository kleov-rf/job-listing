import {FC, useMemo, useState} from "react";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobCard} from "@/sections/jobs/components/JobCard.tsx";
import {JobType, JobTypeEnum} from "@/modules/jobs/domain/value-objects";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/sections/shared/components/Select.tsx";
import {renderJobTypeLabel} from "@/sections/jobs/utils/renderJobTypeLabel.ts";

interface JobListProps {
    jobs: Job[];
}

type JobTypeOptions = JobTypeEnum | 'ALL';

export const JobList: FC<JobListProps> = ({jobs}) => {
    const [selectedType, setSelectedType] = useState<JobTypeOptions>('ALL')

    const filteredJobs = useMemo(() => {
        if (selectedType === 'ALL') return jobs
        return jobs.filter(job => job.matchesType(new JobType(selectedType)))
    }, [jobs, selectedType])

    const jobCards = useMemo(() => {
        return filteredJobs.map(job => (
            <JobCard key={job.idValue()} job={job}/>
        ));
    }, [filteredJobs])

    return (
        <section className="space-y-6" aria-label="Job listings">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label htmlFor="job-type-filter" className="sr-only">
                    Filter by job type
                </label>
                <Select value={selectedType} onValueChange={value => setSelectedType(value as JobTypeOptions)}>
                    <SelectTrigger id="job-type-filter" className="w-44">
                        <SelectValue placeholder="Select job type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Types</SelectItem>
                        <SelectItem value={JobTypeEnum.FULL_TIME}>{renderJobTypeLabel(JobTypeEnum.FULL_TIME)}</SelectItem>
                        <SelectItem value={JobTypeEnum.PART_TIME}>{renderJobTypeLabel(JobTypeEnum.PART_TIME)}</SelectItem>
                        <SelectItem value={JobTypeEnum.CONTRACT}>{renderJobTypeLabel(JobTypeEnum.CONTRACT)}</SelectItem>
                    </SelectContent>
                </Select>
            </header>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
                {jobCards}
            </ul>
        </section>
    );
}