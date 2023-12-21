import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {

  // Destructuring user and logOut from the authentication context
  const { user, logOut } = UserAuth();

  // Initialize the navigation function for programmatic navigation
  const navigate = useNavigate();

  // Logout function to handle user sign-out
  const handleLogout = async () => {
    try {
      await logOut();  // Call the logOut function from the authentication context
      navigate('/'); // Redirect the user to the home page after successful logout
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>

      {/* Render the Netflix logo as a clickable link to the home page */}
      <Link to='/'>
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>
          NETFLIX
        </h1>
      </Link>

      {/* Conditional rendering based on user authentication status */}
      {user?.email ? (

        // Display account and logout buttons when the user is authenticated
        <div>
          <Link to='/account'>
            <button className='text-white pr-4'>Account</button>
          </Link>
          <button
            onClick={handleLogout}
            className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'
          >
            Logout
          </button>
        </div>
      ) : (

        // Display sign-in and sign-up buttons when the user is not authenticated
        <div>
          <Link to='/login'>
            <button className='text-white pr-4'>Sign In</button>
          </Link>
          <Link to='/signup'>
            <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>
              Sign Up
            </button>
          </Link>
        </div>
      )}

    </div>
  );
};
export default Navbar;