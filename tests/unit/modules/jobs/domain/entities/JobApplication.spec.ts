import {describe, expect, it } from "vitest";
import {JobApplicationMother} from "./JobApplicationMother.ts";

describe('JobApplication', () => {
    it('should return id value', () => {
        const jobId = '1';
        const job = JobApplicationMother.createWithCustomValues({
            id: jobId
        })
        expect(job.idValue()).toEqual(jobId)
    })
})