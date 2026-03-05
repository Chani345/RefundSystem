using RefundSystem.Application.DTOs;
using RefundSystem.Domain.Entities;
using RefundSystem.Infrastructure.Repositories;

namespace RefundSystem.Application.Services;

public class RefundService : IRefundService
{
    private readonly IRefundRepository _repository;

    public RefundService(IRefundRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<RefundRequestDto>> GetAllRequestsAsync()
    {
        var requests = await _repository.GetAllAsync();
        return requests.Select(MapToDto).ToList();
    }

    public async Task<List<RefundRequestDto>> GetRequestsByCitizenAsync(string nationalId)
    {
        var requests = await _repository.GetByCitizenAsync(nationalId);
        return requests.Select(MapToDto).ToList();
    }

    public async Task<RefundRequestDto> CreateRequestAsync(CreateRefundRequestDto dto)
    {
        var citizen = await _repository.GetCitizenByNationalIdAsync(dto.NationalId);
        if (citizen == null)
            throw new Exception("Citizen not found");

        var incomes = await _repository.GetIncomesByYearAsync(citizen.CitizenId, dto.TaxYear);
        if (incomes.Count == 0)
            throw new Exception("No income data for this year");

        var totalIncome = incomes.Sum(i => i.IncomeAmount);
        var calculatedAmount = totalIncome * 0.10m;

        var request = new RefundRequest
        {
            CitizenId = citizen.CitizenId,
            TaxYear = dto.TaxYear,
            Status = "Pending",
            CalculatedAmount = calculatedAmount,
            CreatedAt = DateTime.Now
        };

        var created = await _repository.CreateAsync(request);
        created.Citizen = citizen;
        return MapToDto(created);
    }

    public async Task<RefundRequestDto> ProcessRequestAsync(ProcessRefundDto dto)
    {
        var request = await _repository.GetByIdAsync(dto.RequestId);
        if (request == null)
            throw new Exception("Request not found");

        if (request.Status != "Pending")
            throw new Exception("Request already processed");

        var currentMonth = (byte)DateTime.Now.Month;
        var budget = await _repository.GetBudgetAsync(DateTime.Now.Year, currentMonth);
        
        if (dto.Approve)
        {
            var approvedAmount = dto.ApprovedAmount ?? request.CalculatedAmount ?? 0;
            
            if (budget != null && budget.UsedBudget + approvedAmount > budget.TotalBudget)
                throw new Exception("Insufficient budget");

            request.Status = "Approved";
            request.ApprovedAmount = approvedAmount;
        }
        else
        {
            request.Status = "Rejected";
        }

        request.ProcessedAt = DateTime.Now;
        await _repository.UpdateAsync(request);

        return MapToDto(request);
    }

    private RefundRequestDto MapToDto(RefundRequest request)
    {
        return new RefundRequestDto
        {
            RequestId = request.RequestId,
            NationalId = request.Citizen.NationalId,
            CitizenName = $"{request.Citizen.FirstName} {request.Citizen.LastName}",
            TaxYear = request.TaxYear,
            Status = request.Status,
            CalculatedAmount = request.CalculatedAmount,
            ApprovedAmount = request.ApprovedAmount,
            CreatedAt = request.CreatedAt,
            ProcessedAt = request.ProcessedAt
        };
    }
}
