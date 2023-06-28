import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { MainView } from "./pages/MainView";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Streamer } from "./pages/Streamer";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { NotFound } from "./pages/NotFound";

export const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainView />,
    },
    { path: "/:streamerId", element: <Streamer /> },
    { path: "*", element: <NotFound /> },
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
