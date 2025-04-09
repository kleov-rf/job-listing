import {describe, expect, it, vi} from "vitest"
import {SubmitApplicationUseCase} from "@/modules/job-applications/application/use-cases/SubmitApplicationUseCase.ts";
import {JobApplicationRepository} from "@/modules/job-applications/domain/repositories/JobApplicationRepository.ts";
import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {Primitives} from "@codelytv/primitives-type";
import {JobApplication} from "@/modules/job-applications/domain/entities/JobApplication.ts";
import {v4} from "uuid";
import {JobId} from "@/modules/jobs/domain/value-objects";
import {JobMother} from "../../../jobs/domain/entities/JobMother.ts";
import {waitFor} from "@testing-library/react";

describe('SubmitApplicationUseCase', () => {
    it('should call to save application', async () => {
        const mockJobApplicationRepository = {
            save: vi.fn(),
        } as unknown as JobApplicationRepository;
        const mockJobRepository = {
            findById: vi.fn().mockResolvedValue([JobMother.createDefault()])
        } as unknown as JobRepository;

        const jobApplicationData = {
            id: v4().toString(),
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            cvUrl: 'https://example.com/cv.pdf',
            jobId: '1234',
        } as Primitives<JobApplication>;
        const submitApplicationUseCase = new SubmitApplicationUseCase(mockJobApplicationRepository, mockJobRepository)

        submitApplicationUseCase.execute(jobApplicationData)

        await waitFor(() => {
            expect(mockJobRepository.findById).toHaveBeenCalled()
        })

        expect(mockJobApplicationRepository.save).toHaveBeenCalledWith(JobApplication.create(jobApplicationData))
    })
    it('should call to verify if job exists', () => {
        const mockJobApplicationRepository = {
            save: vi.fn(),
        } as unknown as JobApplicationRepository;
        const mockJobRepository = {
            findById: vi.fn().mockResolvedValue([])
        } as unknown as JobRepository;

        const jobApplicationData = {
            id: v4().toString(),
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            cvUrl: 'https://example.com/cv.pdf',
            jobId: '1234',
        } as Primitives<JobApplication>;
        const submitApplicationUseCase = new SubmitApplicationUseCase(mockJobApplicationRepository, mockJobRepository)

        submitApplicationUseCase.execute(jobApplicationData)

        const expectedJobId = new JobId(jobApplicationData.jobId);
        expect(mockJobRepository.findById).toHaveBeenCalledWith(expectedJobId)
    })
    it('should not call to save job application if job does not exist', async () => {
        const mockJobApplicationRepository = {
            save: vi.fn(),
        } as unknown as JobApplicationRepository;
        const mockJobRepository = {
            findById: vi.fn().mockResolvedValue([])
        } as unknown as JobRepository;

        const jobApplicationData = {
            id: v4().toString(),
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            cvUrl: 'https://example.com/cv.pdf',
            jobId: '1234',
        } as Primitives<JobApplication>;
        const submitApplicationUseCase = new SubmitApplicationUseCase(mockJobApplicationRepository, mockJobRepository)

        submitApplicationUseCase.execute(jobApplicationData)

        await waitFor(() => {
            expect(mockJobRepository.findById).toHaveBeenCalled()
        })

        expect(mockJobApplicationRepository.save).not.toHaveBeenCalled()
    })
})