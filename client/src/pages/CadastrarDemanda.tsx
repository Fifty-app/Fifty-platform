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

export default function CadastrarDemanda() {
  const { isAuthenticated, user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [demandType, setDemandType] = useState<"buy" | "sell" | "rent" | "lease" | "">("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    budget: "",
    location: "",
    tags: "",
  });

  const { data: products } = trpc.products.myProducts.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const createDemand = trpc.demands.create.useMutation({
    onSuccess: () => {
      toast.success("Demanda publicada com sucesso!");
      setLocation("/meus-negocios");
    },
    onError: (error) => {
      toast.error("Erro ao publicar demanda");
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
    
    if (!selectedProduct || !demandType || !formData.title || !formData.description || !formData.budget || !formData.location) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setIsLoading(true);
    try {
      await createDemand.mutateAsync({
        productId: selectedProduct,
        title: formData.title,
        description: formData.description,
        demandType: demandType as "buy" | "sell" | "rent" | "lease",
        highlight: formData.tags || undefined,
        type: demandType,
        budget: parseInt(formData.budget),
        location: formData.location,
        tags: formData.tags || undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demandTypes = [
    { value: "buy", label: "Comprar Imóvel" },
    { value: "sell", label: "Vender Imóvel" },
    { value: "rent", label: "Alugar Imóvel" },
    { value: "lease", label: "Locar Imóvel" },
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
        <Link href="/meus-negocios">
          <Button variant="ghost" className="text-slate-400 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <Card className="border-slate-800 max-w-2xl">
          <CardHeader>
            <CardTitle className="text-white">Publicar Nova Demanda</CardTitle>
            <CardDescription>Selecione um produto e adicione detalhes da demanda</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Seleção de Produto */}
              <div className="space-y-2">
                <Label htmlFor="product" className="text-white">Produto *</Label>
                <Select value={selectedProduct?.toString() || ""} onValueChange={(v) => setSelectedProduct(parseInt(v))}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    {products?.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()} className="text-white">
                        {product.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {products?.length === 0 && (
                  <p className="text-sm text-slate-400">
                    Você não tem produtos cadastrados.{" "}
                    <Link href="/cadastrar-produto">
                      <span className="text-rose-500 hover:text-rose-400 cursor-pointer">Cadastre um agora</span>
                    </Link>
                  </p>
                )}
              </div>

              {/* Tipo de Demanda */}
              <div className="space-y-2">
                <Label htmlFor="demandType" className="text-white">Tipo de Demanda *</Label>
                <Select value={demandType} onValueChange={(value) => setDemandType(value as any)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    {demandTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-white">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Título da Oportunidade *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Procuro imóvel para compra em São Paulo"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Descrição Detalhada *</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva os detalhes da oportunidade, preferências do cliente, características desejadas, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Tipo */}
              <div className="space-y-2">
                <Label htmlFor="type" className="text-white">Tipo de Oportunidade *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    {demandTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-white">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Orçamento */}
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-white">Orçamento (R$) *</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Ex: 500000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Localização */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">Localização Desejada *</Label>
                <Input
                  id="location"
                  placeholder="Ex: São Paulo, SP"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Destaque */}
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-white">Destaque (opcional)</Label>
                <Input
                  id="tags"
                  placeholder="Ex: Vende Urgente, Aceita Troca, Procura Comercial"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
                <p className="text-xs text-slate-400">Adicione um destaque para chamar atenção</p>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <Link href="/meus-negocios" className="flex-1">
                  <Button variant="outline" className="w-full">Cancelar</Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isLoading || createDemand.isPending}
                  className="flex-1 bg-rose-500 hover:bg-rose-600"
                >
                  {isLoading || createDemand.isPending ? "Publicando..." : "Publicar Demanda"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
