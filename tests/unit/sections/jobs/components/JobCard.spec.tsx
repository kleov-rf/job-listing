import {JobCard} from "@/sections/jobs/components/JobCard.tsx";
import {render, screen} from "@testing-library/react";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {describe, it, expect} from "vitest";

describe('JobCard', () => {
    it('should show job details', () => {
        const mockJob = Job.create({
            id: '1',
            title: 'Software Engineer',
            description: 'Develop software applications',
            location: 'Remote',
            type: JobTypeEnum.FULL_TIME,
            companyName: 'Tech Company',
        })

        render(<JobCard job={mockJob}/>)

        expect(screen.getByTestId('job-title')).toBeInTheDocument()
        expect(screen.getByText('Software Engineer')).toBeInTheDocument()
        expect(screen.getByTestId('job-company-name')).toBeInTheDocument()
        expect(screen.getByText('Tech Company')).toBeInTheDocument()
        expect(screen.getByTestId('job-location')).toBeInTheDocument()
        expect(screen.getByText('Remote')).toBeInTheDocument()
        expect(screen.getByTestId('job-type')).toBeInTheDocument()
        expect(screen.getByText('Full-Time')).toBeInTheDocument()
        expect(screen.getByTestId('job-description')).toBeInTheDocument()
        expect(screen.getByText('Develop software applications')).toBeInTheDocument()
    })
})