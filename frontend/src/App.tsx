import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Nervovive from "@/pages/nervovive";
import Elartedesoltar from "@/pages/elartedesoltar";
import Provadent from "@/pages/provadent";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/nervovive" component={Nervovive} />
      <Route path="/elartedesoltar" component={Elartedesoltar} />
      <Route path="/provadent" component={Provadent} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
