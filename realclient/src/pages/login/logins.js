import React, {useState ,useEffect} from 'react';
import "./login.css";
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineMail, AiFillLock } from 'react-icons/ai';
import img from "../login/loginimg.png"
import { useCookies } from "react-cookie";



  
function Login() {
  const {setAuth } = useAuth();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";



  useEffect(() => {
    document.title = "Login";
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8001/admin/login', {
        email,
        password,
        headers: { "content-type": "application/json" },
        withCredentials: true,
      });
      const superadmin = response.data.admin.isSuperAdmin;
    //   console.log(superadmin)
    //  console.log(response )

      const token = response?.data?.token;
      //console.log(access_token)

      console.log(response.data.token)
      // setCookie("token", token);
      // setCookie("super-admin", superadmin);
      setAuth({ email, password, superadmin, token });
      localStorage.setItem("token", "true");

      toast.success("Login successful!");

     navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      if (!error.response) {
        toast.error("No Internet Connection!");
      } else {
        console.error(error);
        toast.error("Email/Password invalid!");
      }
    }

    setLoading(false);
  };


  return (
    <div className="page-background">
      <div id="login-wrap">
        <img src={img} alt="Image" className="imglogin" />

        <div className="login-card">
          <div className="login-card-header">
            <h1 className="display-md">
              <span className="text-main">Log</span>
              <span className="text-primary">In</span>
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="login-card-form">
            <div className="input-group">
              <label className="labelLogin">Email</label>
              <input
                type="text"
                className="inputLogin"
                placeholder="example@gmail.com"
                required
                autoComplete="off"
                value={email}
                onChange={(event) => setemail(event.target.value)}
              />
              <i className="m-i iconsLogin">
                <AiOutlineMail />
              </i>
            </div>
            <div className="input-group">
              <label className="labelLogin">Password</label>
              <input
                type="password"
                className="inputLogin"
                placeholder="*********"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <i className="m-i iconsLogin">
                <AiFillLock />
              </i>
            </div>
            <div className="btn-group">
              <button type="submit" value="Submit" className="btn btn-primary">
                {loading ? 'Checking...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
