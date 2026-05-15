import { Navigate, Route, Routes } from "react-router-dom";
import { PublicLayout } from "@/layouts/public-layout";
import { AdminLayout } from "@/layouts/admin-layout";
import { LandingPage } from "@/pages/landing-page";
import { AdminLoginPage } from "@/pages/admin-login-page";
import { AdminDashboardPage } from "@/pages/admin-dashboard-page";
import { ConfigPage } from "@/pages/admin/config-page";
import { EventsPage } from "@/pages/admin/events-page";
import { RsvpsPage } from "@/pages/admin/rsvps-page";
import { WishesPage } from "@/pages/admin/wishes-page";
import { GiftsPage } from "@/pages/admin/gifts-page";
import { GalleryPage } from "@/pages/admin/gallery-page";
import { MusicPlayer } from "@/components/music-player";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route element={<PublicLayout />}>
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/config" element={<ConfigPage />} />
          <Route path="/admin/events" element={<EventsPage />} />
          <Route path="/admin/rsvps" element={<RsvpsPage />} />
          <Route path="/admin/wishes" element={<WishesPage />} />
          <Route path="/admin/gifts" element={<GiftsPage />} />
          <Route path="/admin/gallery" element={<GalleryPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <MusicPlayer />
    </>
  );
}
