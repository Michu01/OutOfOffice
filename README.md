# Out of Office #
Out of Office is a comprehensive workforce management system designed to streamline leave requests, project assignments, and approvals. It caters to four distinct roles within an organization.

## Administrator  
The administrator has full control over the system. They manage all data, including employees, projects, and leave requests.
Responsibilities:
Create and manage employee profiles.
Assign roles to employees.
Handle project-related tasks.
Approve or reject leave requests.
Monitor overall system health.

## HR Manager  
The HR manager focuses on employee-related tasks.
Responsibilities:
Create new employee profiles.
View details of their assigned employees.
Access project information related to their team.
Handle leave requests submitted by employees.
Review and approve leave requests.
Manage employee records.

## Project Manager  
Project managers oversee project assignments and approvals.
Responsibilities:
Create and manage projects.
Assign employees to specific projects.
View approval requests related to their projects.
Collaborate with HR managers for resource allocation.
Ensure project timelines are met.

## Employee  
Employees interact with the system to request leave and view project details.
Responsibilities:
Submit leave requests (vacation, sick leave, etc.).
View their assigned projects.
Check the status of leave requests.
Access project-related information.

# Tech Stack #

.NET Web Api + React

# How to Run #

## Prerequisites   
.NET 8.0  
Node.js  
Microsoft SQL Server Express LocalDB    

## Clone the Repository  
git clone https://github.com/Michu01/OutOfOffice.git  
cd OutOfOffice  

## Web API  
cd Api  
dotnet build  
dotnet run  

## Client  
cd client  
npm install  
npm run dev  

Web api and client should be available at https://localhost:7186/
