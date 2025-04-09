import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/sections/shared/components/Dialog.tsx";

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
            </DialogContent>
        </Dialog>
    )
}