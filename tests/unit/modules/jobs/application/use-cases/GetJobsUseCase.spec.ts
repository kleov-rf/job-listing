import {describe, expect, it, vi} from "vitest";
import {GetJobsUseCase} from "@/modules/jobs/application/use-cases/GetJobsUseCase";
import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository";
import {JobMother} from "../../domain/entities/JobMother.ts";

describe('GetJobsUseCase', () => {
    it('should call repository to find all jobs', async () => {
        const mockJobRepository = {
            findAll: vi.fn().mockResolvedValue([]),
        } as unknown as JobRepository
        const getJobsUseCase = new GetJobsUseCase(mockJobRepository)

        await getJobsUseCase.execute()

        expect(mockJobRepository.findAll).toHaveBeenCalled()
    })
    it('should return jobs from repository', async () => {
        const mockJobs = [JobMother.createDefault()]
        const mockJobRepository = {
            findAll: vi.fn().mockResolvedValue(mockJobs),
        } as unknown as JobRepository
        const getJobsUseCase = new GetJobsUseCase(mockJobRepository)

        const result = await getJobsUseCase.execute()

        expect(result).toEqual(mockJobs)
    })
})