import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Building2, MapPin, DollarSign, Search, Plus } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { useState } from "react";

export default function Forum() {
  const { isAuthenticated, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: demands, isLoading } = trpc.demands.list.useQuery();

  const filteredDemands = demands?.filter(demand =>
    demand.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demand.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modo demo: permite acesso sem autenticação
  const isDemoMode = !isAuthenticated;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Building2 className="h-8 w-8 text-rose-600" />
              <span className="text-2xl font-bold">Fifty</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost">Meu Dashboard</Button>
            </Link>
            {isAuthenticated ? (
              <Link href="/cadastrar-demanda">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Demanda
                </Button>
              </Link>
            ) : (
              <Link href="/">
                <Button variant="outline">
                  Fazer Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Fórum de Oportunidades</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Encontre clientes e imóveis compartilhados por outros corretores
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Buscar por tipo de imóvel, localização..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Demands List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">Carregando oportunidades...</p>
          </div>
        ) : filteredDemands && filteredDemands.length > 0 ? (
          <div className="grid gap-6">
            {filteredDemands.map((demand) => (
              <Card key={demand.id} className="hover:shadow-lg transition">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{demand.title}</CardTitle>
                      <CardDescription className="text-base">
                        {demand.description}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{demand.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{demand.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Até R$ {demand.budget.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Link href={`/demanda/${demand.id}`}>
                      <Button>Ver Detalhes</Button>
                    </Link>
                    <Link href={`/proposta/${demand.id}`}>
                      <Button variant="outline">Fazer Proposta</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Building2 className="h-16 w-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Nenhuma oportunidade encontrada
              </p>
              <Link href="/nova-demanda">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeira Demanda
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
