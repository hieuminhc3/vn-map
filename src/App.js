import { Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
  },
});

function App() {
  const [title, setTitle] = useState("Nền tảng bản đồ số");

  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title;
  }, [title]);
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Outlet />
          <ToastContainer />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
