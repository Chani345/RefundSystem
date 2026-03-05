namespace RefundSystem.Domain.Entities;

public class MonthlyIncome
{
    public int IncomeId { get; set; }
    public int CitizenId { get; set; }
    public int TaxYear { get; set; }
    public byte MonthNumber { get; set; }
    public decimal IncomeAmount { get; set; }
    public DateTime CreatedAt { get; set; }

    public Citizen Citizen { get; set; } = null!;
}
