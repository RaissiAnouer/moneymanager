import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { API_ENDPOINTS } from "../util/apiEndpoints";

const Login = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter valid email address");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    setError("");

    //login api call

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.log("'Somthing went wrong", error);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="h-screen w-full flex relative items-center justify-center overflow-hidden">
        <img
          src={assets.login_bg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
        />
        <div className="relative z-10 w-full max-w-lg px-6">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold text-black text-center mb-2">
              Welcome Back !
            </h3>
            <p className="text-sm text-slate-700 text-center mb-8">
              Please enter your details to login in.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="name@exemple.com"
                type="text"
              />

              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="********"
                type="password"
              />
              {error && (
                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}

              <button
                disabled={isLoading}
                type="submit"
                className={`bg-purple-900 text-white rounded-md hover:bg-purple-600 w-full py-3 text-base shadow-mdc  font-medium flex items-center justify-center gap-2 ${
                  isLoading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin w-5 h-5" />
                    Login in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-sm text-slate-800 text-center mt-6">
                Don't have an account ?
                <Link
                  to="/signup"
                  className="font-medium text-purple-600 underline hover:text-purple-800 transition-colors"
                >
                  Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
