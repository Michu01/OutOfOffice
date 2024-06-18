import { Outlet } from "react-router-dom";
import SignInIndex from "src/signIn/Index";
import { useQuery } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";
import { HttpStatusCode } from "axios";

async function isSignedIn() {
  const response = await apiClient.get("identity/isSignedIn", {
    validateStatus: status => status == HttpStatusCode.Ok || status == HttpStatusCode.Unauthorized
  });
  return response.status == HttpStatusCode.Ok;
};

function AuthenticatedRoute() {
  const { data: isAuthorized, isLoading } = useQuery({
    queryKey: ["isSignedIn"],
    queryFn: isSignedIn
  });

  if (isLoading) {
    return <></>;
  }

  if (isAuthorized) {
    return <Outlet />;
  }

  return <SignInIndex />;
}

export default AuthenticatedRoute;