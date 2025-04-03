import {JSX, useEffect} from "react";
import {useJobContext} from "@/sections/context/JobContext.tsx";

export const JobsDashboard: () => JSX.Element = () => {
    const { getJobsUseCase } = useJobContext();

    useEffect(() => {
        const fetchJobs = async () => {
            await getJobsUseCase.execute();
        };

        fetchJobs();
    })

    return <></>;
}