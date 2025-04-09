import {JSX, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useJobContext} from "@/sections/context/JobContext.tsx";

export const JobDetails: () => JSX.Element = () => {
    const {id} = useParams<{ id: string }>()
    const {getJobByIdUseCase} = useJobContext();

    useEffect(() => {
        const fetchJobs = async () => {
            await getJobByIdUseCase.execute(id!);
        };

        fetchJobs();
    }, [getJobByIdUseCase, id])

    return <></>
}