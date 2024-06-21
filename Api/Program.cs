using System.Reflection;
using System.Text.Json.Serialization;

using Api.ApprovalRequests;
using Api.Common;
using Api.Employees;
using Api.Employees.Enums;
using Api.Identity;
using Api.LeaveRequests;
using Api.Projects;

using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

using FluentValidation;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(configure =>
    {
        configure
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

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
        options.Cookie.SameSite = SameSiteMode.Strict;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(15);
        options.SlidingExpiration = true;
        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = 401;
            return Task.CompletedTask;
        };
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
    .AddPolicy(nameof(Policy.ViewApprovalRequests), policy => policy
        .RequireRole(nameof(EmployeePosition.Administrator), nameof(EmployeePosition.ProjectManager), nameof(EmployeePosition.HRManager)))
    .AddPolicy(nameof(Policy.ViewProjects), policy => policy
        .RequireRole(nameof(EmployeePosition.Administrator), nameof(EmployeePosition.ProjectManager), nameof(EmployeePosition.HRManager), nameof(EmployeePosition.Employee)))
    .AddPolicy(nameof(Policy.ViewLeaveRequests), policy => policy
        .RequireRole(nameof(EmployeePosition.Administrator), nameof(EmployeePosition.ProjectManager), nameof(EmployeePosition.HRManager), nameof(EmployeePosition.Employee)));

builder.Services.AddMediatR(c => c.RegisterServicesFromAssemblyContaining<Program>());
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

if (builder.Environment.IsProduction())
{
    var keyVaultUrl = builder.Configuration["KeyVault:Url"]!;
    var keyVaultTenantId = builder.Configuration["KeyVault:TenantId"];
    var keyVaultClientId = builder.Configuration["KeyVault:ClientId"];
    var keyVaultClientSecret = builder.Configuration["KeyVault:ClientSecret"];

    var credential = new ClientSecretCredential(keyVaultTenantId, keyVaultClientId, keyVaultClientSecret);
    var client = new SecretClient(new Uri(keyVaultUrl), credential);

    builder.Configuration.AddAzureKeyVault(client, new KeyVaultSecretManager());

    builder.Services.AddDbContext<IApplicationDbContext, ApplicationDbContext>(options =>
        options.UseSqlServer(builder.Configuration["OutOfOfficeDbConnectionString"]));
}

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<IApplicationDbContext, ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
}

var app = builder.Build();

{
    using var scope = app.Services.CreateScope();

    await scope.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.MigrateAsync();
}

var spaUrl = app.Environment.IsDevelopment() ? "http://localhost:5173" : "https://out-of-office-two.vercel.app/";

app.UseSwagger();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(_ => { });

app.UseSpa(e => e.UseProxyToSpaDevelopmentServer(spaUrl));

var group = app.MapGroup("api");

group.MapIdentityEndpoints();
group.MapProjectEndpoints();
group.MapEmployeeEndpoints();
group.MapApprovalRequestEndpoints();
group.MapLeaveRequestEndpoints();

app.Run();