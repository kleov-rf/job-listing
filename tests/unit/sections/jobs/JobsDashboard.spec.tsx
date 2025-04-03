import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {JobContextType, JobContext} from "@/sections/context/JobContext";
import {JobsDashboard} from "@/sections/jobs/JobsDashboard";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";

describe('JobsDashboard', () => {
    it('should call to get jobs', () => {
        const mockGetJobsUseCase = {
            execute: vi.fn()
        }
        const mockJobContext = {
            getJobsUseCase: mockGetJobsUseCase,
        } as unknown as JobContextType

        render(
            <JobContext.Provider value={mockJobContext}>
                <JobsDashboard />
            </JobContext.Provider>
        )

        expect(mockGetJobsUseCase.execute).toHaveBeenCalled()
    })
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
        const mockGetJobsUseCase = {
            execute: vi.fn().mockResolvedValue(mockRetrievedJobs)
        }
        const mockJobContext = {
            getJobsUseCase: mockGetJobsUseCase,
        } as unknown as JobContextType

        render(
            <JobContext.Provider value={mockJobContext}>
                <JobsDashboard />
            </JobContext.Provider>
        )

        const jobCards = await screen.findAllByTestId('job-card');
        expect(jobCards).toHaveLength(mockRetrievedJobs.length);
    })
})