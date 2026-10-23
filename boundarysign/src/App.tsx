import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import About from "./pages/About.tsx";
import Team from "./pages/Team.tsx";
import TPostSign from "./pages/TPostSign.tsx";
import Retailers from "./pages/Retailers.tsx";
import Auth from "./pages/Auth.tsx";
import Admin from "./pages/Admin.tsx";
import { useCartSync } from "@/hooks/useCartSync";
import { AuthProvider } from "@/hooks/useAuth";

const queryClient = new QueryClient();

const AppRoutes = () => {
  useCartSync();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product/:handle" element={<ProductDetail />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/about" element={<About />} />
      <Route path="/team" element={<Team />} />
      <Route path="/t-post-sign" element={<TPostSign />} />
      <Route path="/retailers" element={<Retailers />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/admin" element={<Admin />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
