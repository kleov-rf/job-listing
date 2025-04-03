import {describe, expect, it, vi} from "vitest";
import {GetJobsUseCase} from "../../../../../../src/modules/jobs/application/use-cases/GetJobsUseCase";
import {JobRepository} from "../../../../../../src/modules/jobs/domain/repositories/JobRepository";

describe('GetJobsUseCase', () => {
    it('should call repository to find all jobs', async () => {
        const mockJobRepository = {
            findAll: vi.fn().mockResolvedValue([]),
        } as unknown as JobRepository
        const getJobsUseCase = new GetJobsUseCase(mockJobRepository)

        await getJobsUseCase.execute()

        expect(mockJobRepository.findAll).toHaveBeenCalled()
    })
})