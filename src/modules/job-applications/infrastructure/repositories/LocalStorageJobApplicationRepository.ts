import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";
import {SaveJobApplicationDTO} from "@/modules/job-applications/application/dtos.ts";

export class LocalStorageJobApplicationRepository implements JobApplicationRepository {
    save(jobApplication: SaveJobApplicationDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }

}