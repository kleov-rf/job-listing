import {describe, expect, it, vi} from "vitest";
import {APIJobRepository} from "@/modules/jobs/infrastructure/repositories/APIJobRepository.ts";
import {APIJobDTO, APIJobsResponseDTO} from "@/modules/jobs/infrastructure/dtos/APIJobResponseDTO.ts";
import {JobEntityMapper} from "@/modules/jobs/infrastructure/mappers/JobEntityMapper.ts";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects/JobType.ts";

describe('APIJobRepository', () => {
    it('should call API with default options to find all jobs', async () => {
        const jobRepository = new APIJobRepository()
        const mockFetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({ok: true, data: []} as APIJobsResponseDTO),
        })
        global.fetch = mockFetch

        await jobRepository.findAll()

        expect(mockFetch).toHaveBeenCalledWith('https://api.theirstack.com/v1/jobs/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
            body: JSON.stringify({
                page: 0,
                limit: 25,
                blur_company_data: true,
                job_country_code_or: ["US"],
                posted_at_max_age_days: 7
            })
        })
    })
    it('should call to map API response to domain job', async () => {
        const mockAPIJobOne = {
            id: 1,
            job_title: "Senior Accountant",
            company: 'Tech Corp',
            short_location: "Atlanta, GA",
            employment_statuses: ['Full-time'],
        } as APIJobDTO;
        const mockAPIJobTwo = {
            id: 2,
            job_title: "Junior Developer",
            company: 'Dev Inc',
            short_location: "New York, NY",
            employment_statuses: ['Part-time'],
        }
        const mockAPIResponse = {
            ok: true,
            data: [mockAPIJobOne, mockAPIJobTwo],
        } as APIJobsResponseDTO;
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue(mockAPIResponse),
        })
        vi.spyOn(JobEntityMapper, 'toDomain')
        const jobRepository = new APIJobRepository()

        await jobRepository.findAll()

        expect(JobEntityMapper.toDomain).toHaveBeenCalledWith(mockAPIJobOne);
        expect(JobEntityMapper.toDomain).toHaveBeenCalledWith(mockAPIJobTwo);
    })
    it('should return mapped jobs', async () => {
        const mockSingleValueResponseValue = {ok: true, data: [null as unknown as APIJobDTO]} as APIJobsResponseDTO;
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue(mockSingleValueResponseValue),
        })
        const mappedJob = Job.create({
            id: '1',
            title: 'Senior Accountant',
            companyName: 'Tech Corp',
            location: 'Atlanta, GA',
            type: JobTypeEnum.FULL_TIME,
            description: 'Responsible for financial reporting.'
        });
        vi.spyOn(JobEntityMapper, 'toDomain').mockReturnValue(mappedJob)
        const jobRepository = new APIJobRepository()

        const jobs = await jobRepository.findAll()

        expect(jobs).toEqual([mappedJob])
    })
    it('should return empty array when request is not successful', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({ok: false}),
        })
        const jobRepository = new APIJobRepository()

        const jobs = await jobRepository.findAll()

        expect(jobs).toEqual([])
    })
})