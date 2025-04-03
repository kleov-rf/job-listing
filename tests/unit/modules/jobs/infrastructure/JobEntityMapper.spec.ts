import {APIJobDTO} from "@/modules/jobs/infrastructure/dtos/APIJobResponseDTO.ts";
import {JobEntityMapper} from "@/modules/jobs/infrastructure/mappers/JobEntityMapper.ts";
import { describe, expect, it } from "vitest";
import {Job} from "@/modules/jobs/domain/entities/Job.ts";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects/JobType.ts";

describe('JobEntityMapper', () => {
    describe('should map api job to domain job', () => {
        it('should map api full time job to domain job', () => {
            const jobTitle = "Senior Accountant";
            const companyName = 'Tech Corp';
            const location = "Atlanta, GA";
            const description = "We are looking for a Senior Accountant to join our team.";
            const apiJob = {
                id: 1,
                job_title: jobTitle,
                company: companyName,
                short_location: location,
                employment_statuses: ['Full-time'],
                long_description: description,
            } as APIJobDTO


            const result = JobEntityMapper.toDomain(apiJob)

            const expectedDomainJob = Job.create({
                id: '1',
                title: jobTitle,
                companyName: companyName,
                location: location,
                type: JobTypeEnum.FULL_TIME,
                description: description,
            })
            expect(result).toEqual(expectedDomainJob)
        })
        it('should map api part time job to domain job', () => {
            const jobTitle = "Senior Accountant";
            const companyName = 'Tech Corp';
            const location = "Atlanta, GA";
            const description = "We are looking for a Senior Accountant to join our team.";
            const apiJob = {
                id: 1,
                job_title: jobTitle,
                company: companyName,
                short_location: location,
                employment_statuses: ['Part-time'],
                long_description: description,
            } as APIJobDTO

            const result = JobEntityMapper.toDomain(apiJob)

            const expectedDomainJob = Job.create({
                id: '1',
                title: jobTitle,
                companyName: companyName,
                location: location,
                type: JobTypeEnum.PART_TIME,
                description: description,
            })
            expect(result).toEqual(expectedDomainJob)
        })
    })
})