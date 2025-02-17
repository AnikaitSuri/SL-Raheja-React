import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import './components/home.css';
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import { useLocation, Navigate } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import AppRoutes from "./routes/AppRoutes";
import { isAuthenticated } from "./utils/auth";

const App = () => {
  const [theme, colorMode] = useMode();
  const isLoggedIn = isAuthenticated();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
    //     <MyProSidebarProvider>
    //       <div style={{ height: "100%", width: "100%" }}>
    //         <main>
    //           <Topbar />
    //           <AppRoutes />
    //         </main>
    //       </div>
    //     </MyProSidebarProvider>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoggedIn ? (
          <MyProSidebarProvider>
            <div style={{ height: "100%", width: "100%" }}>
              <main>
                <Topbar />
                <AppRoutes />
              </main>
            </div>
          </MyProSidebarProvider>
        ) : (
          isLoginPage ? <AppRoutes /> : <Navigate to="/login" replace />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;