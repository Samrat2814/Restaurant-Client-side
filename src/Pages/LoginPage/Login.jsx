/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const Login = () => {
  const { googleLogin, userLogin, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    userLogin(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Successfully logged in! 🎉");
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1000); // Adjust the timeout as needed (1.5 seconds in this example)
      })
      .catch(() => {
        toast.error("Login failed. Please try again! ❌");
        setError("password", {
          type: "manual",
          message: "Incorrect password. Please try again.",
        });
      });
  };

  const googleSignIn = () => {
    googleLogin()
      .then((result) => {
        setUser(result.user);
        navigate(location?.state ? location.state : "/");
        toast.success("Successfully logged in with Google! 🎉");
      })
      .catch(() => {
        toast.error("Google login failed. Please try again! ❌");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex justify-center items-center bg-gray-100 text-gray-900"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-lg w-full mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200 mt-6 md:p-10 lg:p-12"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none pr-10"
              placeholder="Enter your password"
            />
            <span
              className="absolute right-3 top-10 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot"
              className="text-blue-500 text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold text-lg transition duration-300"
          >
            Login
          </motion.button>

          {/* Google Sign-in */}
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            onClick={googleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-bold text-lg border border-gray-300 transition duration-300"
          >
            <FaGoogle size={20} className="text-red-500" /> Sign in with Google
          </motion.button>

          {/* Register Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-gray-700 font-semibold"
          >
            Don’t have an account?{" "}
            <Link className="text-blue-500 hover:underline" to="/sign-in">
              Register
            </Link>
          </motion.p>
        </form>
      </motion.div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
};

export default Login;
