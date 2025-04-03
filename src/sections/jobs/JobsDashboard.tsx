import {JSX, useEffect, useMemo, useState} from "react";
import {useJobContext} from "@/sections/context/JobContext.tsx";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";

export const JobsDashboard: () => JSX.Element = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const {getJobsUseCase} = useJobContext();

    useEffect(() => {
        const fetchJobs = async () => {
            setJobs(await getJobsUseCase.execute());
        };

        fetchJobs();
    })

    const jobCards = useMemo(() => {
        return jobs.map(() => (
            <div data-testid="job-card"></div>
        ));
    }, [jobs]);

    return <>{ jobCards }</>;
}