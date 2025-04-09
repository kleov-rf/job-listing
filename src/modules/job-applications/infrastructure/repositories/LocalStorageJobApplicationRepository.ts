import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";
import {JobApplication} from "@/modules/job-applications/domain/entities/JobApplication.ts";
import {Primitives} from "@codelytv/primitives-type";
import { JobId } from "@/modules/jobs/domain/value-objects";

export class LocalStorageJobApplicationRepository implements JobApplicationRepository {
    save(jobApplication: JobApplication): Promise<void> {
        const jobApplications = this.getAllFromLocalStorage();
        const jobApplicationPrimitives = jobApplication.toPrimitives();

        jobApplications.set(jobApplicationPrimitives.jobId, jobApplicationPrimitives);

        localStorage.setItem("job_applications", JSON.stringify(Array.from(jobApplications.entries())));

        return Promise.resolve();
    }

    getByJobId(jobId: JobId): Promise<JobApplication[]> {
        const jobApplications = this.getAllFromLocalStorage()
        const jobApplication = jobApplications.get(jobId.getValue());

        return Promise.resolve([JobApplication.create(jobApplication)])
    }

    private getAllFromLocalStorage(): Map<string, Primitives<JobApplication>> {
        const jobApplications = localStorage.getItem("job_applications");

        if (jobApplications === null) {
            return new Map();
        }

        return new Map(JSON.parse(jobApplications) as Iterable<[string, Primitives<JobApplication>]>);
    }
}