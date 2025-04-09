import {JobCard} from "@/sections/jobs/components/JobCard.tsx";
import {render, screen} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import {JobMother} from "../../../modules/jobs/domain/entities/JobMother.ts";
import {renderJobTypeLabel} from "@/sections/jobs/utils/renderJobTypeLabel.ts";

describe('JobCard', () => {
    it('should show job details', () => {
        const mockJob = JobMother.createDefault()

        render(<JobCard job={mockJob}/>)

        expect(screen.getByTestId('job-title')).toBeInTheDocument()
        expect(screen.getByText(mockJob.titleValue())).toBeInTheDocument()
        expect(screen.getByTestId('job-company-name')).toBeInTheDocument()
        expect(screen.getByText(mockJob.companyNameValue())).toBeInTheDocument()
        expect(screen.getByTestId('job-location')).toBeInTheDocument()
        expect(screen.getByText(mockJob.locationValue())).toBeInTheDocument()
        expect(screen.getByTestId('job-type')).toBeInTheDocument()
        expect(screen.getByText(renderJobTypeLabel(mockJob.typeValue()))).toBeInTheDocument()
        expect(screen.getByTestId('job-description')).toBeInTheDocument()
        expect(screen.getByText(mockJob.descriptionValue())).toBeInTheDocument()
    })
    it('should show "-" when location is not provided', () => {
        const mockJob = JobMother.createWithCustomValues({
            location: undefined,
        })

        render(<JobCard job={mockJob}/>)

        expect(screen.getByTestId('job-location')).toBeInTheDocument()
        expect(screen.getByText('-')).toBeInTheDocument()
    })
})