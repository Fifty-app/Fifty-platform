import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SideMenu } from "@/components/SideMenu";
import { trpc } from "@/lib/trpc";
import { Building2, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminCRECI() {
  const { isAuthenticated, user, logout } = useAuth();
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const { data: pendingUsers, refetch } = trpc.admin.pendingCRECI.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const approveMutation = trpc.admin.approveCRECI.useMutation({
    onSuccess: () => {
      toast.success("CRECI aprovado com sucesso!");
      refetch();
    },
    onError: () => {
      toast.error("Erro ao aprovar CRECI");
    },
  });

  const rejectMutation = trpc.admin.approveCRECI.useMutation({
    onSuccess: () => {
      toast.success("CRECI rejeitado");
      refetch();
    },
    onError: () => {
      toast.error("Erro ao rejeitar CRECI");
    },
  });

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Card className="border-slate-800 w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Acesso Negado</h2>
            <p className="text-slate-400 mb-6">Você não tem permissão para acessar esta página</p>
            <Link href="/">
              <Button className="w-full">Voltar à Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Aprovado</Badge>;
      case "rejected":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejeitado</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
    }
  };

  const filteredUsers = pendingUsers?.filter(user => {
    if (filter === "all") return true;
    return user.creciStatus === filter;
  }) || [];

  const stats = {
    total: pendingUsers?.length || 0,
    pending: pendingUsers?.filter(u => u.creciStatus === "pending").length || 0,
    approved: pendingUsers?.filter(u => u.creciStatus === "approved").length || 0,
    rejected: pendingUsers?.filter(u => u.creciStatus === "rejected").length || 0,
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
            <Badge className="bg-purple-600">Admin</Badge>
            <Button variant="ghost" className="text-white hover:text-rose-400" onClick={() => logout()}>Sair</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Painel Administrativo</h1>
          <p className="text-slate-400">Validação de CRECIs pendentes</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total de Registros</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Pendentes</p>
                  <p className="text-2xl font-bold text-white">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Aprovados</p>
                  <p className="text-2xl font-bold text-white">{stats.approved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Rejeitados</p>
                  <p className="text-2xl font-bold text-white">{stats.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex gap-2">
          {["all", "pending", "approved", "rejected"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f as any)}
              className={filter === f ? "bg-rose-500 hover:bg-rose-600" : ""}
            >
              {f === "all" ? "Todos" : f === "pending" ? "Pendentes" : f === "approved" ? "Aprovados" : "Rejeitados"}
            </Button>
          ))}
        </div>

        {/* Tabela de CRECIs */}
        <Card className="border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Registros de CRECI</CardTitle>
            <CardDescription>Gerencie as validações de CRECI dos usuários</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400">Nenhum registro encontrado</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Nome</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">CRECI</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Tipo</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Data</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="border-b border-slate-800 hover:bg-slate-900/50">
                        <td className="py-3 px-4 text-white font-semibold">{u.name}</td>
                        <td className="py-3 px-4 text-slate-300">{u.email}</td>
                        <td className="py-3 px-4 text-white font-mono">{u.creci || "-"}</td>
                        <td className="py-3 px-4">
                          <Badge className={u.creciType === "F" ? "bg-blue-600" : "bg-purple-600"}>
                            {u.creciType === "F" ? "Pessoa Física" : "Pessoa Jurídica"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(u.creciStatus || "pending")}</td>
                        <td className="py-3 px-4 text-slate-400">
                          {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {u.creciStatus === "pending" && (
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => approveMutation.mutate({ userId: u.id, status: "approved" as const })}
                                disabled={approveMutation.isPending}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Aprovar
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => rejectMutation.mutate({ userId: u.id, status: "rejected" as const })}
                                disabled={rejectMutation.isPending}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Rejeitar
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
