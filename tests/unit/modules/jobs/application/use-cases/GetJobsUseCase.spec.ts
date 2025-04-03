import {describe, expect, it, vi} from "vitest";
import {GetJobsUseCase} from "@/modules/jobs/application/use-cases/GetJobsUseCase";
import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";

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
        const mockJobs = [
            Job.create({
                id: '1',
                title: 'Software Engineer',
                description: 'Develop software applications',
                location: 'Remote',
                type: JobTypeEnum.FULL_TIME,
                companyName: 'Tech Company',
            })
        ]
        const mockJobRepository = {
            findAll: vi.fn().mockResolvedValue(mockJobs),
        } as unknown as JobRepository
        const getJobsUseCase = new GetJobsUseCase(mockJobRepository)

        const result = await getJobsUseCase.execute()

        expect(result).toEqual(mockJobs)
    })
})