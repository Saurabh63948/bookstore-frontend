import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../store/AuthProvider"; // ✅ Import useAuth

function SignUp() {
  const { authUser, login } = useAuth(); // ✅ Destructure login & authUser
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // ✅ Redirect logged-in users away from SignUp
  useEffect(() => {
    if (authUser) {
      navigate(from, { replace: true });
    }
  }, [authUser, navigate, from]);

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:8000/users/signUp", userInfo);
      console.log(res.data);

      login(res.data); // ✅ Set user in context
      toast.success("Signup successful!");
      navigate(from, { replace: true }); // ✅ Redirect after signup

    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Signup failed!";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[600px]">
          <div className="modal-box">
            <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
              <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </Link>

              <h3 className="font-bold text-lg">Sign Up</h3>

              <div className="mt-4 space-y-2">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("name", { required: true })}
                />
                {errors.name && <span className="text-red-500">This field is required</span>}
              </div>

              <div className="mt-4 space-y-2">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("email", { required: true })}
                />
                {errors.email && <span className="text-red-500">This field is required</span>}
              </div>

              <div className="mt-4 space-y-2">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("password", { required: true })}
                />
                {errors.password && <span className="text-red-500">This field is required</span>}
              </div>

              <div className="flex justify-around mt-4">
                <button
                  type="submit"
                  className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
                >
                  Sign Up
                </button>

                {!authUser && (
                  <p className="text-xl">
                    Have an account?{" "}
                    <button
                      type="button"
                      className="underline text-blue-500 cursor-pointer"
                      onClick={() => document.getElementById("my_modal_3").showModal()}
                    >
                      Login
                    </button>
                    <Login />
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
