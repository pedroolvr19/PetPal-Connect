import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importe useParams
import { Pet } from "@/entities/Pet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Loader2 } from "lucide-react";
import DetalhesHeader from "../components/detalhes/DetalhesHeader";
import DetalhesInfo from "../components/detalhes/DetalhesInfo";

export default function PetDetalhes() {
  const { id } = useParams(); // PEGA O ID DA URL (/pet/123)
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPet();
  }, [id]);

  const loadPet = async () => {
    if (!id) return;
    setIsLoading(true);
    const data = await Pet.getById(id);
    setPet(data);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" /></div>;
  }

  if (!pet) {
    return <div className="p-6 text-center">Pet não encontrado.</div>;
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Botão Voltar */}
      <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-blue-600" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Voltar para Dashboard
      </Button>

      <DetalhesHeader pet={pet} />

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="info">Sobre</TabsTrigger>
          <TabsTrigger value="vacinas">Saúde</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="mt-6">
          <DetalhesInfo pet={pet} />
        </TabsContent>
        
        <TabsContent value="vacinas" className="mt-6">
          <div className="p-4 bg-white rounded-xl border border-gray-200 text-center text-gray-500">
            Área de Vacinas e Medicamentos (Em breve)
          </div>
        </TabsContent>

        <TabsContent value="historico" className="mt-6">
           <div className="p-4 bg-white rounded-xl border border-gray-200 text-center text-gray-500">
            Histórico de consultas (Em breve)
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}