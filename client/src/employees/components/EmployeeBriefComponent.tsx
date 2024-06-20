import formatEnum from "src/common/utility/formatEnum";
import EmployeeAvatar from "src/employees/components/EmployeeAvatar";
import Employee from "src/employees/models/Employee";

type Props = {
  employee: Employee;
  avatarSize: number;
  fullNameClassName?: string;
  className?: string;
  showPosition?: boolean;
}

function EmployeeBriefComponent(props: Props) {
  const { className, fullNameClassName = "fs-7", employee, avatarSize, showPosition = false } = props;

  return (
    <div className={`d-flex flex-row align-items-center text-nowrap ${className}`}>
      <EmployeeAvatar className="me-1" size={avatarSize} employeeId={employee.id} /> 
      <div>
        <div className={fullNameClassName}>{employee.fullName}</div>
        {showPosition && <div className="fs-8">{formatEnum(employee.position)}</div>}
      </div>
    </div>
  );
}

export default EmployeeBriefComponent;