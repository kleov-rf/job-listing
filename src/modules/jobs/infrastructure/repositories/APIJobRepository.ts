import {JobRepository} from "@/modules/jobs/domain/repositories/JobRepository.ts";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {APIJobsResponseDTO} from "@/modules/jobs/infrastructure/dtos/APIJobResponseDTO.ts";
import {JobEntityMapper} from "@/modules/jobs/infrastructure/mappers/JobEntityMapper.ts";

interface APIOptions {
    job_id_or?: number[]
}

export class APIJobRepository implements JobRepository {
    private readonly apiUrl = 'https://api.theirstack.com/v1/jobs/search'
    private readonly apiKey = import.meta.env.VITE_API_KEY

    async findAll(): Promise<Job[]> {
        const response = await this.fetchJobs();

        if (!response.ok) return []

        const { data } = await response.json() as APIJobsResponseDTO;
        return data.map(apiJob => JobEntityMapper.toDomain(apiJob))
    }

    async findById(id: string): Promise<Job | null> {
        await this.fetchJobs({ job_id_or: [parseInt(id)] });
        return null;
    }

    private async fetchJobs(extraOptions: APIOptions = {}): Promise<Response> {
        const defaultOptions = {
            page: 0,
            limit: 25,
            blur_company_data: true,
            job_country_code_or: ['US'],
            posted_at_max_age_days: 7,
        };

        return await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                ...defaultOptions,
                ...extraOptions,
            }),
        });
    }
}