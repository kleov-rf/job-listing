import {describe, expect, it} from "vitest";
import {renderJobTypeLabel} from "@/sections/jobs/utils/renderJobTypeLabel.ts";
import {JobTypeEnum} from "@/modules/jobs/domain/value-objects";

describe('renderJobTypeLabel', () => {
    it('should return "Full-Time" for FULL_TIME', () => {
        expect(renderJobTypeLabel(JobTypeEnum.FULL_TIME)).toBe('Full-Time')
    })
})