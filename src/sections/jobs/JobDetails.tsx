import {JSX, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useJobContext} from "@/sections/context/JobContext.tsx";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {Card, CardContent, CardHeader} from "@/sections/shared/components/Card.tsx";

export const JobDetails: () => JSX.Element = () => {
    const {id} = useParams<{ id: string }>()
    const [job, setJob] = useState<Job>();
    const {getJobByIdUseCase} = useJobContext();

    useEffect(() => {
        const fetchJobs = async () => {
            const retrievedJobs = await getJobByIdUseCase.execute(id!);
            if (retrievedJobs.length) {
                setJob(retrievedJobs[0]);
            }
        };

        fetchJobs();
    }, [getJobByIdUseCase, id])

    if (!job) {
        return <></>
    }

    return (
        <article>
            <Card className="mb-6">
                <CardHeader>
                    <h1 className="text-2xl font-bold">{job.titleValue()}</h1>
                    <p className="text-muted-foreground">
                        <span>{job.companyNameValue()}</span> • <span>{job.locationValue()}</span>
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                              role="status">
                            {job.typeValue()}
                        </span>
                    </div>
                    <section className="prose max-w-none">
                        <h2 className="text-lg font-medium mb-2">Job Description</h2>
                        <p className="whitespace-pre-line">{job.descriptionValue()}</p>
                    </section>
                </CardContent>
            </Card>
        </article>
    )
}