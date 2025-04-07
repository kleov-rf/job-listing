import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";

export const renderJobTypeLabel = (jobType: JobTypeEnum): string => {
    switch(jobType) {
        case JobTypeEnum.FULL_TIME:
            return 'Full-Time';
        case JobTypeEnum.PART_TIME:
            return 'Part-Time';
        case JobTypeEnum.CONTRACT:
            return 'Contract';
        default:
            return '-';
    }
}