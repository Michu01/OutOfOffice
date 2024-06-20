function EmployeeAvatar({ employeeId, className, size }: { employeeId: number, className?: string, size: number }) {
  return (
    <img className={className} height={size} width={size} src={`https://avatar.iran.liara.run/public?id=${employeeId}`} />
  );
}

export default EmployeeAvatar;