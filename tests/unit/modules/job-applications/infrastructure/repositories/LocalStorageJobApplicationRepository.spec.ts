import {describe, expect, it, vi} from "vitest"
import {
    LocalStorageJobApplicationRepository
} from "@/modules/job-applications/infrastructure/repositories/LocalStorageJobApplicationRepository.ts";
import {JobApplicationMother} from "../../domain/entities/JobApplicationMother.ts";

describe('LocalStorageJobApplicationRepository', () => {
    it('should call localStorage to save job application', () => {
        const mockLocalStorage = {
            setItem: vi.fn(),
            getItem: vi.fn().mockReturnValue(null)
        } as unknown as Storage
        Object.defineProperty(window, "localStorage", {
            value: mockLocalStorage
        })
        const mockJobApplication = JobApplicationMother.createDefault()
        const repository = new LocalStorageJobApplicationRepository()

        repository.save(mockJobApplication)

        const expectedJobApplication = JSON.stringify(
            Array.from(new Map().set(mockJobApplication.jobIdValue(), mockJobApplication.toPrimitives()).entries())
        )
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('job_applications', expectedJobApplication)
    })
    it('should call localStorage when saving to get existing job applications', () => {
        const mockLocalStorage = {
            setItem: vi.fn(),
            getItem: vi.fn().mockReturnValue(null)
        } as unknown as Storage
        Object.defineProperty(window, "localStorage", {
            value: mockLocalStorage
        })
        const mockJobApplication = JobApplicationMother.createDefault()
        const repository = new LocalStorageJobApplicationRepository()

        repository.save(mockJobApplication)

        expect(mockLocalStorage.getItem).toHaveBeenCalledWith('job_applications')
    })
    it('should call localStorage when retrieving job applications by job id', () => {
        const mockLocalStorage = {
            setItem: vi.fn(),
            getItem: vi.fn().mockReturnValue(JSON.stringify([]))
        } as unknown as Storage
        Object.defineProperty(window, "localStorage", {
            value: mockLocalStorage
        })
        const mockJobApplication = JobApplicationMother.createDefault()
        const repository = new LocalStorageJobApplicationRepository()

        repository.getByJobId(mockJobApplication.jobId)

        expect(mockLocalStorage.getItem).toHaveBeenCalledWith('job_applications')
    })
    it('should return job applications by job id', async () => {
        const mockJobApplication = JobApplicationMother.createDefault()
        const mockLocalStorage = {
            setItem: vi.fn(),
            getItem: vi.fn().mockReturnValue(
                JSON.stringify(
                    Array.from(
                        new Map().set(mockJobApplication.jobIdValue(), mockJobApplication.toPrimitives()).entries())
                )
            )
        } as unknown as Storage
        Object.defineProperty(window, "localStorage", {
            value: mockLocalStorage
        })
        const repository = new LocalStorageJobApplicationRepository()

        const jobApplications = await repository.getByJobId(mockJobApplication.jobId)

        expect(jobApplications).toEqual([mockJobApplication])
    })
})