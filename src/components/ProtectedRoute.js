import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {

  // Destructure the user object from the authentication context
  const { user } = UserAuth();

  // Check if the user is authenticated
  if (!user) {
    return <Navigate to='/' />; // Redirect to the home page if the user is not authenticated
  } else {
    // Render the children components if the user is authenticated
    return children;
  }

};

export default ProtectedRoute;