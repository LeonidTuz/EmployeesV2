namespace EmployeesV2.Api.Services.Models;

public class IncomingDataDto
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Position { get; set; }

    public DateTime StartDate { get; set; }
    
    public bool UpdateStartDate { get; set; }
}