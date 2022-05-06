import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Login";
//import Register from "../Register";
//import Wallet from "../Wallet";
//import NewInput from "../NewInput";
//import NewOutput from "../NewOutput";

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

/*
    <Route path="/cadastro" element={<Register />} />
    <Route path="/carteira" element={<Wallet />} />
    <Route path="/nova-entrada" element={<NewInput />} />
    <Route path="/nova-saida" element={<NewOutput />} />
*/