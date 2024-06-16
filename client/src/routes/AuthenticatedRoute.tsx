import { Outlet } from "react-router-dom";
import SignInIndex from "./signIn/Index";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { HttpStatusCode } from "axios";

async function isSignedIn() {
  const response = await apiClient.get("identity/isSignedIn");
  return response.status == HttpStatusCode.Ok;
};

function AuthenticatedRoute() {
  const { data: isAuthenticated } = useQuery({
    queryKey: ["isSignedIn"],
    queryFn: isSignedIn
  });

  if (isAuthenticated == undefined) {
    return <></>;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <SignInIndex />;
}

export default AuthenticatedRoute;