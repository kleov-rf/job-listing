import { Job } from '@/modules/jobs/domain/entities/Job.ts'
import { JobTypeEnum } from '@/modules/jobs/domain/value-objects/JobType.ts'

export class JobMother {
  private static generateRandomId(): string {
    return Math.floor(Math.random() * 1000000).toString()
  }

  static createDefault(): Job {
    return Job.create({
      id: this.generateRandomId(),
      title: 'Senior Accountant',
      companyName: 'Tech Corp',
      location: 'Atlanta, GA',
      type: JobTypeEnum.FULL_TIME,
      description: 'Responsible for financial reporting.',
    })
  }

  static createWithCustomValues(
    overrides: Partial<{
      id: string
      title: string
      companyName: string
      location: string
      type: JobTypeEnum
      description: string
    }> = {}
  ): Job {
    const defaults = {
      id: this.generateRandomId(),
      title: 'Senior Accountant',
      companyName: 'Tech Corp',
      location: 'Atlanta, GA',
      type: JobTypeEnum.FULL_TIME,
      description: 'Responsible for financial reporting.',
    }

    return Job.create({
      ...defaults,
      ...overrides,
    })
  }

  static createFullTimeJob(): Job {
    return this.createWithCustomValues({
      type: JobTypeEnum.FULL_TIME,
    })
  }

  static createPartTimeJob(): Job {
    return this.createWithCustomValues({
      type: JobTypeEnum.PART_TIME,
    })
  }

  static createContractJob(): Job {
    return this.createWithCustomValues({
      type: JobTypeEnum.CONTRACT,
    })
  }
}
