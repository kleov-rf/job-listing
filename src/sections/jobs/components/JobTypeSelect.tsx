import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/sections/shared/components/Select.tsx";
import {renderJobTypeLabel} from "@/sections/jobs/utils/renderJobTypeLabel.ts";

export type JobTypeOptions = JobTypeEnum | 'ALL';

interface JobTypeSelectProps {
    currentType: JobTypeOptions;
    handleTypeChange: (x: JobTypeOptions) => void;
}

export const JobTypeSelect = ({currentType, handleTypeChange}: JobTypeSelectProps) => {
    return (
        <>
            <label htmlFor="job-type-filter" className="sr-only">
                Filter by job type
            </label>
            <Select value={currentType} onValueChange={value => handleTypeChange(value as JobTypeOptions)}>
                <SelectTrigger id="job-type-filter" className="w-44">
                    <SelectValue placeholder="Select job type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All Types</SelectItem>
                    <SelectItem value={JobTypeEnum.FULL_TIME}>{renderJobTypeLabel(JobTypeEnum.FULL_TIME)}</SelectItem>
                    <SelectItem value={JobTypeEnum.PART_TIME}>{renderJobTypeLabel(JobTypeEnum.PART_TIME)}</SelectItem>
                    <SelectItem value={JobTypeEnum.CONTRACT}>{renderJobTypeLabel(JobTypeEnum.CONTRACT)}</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}