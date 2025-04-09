import {describe, expect, it, vi} from "vitest";
import {JobContext, JobContextType} from "@/sections/context/JobContext.tsx";
import {render, waitFor} from "@testing-library/react";
import {JobDetails} from "@/sections/jobs/JobDetails";

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
});