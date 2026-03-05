using Microsoft.EntityFrameworkCore;
using RefundSystem.Domain.Entities;
using RefundSystem.Infrastructure.Data;

namespace RefundSystem.Infrastructure.Repositories;

public class RefundRepository : IRefundRepository
{
    private readonly RefundDbContext _context;

    public RefundRepository(RefundDbContext context)
    {
        _context = context;
    }

    public async Task<RefundRequest?> GetByIdAsync(int requestId)
    {
        return await _context.RefundRequests
            .Include(r => r.Citizen)
            .FirstOrDefaultAsync(r => r.RequestId == requestId);
    }

    public async Task<List<RefundRequest>> GetAllAsync()
    {
        return await _context.RefundRequests
            .Include(r => r.Citizen)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task<List<RefundRequest>> GetByCitizenAsync(string nationalId)
    {
        return await _context.RefundRequests
            .Include(r => r.Citizen)
            .Where(r => r.Citizen.NationalId == nationalId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task<RefundRequest> CreateAsync(RefundRequest request)
    {
        _context.RefundRequests.Add(request);
        await _context.SaveChangesAsync();
        return request;
    }

    public async Task UpdateAsync(RefundRequest request)
    {
        _context.RefundRequests.Update(request);
        await _context.SaveChangesAsync();
    }

    public async Task<Citizen?> GetCitizenByNationalIdAsync(string nationalId)
    {
        return await _context.Citizens.FirstOrDefaultAsync(c => c.NationalId == nationalId);
    }

    public async Task<List<MonthlyIncome>> GetIncomesByYearAsync(int citizenId, int year)
    {
        return await _context.MonthlyIncomes
            .Where(i => i.CitizenId == citizenId && i.TaxYear == year)
            .ToListAsync();
    }

    public async Task<MonthlyBudget?> GetBudgetAsync(int year, byte month)
    {
        return await _context.MonthlyBudgets
            .FirstOrDefaultAsync(b => b.BudgetYear == year && b.BudgetMonth == month);
    }
}
