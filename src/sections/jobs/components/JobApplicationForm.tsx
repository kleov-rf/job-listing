import { Button } from "@/sections/shared/components/Button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/sections/shared/components/Dialog.tsx";
import {Input} from "@/sections/shared/components/Input.tsx";
import {Label} from "@/sections/shared/components/Label.tsx";

interface JobApplicationFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export const JobApplicationForm = ({isOpen, onClose}: JobApplicationFormProps) => {
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
                    className="space-y-4"
                    aria-label="Job application form"
                >
                    <fieldset className="space-y-4">
                        <legend className="sr-only">Personal Information</legend>
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
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