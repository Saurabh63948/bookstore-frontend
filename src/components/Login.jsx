import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../store/AuthProvider"; // Import useAuth

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth(); // Access login method from context

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password
    };

    try {
      const response = await axios.post('https://bookstore-backend-tcp8.onrender.com/users/login', userInfo);

      if (response.data && response.data.token) {
        toast.success("Logged in successfully!");

        // Use login function from context
        login(response.data);

        // Close the modal and refresh
        document.getElementById("my_modal_3").close();
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.message);
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
            <h3 className="font-bold text-lg">Login..</h3>

            <div className="mt-4 space-y-2">
              <span>Email</span> <br />
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="mt-4 space-y-2">
              <span>Password</span> <br />
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="flex justify-around mt-4">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                Login
              </button>
              <p>
                Not registered? <Link to="/signUp" className="underline text-blue-500 cursor-pointer">Signup</Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
