import {Card, CardContent, CardHeader} from "@/sections/shared/components/Card.tsx";
import {Button} from "@/sections/shared/components/Button.tsx";
import {renderJobTypeLabel} from "@/sections/jobs/utils/renderJobTypeLabel.ts";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";

interface JobDetailsCardProps {
    job: Job,
    onApply: () => void,
    hasApplied?: boolean
}

export const JobDetailsCard = ({job, onApply, hasApplied}: JobDetailsCardProps) => {
    return (
        <Card className="pb-6">
            <CardHeader className="flex flex-col gap-2">
                {hasApplied && (
                    <span
                        data-testid="job-details-applied-label"
                        className="w-fit bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                        Already applied
                    </span>
                )}
                <article className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold" data-testid="job-details-title">{job.titleValue()}</h2>
                <p className="text-muted-foreground">
                    <span data-testid="job-details-company">{job.companyNameValue()}</span>
                    <span className="mx-2">•</span>
                    <span data-testid="job-details-location">{job.locationValue()}</span>
                    <span className="mx-2">•</span>
                    <span
                        className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300"
                        role="status" data-testid="job-details-type"
                    >
                        {renderJobTypeLabel(job.typeValue())}
                    </span>
                </p>
                </article>
                {!hasApplied && (
                    <Button
                        type="button"
                        className="sm:w-44"
                        onClick={onApply}
                        aria-label={`Apply for ${job.titleValue()} at ${job.companyNameValue()}`}
                    >
                        Apply Now
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                <section className="prose max-w-none">
                    <h3 className="text-lg font-medium mb-2">Job Description</h3>
                    <p className="whitespace-pre-line font-base text-md dark:text-zinc-200"
                       data-testid="job-details-description">{job.descriptionValue()}</p>
                </section>
            </CardContent>
        </Card>
    )
}