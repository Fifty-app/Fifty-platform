import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SideMenu } from "@/components/SideMenu";
import { Building2, Trophy, Award, Star, Target } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

export default function Gamificacao() {
  const { isAuthenticated, user, logout } = useAuth();

  // Modo demo: permite acesso
  if (false && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  // Modo demo: dados fictícios se não tiver CRECI
  const demoUser = !user?.creci ? {
    ...user,
    creci: "DEMO-123456",
    xp: 1250,
    email: user?.email || "demo@fifty.com"
  } : user;
  
  const displayUser = demoUser;

  const userXP = displayUser.xp || 0;
  const userLevel = Math.floor(userXP / 1000) + 1;
  const xpForNextLevel = userLevel * 1000;
  const progressPercent = ((userXP % 1000) / 1000) * 100;

  const medals = [
    { id: 1, name: "CRECI Verificado", icon: Award, earned: !!displayUser.creci, color: "bg-blue-500" },
    { id: 2, name: "Primeira Proposta", icon: Star, earned: false, color: "bg-yellow-500" },
    { id: 3, name: "Negócio Fechado", icon: Trophy, earned: false, color: "bg-green-500" },
    { id: 4, name: "Perfil Completo", icon: Target, earned: !!displayUser.email, color: "bg-purple-500" },
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
        <h1 className="text-3xl font-bold text-white mb-8">Gamificação</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Nível {userLevel}
              </CardTitle>
              <CardDescription>{userXP} XP total</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Progresso para Nível {userLevel + 1}</span>
                  <span>{userXP % 1000} / 1000 XP</span>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Conquistas</CardTitle>
              <CardDescription>{medals.filter(m => m.earned).length} de {medals.length} medalhas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {medals.map((medal) => (
                  <div key={medal.id} className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full ${medal.earned ? medal.color : 'bg-slate-700'} flex items-center justify-center mb-2`}>
                      <medal.icon className={`h-8 w-8 ${medal.earned ? 'text-white' : 'text-slate-500'}`} />
                    </div>
                    <span className="text-xs text-center text-slate-400">{medal.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Como Ganhar XP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                <span className="text-slate-300">Completar perfil</span>
                <Badge>+100 XP</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                <span className="text-slate-300">Enviar proposta</span>
                <Badge>+50 XP</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                <span className="text-slate-300">Proposta aceita</span>
                <Badge>+200 XP</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                <span className="text-slate-300">Publicar oportunidade</span>
                <Badge>+75 XP</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
