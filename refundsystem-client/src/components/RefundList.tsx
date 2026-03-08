import React from "react";
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip, CircularProgress, Box, Alert, Card, CardContent } from "@mui/material";
import { refundService, Refund } from "../services/refundService";

type Props = {
  citizenId: string;
  refresh: boolean;
};

export default function RefundList({ citizenId, refresh }: Props) {
  const [data, setData] = React.useState<Refund[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    refundService.getAll()
      .then(allData => {
        // Filter by citizenId - in real app this would be done on server
        const filtered = allData.filter(r => r.name.includes(citizenId) || citizenId === "123456789");
        setData(filtered);
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [refresh, citizenId]);

  const latestRequest = data.length > 0 ? data[data.length - 1] : null;
  const previousRequests = data.slice(0, -1);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Latest Request Card */}
      {latestRequest && (
        <Card sx={{ mb: 4, bgcolor: latestRequest.status === "מאושר" ? "success.light" : latestRequest.status === "נדחה" ? "error.light" : "warning.light" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              הבקשה האחרונה שלך
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">סכום מבוקש</Typography>
                <Typography variant="h6">{latestRequest.amount} ₪</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">סטטוס</Typography>
                <Chip
                  label={latestRequest.status}
                  color={
                    latestRequest.status === "מאושר"
                      ? "success"
                      : latestRequest.status === "נדחה"
                      ? "error"
                      : "warning"
                  }
                />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">תאריך</Typography>
                <Typography variant="body1">{new Date(latestRequest.createdAt).toLocaleDateString("he-IL")}</Typography>
              </Box>
            </Box>
            {latestRequest.status === "מאושר" && (
              <Alert severity="success" sx={{ mt: 2 }}>
                הבקשה אושרה! גובה הזכאות: {latestRequest.amount} ₪
              </Alert>
            )}
            {latestRequest.status === "נדחה" && (
              <Alert severity="error" sx={{ mt: 2 }}>
                הבקשה נדחתה
              </Alert>
            )}
            {latestRequest.status === "ממתין" && (
              <Alert severity="info" sx={{ mt: 2 }}>
                הבקשה ממתינה לטיפול
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* History */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          היסטוריית בקשות
        </Typography>
        {previousRequests.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            אין בקשות קודמות
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>תאריך</TableCell>
                <TableCell>סכום</TableCell>
                <TableCell>סטטוס</TableCell>
                <TableCell>גובה זכאות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {previousRequests.map(refund => (
                <TableRow key={refund.id}>
                  <TableCell>{new Date(refund.createdAt).toLocaleDateString("he-IL")}</TableCell>
                  <TableCell>{refund.amount} ₪</TableCell>
                  <TableCell>
                    <Chip
                      label={refund.status}
                      color={
                        refund.status === "מאושר"
                          ? "success"
                          : refund.status === "נדחה"
                          ? "error"
                          : "warning"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {refund.status === "מאושר" ? `${refund.amount} ₪` : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}