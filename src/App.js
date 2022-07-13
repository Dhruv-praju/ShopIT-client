import React from "react"
import { Routes, Route } from "react-router-dom";

import CheckOut from "./components/Pages/CheckOut";
import PageLayout from "./components/PageLayout";
import Auth from "./components/Pages/Auth";
import Cart from "./components/Pages/Cart";
import Home from "./components/Pages/Home";
import Product from "./components/Pages/Product";
import Profile from "./components/Pages/Profile";
import Search from "./components/Pages/Search";
import Shipping from "./components/CheckOut/Shipping";
import Confirm from "./components/CheckOut/Confirm";
import Payment from "./components/CheckOut/Payment";
import { PaymentWrapper } from "./components/CheckOut/Payment";
import ProtectedRoute from "./components/route/ProtectedRoute";

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
                    <Route path="/cart" element={<Cart />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/checkout" element={<CheckOut />}>
                            <Route index element={<></>} />
                            <Route path="shipping" element={<Shipping />} />
                            <Route path="confirm" element={<Confirm />} />
                            <Route path="payment" element={
                                <PaymentWrapper>
                                    <Payment />
                                </PaymentWrapper>} />
                        </Route>
                    </Route>

                </Route>
            </Routes>
        </div>
    )
}

export default App