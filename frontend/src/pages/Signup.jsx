import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
              Create An Account
            </h3>
            <p className="text-sm text-slate-700 text-center mb-8">
              Join us and start tracking your spendings.
            </p>

            <form className="space-y-4">
              <div className="flex justify-center mb-6">
                {/**profile image */}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  label="Full Name"
                  placeholder="Jhon Doe"
                  type="text"
                />

                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  placeholder="name@exemple.com"
                  type="text"
                />

                <div className="col-span-2">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    placeholder="********"
                    type="password"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
