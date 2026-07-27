import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CategoryDetail from "./pages/CategoryDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import ProductCategory from "./pages/ProductCategory";
import NotFound from "./pages/NotFound";

import WhatsAppFloating from "./components/WhatsAppFloating";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <WhatsAppFloating />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/fish-collagen-peptide" element={<Navigate to="/" replace />} />
            <Route path="/fish-collagen-applications" element={<Navigate to="/" replace />} />
            <Route path="/fish-gelatin" element={<Navigate to="/" replace />} />
            <Route path="/fish-gelatin-applications" element={<Navigate to="/" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:categoryKey" element={<ProductCategory />} />
            <Route path="/category/:categoryId" element={<CategoryDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
