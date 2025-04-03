export interface APIJobDTO {
    id: number
    job_title: string
    company: string
    short_location: string
    employment_statuses: string[]
    long_description: string
}

export interface APIJobsResponseDTO {
    data: APIJobDTO[]
}