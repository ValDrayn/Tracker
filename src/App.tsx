import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Applayout from "./lib/pages/Applayout";
import ContextPool from "./components/util/ContextPool";
import Home from "./lib/pages/Home";
import NotFound from "./lib/pages/NotFound";
import Locations from "./lib/pages/Locations";
import Dashboard from "./lib/pages/Dashboard";

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
