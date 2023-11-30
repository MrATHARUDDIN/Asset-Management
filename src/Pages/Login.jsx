// import photo from  "../assets/"
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Swal from 'sweetalert2'
import { AuthContext } from "../Components/firebase config/Private";
import app from "../Components/firebase config/firebase.config";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const Auth = getAuth(app)
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const {SigninUser} = useContext(AuthContext)

    const handelGoogle = () => {
      signInWithPopup(Auth, provider)
      .then(()=>{
        navigate("/");
      })
      .catch(err => console.log(err))
    }

    const handlesubmit = (e) =>{
      e.preventDefault()
      const form = e.target;
      const password = form.password.value 
      const email = form.email.value 
      SigninUser(email, password)
      .then(() => {
        Swal.fire({
          title: 'Successfully Login',
          text: 'You are successfully logged in now',
          icon: 'success',
          confirmButtonText: 'Close',
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: error.message, // Display the error message from Firebase
          icon: 'error',
          confirmButtonText: 'Close',
        });
      });
    }
    
    return (
        <div>
           <Helmet>
        <title>Asset Management || Login</title>
      </Helmet>
        <div className="hero min-h-screen bg-base-200">
        <form className="hero-content flex-col ml-10 lg:flex-row-reverse" onSubmit={handlesubmit}>
          <div className="card flex-shrink-0 w-9/12 flex-1 mr  max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="Email" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
            <input  
                type={"password"}
                placeholder="password" 
                name="password"
                className="input input-bordered" />
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-secondary mb-4 mt-6 w-full"  type="submit" value="Login"/>
              </div>
        <Link>
        <button className="btn" onClick={handelGoogle}>
          Google
        </button>
        </Link>
            </div>
          </div>
        </form>
      </div>
        </div>
    );
};

export default Login;

