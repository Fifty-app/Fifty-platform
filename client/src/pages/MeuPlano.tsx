import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SideMenu } from "@/components/SideMenu";
import { Building2, Check, X, Zap, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

export default function MeuPlano() {
  const { isAuthenticated, user, logout } = useAuth();

  // Modo demo: permite acesso
  if (false && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  // Modo demo: dados fictícios
  const demoUser = {
    subscriptionPlan: "pf_free",
    creci: "DEMO-123456",
    creciType: "F",
    name: "Demo User",
    email: "demo@fifty.com",
    maxProducts: 3,
    maxDemands: 3
  };
  
  const displayUser = user || demoUser;

  const planos = [
    {
      id: "pf-free",
      nome: "PF Free",
      tipo: "Pessoa Física",
      preco: "Grátis",
      ciclo: "",
      descricao: "Plano básico para começar",
      features: [
        { nome: "3 produtos", incluido: true },
        { nome: "6 propostas", incluido: true },
        { nome: "3 demandas", incluido: true },
        { nome: "Acesso ao fórum", incluido: true },
        { nome: "180 dias de acesso", incluido: true },
        { nome: "Acesso a mensagens", incluido: false, blur: true },
        { nome: "Gestão de negócios", incluido: false, blur: true },
        { nome: "Sujeito a vídeos publicitários", incluido: true, warning: true },
      ],
      atual: displayUser.subscriptionPlan === "pf_free",
    },
    {
      id: "pf-premium",
      nome: "PF Premium",
      tipo: "Pessoa Física",
      preco: "R$ 80",
      ciclo: "/mês (ou R$ 40/mês no trimestral)",
      descricao: "Plano completo para profissionais",
      features: [
        { nome: "12 produtos (ilimitado em lançamento)", incluido: true },
        { nome: "20 demandas (ilimitado)", incluido: true },
        { nome: "Propostas ilimitadas", incluido: true },
        { nome: "Acesso completo ao fórum", incluido: true },
        { nome: "Acesso completo a mensagens", incluido: true },
        { nome: "Gestão completa de negócios", incluido: true },
        { nome: "Busca por parceiro/empreendimento", incluido: true, soon: true },
        { nome: "Sem vídeos publicitários", incluido: true },
      ],
      atual: displayUser.subscriptionPlan === "pf_premium",
      destaque: true,
    },
    {
      id: "pj-test",
      nome: "PJ Teste",
      tipo: "Pessoa Jurídica",
      preco: "Grátis",
      ciclo: "(12 horas)",
      descricao: "Acesso temporário para testes",
      features: [
        { nome: "Mesmas features do PF Premium", incluido: true },
        { nome: "Duração: 12 horas", incluido: true },
        { nome: "Sem compromisso", incluido: true },
        { nome: "Contato para plano permanente", incluido: true },
        { nome: "Propostas ilimitadas", incluido: true },
        { nome: "Acesso a mensagens", incluido: true },
        { nome: "Gestão de negócios", incluido: true },
        { nome: "Suporte dedicado", incluido: false },
      ],
      atual: displayUser.subscriptionPlan === "pj_test",
    },
    {
      id: "pj-premium",
      nome: "PJ Premium",
      tipo: "Pessoa Jurídica",
      preco: "R$ 1.360",
      ciclo: "/mês (ou R$ 930/mês no trimestral)",
      descricao: "Plano enterprise com múltiplos usuários",
      features: [
        { nome: "Tudo do PF Premium", incluido: true },
        { nome: "Múltiplos usuários (times)", incluido: true },
        { nome: "1º usuário incluído", incluido: true },
        { nome: "Usuários extras: +R$ 465/mês", incluido: true },
        { nome: "Gestão de equipe", incluido: true },
        { nome: "Relatórios avançados", incluido: true },
        { nome: "Suporte dedicado", incluido: true },
        { nome: "Integração customizada", incluido: true },
      ],
      atual: displayUser.subscriptionPlan === "pj_premium",
      destaque: true,
    },
  ];

  const planoAtual = planos.find(p => p.atual);
  const planosPorTipo = displayUser.creciType === "F" 
    ? planos.filter(p => p.tipo === "Pessoa Física")
    : planos.filter(p => p.tipo === "Pessoa Jurídica");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SideMenu />
      
      <div className="ml-0 md:ml-64 p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Meu Plano</h1>
            <p className="text-slate-400">Gerencie sua assinatura e escolha o melhor plano para você</p>
          </div>
          <button onClick={logout} className="text-slate-400 hover:text-white transition">
            Sair
          </button>
        </div>

        {/* Current Plan Summary */}
        {planoAtual && (
          <Card className="mb-8 bg-slate-900 border-rose-600/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white">{planoAtual.nome}</CardTitle>
                  <CardDescription className="text-slate-400">{planoAtual.descricao}</CardDescription>
                </div>
                <Badge className="bg-rose-600 text-white">Plano Atual</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-slate-400 mb-2">Preço</p>
                  <p className="text-3xl font-bold text-white">{planoAtual.preco}</p>
                  <p className="text-sm text-slate-400">{planoAtual.ciclo}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-2">Limite de Produtos</p>
                  <p className="text-3xl font-bold text-white">{displayUser.maxProducts}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-2">Limite de Demandas</p>
                  <p className="text-3xl font-bold text-white">{displayUser.maxDemands}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Todos os Planos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {planos.map((plano) => (
              <Card 
                key={plano.id} 
                className={`flex flex-col ${plano.destaque ? 'border-rose-600 border-2 bg-slate-900/80' : 'bg-slate-900 border-slate-800'}`}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-white">{plano.nome}</CardTitle>
                  <CardDescription className="text-slate-400">{plano.descricao}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-white">{plano.preco}</div>
                    <div className="text-xs text-slate-400">{plano.ciclo}</div>
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    {plano.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        {feature.incluido ? (
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-slate-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.incluido ? 'text-slate-300' : 'text-slate-500'} ${(feature as any).blur ? 'line-through' : ''}`}>
                          {feature.nome}
                          {(feature as any).soon && <span className="text-xs text-rose-400 ml-1">(em breve)</span>}
                          {(feature as any).warning && <span className="text-xs text-yellow-400 ml-1">*</span>}
                        </span>
                      </div>
                    ))}
                  </div>

                  {plano.atual ? (
                    <Button disabled className="w-full bg-slate-700">
                      Plano Atual
                    </Button>
                  ) : (
                    <Button className="w-full bg-rose-600 hover:bg-rose-700">
                      {plano.id === "pj-test" ? "Solicitar Acesso" : "Fazer Upgrade"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Histórico de Pagamentos</h2>
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="text-center text-slate-400 py-8">
                <p>Nenhum pagamento registrado ainda</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        <div className="mt-8 p-4 bg-slate-900 border border-slate-800 rounded-lg">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-400">
              <p className="font-semibold text-white mb-1">Informações Importantes</p>
              <p>* Planos Free podem ser impactados por vídeos publicitários de patrocinadores ou sistema de rewards.</p>
              <p className="mt-2">Para dúvidas sobre upgrade ou cancelamento, entre em contato com nosso suporte.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
