import React from "react";
import { Dialog, DialogTitle, DialogContent, Box, Typography, Divider, Chip, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { Refund } from "../services/refundService";

type Props = {
  open: boolean;
  onClose: () => void;
  refund: Refund | null;
};

// Mock income data
const mockIncomeData = [
  { year: 2023, income: 120000 },
  { year: 2022, income: 115000 },
  { year: 2021, income: 110000 },
];

export default function RefundDetailsDialog({ open, onClose, refund }: Props) {
  if (!refund) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          פרטי בקשת החזר
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          {/* Citizen Details */}
          <Typography variant="h6" gutterBottom>
            פרטי אזרח
          </Typography>
          <Box sx={{ mb: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
            <Typography><strong>שם:</strong> {refund.name}</Typography>
            <Typography><strong>ת.ז:</strong> 123456789</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Income by Years */}
          <Typography variant="h6" gutterBottom>
            הכנסות על פי שנים
          </Typography>
          <Table size="small" sx={{ mb: 3 }}>
            <TableBody>
              {mockIncomeData.map(item => (
                <TableRow key={item.year}>
                  <TableCell><strong>שנת {item.year}</strong></TableCell>
                  <TableCell align="left">{item.income.toLocaleString("he-IL")} ₪</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          {/* Previous Requests */}
          <Typography variant="h6" gutterBottom>
            בקשות עבר (כולל החזר שקיבל)
          </Typography>
          <Box sx={{ mb: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
            <Typography>בקשה קודמת: 1,200 ₪ - <Chip label="מאושר" color="success" size="small" /></Typography>
            <Typography>החזר שקיבל: 1,200 ₪</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Current Request */}
          <Typography variant="h6" gutterBottom>
            הבקשה הנוכחית שטרם טופלה
          </Typography>
          <Box sx={{ p: 2, bgcolor: "warning.light", borderRadius: 1 }}>
            <Typography><strong>סכום מבוקש:</strong> {refund.amount} ₪</Typography>
            <Typography><strong>סיבה:</strong> {refund.reason}</Typography>
            <Typography><strong>תאריך:</strong> {new Date(refund.createdAt).toLocaleDateString("he-IL")}</Typography>
            <Typography><strong>סטטוס:</strong> <Chip label={refund.status} color="warning" size="small" /></Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
