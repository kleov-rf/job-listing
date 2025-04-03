import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";

export class APIJobRepository implements JobRepository {
    async findAll(): Promise<Job[]> {
        await fetch('https://api.theirstack.com/v1/jobs/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
            body: JSON.stringify({
                page: 0,
                limit: 25,
                blur_company_data: true,
                job_country_code_or: ['US'],
                posted_at_max_age_days: 7,
            }),
        })

        return []
    }
}