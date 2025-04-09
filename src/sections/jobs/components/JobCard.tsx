import {FC} from "react";
import {motion} from 'framer-motion'
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {Card, CardContent, CardHeader} from "@/sections/shared/components/Card.tsx";
import {renderJobTypeLabel} from "@/sections/jobs/utils/renderJobTypeLabel.ts";

interface JobCardProps {
    job: Job,
    onApply: (jobId: string) => void
}

export const JobCard: FC<JobCardProps> = ({job, onApply}) => {
    return (
        <motion.li
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            transition={{duration: 0.2}}
            data-testid="job-card"
        >
            <Card className="flex flex-col justify-between h-full">
                <CardHeader>
                    <h2 className="text-lg font-semibold" data-testid="job-title">{job.titleValue()}</h2>
                    <p className="text-sm text-muted-foreground"
                       data-testid="job-company-name">{job.companyNameValue()}</p>
                </CardHeader>
                <CardContent>
                    <dl className="space-y-2">
                        <dt className="font-medium text-sm text-muted-foreground">
                            Location
                        </dt>
                        <dd className="text-sm text-muted-foreground" data-testid="job-location">
                            {job.locationValue() || '-'}
                        </dd>
                        <dt className="font-medium text-sm text-muted-foreground">
                            Type
                        </dt>
                        <dd className="text-sm text-muted-foreground" data-testid="job-type">
                            {renderJobTypeLabel(job.typeValue())}
                        </dd>
                        <dt className="font-medium text-sm text-muted-foreground">
                            Description
                        </dt>
                        <dd className="text-sm text-muted-foreground line-clamp-2" data-testid="job-description">
                            {job.descriptionValue() || '-'}
                        </dd>
                    </dl>
                </CardContent>
            </Card>
        </motion.li>
    )
}