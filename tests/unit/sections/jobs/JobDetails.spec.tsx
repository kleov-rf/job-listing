import {describe, expect, it, vi} from "vitest";
import {JobContext, JobContextType} from "@/sections/context/JobContext.tsx";
import {act, render, screen, waitFor} from "@testing-library/react";
import {JobDetails} from "@/sections/jobs/JobDetails";
import {JobMother} from "../../modules/jobs/domain/entities/JobMother.ts";
import {BrowserRouter as Router} from "react-router-dom";
import {JobApplicationMother} from "../../modules/job-applications/domain/entities/JobApplicationMother.ts";

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: vi.fn().mockReturnValue({id: 'job-id-param'}),
    };
});

describe('JobDetails', () => {
    it('should fetch job details on mount', async () => {
        const mockGetJobByIdUseCase = {
            execute: vi.fn().mockResolvedValue([])
        }

        const mockJobContext = {
            getJobByIdUseCase: mockGetJobByIdUseCase,
            getJobApplicationByJobId: {
                execute: vi.fn()
            }
        } as unknown as JobContextType

        render(
            <Router>
                <JobContext.Provider value={mockJobContext}>
                    <JobDetails/>
                </JobContext.Provider>
            </Router>
        )

        await waitFor(() => {
            expect(mockGetJobByIdUseCase.execute).toHaveBeenCalled();
        })

        expect(mockGetJobByIdUseCase.execute).toHaveBeenCalledWith('job-id-param');
    })
    it('should redirect to home when back button is clicked', async () => {
        const mockRetrievedJob = JobMother.createDefault();
        const mockGetJobByIdUseCase = {
            execute: vi.fn().mockResolvedValue([
                mockRetrievedJob
            ])
        }
        const mockJobContext = {
            getJobByIdUseCase: mockGetJobByIdUseCase,
            getJobApplicationByJobId: {
                execute: vi.fn()
            }
        } as unknown as JobContextType

        render(
            <Router>
                <JobContext.Provider value={mockJobContext}>
                    <JobDetails/>
                </JobContext.Provider>
            </Router>
        )

        await waitFor(() => {
            expect(mockGetJobByIdUseCase.execute).toHaveBeenCalled()
        })

        const applyNowButton = screen.getByText('Back to Listings')
        act(() => {
            applyNowButton.click()
        })

        expect(window.location.pathname).toBe(`/`)
    })
    it('should show skeleton while loading', async () => {
        const mockGetJobByIdUseCase = {
            execute: vi.fn().mockResolvedValue([])
        }

        const mockJobContext = {
            getJobByIdUseCase: mockGetJobByIdUseCase,
            getJobApplicationByJobId: {
                execute: vi.fn()
            }
        } as unknown as JobContextType

        render(
            <Router>
                <JobContext.Provider value={mockJobContext}>
                    <JobDetails/>
                </JobContext.Provider>
            </Router>
        )

        const skeletonLoader = screen.getByRole('status')
        expect(skeletonLoader).toBeInTheDocument()
    })
    it('should show empty message when no job found', async () => {
        const mockGetJobByIdUseCase = {
            execute: vi.fn().mockResolvedValue([])
        }

        const mockJobContext = {
            getJobByIdUseCase: mockGetJobByIdUseCase,
            getJobApplicationByJobId: {
                execute: vi.fn()
            }
        } as unknown as JobContextType

        render(
            <Router>
                <JobContext.Provider value={mockJobContext}>
                    <JobDetails/>
                </JobContext.Provider>
            </Router>
        )

        await waitFor(() => {
            expect(mockGetJobByIdUseCase.execute).toHaveBeenCalled();
        })

        expect(screen.getByText("Sorry! We couldn't find this job.")).toBeInTheDocument()
    })
    it('should show application form modal when clicking on "Apply Now"', async () => {
        const mockRetrievedJob = JobMother.createDefault();
        const mockGetJobByIdUseCase = {
            execute: vi.fn().mockResolvedValue([
                mockRetrievedJob
            ])
        }
        const mockJobContext = {
            getJobByIdUseCase: mockGetJobByIdUseCase,
            getJobApplicationByJobId: {
                execute: vi.fn()
            }
        } as unknown as JobContextType

        render(
            <Router>
                <JobContext.Provider value={mockJobContext}>
                    <JobDetails/>
                </JobContext.Provider>
            </Router>
        )

        await waitFor(() => {
            expect(mockGetJobByIdUseCase.execute).toHaveBeenCalled()
        })

        const applyNowButton = screen.getByText('Apply Now')
        act(() => {
            applyNowButton.click()
        })

        expect(screen.getByText('Apply for this position')).toBeInTheDocument()
    })
    it('should verify if the job is already applied on mount', async () => {
        const mockRetrievedJob = JobMother.createDefault();
        const mockGetJobByIdUseCase = {
            execute: vi.fn().mockResolvedValue([
                mockRetrievedJob
            ])
        }
        const mockGetJobApplicationByJobId = {
            execute: vi.fn().mockResolvedValue(true)
        }
        const mockJobContext = {
            getJobByIdUseCase: mockGetJobByIdUseCase,
            getJobApplicationByJobId: mockGetJobApplicationByJobId
        } as unknown as JobContextType

        render(
            <Router>
                <JobContext.Provider value={mockJobContext}>
                    <JobDetails/>
                </JobContext.Provider>
            </Router>
        )

        expect(mockGetJobApplicationByJobId.execute).toHaveBeenCalled()
    })
    it('should show "Already applied" message when job is already applied', async () => {
        const mockRetrievedJob = JobMother.createDefault();
        const mockGetJobByIdUseCase = {
            execute: vi.fn().mockResolvedValue([
                mockRetrievedJob
            ])
        }
        const mockGetJobApplicationByJobId = {
            execute: vi.fn().mockResolvedValue([JobApplicationMother.createDefault()])
        }
        const mockJobContext = {
            getJobByIdUseCase: mockGetJobByIdUseCase,
            getJobApplicationByJobId: mockGetJobApplicationByJobId
        } as unknown as JobContextType

        render(
            <Router>
                <JobContext.Provider value={mockJobContext}>
                    <JobDetails/>
                </JobContext.Provider>
            </Router>
        )

        await waitFor(() => {
            expect(mockGetJobApplicationByJobId.execute).toHaveBeenCalled()
        })

        expect(screen.getByText('Already applied')).toBeInTheDocument()
    })
});