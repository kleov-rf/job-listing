import {describe, expect, it, vi} from "vitest";
import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {GetJobByIdUseCase} from "@/modules/jobs/application/use-cases/GetJobByIdUseCase.ts";

describe('GetJobByIdUseCase', () => {
    it('should call repository to find job by id', async () => {
        const mockJobRepository = {
            findById: vi.fn()
        } as unknown as JobRepository;
        const getJobByIdUseCase = new GetJobByIdUseCase(mockJobRepository);
        const jobId = '12345';

        await getJobByIdUseCase.execute(jobId);

        expect(mockJobRepository.findById).toHaveBeenCalledWith(jobId);
    })
})