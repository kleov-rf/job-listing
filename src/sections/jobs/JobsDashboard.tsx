import {JSX, useEffect, useState} from "react";
import {useJobContext} from "@/sections/context/JobContext.tsx";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobList} from "@/sections/jobs/components/JobList.tsx";
import {useNavigate} from "react-router-dom";

export const JobsDashboard: () => JSX.Element = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const {getJobsUseCase} = useJobContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            setJobs(await getJobsUseCase.execute());
        };

        fetchJobs();
    }, [getJobsUseCase])

    const handleJobApply = (jobId: string) => {
        navigate(`/jobs/${jobId}`)
    }

    return (
        <>
            {jobs.length > 0 ? (
                    <JobList jobs={jobs} onApply={handleJobApply}/>
                )
                : (
                    <section className="flex justify-center py-8">
                        <p className="text-gray-500">No jobs found.</p>
                    </section>
                )}
        </>
    );
}