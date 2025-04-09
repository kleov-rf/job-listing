import {describe, expect, it, vi } from "vitest"
import {SubmitApplicationUseCase} from "@/modules/job-applications/application/use-cases/SubmitApplicationUseCase.ts";
import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";
import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {JobApplicationMother} from "../../../jobs/domain/entities/JobApplicationMother.ts";
import {SaveJobApplicationDTO} from "@/modules/job-applications/application/dtos.ts";
import {JobId} from "@/modules/jobs/domain/value-objects";

describe('SubmitApplicationUseCase', () => {
    it('should call to save application', () => {
        const mockJobApplication = JobApplicationMother.createDefault()
        const mockJobId = '123';
        const mockJobApplicationRepository = {
            save: vi.fn(),
        } as unknown as JobApplicationRepository;
        const mockJobRepository = vi.fn() as unknown as JobRepository;
        const submitApplicationUseCase = new SubmitApplicationUseCase(mockJobApplicationRepository, mockJobRepository)

        submitApplicationUseCase.execute(mockJobApplication, mockJobId)

        const mockApplicationData = {
            jobId: new JobId(mockJobId),
            jobApplication: mockJobApplication
        } as SaveJobApplicationDTO
        expect(mockJobApplicationRepository.save).toHaveBeenCalledWith(mockApplicationData)
    })
})