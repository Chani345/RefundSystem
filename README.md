# Refund System

## Overview
A system for calculating annual tax refunds for citizens based on their monthly income.

The project includes:
- SQL Server database
- .NET Web API backend
- React + TypeScript client

The system calculates tax refunds according to defined tax rules and allows administrators to process refund requests.

---

## Project Structure

RefundSystem
│
├── database
│   ├── 01_CreateDatabase.sql
│   ├── 02_Schemas.sql
│   ├── 03_Tables.sql
│   ├── 04_Indexes.sql
│   ├── 05_Procedures.sql
│   └── 06_Seed.sql
│
├── RefundSystem.API
│
└── refundsystem-client

---

## Technologies

Backend
- .NET
- ASP.NET Web API
- SQL Server

Frontend
- React
- TypeScript
- Material UI

Database
- SQL Server
- Stored Procedures
- Indexes

---

## Installation

### 1 Clone repository

git clone https://github.com/YOUR_USERNAME/RefundSystem.git

---

### 2 Setup Database

Run SQL scripts in the following order:

database/01_CreateDatabase.sql  
database/02_Schemas.sql  
database/03_Tables.sql  
database/04_Indexes.sql  
database/05_Procedures.sql  
database/06_Seed.sql

---

### 3 Run Backend

cd RefundSystem.API  
dotnet run

---

### 4 Run Client

cd refundsystem-client  
npm install  
npm start

---

## Main Features

- Citizen management
- Monthly income tracking
- Annual tax refund calculation
- Stored procedures for business logic
- Performance indexes

---

## Database Design

Main tables:

Citizens – stores citizen information  
MonthlyIncomes – stores monthly income per citizen  
RefundRequests – stores refund calculation requests  

Relationships:

Citizen → MonthlyIncomes (1:N)  
Citizen → RefundRequests (1:N)

---

## Author

Developer: Chani Katz