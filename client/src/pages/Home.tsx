import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { ArrowRight, Building2, HandshakeIcon, TrendingUp, Users, CheckCircle2, Zap, Shield } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-rose-600" />
            <span className="text-2xl font-bold">Fifty</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#recursos" className="text-sm hover:text-rose-600 transition">Recursos</a>
            <a href="#como-funciona" className="text-sm hover:text-rose-600 transition">Como Funciona</a>
            <a href="#precos" className="text-sm hover:text-rose-600 transition">Preços</a>
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link href="/forum">
                <Button>Acessar Plataforma</Button>
              </Link>
            ) : (
              <>
                <Link href="/forum">
                  <Button variant="ghost">Ver Demo</Button>
                </Link>
                <Link href="/forum">
                  <Button>Começar Agora</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section - Redesigned */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-rose-100 dark:bg-rose-900/30 rounded-full">
              <span className="text-sm font-semibold text-rose-700 dark:text-rose-300">
                🚀 A primeira comunidade de corretores focada em otimizar vendas
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-rose-600 dark:from-white dark:to-rose-400 bg-clip-text text-transparent">
              Venda Mais, Sozinho Nunca Mais
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Conecte-se com corretores verificados, compartilhe oportunidades reais e multiplique seus ganhos através de parcerias estratégicas. Sem complicações, sem intermediários.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/forum">
                <Button size="lg" className="text-lg px-8">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#como-funciona">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Ver Como Funciona
                </Button>
              </a>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">500+</div>
              <p className="text-slate-600 dark:text-slate-400">Corretores Verificados</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">1000+</div>
              <p className="text-slate-600 dark:text-slate-400">Negócios Fechados</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">R$ 50M+</div>
              <p className="text-slate-600 dark:text-slate-400">Em Comissões Compartilhadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section id="recursos" className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Por que Fifty é Diferente?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-rose-600 mb-4" />
                <CardTitle>Corretores Verificados</CardTitle>
                <CardDescription>
                  Todos os membros têm CRECI validado. Comunidade segura e profissional.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-rose-600 mb-4" />
                <CardTitle>Oportunidades em Tempo Real</CardTitle>
                <CardDescription>
                  Acesse demandas de clientes e produtos disponíveis instantaneamente.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-rose-600 mb-4" />
                <CardTitle>Aumente suas Vendas</CardTitle>
                <CardDescription>
                  Colabore com parceiros e feche mais negócios sem aumentar custos.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-rose-600 mb-4" />
                <CardTitle>Rede Profissional</CardTitle>
                <CardDescription>
                  Construa relacionamentos duradouros com corretores de confiança.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <HandshakeIcon className="h-12 w-12 text-rose-600 mb-4" />
                <CardTitle>Divisão Transparente</CardTitle>
                <CardDescription>
                  Negocie comissões de forma justa e sem intermediários.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle2 className="h-12 w-12 text-rose-600 mb-4" />
                <CardTitle>Suporte Dedicado</CardTitle>
                <CardDescription>
                  Equipe pronta para ajudar no que você precisar.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Como Funciona em 3 Passos
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Cadastre-se com seu CRECI</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Crie sua conta gratuitamente usando seu número de CRECI. Validamos sua credencial em até 48h para garantir uma comunidade segura.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Publique ou Encontre Oportunidades</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Compartilhe demandas de clientes ou encontre imóveis perfeitos para seus compradores. Acesse um catálogo completo de oportunidades.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Feche Negócios e Ganhe Mais</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Colabore com outros corretores, feche mais vendas e divida as comissões de forma justa. Sem burocracia, sem intermediários.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Planos para Todos os Perfis
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Pessoa Física</CardTitle>
                <CardDescription>Para corretores autônomos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">Grátis</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Acesso ao fórum de oportunidades</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Publicar demandas ilimitadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Sistema de propostas</span>
                  </li>
                </ul>
                <Link href="/forum">
                  <Button className="w-full">Começar Agora</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-rose-600 border-2">
              <CardHeader>
                <CardTitle className="text-2xl">PF Premium</CardTitle>
                <CardDescription>Para corretores avançados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">R$ 97</span>
                  <span className="text-slate-600 dark:text-slate-400">/mês</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Tudo do plano Free</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Destaque nas oportunidades</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Suporte prioritário</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Relatórios avançados</span>
                  </li>
                </ul>
                <Link href="/plano">
                  <Button className="w-full">Assinar Premium</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Pessoa Jurídica</CardTitle>
                <CardDescription>Para imobiliárias pequenas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">R$ 297</span>
                  <span className="text-slate-600 dark:text-slate-400">/mês</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Tudo do plano PF</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Até 5 corretores</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Gestão de equipe</span>
                  </li>
                </ul>
                <Link href="/forum">
                  <Button className="w-full">Começar Agora</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-600 border-2">
              <CardHeader>
                <CardTitle className="text-2xl">PJ Premium</CardTitle>
                <CardDescription>Para grandes imobiliárias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">Sob Consulta</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Tudo do plano PJ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Corretores ilimitados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Relatórios avançados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span>Suporte dedicado</span>
                  </li>
                </ul>
                <a href="https://wa.me/5511999999999?text=Olá, gostaria de saber mais sobre o plano PJ Premium" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full" variant="outline">Entrar em Contato</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-rose-600 to-rose-700 dark:from-rose-700 dark:to-rose-800 rounded-lg p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Vender Mais?
          </h2>
          <p className="text-lg mb-8 text-rose-100">
            Junte-se a centenas de corretores que já estão multiplicando seus ganhos na Fifty.
          </p>
          <Link href="/forum">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50 dark:bg-slate-900/50 py-12">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-6 w-6 text-rose-600" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">Fifty</span>
          </div>
          <p>© 2025 Fifty. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">A primeira comunidade de corretores focada em otimizar vendas</p>
        </div>
      </footer>
    </div>
  );
}
