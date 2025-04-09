import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";
import {JobApplication} from "@/modules/jobs/domain/entities/JobApplication.ts";

export class LocalStorageJobApplicationRepository implements JobApplicationRepository {
    save(jobApplication: JobApplication): Promise<void> {
        const jobApplications = new Map();
        const jobApplicationPrimitives = jobApplication.toPrimitives();

        jobApplications.set(jobApplicationPrimitives.jobId, jobApplicationPrimitives);

        localStorage.setItem("job_applications", JSON.stringify(Array.from(jobApplications.entries())));

        return Promise.resolve();
    }
}