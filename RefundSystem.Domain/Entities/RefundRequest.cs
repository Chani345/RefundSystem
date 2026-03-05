namespace RefundSystem.Domain.Entities;

public class RefundRequest
{
    public int RequestId { get; set; }
    public int CitizenId { get; set; }
    public int TaxYear { get; set; }
    public string Status { get; set; } = "Pending";
    public decimal? CalculatedAmount { get; set; }
    public decimal? ApprovedAmount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ProcessedAt { get; set; }

    public Citizen Citizen { get; set; } = null!;
}
