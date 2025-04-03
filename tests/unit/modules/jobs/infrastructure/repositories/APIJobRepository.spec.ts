import {describe, expect, it, vi} from "vitest";
import {APIJobRepository} from "@/modules/jobs/infrastructure/repositories/APIJobRepository.ts";
import {APIJobDTO, APIJobsResponseDTO} from "@/modules/jobs/infrastructure/dtos/APIJobResponseDTO.ts";
import {JobEntityMapper} from "@/modules/jobs/infrastructure/mappers/JobEntityMapper.ts";

describe('APIJobRepository', () => {
    it('should call API with default options to find all jobs', async () => {
        const jobRepository = new APIJobRepository()
        const mockFetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({data: []} as APIJobsResponseDTO),
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
        const mockAPIJob = {
            id: 1,
            job_title: "Senior Accountant",
            company: 'Tech Corp',
            short_location: "Atlanta, GA",
            employment_statuses: ['Full-time'],
        } as APIJobDTO;
        const mockAPIResponse = {
            data: [mockAPIJob],
        } as APIJobsResponseDTO;
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue(mockAPIResponse),
        })
        vi.spyOn(JobEntityMapper, 'toDomain')
        const jobRepository = new APIJobRepository()

        await jobRepository.findAll()

        expect(JobEntityMapper.toDomain).toHaveBeenCalledWith(mockAPIJob);
    })
})