import React from "react";
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip, CircularProgress, Box } from "@mui/material";
import { refundService, Refund } from "../services/refundService";

type Props = {
  refresh: boolean;
};

export default function RefundList({ refresh }: Props) {
  const [data, setData] = React.useState<Refund[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    refundService.getAll()
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [refresh]);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        בקשות אחרונות
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>שם</TableCell>
              <TableCell>סכום</TableCell>
              <TableCell>סיבה</TableCell>
              <TableCell>סטטוס</TableCell>
              <TableCell>תאריך</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  אין בקשות להצגה
                </TableCell>
              </TableRow>
            )}
            {data.map(refund => (
              <TableRow key={refund.id}>
                <TableCell>{refund.name}</TableCell>
                <TableCell>{refund.amount} ₪</TableCell>
                <TableCell>{refund.reason}</TableCell>
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
                  />
                </TableCell>
                <TableCell>{new Date(refund.createdAt).toLocaleDateString("he-IL")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}