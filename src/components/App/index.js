import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Login";
import Register from "../Register";
import Wallet from "../Wallet";
import NewCredit from "../NewCredit";
import NewDebit from "../NewDebit";
import "../../assets/styles/index.css";

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="/carteira" element={<Wallet />} />
                <Route path="/nova-entrada" element={<NewCredit />} />
                <Route path="/nova-saida" element={<NewDebit />} />
            </Routes>
        </BrowserRouter>
    );
}