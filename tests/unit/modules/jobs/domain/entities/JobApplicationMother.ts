import { v4 as uuidv4 } from 'uuid';
import {JobApplication} from "@/modules/jobs/domain/entities/JobApplication.ts";

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
        })
    }

    static createWithCustomValues(
        overrides: Partial<{
            id: string,
            name: string,
            email: string,
            cvUrl: string,
        }> = {}
    ): JobApplication {
        const defaults = {
            id: this.generateRandomId(),
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            cvUrl: 'https://example.com/cv.pdf',
        }

        return JobApplication.create({
            ...defaults,
            ...overrides,
        })
    }
}