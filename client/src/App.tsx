import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { MainView } from "./pages/MainView";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Streamer } from "./pages/Streamer";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { NotFound } from "./pages/NotFound";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

export const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainView />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/streamer/:streamerId",
      element: <Streamer />,
      errorElement: <ErrorBoundary />,
    },
    { path: "*", element: <NotFound />, errorElement: <ErrorBoundary /> },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
