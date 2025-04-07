import {describe, expect, it} from "vitest";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";
import {render, screen} from "@testing-library/react";
import {JobList} from "@/sections/jobs/components/JobList.tsx";
import {userEvent} from "@testing-library/user-event";

describe('JobList', () => {
    it('should show jobs', async () => {
        const mockRetrievedJobs = [
            Job.create({
                id: '1',
                title: 'Software Engineer',
                description: 'Develop software applications',
                location: 'Remote',
                type: JobTypeEnum.FULL_TIME,
                companyName: 'Tech Company',
            }),
            Job.create({
                id: '2',
                title: 'Data Scientist',
                description: 'Analyze data and build models',
                location: 'Remote',
                type: JobTypeEnum.PART_TIME,
                companyName: 'Data Corp',
            }),
        ];

        render(<JobList jobs={mockRetrievedJobs}/>)

        const jobCards = await screen.findAllByTestId('job-card');
        expect(jobCards).toHaveLength(mockRetrievedJobs.length);
    })
    describe('should filter jobs when selecting type', async () => {
        const selectJobTypeOption = async (optionText: string) => {
            const allTypesSelect = screen.getByRole('combobox');
            await userEvent.click(allTypesSelect);

            const option = screen.getByText(optionText, {selector: 'span'});
            await userEvent.click(option);
        }
        it('should show only full-time jobs', async () => {
            const fullTimeRole = 'Software Engineer';
            const fullTimeJobs = [
                Job.create({
                    id: '1',
                    title: fullTimeRole,
                    description: 'Develop software applications',
                    location: 'Remote',
                    type: JobTypeEnum.FULL_TIME,
                    companyName: 'Tech Company',
                }),
            ];
            const partTimeRole = 'Data Scientist';
            const mockRetrievedJobs = [
                ...fullTimeJobs,
                Job.create({
                    id: '2',
                    title: partTimeRole,
                    description: 'Analyze data and build models',
                    location: 'Remote',
                    type: JobTypeEnum.PART_TIME,
                    companyName: 'Data Corp',
                }),
            ];

            render(<JobList jobs={mockRetrievedJobs}/>)

            await selectJobTypeOption('Full-Time');

            const jobCards = await screen.findAllByTestId('job-card');
            expect(jobCards).toHaveLength(fullTimeJobs.length);
            expect(await screen.findByText(fullTimeRole)).toBeInTheDocument();
            expect(screen.queryByText(partTimeRole)).not.toBeInTheDocument();
        })
        it('should show only part-time jobs', async () => {
            const partTimeRole = 'Data Scientist';
            const partTimeJobs = [
                Job.create({
                    id: '2',
                    title: partTimeRole,
                    description: 'Analyze data and build models',
                    location: 'Remote',
                    type: JobTypeEnum.PART_TIME,
                    companyName: 'Data Corp',
                }),
            ];
            const fullTimeRole = 'Software Engineer';
            const mockRetrievedJobs = [
                ...partTimeJobs,
                Job.create({
                    id: '1',
                    title: fullTimeRole,
                    description: 'Develop software applications',
                    location: 'Remote',
                    type: JobTypeEnum.FULL_TIME,
                    companyName: 'Tech Company',
                }),
            ];

            render(<JobList jobs={mockRetrievedJobs}/>)

            await selectJobTypeOption('Part-Time');

            const jobCards = await screen.findAllByTestId('job-card');
            expect(jobCards).toHaveLength(partTimeJobs.length);
            expect(await screen.findByText(partTimeRole)).toBeInTheDocument();
            expect(screen.queryByText(fullTimeRole)).not.toBeInTheDocument();
        })
        it('should show only contract jobs', async () => {
            const contractRole = 'Contract Developer';
            const contractJobs = [
                Job.create({
                    id: '3',
                    title: contractRole,
                    description: 'Develop software applications',
                    location: 'Remote',
                    type: JobTypeEnum.CONTRACT,
                    companyName: 'Contract Company',
                }),
            ];
            const fullTimeRole = 'Software Engineer';
            const mockRetrievedJobs = [
                ...contractJobs,
                Job.create({
                    id: '1',
                    title: fullTimeRole,
                    description: 'Develop software applications',
                    location: 'Remote',
                    type: JobTypeEnum.FULL_TIME,
                    companyName: 'Tech Company',
                }),
            ];

            render(<JobList jobs={mockRetrievedJobs}/>)

            await selectJobTypeOption('Contract');

            const jobCards = await screen.findAllByTestId('job-card');
            expect(jobCards).toHaveLength(contractJobs.length);
            expect(await screen.findByText(contractRole)).toBeInTheDocument();
            expect(screen.queryByText(fullTimeRole)).not.toBeInTheDocument();
        })
        it('should show all jobs when selecting all types', async () => {
            const mockRetrievedJobs = [
                Job.create({
                    id: '1',
                    title: 'Software Engineer',
                    description: 'Develop software applications',
                    location: 'Remote',
                    type: JobTypeEnum.FULL_TIME,
                    companyName: 'Tech Company',
                }),
                Job.create({
                    id: '2',
                    title: 'Data Scientist',
                    description: 'Analyze data and build models',
                    location: 'Remote',
                    type: JobTypeEnum.PART_TIME,
                    companyName: 'Data Corp',
                }),
                Job.create({
                    id: '3',
                    title: 'Contract Developer',
                    description: 'Develop software applications',
                    location: 'Remote',
                    type: JobTypeEnum.CONTRACT,
                    companyName: 'Contract Company',
                }),
            ];

            render(<JobList jobs={mockRetrievedJobs}/>)

            await selectJobTypeOption('Contract');

            const jobCards = await screen.findAllByTestId('job-card');
            expect(jobCards).not.toHaveLength(mockRetrievedJobs.length);

            await selectJobTypeOption('All Types');

            const allJobCards = await screen.findAllByTestId('job-card');
            expect(allJobCards).toHaveLength(mockRetrievedJobs.length);
        })
    })
})