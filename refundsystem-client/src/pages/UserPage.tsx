import React from "react";
import { Box, Typography } from "@mui/material";
import RefundForm from "../components/RefundForm";
import RefundList from "../components/RefundList";

export default function UserPage() {
  const [refresh, setRefresh] = React.useState(false);

  return (
    <Box>
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
    </Box>
  );
}
