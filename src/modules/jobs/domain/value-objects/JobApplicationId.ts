import {ValueObject} from "@/modules/jobs/domain/value-objects/ValueObject.ts";

export class JobApplicationId extends ValueObject<string> {
  constructor(readonly value: string) {
    super(value)
  }
}