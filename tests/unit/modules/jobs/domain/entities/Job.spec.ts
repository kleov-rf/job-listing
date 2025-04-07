import {describe, expect, it} from "vitest";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobType, JobTypeEnum} from "@/modules/jobs/domain/value-objects";

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
    it('should return company name value', () => {
        const companyName = 'Tech Company';
        const job = Job.create({
            id: '1',
            title: 'Software Engineer',
            description: 'Develop software applications',
            location: 'Remote',
            type: JobTypeEnum.FULL_TIME,
            companyName,
        })

        expect(job.companyNameValue()).toEqual(companyName)
    })
    it('should return location value', () => {
        const jobLocation = 'Remote';
        const job = Job.create({
            id: '1',
            title: 'Software Engineer',
            description: 'Develop software applications',
            location: jobLocation,
            type: JobTypeEnum.FULL_TIME,
            companyName: 'Tech Company',
        })

        expect(job.locationValue()).toEqual(jobLocation)
    })
    it('should return type value', () => {
        const jobType = JobTypeEnum.FULL_TIME;
        const job = Job.create({
            id: '1',
            title: 'Software Engineer',
            description: 'Develop software applications',
            location: 'Remote',
            type: jobType,
            companyName: 'Tech Company',
        })

        expect(job.typeValue()).toEqual(jobType)
    })
    it('should return description value', () => {
        const jobDescription = 'Develop software applications';
        const job = Job.create({
            id: '1',
            title: 'Software Engineer',
            description: jobDescription,
            location: 'Remote',
            type: JobTypeEnum.FULL_TIME,
            companyName: 'Tech Company',
        })

        expect(job.descriptionValue()).toEqual(jobDescription)
    })
    it('should match job by type', () => {
        const typeEnum = JobTypeEnum.FULL_TIME;
        const jobType = new JobType(typeEnum);
        const job = Job.create({
            id: '1',
            title: 'Software Engineer',
            description: 'Develop software applications',
            location: 'Remote',
            type: typeEnum,
            companyName: 'Tech Company',
        })

        expect(job.matchesType(jobType)).toBe(true)
    })
    it('should not match job by type', () => {
        const typeEnum = JobTypeEnum.PART_TIME;
        const jobType = new JobType(typeEnum);
        const job = Job.create({
            id: '1',
            title: 'Software Engineer',
            description: 'Develop software applications',
            location: 'Remote',
            type: JobTypeEnum.FULL_TIME,
            companyName: 'Tech Company',
        })

        expect(job.matchesType(jobType)).toBe(false)
    })
})