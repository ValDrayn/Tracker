import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Applayout from "./pages/Applayout";
import ContextPool from "./components/util/ContextPool";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Locations from "./pages/Locations";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ContextPool />}>
        <Route path="/" element={<Applayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:location" element={<Locations />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}
