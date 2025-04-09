import {describe, expect, it} from "vitest";
import {JobType, JobTypeEnum} from "@/modules/jobs/domain/value-objects";
import {JobMother} from "./JobMother.ts";

describe('Job', () => {
    it('should return id value', () => {
        const jobId = '1';
        const job = JobMother.createWithCustomValues({
            id: jobId
        })
        expect(job.idValue()).toEqual(jobId)
    })
    it('should return title value', () => {
        const jobTitle = 'Software Engineer';
        const job = JobMother.createWithCustomValues({
            title: jobTitle
        })

        expect(job.titleValue()).toEqual(jobTitle)
    })
    it('should return company name value', () => {
        const companyName = 'Tech Company';
        const job = JobMother.createWithCustomValues({
            companyName
        })

        expect(job.companyNameValue()).toEqual(companyName)
    })
    it('should return location value', () => {
        const jobLocation = 'Remote';
        const job = JobMother.createWithCustomValues({
            location: jobLocation
        })

        expect(job.locationValue()).toEqual(jobLocation)
    })
    it('should return type value', () => {
        const jobType = JobTypeEnum.FULL_TIME;
        const job = JobMother.createWithCustomValues({
            type: jobType
        })

        expect(job.typeValue()).toEqual(jobType)
    })
    it('should return description value', () => {
        const jobDescription = 'Develop software applications';
        const job = JobMother.createWithCustomValues({
            description: jobDescription
        })

        expect(job.descriptionValue()).toEqual(jobDescription)
    })
    it('should match job by type', () => {
        const typeEnum = JobTypeEnum.FULL_TIME;
        const jobType = new JobType(typeEnum);
        const job = JobMother.createFullTimeJob()

        expect(job.matchesType(jobType)).toBe(true)
    })
    it('should not match job by type', () => {
        const typeEnum = JobTypeEnum.PART_TIME;
        const jobType = new JobType(typeEnum);
        const job = JobMother.createFullTimeJob()

        expect(job.matchesType(jobType)).toBe(false)
    })
    describe('match search', () => {
        it('should match job by complete title', () => {
            const jobTitle = 'Software Engineer';
            const job = JobMother.createWithCustomValues({
                title: jobTitle
            })

            expect(job.matchesSearch(jobTitle)).toBe(true)
        })
    })
})