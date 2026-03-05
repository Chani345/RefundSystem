using Microsoft.EntityFrameworkCore;
using RefundSystem.Domain.Entities;

namespace RefundSystem.Infrastructure.Data;

public class RefundDbContext : DbContext
{
    public RefundDbContext(DbContextOptions<RefundDbContext> options) : base(options) { }

    public DbSet<Citizen> Citizens { get; set; }
    public DbSet<MonthlyIncome> MonthlyIncomes { get; set; }
    public DbSet<MonthlyBudget> MonthlyBudgets { get; set; }
    public DbSet<RefundRequest> RefundRequests { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Citizen>(entity =>
        {
            entity.ToTable("Citizens", "core");
            entity.HasKey(e => e.CitizenId);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("SYSDATETIME()");
        });

        modelBuilder.Entity<MonthlyIncome>(entity =>
        {
            entity.ToTable("MonthlyIncomes", "finance");
            entity.HasKey(e => e.IncomeId);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("SYSDATETIME()");
            entity.HasOne(e => e.Citizen).WithMany(c => c.MonthlyIncomes).HasForeignKey(e => e.CitizenId);
        });

        modelBuilder.Entity<MonthlyBudget>(entity =>
        {
            entity.ToTable("MonthlyBudgets", "finance");
            entity.HasKey(e => e.BudgetId);
        });

        modelBuilder.Entity<RefundRequest>(entity =>
        {
            entity.ToTable("RefundRequests", "process");
            entity.HasKey(e => e.RequestId);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("SYSDATETIME()");
            entity.HasOne(e => e.Citizen).WithMany(c => c.RefundRequests).HasForeignKey(e => e.CitizenId);
        });
    }
}
