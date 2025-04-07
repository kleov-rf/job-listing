import {describe, expect, it} from "vitest";
import {renderJobTypeLabel} from "@/sections/jobs/utils/renderJobTypeLabel.ts";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";

describe('renderJobTypeLabel', () => {
    it('should return "Full-Time" for FULL_TIME', () => {
        expect(renderJobTypeLabel(JobTypeEnum.FULL_TIME)).toBe('Full-Time')
    })
    it('should return "Part-Time" for PART_TIME', () => {
        expect(renderJobTypeLabel(JobTypeEnum.PART_TIME)).toBe('Part-Time')
    })
    it('should return "Contract" for CONTRACT', () => {
        expect(renderJobTypeLabel(JobTypeEnum.CONTRACT)).toBe('Contract')
    })
    it('should return "-" for NOT_DEFINED', () => {
        expect(renderJobTypeLabel(JobTypeEnum.NOT_DEFINED)).toBe('-')
    })
})