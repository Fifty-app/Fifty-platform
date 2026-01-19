import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, 
  Briefcase, 
  Package, 
  CreditCard, 
  Gift, 
  MessageSquare, 
  Trophy, 
  UserCog 
} from "lucide-react";
import { Link } from "wouter";

export function SideMenu() {
  const menuItems = [
    { icon: Briefcase, label: "Meus Negócios", href: "/negocios" },
    { icon: Package, label: "Meus Produtos", href: "/produtos" },
    { icon: CreditCard, label: "Meu Plano", href: "/plano" },
    { icon: Gift, label: "Indique e Ganhe", href: "/indique" },
    { icon: MessageSquare, label: "Mensagens", href: "/mensagens" },
    { icon: Trophy, label: "Gamificação", href: "/gamificacao" },
    { icon: UserCog, label: "Editar Perfil", href: "/perfil" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-slate-900 border-slate-800">
        <nav className="flex flex-col gap-2 mt-8">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-white hover:bg-slate-800 hover:text-rose-400"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>
        
        <div className="mt-8 pt-8 border-t border-slate-800">
          <Link href="/forum">
            <Button className="w-full mb-3" variant="default">
              Voltar ao Fórum
            </Button>
          </Link>
          <Link href="/gerenciamento">
            <Button className="w-full" variant="outline">
              Gerenciamento de Negócios
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
