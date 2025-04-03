import {describe, expect, it} from "vitest";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";

describe('Job', () => {
    it('should return id value', () => {
        const jobId = '1';
        const job = Job.create({
            id: jobId,
            title: 'Software Engineer',
            description: 'Develop software applications',
            location: 'Remote',
            type: JobTypeEnum.FULL_TIME,
            companyName: 'Tech Company',
        })

        expect(job.idValue()).toEqual(jobId)
    })
    it('should return title value', () => {
        const jobTitle = 'Software Engineer';
        const job = Job.create({
            id: '1',
            title: jobTitle,
            description: 'Develop software applications',
            location: 'Remote',
            type: JobTypeEnum.FULL_TIME,
            companyName: 'Tech Company',
        })

        expect(job.titleValue()).toEqual(jobTitle)
    })
})