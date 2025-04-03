import {JSX, useEffect, useState} from "react";
import {useJobContext} from "@/sections/context/JobContext.tsx";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobList} from "@/sections/jobs/components/JobList.tsx";

export const JobsDashboard: () => JSX.Element = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const {getJobsUseCase} = useJobContext();

    useEffect(() => {
        const fetchJobs = async () => {
            setJobs(await getJobsUseCase.execute());
        };

        fetchJobs();
    })

    return <JobList jobs={jobs} />;
}