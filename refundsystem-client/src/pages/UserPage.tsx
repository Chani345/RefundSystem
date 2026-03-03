import React from "react";
import { Box, Typography } from "@mui/material";
import RefundForm from "../components/RefundForm";
import RefundList from "../components/RefundList";

export default function UserPage() {
  const [refresh, setRefresh] = React.useState(false);
  const [citizenId, setCitizenId] = React.useState("");

  return (
    <Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
          מערכת החזרות - משרד הביטחון
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          הזן מספר זהות לצפייה בבקשות ושליחת בקשה חדשה
        </Typography>
      </Box>
      
      {!citizenId ? (
        <Box sx={{ maxWidth: 400, mx: "auto", textAlign: "center", p: 4 }}>
          <input
            type="text"
            placeholder="הזן מספר זהות (9 ספרות)"
            style={{ 
              padding: "16px", 
              fontSize: "18px", 
              width: "100%", 
              marginBottom: "10px",
              border: "2px solid #1976d2",
              borderRadius: "4px"
            }}
            maxLength={9}
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.length === 9) {
                setCitizenId(e.currentTarget.value);
              }
            }}
          />
          <Typography variant="caption" color="text.secondary">
            לחץ Enter לאחר ההזנה
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              מזהה אזרח: {citizenId}
            </Typography>
          </Box>
          <RefundForm citizenId={citizenId} onSuccess={() => setRefresh(r => !r)} />
          <Box sx={{ my: 4 }}>
            <RefundList citizenId={citizenId} refresh={refresh} />
          </Box>
        </>
      )}
    </Box>
  );
}
