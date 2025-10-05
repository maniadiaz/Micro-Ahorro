const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  const decodedJwt = parseJwt(token);

  if (decodedJwt.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return false;
  }

  return true;
};

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    if (isAuthenticated()) {
      return ;  // Autenticado
    }

    return; // LOGIN 
  };

  return AuthRoute;
};

export default withAuth;
