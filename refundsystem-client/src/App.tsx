import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RefundForm from "./components/RefundForm";
import RefundList from "./components/RefundList";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#ff9800" },
    background: { default: "#f4f6fb" },
  },
  typography: {
    fontFamily: "Heebo, Arial, sans-serif",
    fontWeightBold: 700,
  },
});

function App() {
  const [refresh, setRefresh] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 6, textAlign: "center" }}>
          <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
            מערכת החזרות - משרד הביטחון
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            שלח בקשת החזר, עקוב אחרי סטטוס, והכל במקום אחד.
          </Typography>
        </Box>
        <RefundForm onSuccess={() => setRefresh(r => !r)} />
        <Box sx={{ my: 4 }}>
          <RefundList refresh={refresh} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;