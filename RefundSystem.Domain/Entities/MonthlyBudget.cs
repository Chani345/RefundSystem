namespace RefundSystem.Domain.Entities;

public class MonthlyBudget
{
    public int BudgetId { get; set; }
    public int BudgetYear { get; set; }
    public byte BudgetMonth { get; set; }
    public decimal TotalBudget { get; set; }
    public decimal UsedBudget { get; set; }
}
