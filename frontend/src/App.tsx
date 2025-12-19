import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Home from "@/pages/landingpage/home";
import Nervovive from "@/pages/landingpage/nervovive";
import Elartedesoltar from "@/pages/vsl/elartedesoltar";

// Global protection against right-click and DevTools
function useGlobalProtection() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Block keyboard shortcuts for DevTools and save
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u')) ||
        (e.ctrlKey && (e.key === 'S' || e.key === 's'))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Disable text selection on the entire page
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      // Allow selection in input fields and textareas
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return true;
      }
      e.preventDefault();
      return false;
    };

    // Disable drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);

    // Add CSS to disable selection
    const style = document.createElement('style');
    style.id = 'global-protection-styles';
    style.textContent = `
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
      }
      input, textarea {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      const existingStyle = document.getElementById('global-protection-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/nervovive" component={Nervovive} />
      <Route path="/vsl/elartedesoltar" component={Elartedesoltar} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  // Apply global protection against right-click and DevTools
  useGlobalProtection();

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
