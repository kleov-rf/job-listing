import {render, waitFor, screen, act} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {JobContextType, JobContext} from "@/sections/context/JobContext";
import {JobsDashboard} from "@/sections/jobs/JobsDashboard";
import {JobMother} from "../../modules/jobs/domain/entities/JobMother.ts";
import {BrowserRouter as Router} from "react-router-dom";

describe('JobsDashboard', () => {
    it('should call to get jobs', () => {
        const mockGetJobsUseCase = {
            execute: vi.fn()
        }
        const mockJobContext = {
            getJobsUseCase: mockGetJobsUseCase,
        } as unknown as JobContextType

        render(
            <Router>
                <JobContext.Provider value={mockJobContext}>
                    <JobsDashboard/>
                </JobContext.Provider>
            </Router>
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
            <Router>
                <JobContext.Provider value={mockJobContext}>
                    <JobsDashboard/>
                </JobContext.Provider>
            </Router>
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
            <Router>
                <JobContext.Provider value={mockJobContext}>
                    <JobsDashboard/>
                </JobContext.Provider>
            </Router>
        )

        const emptyMessage = screen.getByText('No jobs found.')
        expect(emptyMessage).toBeInTheDocument()
    })
    it('should redirect to job details when apply now is clicked', async () => {
        const mockRetrievedJob = JobMother.createDefault();
        const mockGetJobsUseCase = {
            execute: vi.fn().mockResolvedValue([
                mockRetrievedJob
            ])
        }
        const mockJobContext = {
            getJobsUseCase: mockGetJobsUseCase,
        } as unknown as JobContextType

        render(
            <Router>
                <JobContext.Provider value={mockJobContext}>
                    <JobsDashboard/>
                </JobContext.Provider>
            </Router>
        )

        await waitFor(() => {
            expect(mockGetJobsUseCase.execute).toHaveBeenCalled()
        })

        const applyNowButton = screen.getByText('Apply Now')
        act(() => {
            applyNowButton.click()
        })


        expect(window.location.pathname).toBe(`/jobs/${mockRetrievedJob.idValue()}`)
    })
    it('should show skeleton loader when jobs are being fetched', async () => {
        const mockGetJobsUseCase = {
            execute: vi.fn().mockResolvedValue([])
        }
        const mockJobContext = {
            getJobsUseCase: mockGetJobsUseCase,
        } as unknown as JobContextType

        render(
            <Router>
                <JobContext.Provider value={mockJobContext}>
                    <JobsDashboard/>
                </JobContext.Provider>
            </Router>
        )

        const skeletonLoader = screen.getByRole('status')
        expect(skeletonLoader).toBeInTheDocument()
    })
})