import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Building2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function ValidarCRECI() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [creci, setCreci] = useState("");
  const [creciType, setCreciType] = useState<"F" | "J">("F");

  const updateCRECI = trpc.profile.updateCRECI.useMutation({
    onSuccess: () => {
      toast.success("CRECI cadastrado com sucesso! Aguarde aprovação em até 48h.");
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error("Erro ao cadastrar CRECI: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!creci || creci.length < 5) {
      toast.error("Por favor, insira um número de CRECI válido");
      return;
    }

    updateCRECI.mutate({ creci, creciType });
  };

  // Se já tem CRECI, redireciona
  if (user?.creci) {
    setLocation("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-slate-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center">
            <Building2 className="h-8 w-8 text-rose-500" />
          </div>
          <CardTitle className="text-2xl">Validação de CRECI</CardTitle>
          <CardDescription>
            Para acessar a plataforma, você precisa cadastrar seu número de CRECI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="creci">Número do CRECI</Label>
              <Input
                id="creci"
                placeholder="Ex: 12345"
                value={creci}
                onChange={(e) => setCreci(e.target.value.replace(/\D/g, ""))}
                maxLength={10}
                required
              />
              <p className="text-xs text-slate-400">
                Digite apenas os números do seu CRECI
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de CRECI</Label>
              <Select value={creciType} onValueChange={(value: "F" | "J") => setCreciType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="F">Pessoa Física (F)</SelectItem>
                  <SelectItem value="J">Pessoa Jurídica (J)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-400">
                CRECIs terminados em F são para pessoas físicas, J para jurídicas
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                  <p className="font-medium mb-1">Validação Manual</p>
                  <p className="text-slate-400">
                    Seu CRECI será validado pela nossa equipe em até 48 horas úteis. 
                    Você receberá uma notificação quando for aprovado.
                  </p>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={updateCRECI.isPending}
            >
              {updateCRECI.isPending ? "Cadastrando..." : "Cadastrar CRECI"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
