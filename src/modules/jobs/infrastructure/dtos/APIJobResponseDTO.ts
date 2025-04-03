export enum APIEmploymentStatus {
    FULL_TIME = 'Full-time',
    PART_TIME = 'Part-time',
}

export interface APIJobDTO {
    id: number
    job_title: string
    company: string
    short_location: string
    employment_statuses: APIEmploymentStatus[]
    long_description: string
}

export interface APIJobsResponseDTO {
    data: APIJobDTO[]
}