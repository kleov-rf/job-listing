import {describe, expect, it, vi} from "vitest";
import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {GetJobByIdUseCase} from "@/modules/jobs/application/use-cases/GetJobByIdUseCase.ts";
import {JobMother} from "../../domain/entities/JobMother.ts";
import {JobId} from "@/modules/jobs/domain/value-objects";

describe('GetJobByIdUseCase', () => {
    it('should call repository to find job by id', async () => {
        const mockJobRepository = {
            findById: vi.fn()
        } as unknown as JobRepository;
        const getJobByIdUseCase = new GetJobByIdUseCase(mockJobRepository);
        const jobId = '12345';

        await getJobByIdUseCase.execute(jobId);

        expect(mockJobRepository.findById).toHaveBeenCalledWith(new JobId(jobId));
    })
    it('should return job if found', async () => {
        const mockJobId = '12345';
        const mockJob = JobMother.createWithCustomValues({
            id: mockJobId
        });
        const mockJobRepository = {
            findById: vi.fn().mockResolvedValue([mockJob])
        } as unknown as JobRepository;
        const getJobByIdUseCase = new GetJobByIdUseCase(mockJobRepository);

        const result = await getJobByIdUseCase.execute(mockJobId);

        expect(result).toEqual([mockJob]);
    });
})