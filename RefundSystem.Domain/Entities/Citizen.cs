namespace RefundSystem.Domain.Entities;

public class Citizen
{
    public int CitizenId { get; set; }
    public string NationalId { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }

    public ICollection<MonthlyIncome> MonthlyIncomes { get; set; } = new List<MonthlyIncome>();
    public ICollection<RefundRequest> RefundRequests { get; set; } = new List<RefundRequest>();
}
