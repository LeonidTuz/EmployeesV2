using Microsoft.AspNetCore.Mvc;
using EmployeesV2.Api.Services;
using EmployeesV2.Api.Services.Models;

namespace EmployeesV2.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeManagement _employeeManagement;

    public EmployeeController(IEmployeeManagement employeeManagement)
    {
        _employeeManagement = employeeManagement;
    }
    
    [HttpGet("employeById/{id}")]
    public async Task<OutputDataDto> GetEmployee(int? id)
    {
        return await _employeeManagement.GetEmployeeById(id);
    }
    
    [HttpGet("employeByLastName/{lastName}")]
    public async Task<List<OutputDataDto>> EmployeeByLastName(string? lastName)
    {
        return await _employeeManagement.GetEmployeeByLastName(lastName);
    }
    
    [HttpDelete("remove/{id}")]
    public async Task<IResult> DeleteEmployee(int id)
    {
        var result = await _employeeManagement.DeleteEmployeeById(id);
        return result;
    }
    
    [HttpPut("update")]
    public async Task<IResult> UpdateEmployee([FromBody] IncomingDataDto employee)
    {
        return await _employeeManagement.UpdateEmployee(employee);
    }
    
    [HttpGet("all")]
    public async Task<List<OutputDataDto>> GetAllEmployees()
    {
        var employees = await _employeeManagement.GetAllEmployee();
        return employees;
    }
    
    [HttpPost("add")]
    public async Task<IResult> AddEmployee([FromBody] IncomingDataDto employee)
    {
        return await _employeeManagement.AddEmployee(employee);
    }
}