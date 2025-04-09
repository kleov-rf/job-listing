import {Primitives} from "@codelytv/primitives-type";
import {CVUrl, Email, JobApplicationId, Name} from "@/modules/jobs/domain/value-objects";

export class JobApplication {
    private constructor(
        readonly id: JobApplicationId,
        readonly name: Name,
        readonly email: Email,
        readonly cvUrl: CVUrl,
    ) {
    }

    public static create(
        {
            id,
            name,
            email,
            cvUrl,
        }: Primitives<JobApplication>): JobApplication {
        return new JobApplication(
            new JobApplicationId(id),
            new Name(name),
            new Email(email),
            new CVUrl(cvUrl),
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
}