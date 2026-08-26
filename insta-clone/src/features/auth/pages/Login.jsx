import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { user, loading, handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(`Email: ${email}\nPassword: ${password} `);

    await handleLogin(email, password);

    console.log("user loggedIn");

    navigate("/");

  };

  if(loading){
    return(
      <main>
        <h1>Loading........</h1>
      </main>
    )
  }

  return (
    <>
      <div
        className="min-h-screen w-full flex text-white items-center justify-center bg-gradient-to-br from-[#0e7b78] to-[#052c2b] px-4 py-10"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div className="w-full max-w-sm aspect-square rounded-2xl bg-[#16333A]/90 backdrop-blur-md border border-white/15 shadow-2xl shadow-white p-6 sm:p-8 flex flex-col justify-center overflow-y-auto ">
          {/* Login title */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl sm:text-3xl font-light tracking-wide">
              User Login
            </h1>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 pt-10 sm:pt-12"
          >
            <div className="flex items-center gap-3 border-b border-white/25 focus-within:border-white/70 transition-colors pb-2">
              <Mail
                className="w-4 h-4 text-white/50 shrink-0"
                strokeWidth={1.5}
              />
              <input
                className="flex-1 min-w-0 bg-transparent outline-none text-white placeholder-white/50 text-sm"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ID"
                required
              />
            </div>
            <div className="flex items-center gap-3 border-b border-white/25 focus-within:border-white/70 transition-colors pb-2">
              <Lock
                className="w-4 h-4 text-white/50 shrink-0"
                strokeWidth={1.5}
              />
              <input
                className="flex-1 min-w-0 bg-transparent outline-none text-white placeholder-white/50 text-sm"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            {/* button */}
            <button
              type="submit"
              className=" w-full py-3 rounded-md bg-[#0B1E24] hover:bg-[#0F262D] text-white text-sm tracking-[0.2em] uppercase transition-colors"
            >
              Login
            </button>
          </form>

          {/* remember me + forgot password */}
          <div className="flex flex-wrap items-center gap-3  pt-2 text-xs sm:text-sm text-white/70">
            <a href="#" className="italic hover:text-white transition-colors">
              Don't have an account?{" "}
            </a>{" "}
            <Link to="/register">Register</Link>
          </div>
          {/* <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs sm:text-sm text-white/70">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                className="accent-[#2DD4C4]"
                type="checkbox"
              />
              Remember me
            </label>

            <a href="#" className="italic hover:text-white transition-colors">
              Forgot Password?{" "}
            </a>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default Login;
