import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";
import { JobApplication } from "@/modules/jobs/domain/entities/JobApplication";

export class LocalStorageJobApplicationRepository implements JobApplicationRepository {
    save(jobApplication: JobApplication): Promise<void> {
        throw new Error("Method not implemented.");
    }

}