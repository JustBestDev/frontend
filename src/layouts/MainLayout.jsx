import { Outlet, useLocation } from "react-router";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";

function MainLayout() {

const location = useLocation()

  return (
    <div className="min-h-screen bg-[#faf8fb] pb-[calc(92px+env(safe-area-inset-bottom))] md:pb-28">
      <Header />

      <main key={location.pathname} className="animate-page-in">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}

export default MainLayout;
