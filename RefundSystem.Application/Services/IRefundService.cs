using RefundSystem.Application.DTOs;

namespace RefundSystem.Application.Services;

public interface IRefundService
{
    Task<List<RefundRequestDto>> GetAllRequestsAsync();
    Task<List<RefundRequestDto>> GetRequestsByCitizenAsync(string nationalId);
    Task<RefundRequestDto> CreateRequestAsync(CreateRefundRequestDto dto);
    Task<RefundRequestDto> ProcessRequestAsync(ProcessRefundDto dto);
}
