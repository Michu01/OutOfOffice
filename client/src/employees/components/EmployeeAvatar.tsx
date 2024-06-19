function EmployeeAvatar({ className, size }: { className?: string, size: number }) {
  return (
    <img className={className} height={size} width={size} src="https://avatar.iran.liara.run/public" />
  );
}

export default EmployeeAvatar;