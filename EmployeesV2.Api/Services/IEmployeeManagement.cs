using EmployeesV2.Api.Services.Models;

namespace EmployeesV2.Api.Services;

public interface IEmployeeManagement
{
    public Task<OutputDataDto> GetEmployeeById(int? id);

    public Task<IResult> DeleteEmployeeById(int id);

    public Task<IResult> AddEmployee(IncomingDataDto newEmployee);

    public Task<IResult> UpdateEmployee(IncomingDataDto newData);

    public Task<List<OutputDataDto>> GetAllEmployee();

    public Task<List<OutputDataDto>> GetEmployeeByLastName(string? lastName);

    public string CalculateWorkDuration(DateTime startDate);
}