import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import Dashboard from "./pages/Dashboard";
import ValidarCRECI from "./pages/ValidarCRECI";
import MeusNegocios from "./pages/MeusNegocios";
import MeusProdutos from "./pages/MeusProdutos";
import Gamificacao from "./pages/Gamificacao";
import CadastrarDemanda from "./pages/CadastrarDemanda";
import CadastrarProduto from "./pages/CadastrarProduto";
import MeuPlano from "./pages/MeuPlano";
import IndiqueGanhe from "./pages/IndiqueGanhe";
import AdminCRECI from "./pages/AdminCRECI";
import Mensagens from "./pages/Mensagens";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/forum"} component={Forum} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/validar-creci"} component={ValidarCRECI} />
      <Route path={"/negocios"} component={MeusNegocios} />
      <Route path={"/produtos"} component={MeusProdutos} />
      <Route path={"/gamificacao"} component={Gamificacao} />
      <Route path={"/cadastrar-demanda"} component={CadastrarDemanda} />
      <Route path={"/cadastrar-produto"} component={CadastrarProduto} />
      <Route path={"/plano"} component={MeuPlano} />
      <Route path={"/indique"} component={IndiqueGanhe} />
      <Route path="/admin/creci" component={AdminCRECI} />
      <Route path="/mensagens" component={Mensagens} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
