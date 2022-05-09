import React from "react"
import { Routes, Route, Link } from "react-router-dom";

import PageLayout from "./components/PageLayout";
import Home from "./components/Pages/Home";
import Product from "./components/Pages/Product";

const App = ()=>{
    return (
        <div>
            <Routes>
                <Route element={<PageLayout/>}>
                    <Route index element={<Home/>} />
                    <Route path="/:id" element={<Product/>} />
                </Route>
            </Routes>
        </div>
    )
}

export default App