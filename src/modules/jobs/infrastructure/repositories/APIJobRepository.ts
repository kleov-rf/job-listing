import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";

export class APIJobRepository implements JobRepository {
    private readonly apiUrl = 'https://api.theirstack.com/v1/jobs/search'
    private readonly apiKey = import.meta.env.VITE_API_KEY

    async findAll(): Promise<Job[]> {
        await this.fetchJobs();

        return []
    }

    private async fetchJobs() {
        const defaultOptions = {
            page: 0,
            limit: 25,
            blur_company_data: true,
            job_country_code_or: ['US'],
            posted_at_max_age_days: 7,
        };
        await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify(defaultOptions),
        })
    }
}