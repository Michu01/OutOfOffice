using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Api.ApprovalRequests;
using Api.Employees;
using Api.Employees.Models;
using Api.LeaveRequests;
using Api.Projects;
using AutoFixture;
using AutoMapper;

using FluentAssertions;

namespace Api.Tests.Employees;
public class MapperTests
{
    private readonly Fixture fixture = new();

    private readonly IMapper sut;

    public MapperTests()
    {
        fixture.Customize<DateOnly>(composer => composer.FromFactory<DateTime>(DateOnly.FromDateTime));

        fixture.Behaviors.OfType<ThrowingRecursionBehavior>()
            .ToList()
            .ForEach(b => fixture.Behaviors.Remove(b));
        fixture.Behaviors.Add(new OmitOnRecursionBehavior());

        fixture.Customize<EmployeeEntity>(c => 
            c.With(e => e.PeoplePartner, fixture.Create<EmployeeEntity>()));

        var configuration = new MapperConfiguration(e =>
        {
            e.AddProfile<EmployeeMapperProfile>();
            e.AddProfile<ProjectMapperProfile>();
            e.AddProfile<ApprovalRequestMapperProfile>();
            e.AddProfile<LeaveRequestMapperProfile>();
        });

        sut = new Mapper(configuration);
    }

    [Fact]
    public void MapEmployeeEntityToEntity()
    {
        var entity = fixture.Create<EmployeeEntity>();

        var employee = sut.Map<Employee>(entity);

        employee.PeoplePartner.FullName.Should().Be(entity.PeoplePartner!.FullName);
    }
}
