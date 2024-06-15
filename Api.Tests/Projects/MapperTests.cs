using Api.Employees;
using Api.Projects;
using Api.Projects.Models;
using AutoFixture;

using AutoMapper;

using FluentAssertions;

using Microsoft.Extensions.Configuration;

namespace Api.Tests.Projects;

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

        var configuration = new MapperConfiguration(e =>
        {
            e.AddProfile<EmployeeMapperProfile>();
            e.AddProfile<ProjectMapperProfile>();
        });

        sut = new Mapper(configuration);
    }

    [Fact]
    public void MapProjectEntityToProject()
    {
        var entity = fixture.Create<ProjectEntity>();

        var project = sut.Map<Project>(entity);

        project.Name.Should().Be(entity.Name);
    }
}
