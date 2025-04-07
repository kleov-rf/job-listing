import {render, waitFor, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {JobContextType, JobContext} from "@/sections/context/JobContext";
import {JobsDashboard} from "@/sections/jobs/JobsDashboard";

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
                <JobsDashboard/>
            </JobContext.Provider>
        )

        expect(mockGetJobsUseCase.execute).toHaveBeenCalled()
    })
    it('should call to get jobs only once', async () => {
        const mockGetJobsUseCase = {
            execute: vi.fn().mockResolvedValue([])
        }
        const mockJobContext = {
            getJobsUseCase: mockGetJobsUseCase,
        } as unknown as JobContextType

        render(
            <JobContext.Provider value={mockJobContext}>
                <JobsDashboard/>
            </JobContext.Provider>
        )

        expect(mockGetJobsUseCase.execute).toHaveBeenCalledTimes(1)

        await waitFor(() => {
            expect(mockGetJobsUseCase.execute).not.toHaveBeenCalledTimes(2)
        })
    })
    it('should show empty message when no job is retrieved', async () => {
        const mockGetJobsUseCase = {
            execute: vi.fn().mockResolvedValue([])
        }
        const mockJobContext = {
            getJobsUseCase: mockGetJobsUseCase,
        } as unknown as JobContextType

        render(
            <JobContext.Provider value={mockJobContext}>
                <JobsDashboard/>
            </JobContext.Provider>
        )

        const emptyMessage = screen.getByText('No jobs found.')
        expect(emptyMessage).toBeInTheDocument()
    })
})