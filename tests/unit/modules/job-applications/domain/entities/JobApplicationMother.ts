import { v4 as uuidv4 } from 'uuid';
import {JobApplication} from "@/modules/job-applications/domain/entities/JobApplication.ts";

export class JobApplicationMother {
    private static generateRandomId(): string {
        return uuidv4().toString()
    }

    static createDefault(): JobApplication {
        return JobApplication.create({
            id: this.generateRandomId(),
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            cvUrl: 'https://example.com/cv.pdf',
            jobId: '123456',
        })
    }

    static createWithCustomValues(
        overrides: Partial<{
            id: string,
            name: string,
            email: string,
            cvUrl: string,
            jobId: string,
        }> = {}
    ): JobApplication {
        const defaults = {
            id: this.generateRandomId(),
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            cvUrl: 'https://example.com/cv.pdf',
            jobId: '123456',
        }

        return JobApplication.create({
            ...defaults,
            ...overrides,
        })
    }
}