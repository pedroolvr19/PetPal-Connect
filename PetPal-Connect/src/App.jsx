import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";

// Importando as páginas reais que criamos
import Dashboard from "@/pages/Dashboard";
import AdicionarPet from "@/pages/AdicionarPet";
import Calendario from "@/pages/Calendario";
import GestaoDeMedicamentos from "@/pages/GestaoDeMedicamentos";
import Emergencias from "@/pages/Emergencias";
import MeuPerfil from "@/pages/MeuPerfil";
import PetDetalhes from "@/pages/PetDetalhes";
import EditarPet from "@/pages/EditarPet";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adicionarpet" element={<AdicionarPet />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/gestaodemedicamentos" element={<GestaoDeMedicamentos />} />
          <Route path="/emergencias" element={<Emergencias />} />
          <Route path="/meuperfil" element={<MeuPerfil />} />
          <Route path="/pet/:id" element={<PetDetalhes />} />
          <Route path="/editar-pet/:id" element={<EditarPet />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}