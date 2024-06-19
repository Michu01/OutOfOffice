import EmployeeAvatar from "src/employees/EmployeeAvatar";

type Props = {
  employee: Employee;
  avatarSize: number;
  className?: string;
  showPosition?: boolean;
}

function EmployeeBriefComponent(props: Props) {
  const { className, employee, avatarSize, showPosition = false } = props;

  return (
    <div className={`d-flex flex-row align-items-center text-nowrap ${className}`}>
      <EmployeeAvatar className="me-1" size={avatarSize} /> 
      <div>
        <div className="fs-7">{employee.fullName}</div>
        {showPosition && <div className="fs-8">{employee.position}</div>}
      </div>
    </div>
  );
}

export default EmployeeBriefComponent;