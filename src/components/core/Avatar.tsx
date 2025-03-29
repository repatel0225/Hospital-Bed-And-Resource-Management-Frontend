import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearLoginUser } from "../../redux/actions/userLogin";
import { IUser } from "../../models/users.model";

const Avatar = (props: { userDetails: IUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the first letter of the name
  const getInitials = (name: string) => {
    if (name) {
      const initials = name[0];
      return initials.toUpperCase();
    }
    return;
  };
  //Handled Logout functionality
  const logOut = () => {
    dispatch(clearLoginUser());
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-end items-center space-x-4">
        <div
          className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {getInitials(props.userDetails?.name)}
        </div>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
            <button
              data-testid="logout-btn"
              onClick={() => logOut()}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
        <div className="font-medium text-lg">
          <div>{props.userDetails?.name}</div>
          <div className="text-sm text-white">{props.userDetails?.email}</div>
        </div>
      </div>
    </>
  );
};

export default Avatar;
