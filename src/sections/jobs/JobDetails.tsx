import {JSX, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useJobContext} from "@/sections/context/JobContext.tsx";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {Card} from "@/sections/shared/components/Card.tsx";
import {Button} from "@/sections/shared/components/Button.tsx";
import {JobApplicationForm} from "@/sections/job-applications/components/JobApplicationForm.tsx";
import {JobDetailsCard} from "@/sections/jobs/components/JobDetailsCard.tsx";

export const JobDetails: () => JSX.Element = () => {
    const {id} = useParams<{ id: string }>()
    const [isLoading, setIsLoading] = useState(true);
    const [job, setJob] = useState<Job>();
    const [isApplicationFormShown, setIsApplicationFormShown] = useState(false);
    const {getJobByIdUseCase, getJobApplicationByJobId} = useJobContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            const retrievedJobs = await getJobByIdUseCase.execute(id!);
            if (retrievedJobs.length) {
                setJob(retrievedJobs[0]);
            }
            setIsLoading(false);
        };

        const fetchJobApplications = async () => {
            await getJobApplicationByJobId.execute(id!);
        };

        fetchJobs();
        fetchJobApplications();
    }, [getJobByIdUseCase, id])

    const handleOpenApplicationForm = () => {
        setIsApplicationFormShown(true);
    }

    const handleCloseApplicationForm = () => {
        setIsApplicationFormShown(false);
    }

    const renderBackButton = () => {
        return (
            <nav aria-label="Breadcrumb">
                <Button
                    variant="outline"
                    className="mb-6"
                    onClick={() => navigate('/')}
                >
                    ← <span>Back to Listings</span>
                </Button>
            </nav>
        )
    }

    if (isLoading) {
        return (
            <>
                {renderBackButton()}
                <section role="status" className="space-y-6 animate-pulse">
                    <Card className="w-full h-96 bg-zinc-200"></Card>
                </section>
            </>
        )
    }

    return (
        <article>
            {renderBackButton()}
            {job ? (
                <>
                    <JobDetailsCard job={job} onApply={handleOpenApplicationForm}/>
                    <JobApplicationForm isOpen={isApplicationFormShown} onClose={handleCloseApplicationForm}
                                        jobId={job.idValue()}/>
                </>
            ) : (
                <section className="text-center py-12">
                    <p className="text-gray-500">
                        Sorry! We couldn't find this job.
                    </p>
                </section>
            )}
        </article>
    )
}