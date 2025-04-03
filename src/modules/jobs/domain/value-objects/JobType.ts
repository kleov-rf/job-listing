import {ValueObject} from "@/modules/jobs/domain/value-objects/ValueObject.ts";

export enum JobTypeEnum {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    CONTRACT = 'CONTRACT',
    NOT_DEFINED = 'NOT_DEFINED',
}

export class JobType extends ValueObject<JobTypeEnum> {
    constructor(readonly value: JobTypeEnum) {
        super(value);
    }
}
