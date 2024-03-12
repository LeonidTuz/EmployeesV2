using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;
using Xunit;
using EmployeesV2.Api.Controllers;
using EmployeesV2.Api.Services;
using EmployeesV2.Api.Services.Models;

namespace EmployeesV2.Api.Tests;

public class EmployeeControllerTests
{
    [Fact]
    public async Task GetAllEmployees_ReturnsAllEmployees()
    {
        var mockEmployeeManagement = new Mock<IEmployeeManagement>();
        var expectedEmployees = new List<OutputDataDto>
        {
            new OutputDataDto { Id = 1, FirstName = "John", LastName = "Doe", Position = "Developer" },
            new OutputDataDto { Id = 2, FirstName = "Jane", LastName = "Doe", Position = "Manager" }
        };
        mockEmployeeManagement.Setup(x => x.GetAllEmployee()).ReturnsAsync(expectedEmployees);

        var controller = new EmployeeController(mockEmployeeManagement.Object);

        var result = await controller.GetAllEmployees();

        var actionResult = Assert.IsType<List<OutputDataDto>>(result);
        var actualEmployees = Assert.IsAssignableFrom<List<OutputDataDto>>(actionResult);
        Assert.Equal(expectedEmployees.Count, actualEmployees.Count);
        for (int i = 0; i < expectedEmployees.Count; i++)
        {
            Assert.Equal(expectedEmployees[i].Id, actualEmployees[i].Id);
            Assert.Equal(expectedEmployees[i].FirstName, actualEmployees[i].FirstName);
            Assert.Equal(expectedEmployees[i].LastName, actualEmployees[i].LastName);
            Assert.Equal(expectedEmployees[i].Position, actualEmployees[i].Position);
        }
    }
}