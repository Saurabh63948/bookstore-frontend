import toast from "react-hot-toast";
import { useAuth } from "../store/AuthProvider";

function Logout() {
  const { authUser, logout } = useAuth();

  const handleClick = () => {
    try {
      logout(); // This clears authUser and localStorage
      toast.success("Logout successfully");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleClick}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
