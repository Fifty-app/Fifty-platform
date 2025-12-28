import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Building2, FileText, Package, CheckCircle, XCircle, Clock, Plus } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { SideMenu } from "@/components/SideMenu";

export default function Dashboard() {
  const { isAuthenticated, user, logout } = useAuth();
  
  const { data: myDemands } = trpc.demands.myDemands.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const { data: myProducts } = trpc.products.myProducts.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Modo demo: permite acesso sem autenticação
  const isDemoMode = !isAuthenticated;
  
  // Dados de demo para usuários não autenticados
  const demoUser = isDemoMode ? {
    name: "Demo User",
    email: "demo@fifty.com",
    creci: "DEMO-123456",
    creciStatus: "approved" as const,
    xp: 1250,
    level: 5
  } : user;
  
  const displayUser = isDemoMode ? demoUser : user;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SideMenu />
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <Building2 className="h-8 w-8 text-rose-500" />
                <span className="text-2xl font-bold text-white">Fifty</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/perfil">
              <Button variant="ghost" className="text-white hover:text-rose-400">Meu Perfil</Button>
            </Link>
            <Button variant="ghost" className="text-white hover:text-rose-400" onClick={() => logout()}>Sair</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* User Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meu Dashboard</h1>
          <div className="flex items-center gap-4">
            <p className="text-slate-600 dark:text-slate-400">
              {displayUser?.name || displayUser?.email}
            </p>
            {displayUser?.creci && (
              <Badge variant="secondary">
                CRECI: {displayUser.creci}
              </Badge>
            )}
            {displayUser?.creciStatus === "pending" && (
              <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                <Clock className="h-3 w-3 mr-1" />
                CRECI Pendente
              </Badge>
            )}
            {displayUser?.creciStatus === "approved" && (
              <Badge variant="outline" className="border-green-500 text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                CRECI Aprovado
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Minhas Demandas</CardTitle>
              <FileText className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myDemands?.length || 0}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Oportunidades publicadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meus Imóveis</CardTitle>
              <Package className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myProducts?.length || 0}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Produtos cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">XP Total</CardTitle>
              <CheckCircle className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{displayUser?.xp || 0}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Nível {displayUser?.level || 1}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="demandas" className="space-y-6">
          <TabsList>
            <TabsTrigger value="demandas">Minhas Demandas</TabsTrigger>
            <TabsTrigger value="produtos">Meus Imóveis</TabsTrigger>
          </TabsList>

          <TabsContent value="demandas" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Demandas Publicadas</h2>
              <Link href="/nova-demanda">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Demanda
                </Button>
              </Link>
            </div>

            {myDemands && myDemands.length > 0 ? (
              <div className="grid gap-4">
                {myDemands.map((demand) => (
                  <Card key={demand.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{demand.title}</CardTitle>
                          <CardDescription>{demand.description}</CardDescription>
                        </div>
                        <Badge variant={demand.status === "active" ? "default" : "secondary"}>
                          {demand.status === "active" ? "Ativa" : "Fechada"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <span>📍 {demand.location}</span>
                        <span>💰 R$ {demand.budget.toLocaleString('pt-BR')}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-16 w-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Você ainda não publicou nenhuma demanda
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
          </TabsContent>

          <TabsContent value="produtos" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Imóveis Cadastrados</h2>
              <Link href="/novo-produto">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Imóvel
                </Button>
              </Link>
            </div>

            {myProducts && myProducts.length > 0 ? (
              <div className="grid gap-4">
                {myProducts.map((product) => (
                  <Card key={product.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{product.title}</CardTitle>
                          <CardDescription>{product.description}</CardDescription>
                        </div>
                        <Badge>{product.transactionType}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <span>🏠 {product.propertyType}</span>
                        <span>💰 R$ {product.value.toLocaleString('pt-BR')}</span>
                        {product.city && <span>📍 {product.city}</span>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-16 w-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Você ainda não cadastrou nenhum imóvel
                  </p>
                  <Link href="/novo-produto">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Cadastrar Primeiro Imóvel
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
