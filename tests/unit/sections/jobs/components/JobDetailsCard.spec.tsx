import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {JobMother} from "../../../modules/jobs/domain/entities/JobMother.ts";
import {renderJobTypeLabel} from "@/sections/jobs/utils/renderJobTypeLabel.ts";
import {JobDetailsCard} from "@/sections/jobs/components/JobDetailsCard.tsx";

describe('JobDetails', () => {
    it('should display job details', async () => {
        const mockJob = JobMother.createDefault()

        render(<JobDetailsCard job={mockJob} onApply={vi.fn()}/>)

        expect(screen.getByText(mockJob.titleValue())).toBeInTheDocument();
        expect(screen.getByText(mockJob.companyNameValue())).toBeInTheDocument();
        expect(screen.getByText(mockJob.locationValue())).toBeInTheDocument();
        expect(screen.getByText(renderJobTypeLabel(mockJob.typeValue()))).toBeInTheDocument();
        expect(screen.getByText(mockJob.descriptionValue())).toBeInTheDocument();
    })
})