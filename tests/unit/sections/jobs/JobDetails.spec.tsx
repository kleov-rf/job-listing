import {describe, expect, it, vi} from "vitest";
import {JobContext, JobContextType} from "@/sections/context/JobContext.tsx";
import {render, screen, waitFor} from "@testing-library/react";
import {JobDetails} from "@/sections/jobs/JobDetails";
import {JobMother} from "../../modules/jobs/domain/entities/JobMother.ts";

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
            execute: vi.fn()
        }

        const mockJobContext = {
            getJobByIdUseCase: mockGetJobByIdUseCase
        } as unknown as JobContextType

        render(
            <JobContext.Provider value={mockJobContext}>
                <JobDetails/>
            </JobContext.Provider>
        )

        await waitFor(() => {
            expect(mockGetJobByIdUseCase.execute).toHaveBeenCalled();
        })

        expect(mockGetJobByIdUseCase.execute).toHaveBeenCalledWith('job-id-param');
    })
    it('should display job details', async () => {
        const mockJob = JobMother.createDefault()

        const mockGetJobByIdUseCase = {
            execute: vi.fn().mockResolvedValue([mockJob])
        }

        const mockJobContext = {
            getJobByIdUseCase: mockGetJobByIdUseCase
        } as unknown as JobContextType

        render(
            <JobContext.Provider value={mockJobContext}>
                <JobDetails/>
            </JobContext.Provider>
        )

        await waitFor(() => {
            expect(mockGetJobByIdUseCase.execute).toHaveBeenCalled();
        })

        await waitFor(() => {
            expect(screen.getByText(mockJob.titleValue())).toBeInTheDocument();
            expect(screen.getByText(mockJob.companyNameValue())).toBeInTheDocument();
            expect(screen.getByText(mockJob.locationValue())).toBeInTheDocument();
            expect(screen.getByText(mockJob.descriptionValue())).toBeInTheDocument();
        })
    })
});