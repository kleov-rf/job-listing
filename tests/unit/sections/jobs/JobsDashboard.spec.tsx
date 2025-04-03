import {render} from "@testing-library/react";
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
                <JobsDashboard />
            </JobContext.Provider>
        )

        expect(mockGetJobsUseCase.execute).toHaveBeenCalled()
    })
})