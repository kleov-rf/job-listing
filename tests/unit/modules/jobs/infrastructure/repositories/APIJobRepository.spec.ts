import {describe, expect, it, vi} from "vitest";
import {APIJobRepository} from "@/modules/jobs/infrastructure/repositories/APIJobRepository.ts";

describe('APIJobRepository', () => {
    it('should call API with default options to find all jobs', async () => {
        const jobRepository = new APIJobRepository()
        const mockFetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue([]),
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
})