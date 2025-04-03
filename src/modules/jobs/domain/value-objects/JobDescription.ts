import {ValueObject} from "@/modules/jobs/domain/value-objects/ValueObject.ts";

export class JobDescription extends ValueObject<string> {
    constructor(readonly value: string) {
        super(value);
    }
}