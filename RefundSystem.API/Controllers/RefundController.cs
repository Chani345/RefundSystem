using Microsoft.AspNetCore.Mvc;
using RefundSystem.Application.DTOs;
using RefundSystem.Application.Services;

namespace RefundSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RefundController : ControllerBase
{
    private readonly IRefundService _refundService;

    public RefundController(IRefundService refundService)
    {
        _refundService = refundService;
    }

    [HttpGet]
    public async Task<ActionResult<List<RefundRequestDto>>> GetAll()
    {
        var requests = await _refundService.GetAllRequestsAsync();
        return Ok(requests);
    }

    [HttpGet("citizen/{nationalId}")]
    public async Task<ActionResult<List<RefundRequestDto>>> GetByCitizen(string nationalId)
    {
        var requests = await _refundService.GetRequestsByCitizenAsync(nationalId);
        return Ok(requests);
    }

    [HttpPost]
    public async Task<ActionResult<RefundRequestDto>> Create(CreateRefundRequestDto dto)
    {
        try
        {
            var request = await _refundService.CreateRequestAsync(dto);
            return CreatedAtAction(nameof(GetAll), new { id = request.RequestId }, request);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("process")]
    public async Task<ActionResult<RefundRequestDto>> Process(ProcessRefundDto dto)
    {
        try
        {
            var request = await _refundService.ProcessRequestAsync(dto);
            return Ok(request);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
