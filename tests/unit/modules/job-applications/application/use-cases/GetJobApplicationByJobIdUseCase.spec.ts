import {describe, expect, it, vi } from "vitest"
import {
    GetJobApplicationByJobIdUseCase
} from "@/modules/job-applications/application/use-cases/GetJobApplicationByJobIdUseCase.ts";
import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";
import {JobId} from "@/modules/jobs/domain/value-objects";

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
})