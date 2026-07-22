import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Dashboard from '@/pages/Dashboard';
import NewInvitation from '@/pages/NewInvitation';
import Editor from '@/pages/Editor';
import InvitationViewer from '@/pages/InvitationViewer';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

function Router() {
  return (
    <Switch>
      {/* Route publique viewer — doit être avant les routes Studio */}
      <Route path="/i/:slug" component={InvitationViewer} />
      <Route path="/" component={Dashboard} />
      <Route path="/invitations/new" component={NewInvitation} />
      <Route path="/invitations/:id/edit" component={Editor} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
