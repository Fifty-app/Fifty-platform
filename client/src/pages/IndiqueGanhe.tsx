import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SideMenu } from "@/components/SideMenu";
import { Building2, Copy, Gift, TrendingUp, Users } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

export default function IndiqueGanhe() {
  const { isAuthenticated, user, logout } = useAuth();

  // Modo demo: permite acesso
  if (false && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  // Modo demo: dados fictícios
  const demoUser = {
    id: "demo-user-123",
    creci: "DEMO-123456",
    name: "Demo User",
    email: "demo@fifty.com"
  };
  
  const displayUser = user || demoUser;

  // Gerar link de referência único baseado no ID do usuário
  const linkReferencia = `https://fifty.com.br?ref=${displayUser.id}`;

  const copiarLink = () => {
    navigator.clipboard.writeText(linkReferencia);
    toast.success("Link copiado para a área de transferência!");
  };

  // Dados simulados de referências
  const referenciasData = {
    total: 12,
    ativas: 8,
    ganhoTotal: 2400,
    ganhoMes: 600,
    referencias: [
      { id: 1, nome: "João Silva", email: "joao@email.com", status: "ativo", data: "2024-12-01", ganho: 200 },
      { id: 2, nome: "Maria Santos", email: "maria@email.com", status: "ativo", data: "2024-11-28", ganho: 200 },
      { id: 3, nome: "Pedro Oliveira", email: "pedro@email.com", status: "ativo", data: "2024-11-25", ganho: 200 },
      { id: 4, nome: "Ana Costa", email: "ana@email.com", status: "ativo", data: "2024-11-20", ganho: 200 },
      { id: 5, nome: "Carlos Mendes", email: "carlos@email.com", status: "inativo", data: "2024-11-15", ganho: 0 },
      { id: 6, nome: "Lucia Ferreira", email: "lucia@email.com", status: "inativo", data: "2024-11-10", ganho: 0 },
    ],
  };

  const getStatusBadge = (status: string) => {
    return status === "ativo" 
      ? <Badge className="bg-green-500">Ativo</Badge>
      : <Badge variant="secondary">Inativo</Badge>;
  };

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Indique e Ganhe</h1>
          <p className="text-slate-400">Convide amigos e ganhe comissões por cada indicação ativa</p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total de Indicações</p>
                  <p className="text-2xl font-bold text-white">{referenciasData.total}</p>
                </div>
                <Users className="h-8 w-8 text-rose-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Indicações Ativas</p>
                  <p className="text-2xl font-bold text-white">{referenciasData.ativas}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Ganho Total</p>
                  <p className="text-2xl font-bold text-white">R$ {referenciasData.ganhoTotal.toLocaleString('pt-BR')}</p>
                </div>
                <Gift className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Ganho Este Mês</p>
                  <p className="text-2xl font-bold text-white">R$ {referenciasData.ganhoMes.toLocaleString('pt-BR')}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Link de Referência */}
        <Card className="border-rose-500 bg-gradient-to-r from-slate-900 to-slate-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Seu Link de Referência</CardTitle>
            <CardDescription>Compartilhe este link com seus amigos e ganhe comissões</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="flex-1 bg-slate-950 rounded-lg px-4 py-3 border border-slate-800">
                <p className="text-slate-300 break-all font-mono text-sm">{linkReferencia}</p>
              </div>
              <Button 
                onClick={copiarLink}
                className="bg-rose-500 hover:bg-rose-600 px-6"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copiar
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-3">
              💡 Dica: Compartilhe este link no WhatsApp, email ou redes sociais para aumentar suas indicações
            </p>
          </CardContent>
        </Card>

        {/* Como Funciona */}
        <Card className="border-slate-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Como Funciona</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-rose-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold text-lg">1</div>
                <h3 className="text-white font-semibold mb-2">Compartilhe</h3>
                <p className="text-slate-400 text-sm">Envie seu link de referência para amigos e colegas</p>
              </div>
              <div className="text-center">
                <div className="bg-rose-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold text-lg">2</div>
                <h3 className="text-white font-semibold mb-2">Cadastro</h3>
                <p className="text-slate-400 text-sm">Quando clicarem no seu link e se cadastrarem, você recebe crédito</p>
              </div>
              <div className="text-center">
                <div className="bg-rose-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold text-lg">3</div>
                <h3 className="text-white font-semibold mb-2">Ganhe</h3>
                <p className="text-slate-400 text-sm">Receba R$ 200 por cada indicação que se torna ativa</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Referências */}
        <Card className="border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Histórico de Referências</CardTitle>
            <CardDescription>Pessoas que se cadastraram através do seu link</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Nome</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Data</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-semibold">Ganho</th>
                  </tr>
                </thead>
                <tbody>
                  {referenciasData.referencias.map((ref) => (
                    <tr key={ref.id} className="border-b border-slate-800 hover:bg-slate-900/50">
                      <td className="py-3 px-4 text-white">{ref.nome}</td>
                      <td className="py-3 px-4 text-slate-300">{ref.email}</td>
                      <td className="py-3 px-4">{getStatusBadge(ref.status)}</td>
                      <td className="py-3 px-4 text-slate-400">{new Date(ref.data).toLocaleDateString('pt-BR')}</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">
                        {ref.ganho > 0 ? `R$ ${ref.ganho.toLocaleString('pt-BR')}` : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
