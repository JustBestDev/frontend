import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer
        toastClassName={(context) => 
          `relative flex p-4 mt-10 min-h-12 rounded-2xl justify-between overflow-hidden cursor-pointer shadow-xl border backdrop-blur-md ` +
          (context?.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
           context?.type === 'error' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
           context?.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
           'bg-slate-900/90 border-slate-700 text-slate-200')
        }
        bodyClassName={() => "flex items-center text-sm font-medium tracking-wide font-sans p-1"}
        position="top-center"
        autoClose={3000}
        icon={true} // ยังคงไอคอนของระบบไว้ หรือจะปิดแล้วใส่เองก็ได้
      />
    </>
  );
}

export default App;
