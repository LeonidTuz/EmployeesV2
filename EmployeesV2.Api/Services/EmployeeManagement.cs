using EmployeesV2.Api.Services.Models;
using EmployeesV2.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeesV2.Api.Services;

public class EmployeeManagement : IEmployeeManagement
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<EmployeeManagement> _logger;

    public EmployeeManagement(ApplicationDbContext context, ILogger<EmployeeManagement> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<OutputDataDto> GetEmployeeById(int? id)
    {
        _logger.LogInformation($"Получаем сотрудника с id = {id}");
        if (!id.HasValue)
        {
            _logger.LogError($"Неправильный id - {id}");
            return null;
        }

        var employee = await _context.Employees.FirstOrDefaultAsync(e => e.Id == id.Value);
        
        if (employee == null)
        {
            _logger.LogInformation($"Сотрудник с id = {id} не найден");
            return null;
        }
        
        _logger.LogInformation($"Найден сотрудник: {employee.FirstName} {employee.LastName}");

        var result = new OutputDataDto()
        {
            Id = employee.Id,
            FirstName = employee.FirstName,
            LastName = employee.LastName,
            Position = employee.Position,
            StartDate = employee.StartDate.ToString("dd.MM.yyyy"),
            WorkDuration = CalculateWorkDuration(employee.StartDate)
        };
        
        return result;
    }
    
    public async Task<List<OutputDataDto>> GetEmployeeByLastName(string? lastName)
    {
        if (string.IsNullOrEmpty(lastName))
        {
            _logger.LogError($"Пустое значение - {lastName}");
            return null;
        }
        
        var employees = await _context.Employees
            .Where(e => e.LastName == lastName)
            .ToListAsync();
    
        if (employees == null)
        {
            _logger.LogInformation($"Сотрудник с фамилией = {lastName} не найден");
            return null;
        }

        var result = employees.Select(e => new OutputDataDto
        {
            Id = e.Id,
            FirstName = e.FirstName,
            LastName = e.LastName,
            Position = e.Position,
            StartDate = e.StartDate.ToString("dd.MM.yyyy"),
            WorkDuration = CalculateWorkDuration(e.StartDate)
        }).ToList();

        return result;
    }

    public async Task<IResult> DeleteEmployeeById(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null)
        {
            return Results.NotFound("Сотрудник не найден.");
        }

        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();
        
        _logger.LogInformation($"Сотрудник {employee.FirstName} {employee.LastName} был успешно удален.");
        
        return Results.Ok($"Сотрудник {employee.FirstName} {employee.LastName} был успешно удален.");
    }

    public async Task<IResult> AddEmployee(IncomingDataDto newEmployee)
    {
        var employee = new Employee
        {
            FirstName = newEmployee.FirstName,
            LastName = newEmployee.LastName,
            Position = newEmployee.Position,
            StartDate = newEmployee.StartDate
        };

        await _context.Employees.AddAsync(employee);
        await _context.SaveChangesAsync();
        
        _logger.LogInformation($"Сотрудник {newEmployee.FirstName} {newEmployee.LastName} был успешно добавлен.");

        return Results.Ok($"Сотрудник {newEmployee.FirstName} {newEmployee.LastName} был успешно добавлен.");
    }

    public async Task<IResult> UpdateEmployee(IncomingDataDto newData)
    {
        var employee = await _context.Employees.FindAsync(newData.Id);
        if (employee == null)
        {
            return Results.NotFound("Сотрудник не найден.");
        }

        if (!string.IsNullOrEmpty(newData.FirstName))
            employee.FirstName = newData.FirstName;
        if (!string.IsNullOrEmpty(newData.LastName))
            employee.LastName = newData.LastName;
        if (!string.IsNullOrEmpty(newData.Position))
            employee.Position = newData.Position;
        if (newData.UpdateStartDate)
            employee.StartDate = newData.StartDate;
        
        await _context.SaveChangesAsync();
        _logger.LogInformation($"Данные сотрудника {employee.FirstName} {employee.LastName} были успешно обновлены.");

        return Results.Ok($"Данные сотрудника {employee.FirstName} {employee.LastName} были успешно обновлены.");
    }

    public async Task<List<OutputDataDto>> GetAllEmployee()
    {
        var employees = await _context.Employees.ToListAsync();
        var result = employees.Select(e => new OutputDataDto()
        {
            Id = e.Id,
            FirstName = e.FirstName,
            LastName = e.LastName,
            Position = e.Position,
            StartDate = e.StartDate.ToString("dd.MM.yyyy"),
            WorkDuration = CalculateWorkDuration(e.StartDate)
        }).ToList();

        return result;
    }
    
    public string CalculateWorkDuration(DateTime startDate)
    {
        var now = DateTime.Now;
        var duration = now - startDate;
        var totalDays = duration.Days;
        var years = totalDays / 365;
        var months = (totalDays % 365) / 30;
        var days = (totalDays % 365) % 30;

        return $"Сотрудник работает {years} год(а), {months} месяц(ев) и {days} день(ей).";
    }
}