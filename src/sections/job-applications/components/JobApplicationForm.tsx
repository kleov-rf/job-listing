import {Button} from "@/sections/shared/components/Button.tsx";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/sections/shared/components/Dialog.tsx";
import {Input} from "@/sections/shared/components/Input.tsx";
import {Label} from "@/sections/shared/components/Label.tsx";
import {useJobContext} from "@/sections/shared/context/JobContext.tsx";
import {JobApplication} from "@/modules/job-applications/domain/entities/JobApplication.ts";
import {v4 as uuidv4} from "uuid";
import {Primitives} from "@codelytv/primitives-type";
import {FormEvent} from "react";

interface JobApplicationFormProps {
    jobId: string,
    isOpen: boolean,
    onClose: () => void,
    onSubmit: () => void
}

export const JobApplicationForm = ({jobId, isOpen, onClose, onSubmit}: JobApplicationFormProps) => {
    const {submitApplicationUseCase} = useJobContext()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const jobApplication = {
            id: uuidv4().toString(),
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            cvUrl: 'https://example.com/cv.pdf',
            jobId,
        } as Primitives<JobApplication>
        await submitApplicationUseCase.execute(jobApplication)
        onSubmit()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}
                aria-labelledby="application-form-title">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold" id="application-form-title">
                        Apply for this position
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    aria-label="Job application form"
                >
                    <fieldset className="space-y-4">
                        <legend className="sr-only">Personal Information</legend>
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="John Doe"
                                aria-required="true"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                aria-required="true"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvUrl">CV URL</Label>
                            <Input
                                id="cvUrl"
                                type="url"
                                placeholder="https://example.com/cv.pdf"
                                aria-required="true"
                            />
                        </div>
                    </fieldset>
                    <DialogFooter>
                        <Button type="submit">
                            Submit application
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}