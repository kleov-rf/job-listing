import {JobsDashboard} from "@/sections/jobs/JobsDashboard"
import {JobProvider} from "@/sections/shared/context/JobContext.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {JobDetails} from "@/sections/jobs/JobDetails.tsx";
import {ThemeProvider} from "@/sections/shared/context/ThemeContext.tsx";
import {ThemeToggle} from "@/sections/shared/components/theme/ThemeToggle.tsx";

function App() {
    return (
        <ThemeProvider>
            <Router>
                <JobProvider>
                    <div className="container mx-auto px-4 py-8">
                        <header className="mb-8 flex justify-between items-center">
                            <h1 className="text-3xl font-bold">Job Listings</h1>
                            <ThemeToggle />
                        </header>
                        <main>
                            <Routes>
                                <Route path="/" element={<JobsDashboard/>}/>
                                <Route path="/jobs/:id" element={<JobDetails/>}/>
                            </Routes>
                        </main>
                    </div>
                </JobProvider>
            </Router>
        </ThemeProvider>
    )
}

export default App
