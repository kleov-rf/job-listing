import {describe, expect, it, vi} from "vitest";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";
import {render, screen} from "@testing-library/react";
import {JobList} from "@/sections/jobs/components/JobList.tsx";
import {userEvent} from "@testing-library/user-event";
import {JobMother} from "../../../modules/jobs/domain/entities/JobMother.ts";

describe('JobList', () => {
    const selectJobTypeOption = async (optionText: string) => {
        const allTypesSelect = screen.getByRole('combobox');
        await userEvent.click(allTypesSelect);

        const option = screen.getByText(optionText, {selector: 'span'});
        await userEvent.click(option);
    }
    const typeSearchQuery = async (query: string) => {
        const searchInput = screen.getByRole('textbox', {name: /search/i});
        await userEvent.type(searchInput, query);
    };
    it('should show jobs', async () => {
        const mockRetrievedJobs = [
            JobMother.createFullTimeJob(),
            JobMother.createPartTimeJob(),
        ];

        render(<JobList jobs={mockRetrievedJobs} onApply={vi.fn()}/>)

        const jobCards = await screen.findAllByTestId('job-card');
        expect(jobCards).toHaveLength(mockRetrievedJobs.length);
    })
    describe('should filter jobs when selecting type', async () => {
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

            render(<JobList jobs={mockRetrievedJobs} onApply={vi.fn()}/>)

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

            render(<JobList jobs={mockRetrievedJobs} onApply={vi.fn()}/>)

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

            render(<JobList jobs={mockRetrievedJobs} onApply={vi.fn()}/>)

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

            render(<JobList jobs={mockRetrievedJobs} onApply={vi.fn()}/>)

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

            render(<JobList jobs={mockRetrievedJobs} onApply={vi.fn()}/>)

            await typeSearchQuery('Software Engineer');

            const jobCards = await screen.findAllByTestId('job-card');
            expect(jobCards).toHaveLength(1);
            expect(await screen.findByText('Software Engineer')).toBeInTheDocument();
        })
        it('should trim the search term', async () => {
            const mockRetrievedJobs = [
                JobMother.createWithCustomValues({
                    title: 'Software Engineer'
                }),
                JobMother.createWithCustomValues({
                    title: 'Data Scientist'
                }),
            ];

            render(<JobList jobs={mockRetrievedJobs} onApply={vi.fn()}/>)

            await typeSearchQuery('  Software Engineer  ');

            const jobCards = await screen.findAllByTestId('job-card');
            expect(jobCards).toHaveLength(1);
            expect(await screen.findByText('Software Engineer')).toBeInTheDocument();
        })
    })
    it('should filter jobs when searching and selecting type', async () => {
        const partTimeTitle = 'Data Scientist';
        const mockFullTimeJobs = [
            JobMother.createWithCustomValues({
                title: 'Software Engineer',
                type: JobTypeEnum.FULL_TIME,
            }),
            JobMother.createWithCustomValues({
                title: 'Contract Developer',
                type: JobTypeEnum.FULL_TIME,
            })
        ];
        const mockRetrievedJobs = [
            ...mockFullTimeJobs,
            JobMother.createWithCustomValues({
                title: partTimeTitle,
                type: JobTypeEnum.PART_TIME,
            }),
        ];

        render(<JobList jobs={mockRetrievedJobs} onApply={vi.fn()}/>)

        await selectJobTypeOption('Full-Time');

        expect(await screen.findAllByTestId('job-card')).toHaveLength(mockFullTimeJobs.length);
        expect(screen.queryByText(partTimeTitle)).not.toBeInTheDocument();

        await typeSearchQuery('Software Engineer');

        expect(await screen.findAllByTestId('job-card')).toHaveLength(1);
        expect(await screen.findByText('Software Engineer')).toBeInTheDocument();
    })
    it('should show no jobs message when no filtered jobs are found', async () => {
        const mockRetrievedJobs = [
            JobMother.createWithCustomValues({
                title: 'Software Engineer',
                type: JobTypeEnum.FULL_TIME,
            }),
            JobMother.createWithCustomValues({
                title: 'Data Scientist',
                type: JobTypeEnum.PART_TIME,
            }),
        ];

        render(<JobList jobs={mockRetrievedJobs} onApply={vi.fn()}/>)

        await selectJobTypeOption('Contract');

        const jobCards = screen.queryAllByTestId('job-card');
        const emptyMessage = await screen.findByText('No jobs found matching your criteria.');
        expect(jobCards).toHaveLength(0);
        expect(emptyMessage).toBeInTheDocument();
    })
})