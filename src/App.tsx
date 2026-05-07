import { Navigate, Route, Routes } from "react-router-dom";
import { PublicLayout } from "@/layouts/public-layout";
import { AdminLayout } from "@/layouts/admin-layout";
import { LandingPage } from "@/pages/landing-page";
import { AdminDashboardPage } from "@/pages/admin-dashboard-page";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
