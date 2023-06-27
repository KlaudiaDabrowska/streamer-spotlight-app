import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { MainView } from "./pages/MainView";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Streamer } from "./pages/Streamer";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainView />,
    },
    { path: "/:streamerId", element: <Streamer /> },
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
