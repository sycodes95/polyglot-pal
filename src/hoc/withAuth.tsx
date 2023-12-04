import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (AuthenticatedComponent, UnauthenticatedComponent) => {
  
  return (props) => {
    const { user } = useAuth0();
    const navigate = useNavigate()
    if (user) {
      return <AuthenticatedComponent {...props} />;
    } else {
      useEffect(() => {
        navigate('/', { replace : true })
      },[user, navigate])
      return <UnauthenticatedComponent {...props} />;
    }
  };
};

export default withAuth;
