import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { MainView } from "./pages/MainView";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MainView />
    </QueryClientProvider>
  );
}

export default App;
