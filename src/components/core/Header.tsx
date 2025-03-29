import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ILoggedInEmployeeStore } from "../../models/users.model";
import { useEffect, useRef, useState } from "react";
import { clearLoginUser } from "../../redux/actions/userLogin";
 
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
 
  // To get the logged in user details from the store
  const userDetails = useSelector(
    (state: ILoggedInEmployeeStore) => state?.loggedInUser?.data
  );
 
  const role = userDetails[0]?.role;
 
  // Handle Logout functionality
  const logOut = () => {
    dispatch(clearLoginUser());
    navigate("/");
  };
 
  // Get the first letter of the name
  const getInitials = (name: string) => {
    if (name) {
      return name[0].toUpperCase();
    }
    return "";
  };
 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
 
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  return (
    <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <button className="text-2xl font-bold">
        Park Here
      </button>
      {role === "admin" && (
        <>
        <button
          className="px-4 py-2 text-lg font-bold bg-green-700 rounded hover:bg-green-800"
        >
          Book Slots
        </button>
        <div>
          <h4>{role}</h4>
        </div>
        </>
      )}
 
      {role && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center w-10 h-10 text-lg font-bold bg-green-700 rounded-full hover:bg-green-800"
          >
            {getInitials(userDetails[0]?.name)}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 w-48 p-4 mt-2 bg-white rounded shadow-lg">
              <div className="mb-2 text-gray-800 font-bold">{userDetails[0].name}</div>
              <div className="mb-2 text-gray-800">{userDetails[0].email}</div>
              <button
                onClick={logOut}
                className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
 
export default Header;