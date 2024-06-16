using System.Reflection;
using System.Text.Json.Serialization;

using Api.ApprovalRequests;
using Api.Common;
using Api.Employees;
using Api.Employees.Enums;
using Api.Identity;
using Api.LeaveRequests;
using Api.Projects;

using FluentValidation;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.Configure<JsonOptions>(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromMinutes(15);
        options.SlidingExpiration = true;
    });

builder.Services.AddAuthorizationBuilder()
    .AddDefaultPolicy(nameof(Policy.Default), policy => policy
        .RequireAuthenticatedUser())
    .AddPolicy(nameof(Policy.ManageLeaveRequests), policy => policy
        .RequireRole(nameof(EmployeePosition.Administrator), nameof(EmployeePosition.Employee)))
    .AddPolicy(nameof(Policy.ManageEmployees), policy => policy
        .RequireRole(nameof(EmployeePosition.Administrator), nameof(EmployeePosition.HRManager)))
    .AddPolicy(nameof(Policy.ManageProjects), policy => policy
        .RequireRole(nameof(EmployeePosition.Administrator), nameof(EmployeePosition.ProjectManager)))
    .AddPolicy(nameof(Policy.ManageApprovalRequests), policy => policy
        .RequireRole(nameof(EmployeePosition.Administrator), nameof(EmployeePosition.ProjectManager), nameof(EmployeePosition.HRManager)))
    .AddPolicy(nameof(Policy.ViewEmployees), policy => policy
        .RequireRole(nameof(EmployeePosition.Administrator), nameof(EmployeePosition.ProjectManager), nameof(EmployeePosition.HRManager)))
    .AddPolicy(nameof(Policy.ViewProjects), policy => policy
        .RequireRole(nameof(EmployeePosition.Administrator), nameof(EmployeePosition.ProjectManager), nameof(EmployeePosition.HRManager)))
    .AddPolicy(nameof(Policy.ViewApprovalRequests), policy => policy
        .RequireRole(nameof(EmployeePosition.Administrator), nameof(EmployeePosition.ProjectManager), nameof(EmployeePosition.HRManager)))
    .AddPolicy(nameof(Policy.ViewLeaveRequests), policy => policy
        .RequireRole(nameof(EmployeePosition.Administrator), nameof(EmployeePosition.ProjectManager), nameof(EmployeePosition.HRManager), nameof(EmployeePosition.Employee)));

builder.Services.AddMediatR(c => c.RegisterServicesFromAssemblyContaining<Program>());
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddDbContext<IApplicationDbContext, ApplicationDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();

{
    using var scope = app.Services.CreateScope();

    await scope.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.MigrateAsync();
}

app.UseSwagger();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapIdentityEndpoints();
app.MapProjectEndpoints();
app.MapEmployeeEndpoints();
app.MapApprovalRequestEndpoints();
app.MapLeaveRequestEndpoints();

app.Run();