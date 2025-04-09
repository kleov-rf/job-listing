import {Input} from "@/sections/shared/components/Input.tsx";

interface JobSearchInputProps {
    currentQuery: string;
    onChange: (query: string) => void;
}

export const JobSearchInput = ({currentQuery, onChange}: JobSearchInputProps) => {
    return (<>
            <label htmlFor="job-search" className="sr-only">
                Search jobs
            </label>
            <Input
                id="job-search"
                type="text"
                defaultValue={currentQuery}
                onChange={e => onChange(e.target.value)}
                placeholder="Search jobs..."
                className="w-full sm:w-60"
                aria-label="Search jobs"
            />
        </>
    )
}