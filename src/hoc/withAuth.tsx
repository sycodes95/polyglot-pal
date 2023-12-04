import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (AuthenticatedComponent, UnauthenticatedComponent) => {
  
  return (props) => {
    const { user } = useAuth0();
    if (user) {
      return <AuthenticatedComponent {...props} />;
    } else {
      return <UnauthenticatedComponent {...props} />;
    }
  };
};

export default withAuth;
