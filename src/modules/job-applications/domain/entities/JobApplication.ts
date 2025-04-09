import {Primitives} from "@codelytv/primitives-type";
import {CVUrl, Email, JobApplicationId, Name} from "@/modules/job-applications/domain/value-objects";
import {JobId} from "@/modules/jobs/domain/value-objects";

export class JobApplication {
    private constructor(
        readonly id: JobApplicationId,
        readonly name: Name,
        readonly email: Email,
        readonly cvUrl: CVUrl,
        readonly jobId: JobId
    ) {
    }

    public static create(
        {
            id,
            name,
            email,
            cvUrl,
            jobId,
        }: Primitives<JobApplication>): JobApplication {
        return new JobApplication(
            new JobApplicationId(id),
            new Name(name),
            new Email(email),
            new CVUrl(cvUrl),
            new JobId(jobId)
        )
    }

    idValue(): string {
        return this.id.getValue()
    }

    nameValue(): string {
        return this.name.getValue()
    }

    emailValue(): string {
        return this.email.getValue()
    }

    cvUrlValue(): string {
        return this.cvUrl.getValue()
    }

    jobIdValue(): string {
        return this.jobId.getValue()
    }

    toPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value,
            cvUrl: this.cvUrl.value,
            jobId: this.jobId.value
        }
    }
}