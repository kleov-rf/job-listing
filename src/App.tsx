import {JobsDashboard} from "@/sections/jobs/JobsDashboard"
import {JobProvider} from "@/sections/context/JobContext.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {JobDetails} from "@/sections/jobs/JobDetails.tsx";

function App() {
    return (
        <Router>
            <JobProvider>
                <div className="container mx-auto px-4 py-8">
                    <header className="mb-8 flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Job Listings</h1>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/" element={<JobsDashboard />} />
                            <Route path="/jobs/:id" element={<JobDetails />} />
                        </Routes>
                    </main>
                </div>
            </JobProvider>
        </Router>
    )
}

export default App
