using RefundSystem.Domain.Entities;

namespace RefundSystem.Infrastructure.Repositories;

public interface IRefundRepository
{
    Task<RefundRequest?> GetByIdAsync(int requestId);
    Task<List<RefundRequest>> GetAllAsync();
    Task<List<RefundRequest>> GetByCitizenAsync(string nationalId);
    Task<RefundRequest> CreateAsync(RefundRequest request);
    Task UpdateAsync(RefundRequest request);
    Task<Citizen?> GetCitizenByNationalIdAsync(string nationalId);
    Task<List<MonthlyIncome>> GetIncomesByYearAsync(int citizenId, int year);
    Task<MonthlyBudget?> GetBudgetAsync(int year, byte month);
}
