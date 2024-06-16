import { Outlet } from "react-router-dom";
import SignInIndex from "./signIn/Index";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

async function isSignedIn() {
  return await apiClient.get("identity/isSignedIn");
};

function AuthenticatedRoute() {
  const { isFetched, isError } = useQuery({
    queryKey: ["isSignedIn"],
    queryFn: isSignedIn
  });

  const isAuthenticated = isFetched && !isError;

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <SignInIndex />;
}

export default AuthenticatedRoute;