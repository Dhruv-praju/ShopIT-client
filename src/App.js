import React from "react"
import { Routes, Route } from "react-router-dom";

import PageLayout from "./components/PageLayout";
import Auth from "./components/Pages/Auth";
import Home from "./components/Pages/Home";
import Product from "./components/Pages/Product";
import Profile from "./components/Pages/Profile";
import Search from "./components/Pages/Search";

const App = ()=>{
    
    return (
        <div>
            <Routes>
                <Route element={<PageLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/:id" element={<Product />} />
                    <Route path="/auth" element={<Auth />}/>
                    <Route path="/search" element={<Search />} />
                    <Route path="/me" element={<Profile />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App