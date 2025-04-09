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
})