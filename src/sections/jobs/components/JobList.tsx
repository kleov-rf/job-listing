import {FC, useMemo, useState} from "react";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobCard} from "@/sections/jobs/components/JobCard.tsx";
import {JobType} from "@/modules/jobs/domain/value-objects";
import {JobTypeOptions, JobTypeSelect} from "@/sections/jobs/components/JobTypeSelect.tsx";

interface JobListProps {
    jobs: Job[];
}

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

    const handleTypeChange = (selectedType: JobTypeOptions) => {
        setSelectedType(selectedType)
    }

    return (
        <section className="space-y-6" aria-label="Job listings">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <JobTypeSelect currentType={selectedType} handleTypeChange={handleTypeChange} />
            </header>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
                {jobCards}
            </ul>
        </section>
    );
}