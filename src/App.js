import React from "react"
import { Routes, Route, Link } from "react-router-dom";

import PageLayout from "./components/PageLayout";
import Home from "./components/Pages/Home";

const App = ()=>{
    return (
        <div>
            <Routes>
                <Route element={<PageLayout/>}>
                    <Route index element={<Home/>} />
                </Route>
            </Routes>
        </div>
    )
}

export default App