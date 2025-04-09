import {describe, expect, it } from "vitest";
import {JobApplicationMother} from "./JobApplicationMother.ts";

describe('JobApplication', () => {
    it('should return id value', () => {
        const jobApplicationId = '1';
        const jobApplication = JobApplicationMother.createWithCustomValues({
            id: jobApplicationId
        })
        expect(jobApplication.idValue()).toEqual(jobApplicationId)
    })
    it('should return name value', () => {
        const name = 'John Doe';
        const jobApplication = JobApplicationMother.createWithCustomValues({
            name
        })

        expect(jobApplication.nameValue()).toEqual(name)
    })
    it('should return email value', () => {
        const email = 'john.doe@gmail.com';
        const jobApplication = JobApplicationMother.createWithCustomValues({
            email
        })

        expect(jobApplication.emailValue()).toEqual(email)
    })
    it('should return cv url value', () => {
        const cvUrl = 'https://example.com/cv.pdf';
        const jobApplication = JobApplicationMother.createWithCustomValues({
            cvUrl
        })

        expect(jobApplication.cvUrlValue()).toEqual(cvUrl)
    })
    it('should return job id value', () => {
        const jobId = '1';
        const jobApplication = JobApplicationMother.createWithCustomValues({
            jobId
        })

        expect(jobApplication.jobIdValue()).toEqual(jobId)
    })
    it('should return its primitives', () => {
        const jobApplication = JobApplicationMother.createDefault()
        const primitives = jobApplication.toPrimitives()

        expect(primitives).toEqual({
            id: jobApplication.idValue(),
            name: jobApplication.nameValue(),
            email: jobApplication.emailValue(),
            cvUrl: jobApplication.cvUrlValue(),
            jobId: jobApplication.jobIdValue(),
        })
    })
})