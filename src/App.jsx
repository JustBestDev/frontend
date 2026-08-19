import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
}

export default App;
