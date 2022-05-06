import React from "react"
import { Routes, Route, Link } from "react-router-dom";

import PageLayout from "./components/PageLayout";

const App = ()=>{
    return (
        <div>
            <h1>APP</h1>
            <Routes>
                <Route path="/" element={<PageLayout/>}/>
            </Routes>
        </div>
    )
}

export default App