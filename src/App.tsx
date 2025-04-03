import { JobsDashboard } from "@/sections/jobs/JobsDashboard"

function App() {
    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Job Listings</h1>
            </header>
            <main>
                <JobsDashboard />
            </main>
        </div>
    )
}

export default App
