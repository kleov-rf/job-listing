import {JSX, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useJobContext} from "@/sections/context/JobContext.tsx";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {Card, CardContent, CardHeader} from "@/sections/shared/components/Card.tsx";
import {renderJobTypeLabel} from "@/sections/jobs/utils/renderJobTypeLabel.ts";
import {Button} from "@/sections/shared/components/Button.tsx";
import {JobApplicationForm} from "@/sections/jobs/components/JobApplicationForm.tsx";

export const JobDetails: () => JSX.Element = () => {
    const {id} = useParams<{ id: string }>()
    const [isLoading, setIsLoading] = useState(true);
    const [job, setJob] = useState<Job>();
    const [isApplicationFormShown, setIsApplicationFormShown] = useState(false);
    const {getJobByIdUseCase} = useJobContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            const retrievedJobs = await getJobByIdUseCase.execute(id!);
            if (retrievedJobs.length) {
                setJob(retrievedJobs[0]);
            }
            setIsLoading(false);
        };

        fetchJobs();
    }, [getJobByIdUseCase, id])

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

    if (!job) {
        return (
            <>
                {renderBackButton()}
                <section className="text-center py-12">
                    <p className="text-gray-500">
                        Sorry! We couldn't find this job.
                    </p>
                </section>
            </>
        )
    }

    return (
        <article>
            {renderBackButton()}
            <Card className="mb-6">
                <CardHeader>
                    <h2 className="text-2xl font-bold" data-testid="job-details-title">{job.titleValue()}</h2>
                    <p className="text-muted-foreground">
                        <span data-testid="job-details-company">{job.companyNameValue()}</span> •
                        <span data-testid="job-details-location">{job.locationValue()}</span>
                    </p>
                    <Button
                        variant="outline"
                        className="mt-4 sm:w-fit"
                        onClick={() => setIsApplicationFormShown(true)}
                        aria-label={`Apply for ${job.titleValue()} at ${job.companyNameValue()}`}
                    >
                        Apply Now
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                              role="status" data-testid="job-details-type">
                            {renderJobTypeLabel(job.typeValue())}
                        </span>
                    </div>
                    <section className="prose max-w-none">
                        <h3 className="text-lg font-medium mb-2">Job Description</h3>
                        <p className="whitespace-pre-line"
                           data-testid="job-details-description">{job.descriptionValue()}</p>
                    </section>
                </CardContent>
            </Card>
            <JobApplicationForm isOpen={isApplicationFormShown} onClose={handleCloseApplicationForm} />
        </article>
    )
}