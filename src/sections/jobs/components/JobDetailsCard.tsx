import {Card, CardContent, CardHeader} from "@/sections/shared/components/Card.tsx";
import {Button} from "@/sections/shared/components/Button.tsx";
import {renderJobTypeLabel} from "@/sections/jobs/utils/renderJobTypeLabel.ts";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";

interface JobDetailsCardProps {
    job: Job
    onApply: () => void
}

export const JobDetailsCard = ({job, onApply}: JobDetailsCardProps) => {
    return (
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
                    onClick={onApply}
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
    )
}