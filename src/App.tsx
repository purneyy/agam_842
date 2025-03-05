
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import CommunicationAssistant from "./pages/features/CommunicationAssistant";
import ScreeningDiagnosis from "./pages/features/ScreeningDiagnosis";
import TherapyContent from "./pages/features/TherapyContent";
import TaleTherapy from "./pages/features/TaleTherapy";
import CrisisSupport from "./pages/features/CrisisSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="communication" element={<CommunicationAssistant />} />
            <Route path="screening" element={<ScreeningDiagnosis />} />
            <Route path="therapy" element={<TherapyContent />} />
            <Route path="tale-therapy" element={<TaleTherapy />} />
            <Route path="crisis-support" element={<CrisisSupport />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
