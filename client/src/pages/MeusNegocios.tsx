import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SideMenu } from "@/components/SideMenu";
import { trpc } from "@/lib/trpc";
import { Building2, CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { Link, useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

export default function MeusNegocios() {
  const { isAuthenticated, user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const { data: myProposals, refetch } = trpc.proposals.myProposals.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: receivedProposals, refetch: refetchReceived } = trpc.proposals.receivedProposals.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const acceptProposal = trpc.proposals.accept.useMutation({
    onSuccess: () => {
      toast.success("Proposta aceita com sucesso!");
      refetchReceived();
    },
  });

  const rejectProposal = trpc.proposals.reject.useMutation({
    onSuccess: () => {
      toast.success("Proposta recusada");
      refetchReceived();
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Aceita</Badge>;
      case "rejected":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Recusada</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
    }
  };

  const getProposalTypeLabel = (proposalType?: string) => {
    if (proposalType === "product") return "Tenho Produto";
    if (proposalType === "client") return "Tenho Possível Cliente";
    return "Proposta";
  };

  return (
    <div className="min-h-screen bg-slate-950">
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Meus Negócios</h1>
            <p className="text-slate-400">Gerencie suas propostas enviadas e recebidas</p>
          </div>
          <Link href="/cadastrar-demanda"><Button className="bg-rose-500 hover:bg-rose-600">+ Publicar Oportunidade</Button></Link>
        </div>

        <Tabs defaultValue="enviadas" className="space-y-6">
          <TabsList className="bg-slate-900">
            <TabsTrigger value="enviadas">Propostas Enviadas</TabsTrigger>
            <TabsTrigger value="recebidas">Propostas Recebidas</TabsTrigger>
          </TabsList>

          <TabsContent value="enviadas" className="space-y-4">
            {!myProposals || myProposals.length === 0 ? (
              <Card className="border-slate-800">
                <CardContent className="py-12 text-center">
                  <Eye className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Nenhuma proposta enviada</h3>
                  <p className="text-slate-400 mb-4">Você ainda não enviou propostas para nenhuma oportunidade</p>
                  <Link href="/forum">
                    <Button>Explorar Oportunidades</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              myProposals.map((proposal) => (
                <Card key={proposal.id} className="border-slate-800">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{getProposalTypeLabel(proposal.proposalType)}</CardTitle>
                        <CardDescription>
                          Proposta para demanda #{proposal.demandId}
                        </CardDescription>
                      </div>
                      {getStatusBadge(proposal.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 mb-4">{proposal.message}</p>
                    <div className="text-sm text-slate-400">
                      Enviada em {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="recebidas" className="space-y-4">
            {!receivedProposals || receivedProposals.length === 0 ? (
              <Card className="border-slate-800">
                <CardContent className="py-12 text-center">
                  <Eye className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Nenhuma proposta recebida</h3>
                  <p className="text-slate-400 mb-4">Você ainda não recebeu propostas nas suas oportunidades</p>
                  <Link href="/dashboard">
                    <Button>Publicar Oportunidade</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              receivedProposals.map((proposal) => (
                <Card key={proposal.id} className="border-slate-800">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{getProposalTypeLabel(proposal.proposalType)}</CardTitle>
                        <CardDescription>
                          Proposta para demanda #{proposal.demandId}
                        </CardDescription>
                      </div>
                      {getStatusBadge(proposal.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 mb-4">{proposal.message}</p>
                    <div className="text-sm text-slate-400 mb-4">
                      Recebida em {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                    {proposal.status === "pending" && (
                      <div className="flex gap-3">
                        <Button
                          onClick={() => acceptProposal.mutate({ proposalId: proposal.id })}
                          disabled={acceptProposal.isPending}
                          className="flex-1"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Aceitar
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => rejectProposal.mutate({ proposalId: proposal.id })}
                          disabled={rejectProposal.isPending}
                          className="flex-1"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Recusar
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
