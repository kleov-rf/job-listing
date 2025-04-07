import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";

export const renderJobTypeLabel = (jobType: JobTypeEnum): string => {
    if (jobType === JobTypeEnum.PART_TIME) {
        return 'Part-Time';
    }
    return 'Full-Time';
}