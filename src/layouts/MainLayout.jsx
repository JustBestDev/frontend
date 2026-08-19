import { Outlet } from "react-router";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";

function MainLayout() {
  return (
    <div className="min-h-screen pb-[calc(92px+env(safe-area-inset-bottom))] md:pb-28">
      <Header />

      <main>
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}

export default MainLayout;
