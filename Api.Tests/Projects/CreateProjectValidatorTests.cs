using System.Linq.Expressions;

using Api.Common;
using Api.Employees;
using Api.Employees.Queries;
using Api.Projects;

using AutoFixture;

using FluentAssertions;

using MediatR;

using Microsoft.EntityFrameworkCore;

using Moq;

namespace Api.Tests.Projects;

public class CreateProjectValidatorTests
{
    private readonly Fixture fixture = new();

    private readonly CreateProjectValidator sut;

    public CreateProjectValidatorTests()
    {
        var mediatorMock = new Mock<IMediator>();
        mediatorMock.Setup(e => e.Send(It.IsAny<GetProjectManagerExists>(), It.IsAny<CancellationToken>())).ReturnsAsync(true);

        sut = new(mediatorMock.Object);

        fixture.Customize<CreateProject>(e => e
            .With(e => e.Name, (string s) => s[..Math.Min(s.Length, Api.Projects.Constants.MaxNameLength)])
            .With(e => e.Type, (string s) => s[..Math.Min(s.Length, Api.Projects.Constants.MaxTypeLength)])
            .With(e => e.Comment, (string s) => s[..Math.Min(s.Length, Api.Projects.Constants.MaxCommentLength)])
            .With(e => e.EndDate, default(DateTime?)));
    }

    [Fact]
    public async Task ValidateAsync_ValidProject_True()
    {
        var project = fixture.Create<CreateProject>();

        var result = await sut.ValidateAsync(project);

        result.IsValid.Should().BeTrue();
    }

    [Fact]
    public async Task ValidateAsync_StartDateGreaterThanEndDate_False()
    {
        var project = fixture.Create<CreateProject>();

        project = project with
        {
            StartDate = DateTime.Today.AddDays(1),
            EndDate = DateTime.Today
        };

        var result = await sut.ValidateAsync(project);

        result.IsValid.Should().BeFalse();
    }
}
