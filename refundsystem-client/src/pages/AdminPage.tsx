import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { refundService, Refund } from "../services/refundService";
import RefundDetailsDialog from "../components/RefundDetailsDialog";

export default function AdminPage() {
  const [data, setData] = React.useState<Refund[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState<number | null>(null);
  const [budget, setBudget] = React.useState(50000);
  const [selectedRefund, setSelectedRefund] = React.useState<Refund | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true);
      const refunds = await refundService.getAll();
      setData(refunds);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleStatusChange = async (id: number, status: "מאושר" | "נדחה") => {
    try {
      setProcessing(id);
      await refundService.updateStatus(id, status);
      
      if (status === "מאושר") {
        const refund = data.find(r => r.id === id);
        if (refund) {
          setBudget(prev => prev - refund.amount);
        }
      }
      
      await loadData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(null);
    }
  };

  const pendingRequests = data.filter(r => r.status === "ממתין");
  const approvedTotal = data.filter(r => r.status === "מאושר").reduce((sum, r) => sum + r.amount, 0);

  return (
    <Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
          פאנל מנהל - אישור בקשות החזר
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          סקור ואשר או דחה בקשות החזר ממתינות
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ mb: 4, bgcolor: "primary.main", color: "white" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            תקציב זמין
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            {budget.toLocaleString("he-IL")} ₪
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
            סה"כ מאושר: {approvedTotal.toLocaleString("he-IL")} ₪
          </Typography>
        </CardContent>
      </Card>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          בקשות ממתינות לטיפול ({pendingRequests.length})
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : pendingRequests.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            אין בקשות ממתינות לטיפול
          </Alert>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>מזהה</TableCell>
                <TableCell>שם</TableCell>
                <TableCell>ת.ז</TableCell>
                <TableCell>סכום</TableCell>
                <TableCell>סיבה</TableCell>
                <TableCell>תאריך</TableCell>
                <TableCell align="center">פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingRequests.map(refund => (
                <TableRow key={refund.id}>
                  <TableCell>{refund.id}</TableCell>
                  <TableCell>{refund.name}</TableCell>
                  <TableCell>123456789</TableCell>
                  <TableCell>{refund.amount} ₪</TableCell>
                  <TableCell>{refund.reason}</TableCell>
                  <TableCell>{new Date(refund.createdAt).toLocaleDateString("he-IL")}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
                      <IconButton
                        size="small"
                        color="info"
                        onClick={() => {
                          setSelectedRefund(refund);
                          setDialogOpen(true);
                        }}
                      >
                        <InfoIcon />
                      </IconButton>
                      <Button
                        variant="outlined"
                        color="info"
                        size="small"
                        onClick={async () => {
                          const result = await refundService.calculateEligibility({
                            name: refund.name,
                            amount: refund.amount.toString(),
                            reason: refund.reason
                          });
                          alert(`סכום זכאות מחושב: ${result.eligibleAmount} ₪`);
                        }}
                      >
                        חשב זכאות
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleStatusChange(refund.id, "מאושר")}
                        disabled={processing === refund.id}
                      >
                        ✓ אשר
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleStatusChange(refund.id, "נדחה")}
                        disabled={processing === refund.id}
                      >
                        ✗ דחה
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          היסטוריית בקשות
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>מזהה</TableCell>
              <TableCell>שם</TableCell>
              <TableCell>סכום</TableCell>
              <TableCell>סטטוס</TableCell>
              <TableCell>תאריך</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.filter(r => r.status !== "ממתין").map(refund => (
              <TableRow key={refund.id}>
                <TableCell>{refund.id}</TableCell>
                <TableCell>{refund.name}</TableCell>
                <TableCell>{refund.amount} ₪</TableCell>
                <TableCell>
                  <Chip
                    label={refund.status}
                    color={refund.status === "מאושר" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{new Date(refund.createdAt).toLocaleDateString("he-IL")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <RefundDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        refund={selectedRefund}
      />
    </Box>
  );
}
