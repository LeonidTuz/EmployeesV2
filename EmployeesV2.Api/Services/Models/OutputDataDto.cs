namespace EmployeesV2.Api.Services.Models;

public class OutputDataDto
{
    public int Id { get; set; }
    
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public string? Position { get; set; }
    
    public string StartDate { get; set; }
    
    public string? WorkDuration { get; set; }
}