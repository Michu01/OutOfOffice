import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/apiClient";

const getMe = async () => {
  const response = await apiClient.get<Employee>("identity/me");
  return response.data;
}

type Props = {
  className?: string;
}

function EmployeeBriefComponent(props: Props) {
  const { className } = props;

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: getMe
  });

  return (
    <div className={`d-flex flex-row align-items-center text-white ${className}`}>
      <img className="me-1" height={48} width={48} src="https://avatar.iran.liara.run/public" />
      {
        me &&
        <div>
          <div className="fs-7">{me.fullName}</div>
          <div className="fs-8">{me.position}</div>
        </div>
      }
    </div>
  );
}

export default EmployeeBriefComponent;