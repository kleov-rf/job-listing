import {JSX, useEffect, useState} from "react";
import {useJobContext} from "@/sections/context/JobContext.tsx";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobList} from "@/sections/jobs/components/JobList.tsx";
import {useNavigate} from "react-router-dom";
import {Card} from "@/sections/shared/components/Card.tsx";

export const JobsDashboard: () => JSX.Element = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {getJobsUseCase} = useJobContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            setJobs(await getJobsUseCase.execute());
            setIsLoading(false);
        };

        fetchJobs();
    }, [getJobsUseCase])

    const handleJobApply = (jobId: string) => {
        navigate(`/jobs/${jobId}`)
    }

    if (isLoading) {
        return (
            <section className="space-y-6" role="status">
                <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start animate-pulse">
                    <article className="h-9 w-full bg-zinc-200 sm:w-44"></article>
                    <article className="h-9 w-full bg-zinc-200 sm:w-44"></article>
                </section>
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full animate-pulse">
                    {Array.from({length: 9}).map((_, index) => <Card key={index} className="w-full h-80 bg-zinc-200"></Card>)}
                </section>
            </section>
        );
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