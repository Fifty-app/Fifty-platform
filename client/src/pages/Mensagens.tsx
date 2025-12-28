import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SideMenu } from "@/components/SideMenu";
import { trpc } from "@/lib/trpc";
import { Building2, Send, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export default function Mensagens() {
  const { isAuthenticated, user, logout } = useAuth();
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [messageSubject, setMessageSubject] = useState("");

  const { data: conversations, refetch: refetchConversations } = trpc.messages.getConversations.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: messages, refetch: refetchMessages } = trpc.messages.getMessages.useQuery(
    { partnerId: selectedPartner! },
    { enabled: isAuthenticated && selectedPartner !== null }
  );

  const { data: partnerInfo } = trpc.messages.getPartnerInfo.useQuery(
    { partnerId: selectedPartner! },
    { enabled: isAuthenticated && selectedPartner !== null }
  );

  const sendMutation = trpc.messages.send.useMutation({
    onSuccess: () => {
      setMessageContent("");
      setMessageSubject("");
      refetchMessages();
      refetchConversations();
      toast.success("Mensagem enviada!");
    },
    onError: () => {
      toast.error("Erro ao enviar mensagem");
    },
  });

  const handleSendMessage = () => {
    if (!selectedPartner || !messageContent.trim()) {
      toast.error("Preencha a mensagem");
      return;
    }

    sendMutation.mutate({
      recipientId: selectedPartner,
      subject: messageSubject || "Sem assunto",
      content: messageContent,
    });
  };

  // Modo demo: permite acesso
  if (false && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  const getFirstName = (fullName: string | null | undefined) => {
    if (!fullName) return "Usuário";
    return fullName.split(" ")[0];
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
          <Button variant="ghost" className="text-white hover:text-rose-400" onClick={() => logout()}>Sair</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Mensagens</h1>
          <p className="text-slate-400">Comunique-se com outros corretores</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Lista de Conversas */}
          <Card className="border-slate-800 md:col-span-1">
            <CardHeader>
              <CardTitle className="text-white">Conversas</CardTitle>
              <CardDescription>
                {conversations?.length === 0 ? "Nenhuma conversa" : `${conversations?.length} conversa(s)`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {conversations && conversations.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">Nenhuma conversa ainda</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {conversations?.map((conv) => (
                    <button
                      key={conv.partnerId}
                      onClick={() => setSelectedPartner(conv.partnerId)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        selectedPartner === conv.partnerId
                          ? "bg-rose-500/20 border border-rose-500"
                          : "bg-slate-800 hover:bg-slate-700 border border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">
                          {getFirstName(conv.lastMessage?.senderId === user?.id ? "Você" : conv.lastMessage?.content)}
                        </span>
                        {conv.unreadCount > 0 && (
                          <span className="bg-rose-500 text-white text-xs rounded-full px-2 py-1">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm truncate">{conv.lastMessage?.content}</p>
                      <p className="text-slate-500 text-xs mt-1">
                        {new Date(conv.lastMessage?.createdAt || "").toLocaleDateString("pt-BR")}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chat */}
          <Card className="border-slate-800 md:col-span-2">
            {selectedPartner ? (
              <>
                <CardHeader className="border-b border-slate-800">
                  <CardTitle className="text-white">
                    Chat com {getFirstName(partnerInfo?.firstName)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-96">
                  {/* Mensagens */}
                  <div className="flex-1 overflow-y-auto mb-4 space-y-3 py-4">
                    {messages && messages.length === 0 ? (
                      <div className="text-center text-slate-400 py-8">
                        <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Nenhuma mensagem ainda</p>
                      </div>
                    ) : (
                      messages?.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.senderId === user?.id ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                              msg.senderId === user?.id
                                ? "bg-rose-500 text-white"
                                : "bg-slate-800 text-slate-100"
                            }`}
                          >
                            <p className="text-xs font-semibold mb-1 opacity-75">{msg.subject}</p>
                            <p>{msg.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {new Date(msg.createdAt).toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Input de Mensagem */}
                  <div className="space-y-2 border-t border-slate-800 pt-4">
                    <Input
                      placeholder="Assunto (opcional)"
                      value={messageSubject}
                      onChange={(e) => setMessageSubject(e.target.value)}
                      className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    />
                    <div className="flex gap-2">
                      <Input
                        placeholder="Digite sua mensagem..."
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={sendMutation.isPending}
                        className="bg-rose-500 hover:bg-rose-600"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">Selecione uma conversa para começar</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
