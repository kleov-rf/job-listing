import {describe, expect, it} from "vitest";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";
import {render, screen} from "@testing-library/react";
import {JobList} from "@/sections/jobs/components/JobList.tsx";

describe('JobList', () => {
    it('should show jobs', async () => {
        const mockRetrievedJobs = [
            Job.create({
                id: '1',
                title: 'Software Engineer',
                description: 'Develop software applications',
                location: 'Remote',
                type: JobTypeEnum.FULL_TIME,
                companyName: 'Tech Company',
            }),
            Job.create({
                id: '2',
                title: 'Data Scientist',
                description: 'Analyze data and build models',
                location: 'Remote',
                type: JobTypeEnum.PART_TIME,
                companyName: 'Data Corp',
            }),
        ];

        render(<JobList jobs={mockRetrievedJobs}/>)

        const jobCards = await screen.findAllByTestId('job-card');
        expect(jobCards).toHaveLength(mockRetrievedJobs.length);
    })
})