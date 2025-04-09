import {describe, expect, it, vi } from "vitest"
import {SubmitApplicationUseCase} from "@/modules/job-applications/application/use-cases/SubmitApplicationUseCase.ts";
import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";
import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {Primitives} from "@codelytv/primitives-type";
import {JobApplication} from "@/modules/jobs/domain/entities/JobApplication.ts";

describe('SubmitApplicationUseCase', () => {
    it('should call to save application', () => {
        const mockJobApplicationRepository = {
            save: vi.fn(),
        } as unknown as JobApplicationRepository;
        const mockJobRepository = vi.fn() as unknown as JobRepository;

        const jobApplicationData = {
            id: 'dc8b2f9e-8ce4-4d4c-97a5-165815bc3678',
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            cvUrl: 'https://example.com/cv.pdf',
            jobId: '1234',
        } as Primitives<JobApplication>;
        const submitApplicationUseCase = new SubmitApplicationUseCase(mockJobApplicationRepository, mockJobRepository)

        submitApplicationUseCase.execute(jobApplicationData)

        expect(mockJobApplicationRepository.save).toHaveBeenCalledWith(JobApplication.create(jobApplicationData))
    })
})