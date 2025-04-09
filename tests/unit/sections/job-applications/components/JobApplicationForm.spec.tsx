import {describe, expect, it, vi} from "vitest";
import {JobApplicationForm} from "@/sections/job-applications/components/JobApplicationForm.tsx";
import {render, screen, waitFor} from "@testing-library/react";
import {JobContext, JobContextType} from "@/sections/shared/context/JobContext.tsx";
import {userEvent} from "@testing-library/user-event";
import {JobApplicationMother} from "../../../modules/job-applications/domain/entities/JobApplicationMother.ts";

vi.mock("uuid", () => {
    const actual = vi.importActual("uuid");
    return {
        ...actual,
        v4: () => '1234-5678-9101-1121'
    }
})

describe('JobApplicationForm', () => {
    it('should call to submit application', async () => {
        const mockJobId = '1'
        const mockJobApplication = JobApplicationMother.createWithCustomValues({
            id: '1234-5678-9101-1121',
            jobId: mockJobId
        });
        const mockSubmitApplicationUseCase = {
            execute: vi.fn()
        }

        const mockJobContext = {
            submitApplicationUseCase: mockSubmitApplicationUseCase
        } as unknown as JobContextType

        render(
            <JobContext.Provider value={mockJobContext}>
                <JobApplicationForm isOpen={true} onClose={vi.fn()} jobId={mockJobId} onSubmit={vi.fn()}/>
            </JobContext.Provider>
        )

        const nameInput = screen.getByLabelText('Full Name');
        await userEvent.type(nameInput, mockJobApplication.nameValue());

        const emailInput = screen.getByLabelText('Email');
        await userEvent.type(emailInput, mockJobApplication.emailValue());

        const resumeInput = screen.getByLabelText('CV URL');
        await userEvent.type(resumeInput, mockJobApplication.cvUrlValue());

        const submitButton = screen.getByRole('button', {name: 'Submit application'});
        submitButton.click()

        await waitFor(() => {
            expect(mockSubmitApplicationUseCase.execute).toHaveBeenCalled();
        })

        expect(mockSubmitApplicationUseCase.execute).toHaveBeenCalledWith(mockJobApplication.toPrimitives());
    })
    it('should call when the job application is submitted', async () => {
        const mockJobId = '1'
        const mockJobApplication = JobApplicationMother.createWithCustomValues({
            id: '1234-5678-9101-1121',
            jobId: mockJobId
        });
        const mockSubmitApplicationUseCase = {
            execute: vi.fn()
        }

        const mockJobContext = {
            submitApplicationUseCase: mockSubmitApplicationUseCase
        } as unknown as JobContextType

        const mockOnSubmit = vi.fn()

        render(
            <JobContext.Provider value={mockJobContext}>
                <JobApplicationForm isOpen={true} onClose={vi.fn()} jobId={mockJobId} onSubmit={mockOnSubmit}/>
            </JobContext.Provider>
        )

        const nameInput = screen.getByLabelText('Full Name');
        await userEvent.type(nameInput, mockJobApplication.nameValue());

        const emailInput = screen.getByLabelText('Email');
        await userEvent.type(emailInput, mockJobApplication.emailValue());

        const resumeInput = screen.getByLabelText('CV URL');
        await userEvent.type(resumeInput, mockJobApplication.cvUrlValue());

        const submitButton = screen.getByRole('button', {name: 'Submit application'});
        submitButton.click()

        await waitFor(() => {
            expect(mockSubmitApplicationUseCase.execute).toHaveBeenCalled();
        })

        expect(mockOnSubmit).toHaveBeenCalled()
    })
})