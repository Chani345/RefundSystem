INSERT INTO core.Citizens (NationalId, FirstName, LastName)
VALUES ('123456789','Test','User');

INSERT INTO finance.MonthlyIncomes (CitizenId, TaxYear, MonthNumber, IncomeAmount)
VALUES (1, 2024, 1, 7000);

INSERT INTO finance.MonthlyBudgets (BudgetYear, BudgetMonth, TotalBudget)
VALUES (2024, 6, 100000);

INSERT INTO process.RefundRequests (CitizenId, TaxYear, Status)
VALUES (1, 2024, 'Pending');