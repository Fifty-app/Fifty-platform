import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SideMenu } from "@/components/SideMenu";
import { trpc } from "@/lib/trpc";
import { Building2, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { useState } from "react";

export default function CadastrarProduto() {
  const { isAuthenticated, user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    transactionType: "",
    propertyType: "",
    value: "",
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    rooms: "",
    parking: "",
    propertyStatus: "",
  });

  const createProduct = trpc.products.create.useMutation({
    onSuccess: () => {
      toast.success("Imóvel cadastrado com sucesso!");
      setLocation("/produtos");
    },
    onError: (error) => {
      toast.error("Erro ao cadastrar imóvel");
      console.error(error);
    },
  });

  // Modo demo: permite acesso
  if (false && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  // Modo demo
  if (false && !user?.creci) {
    window.location.href = "/validar-creci";
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.transactionType || !formData.propertyType || !formData.value) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setIsLoading(true);
    try {
      await createProduct.mutateAsync({
        title: formData.title,
        description: formData.description,
        transactionType: formData.transactionType as "vender" | "alugar",
        propertyType: formData.propertyType,
        value: parseInt(formData.value),
        cep: formData.cep || undefined,
        street: formData.street || undefined,
        number: formData.number || undefined,
        neighborhood: formData.neighborhood || undefined,
        city: formData.city || undefined,
        state: formData.state || undefined,
        rooms: formData.rooms ? parseInt(formData.rooms) : undefined,
        parking: formData.parking ? parseInt(formData.parking) : undefined,
        propertyStatus: formData.propertyStatus || undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const propertyTypes = [
    { value: "apartamento", label: "Apartamento" },
    { value: "casa", label: "Casa" },
    { value: "terreno", label: "Terreno" },
    { value: "comercial", label: "Imóvel Comercial" },
    { value: "industrial", label: "Imóvel Industrial" },
    { value: "rural", label: "Propriedade Rural" },
  ];

  const propertyStatus = [
    { value: "novo", label: "Novo" },
    { value: "usado", label: "Usado" },
    { value: "reforma", label: "Necessita Reforma" },
  ];

  const states = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SideMenu />
            <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
              <Building2 className="h-8 w-8 text-rose-500" />
              <span className="text-2xl font-bold text-white">Fifty</span>
            </div></Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/perfil"><Button variant="ghost" className="text-white hover:text-rose-400">Meu Perfil</Button></Link>
            <Button variant="ghost" className="text-white hover:text-rose-400" onClick={() => logout()}>Sair</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Link href="/produtos">
          <Button variant="ghost" className="text-slate-400 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <Card className="border-slate-800 max-w-3xl">
          <CardHeader>
            <CardTitle className="text-white">Cadastrar Imóvel</CardTitle>
            <CardDescription>Preencha os dados do imóvel para oferecer em oportunidades</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Informações Básicas</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Título do Imóvel *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Apartamento 3 quartos em Pinheiros"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">Descrição *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva características, amenidades, diferenciais, etc."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transactionType" className="text-white">Tipo de Transação *</Label>
                    <Select value={formData.transactionType} onValueChange={(value) => setFormData({ ...formData, transactionType: value })}>
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        <SelectItem value="vender" className="text-white">Vender</SelectItem>
                        <SelectItem value="alugar" className="text-white">Alugar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyType" className="text-white">Tipo de Propriedade *</Label>
                    <Select value={formData.propertyType} onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        {propertyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value} className="text-white">
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value" className="text-white">Valor (R$) *</Label>
                    <Input
                      id="value"
                      type="number"
                      placeholder="Ex: 500000"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyStatus" className="text-white">Estado do Imóvel</Label>
                    <Select value={formData.propertyStatus} onValueChange={(value) => setFormData({ ...formData, propertyStatus: value })}>
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        {propertyStatus.map((status) => (
                          <SelectItem key={status.value} value={status.value} className="text-white">
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Localização */}
              <div className="space-y-4 border-t border-slate-800 pt-6">
                <h3 className="text-lg font-semibold text-white">Localização</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="cep" className="text-white">CEP</Label>
                  <Input
                    id="cep"
                    placeholder="Ex: 01234-567"
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="street" className="text-white">Rua</Label>
                  <Input
                    id="street"
                    placeholder="Ex: Rua das Flores"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="number" className="text-white">Número</Label>
                    <Input
                      id="number"
                      placeholder="Ex: 123"
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="neighborhood" className="text-white">Bairro</Label>
                    <Input
                      id="neighborhood"
                      placeholder="Ex: Pinheiros"
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-white">Cidade</Label>
                    <Input
                      id="city"
                      placeholder="Ex: São Paulo"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-white">Estado</Label>
                  <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                    <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      {states.map((state) => (
                        <SelectItem key={state} value={state} className="text-white">
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Características */}
              <div className="space-y-4 border-t border-slate-800 pt-6">
                <h3 className="text-lg font-semibold text-white">Características</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rooms" className="text-white">Quartos</Label>
                    <Input
                      id="rooms"
                      type="number"
                      placeholder="Ex: 3"
                      value={formData.rooms}
                      onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parking" className="text-white">Vagas de Garagem</Label>
                    <Input
                      id="parking"
                      type="number"
                      placeholder="Ex: 2"
                      value={formData.parking}
                      onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <Link href="/produtos" className="flex-1">
                  <Button variant="outline" className="w-full">Cancelar</Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isLoading || createProduct.isPending}
                  className="flex-1 bg-rose-500 hover:bg-rose-600"
                >
                  {isLoading || createProduct.isPending ? "Cadastrando..." : "Cadastrar Imóvel"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
