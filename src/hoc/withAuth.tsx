import { useAuth0 } from "@auth0/auth0-react";


// This is your Higher-Order Component
const withAuth = (AuthenticatedComponent, UnauthenticatedComponent) => {
  return (props) => {
    console.log(props);
    const { user } = useAuth0();

    if (user) {
      return <AuthenticatedComponent {...props} />;
    } else {
      return <UnauthenticatedComponent {...props} />;
    }
  };
};

export default withAuth;
