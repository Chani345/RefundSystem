namespace RefundSystem.Application.DTOs;

public class RefundRequestDto
{
    public int RequestId { get; set; }
    public string NationalId { get; set; } = string.Empty;
    public string CitizenName { get; set; } = string.Empty;
    public int TaxYear { get; set; }
    public string Status { get; set; } = string.Empty;
    public decimal? CalculatedAmount { get; set; }
    public decimal? ApprovedAmount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ProcessedAt { get; set; }
}

public class CreateRefundRequestDto
{
    public string NationalId { get; set; } = string.Empty;
    public int TaxYear { get; set; }
}

public class ProcessRefundDto
{
    public int RequestId { get; set; }
    public bool Approve { get; set; }
    public decimal? ApprovedAmount { get; set; }
}
