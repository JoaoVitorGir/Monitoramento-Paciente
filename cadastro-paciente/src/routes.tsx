// import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Cadastro } from "./pages/cadastro"
import { ConsultaPaciente } from "./pages/consutaPacientes"

export default function Rotas() {
    return(
        <BrowserRouter>
            
            <Routes>
                {/* rotas sem nescecidade de atenticação */}
                <Route path="/"  element={<Cadastro/>} />
                <Route path="/consultaPaciente"  element={<ConsultaPaciente/>} />
            </Routes>
        </BrowserRouter>
    )
}