import {describe, expect, it, vi } from "vitest"
import {
    GetJobApplicationByJobIdUseCase
} from "@/modules/job-applications/application/use-cases/GetJobApplicationByJobIdUseCase.ts";
import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";
import {JobId} from "@/modules/jobs/domain/value-objects";
import {JobApplicationMother} from "../../domain/entities/JobApplicationMother.ts";

describe('GetJobApplicationByJobIdUseCase', () => {
    it('should call to get job application by job id', async () => {
        const mockJobId = 'job-1'
        const jobApplicationRepository = {
            getByJobId: vi.fn(),
        } as unknown as JobApplicationRepository;
        const useCase = new GetJobApplicationByJobIdUseCase(jobApplicationRepository)

        await useCase.execute(mockJobId);

        expect(jobApplicationRepository.getByJobId).toHaveBeenCalledWith(new JobId(mockJobId))
    })
    it('should return job application by job id', async () => {
        const mockJobApplication = JobApplicationMother.createDefault()
        const jobApplicationRepository = {
            getByJobId: vi.fn().mockResolvedValue([mockJobApplication])
        } as unknown as JobApplicationRepository;
        const useCase = new GetJobApplicationByJobIdUseCase(jobApplicationRepository)

        const retrievedJobApplication = await useCase.execute(mockJobApplication.jobIdValue());

        expect(retrievedJobApplication).toEqual([mockJobApplication])
    })
})