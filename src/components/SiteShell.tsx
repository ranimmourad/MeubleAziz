import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFab from "./WhatsAppFab";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
