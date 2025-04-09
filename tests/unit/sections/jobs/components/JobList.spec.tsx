import {describe, expect, it} from "vitest";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";
import {render, screen} from "@testing-library/react";
import {JobList} from "@/sections/jobs/components/JobList.tsx";
import {userEvent} from "@testing-library/user-event";
import {JobMother} from "../../../modules/jobs/domain/entities/JobMother.ts";

describe('JobList', () => {
    it('should show jobs', async () => {
        const mockRetrievedJobs = [
            JobMother.createFullTimeJob(),
            JobMother.createPartTimeJob(),
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
                JobMother.createWithCustomValues({
                    title: fullTimeRole,
                    type: JobTypeEnum.FULL_TIME,
                }),
            ];
            const partTimeRole = 'Data Scientist';
            const mockRetrievedJobs = [
                ...fullTimeJobs,
                JobMother.createWithCustomValues({
                    title: partTimeRole,
                    type: JobTypeEnum.PART_TIME,
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
                JobMother.createWithCustomValues({
                    title: partTimeRole,
                    type: JobTypeEnum.PART_TIME,
                }),
            ];
            const fullTimeRole = 'Software Engineer';
            const mockRetrievedJobs = [
                ...partTimeJobs,
                JobMother.createWithCustomValues({
                    title: fullTimeRole,
                    type: JobTypeEnum.FULL_TIME,
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
                JobMother.createWithCustomValues({
                    title: contractRole,
                    type: JobTypeEnum.CONTRACT,
                }),
            ];
            const fullTimeRole = 'Software Engineer';
            const mockRetrievedJobs = [
                ...contractJobs,
                JobMother.createWithCustomValues({
                    title: fullTimeRole,
                    type: JobTypeEnum.FULL_TIME,
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
                JobMother.createFullTimeJob(),
                JobMother.createPartTimeJob(),
                JobMother.createContractJob(),
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
    describe('should filter jobs when searching', async () => {
        it('should show only jobs that match the search term', async () => {
            const mockRetrievedJobs = [
                JobMother.createWithCustomValues({
                    title: 'Software Engineer'
                }),
                JobMother.createWithCustomValues({
                    title: 'Data Scientist'
                }),
            ];

            render(<JobList jobs={mockRetrievedJobs}/>)

            const searchInput = screen.getByRole('textbox', {name: /search/i});
            await userEvent.type(searchInput, 'Software Engineer');

            const jobCards = await screen.findAllByTestId('job-card');
            expect(jobCards).toHaveLength(1);
            expect(await screen.findByText('Software Engineer')).toBeInTheDocument();
        })
    })
})