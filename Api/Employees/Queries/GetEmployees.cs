﻿using System.Security.Claims;

using Api.Common;
using Api.Common.Extensions;
using Api.Employees.Enums;
using Api.Employees.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.Employees.Queries;

public enum Sort
{
    NameAsc, NameDesc, OutOfOfficeBalanceAsc, OutOfOfficeBalanceDesc 
}

public record GetEmployees(
    ClaimsPrincipal User,
    int Page = 1,
    int Limit = 30,
    string? FullName = null,
    string? Subdivision = null,
    EmployeePosition? Position = null,
    EmployeeStatus? Status = null,
    int? PeoplePartnerId = null,
    string? PeoplePartner = null,
    Sort Sort = Sort.NameAsc) :
    IRequest<PaginatedResult<Employee>>;

public class GetProjectsHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<GetEmployees, PaginatedResult<Employee>>
{
    public async Task<PaginatedResult<Employee>> Handle(GetEmployees request, CancellationToken cancellationToken)
    {
        var position = request.User.GetPosition();
        var id = request.User.GetId();

        IQueryable<EmployeeEntity> query;

        switch (position)
        {
            case EmployeePosition.Administrator:
                query = dbContext.Employees;
                break;
            case EmployeePosition.HRManager:
                {
                    query = dbContext
                        .Employees
                        .Where(e => e.PeoplePartnerId == id)
                        .SelectMany(e => e.Employees);
                    break;
                }

            case EmployeePosition.ProjectManager:
                {
                    query = dbContext
                        .Projects
                        .Where(e => e.ProjectManagerId == id)
                        .SelectMany(e => e.Employees);
                    break;
                }

            default:
                throw new NotImplementedException();
        }

        query = query
            .Include(e => e.PeoplePartner)
            .AsNoTracking();

        if (!string.IsNullOrEmpty(request.FullName))
        {
            query = query.Where(e => e.FullName.Contains(request.FullName));
        }

        if (!string.IsNullOrEmpty(request.Subdivision))
        {
            query = query.Where(e => e.Subdivision == request.Subdivision);
        }

        if (request.Position is not null)
        {
            query = query.Where(e => e.Position == request.Position);
        }

        if (request.Status is not null)
        {
            query = query.Where(e => e.Status == request.Status);
        }

        if (!string.IsNullOrEmpty(request.PeoplePartner))
        {
            query = query.Where(e => e.PeoplePartner!.FullName == request.PeoplePartner);
        }

        if (request.PeoplePartnerId is not null)
        {
            query = query.Where(e => e.PeoplePartnerId == request.PeoplePartnerId);
        }

        query = request.Sort switch
        {
            Sort.NameAsc => query.OrderBy(e => e.FullName),
            Sort.NameDesc => query.OrderByDescending(e => e.FullName),
            Sort.OutOfOfficeBalanceAsc => query.OrderBy(e => e.OutOfOfficeBalance),
            Sort.OutOfOfficeBalanceDesc => query.OrderByDescending(e => e.OutOfOfficeBalance),
            _ => throw new NotImplementedException()
        };

        var result = await query
            .ProjectTo<Employee>(mapper.ConfigurationProvider)
            .ToPaginatedResult(request.Page, request.Limit, cancellationToken);

        return result;
    }
}