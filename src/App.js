import {
  Box,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import Sidebar from "./components/Sidebar";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ResponsiveDrawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 2,
              width: { sm: `calc(100% - 240px)` },
              height: "100vh",
            }}
          >
            <Routes>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/income" element={<div>Income</div>} />
              <Route path="/Expenses" element={<div>Expenses</div>} />
              <Route path="/Investments" element={<div>Investments</div>} />
              <Route path="/Insights" element={<div>Insights</div>} />
              <Route path="/Settings" element={<div>Settings</div>} />
            </Routes>
          </Box>
        </ResponsiveDrawer>
      </ThemeProvider>
    </>
  );
}

export default App;
