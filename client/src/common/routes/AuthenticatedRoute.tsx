import { Outlet } from "react-router-dom";
import SignInIndex from "src/signIn/Index";
import useIsSignedInQuery from "src/common/hooks/useIsSignedInQuery";

function AuthenticatedRoute() {
  const { data: isAuthorized, isLoading } = useIsSignedInQuery();
  
  if (isLoading) {
    return <></>;
  }

  if (isAuthorized) {
    return <Outlet />;
  }

  return <SignInIndex />;
}

export default AuthenticatedRoute;