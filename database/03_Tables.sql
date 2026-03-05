CREATE TABLE core.Citizens
(
    CitizenId          INT IDENTITY PRIMARY KEY,
    NationalId         NVARCHAR(20) NOT NULL UNIQUE,
    FirstName          NVARCHAR(100) NOT NULL,
    LastName           NVARCHAR(100) NOT NULL,
    CreatedAt          DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);
CREATE TABLE finance.MonthlyIncomes
(
    IncomeId        INT IDENTITY PRIMARY KEY,
    CitizenId       INT NOT NULL,
    TaxYear         INT NOT NULL,
    MonthNumber     TINYINT NOT NULL CHECK (MonthNumber BETWEEN 1 AND 12),
    IncomeAmount    DECIMAL(18,2) NOT NULL CHECK (IncomeAmount >= 0),
    CreatedAt       DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_MonthlyIncome_Citizen
        FOREIGN KEY (CitizenId) REFERENCES core.Citizens(CitizenId),

    CONSTRAINT UQ_Citizen_Year_Month
        UNIQUE (CitizenId, TaxYear, MonthNumber)
);


CREATE TABLE finance.MonthlyBudgets
(
    BudgetId        INT IDENTITY PRIMARY KEY,
    BudgetYear      INT NOT NULL,
    BudgetMonth     TINYINT NOT NULL CHECK (BudgetMonth BETWEEN 1 AND 12),
    TotalBudget     DECIMAL(18,2) NOT NULL CHECK (TotalBudget >= 0),
    UsedBudget      DECIMAL(18,2) NOT NULL DEFAULT 0 CHECK (UsedBudget >= 0),

    CONSTRAINT UQ_Budget UNIQUE (BudgetYear, BudgetMonth)
);

CREATE TABLE process.RefundRequests
(
    RequestId           INT IDENTITY PRIMARY KEY,
    CitizenId           INT NOT NULL,
    TaxYear              INT NOT NULL,
    Status               NVARCHAR(20) NOT NULL,
    CalculatedAmount     DECIMAL(18,2) NULL,
    ApprovedAmount       DECIMAL(18,2) NULL,
    CreatedAt            DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    ProcessedAt          DATETIME2 NULL,

    CONSTRAINT FK_Request_Citizen
        FOREIGN KEY (CitizenId) REFERENCES core.Citizens(CitizenId),

    CONSTRAINT CK_Request_Status
        CHECK (Status IN ('Pending','Calculated','Approved','Rejected')),

    CONSTRAINT UQ_Approved_Per_Year
        UNIQUE (CitizenId, TaxYear, Status)
);