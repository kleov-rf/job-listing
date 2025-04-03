import {ValueObject} from "@/modules/jobs/domain/value-objects/ValueObject.ts";

export class JobTitle extends ValueObject<string> {
    constructor(readonly value: string) {
        super(value);
    }
}