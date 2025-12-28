import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SideMenu } from "@/components/SideMenu";
import { trpc } from "@/lib/trpc";
import { Building2, Package, Plus } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

export default function MeusProdutos() {
  const { isAuthenticated, user, logout } = useAuth();
  const { data: products } = trpc.products.myProducts.useQuery(undefined, { enabled: isAuthenticated });

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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Meus Produtos</h1>
            <p className="text-slate-400">Gerencie seus imóveis cadastrados</p>
          </div>
          <Link href="/cadastrar-produto"><Button><Plus className="h-4 w-4 mr-2" />Cadastrar Imóvel</Button></Link>
        </div>

        {!products || products.length === 0 ? (
          <Card className="border-slate-800">
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Nenhum imóvel cadastrado</h3>
              <p className="text-slate-400 mb-4">Cadastre seus imóveis para oferecer nas oportunidades</p>
              <Link href="/cadastrar-produto"><Button><Plus className="h-4 w-4 mr-2" />Cadastrar Primeiro Imóvel</Button></Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">{product.title}</CardTitle>
                  <CardDescription>{product.city}, {product.state}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Badge className="bg-rose-500">{product.transactionType}</Badge>
                    <span className="text-2xl font-bold text-white ml-3">
                      R$ {product.value.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Editar</Button>
                    <Button variant="ghost" size="sm" className="flex-1">Excluir</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
