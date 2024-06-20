import AvatarSize from "src/common/constants/AvatarSize";

function EmployeeAvatar({ employeeId, className, size }: { employeeId: number, className?: string, size: number }) {
  return (
    <img className={className} height={size} width={size} src={`https://avatar.iran.liara.run/public?size=${AvatarSize.Large}&id=${employeeId}`} />
  );
}

export default EmployeeAvatar;