import React from "react"
import { Routes, Route, Link } from "react-router-dom";

import PageLayout from "./components/PageLayout";

const App = ()=>{
    return (
        <div>
            <Routes>
                <Route path="/" element={<PageLayout/>}/>
            </Routes>
        </div>
    )
}

export default App