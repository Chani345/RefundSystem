import React from "react";
import { Box, Button, TextField, Paper, Typography, Alert, CircularProgress } from "@mui/material";

type Props = {
  onSuccess: () => void;
};

const initialState = {
  name: "",
  amount: "",
  reason: "",
};

export default function RefundForm({ onSuccess }: Props) {
  const [form, setForm] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!form.name || !form.amount || !form.reason) {
      setError("יש למלא את כל השדות");
      return;
    }
    if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      setError("סכום לא תקין");
      return;
    }

    setLoading(true);
    try {
      // החלף לכתובת ה-API שלך
      const res = await fetch("/api/refunds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("שגיאה בשליחת הבקשה");
      setSuccess(true);
      setForm(initialState);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "שגיאה לא ידועה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 4, mb: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        שליחת בקשת החזר חדשה
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="שם מלא"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="סכום (₪)"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
          type="number"
        />
        <TextField
          label="סיבת ההחזר"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          required
          multiline
          minRows={2}
        />
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">הבקשה נשלחה בהצלחה!</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          sx={{ fontWeight: "bold" }}
        >
          {loading ? <CircularProgress size={24} /> : "שלח בקשה"}
        </Button>
      </Box>
    </Paper>
  );
}