import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup, updateProfile } from "firebase/auth";
import { AuthContext } from "../Components/firebase config/Private";
import app from "../Components/firebase config/firebase.config";
import useAxiosPublic from "../Hook/useAxiosPublic";
import { FaGoogle } from 'react-icons/fa';
import axios from "axios";
import { Helmet } from "react-helmet-async";
const EmployeeSinup = () => {
    const axiosPublic = useAxiosPublic();
    const Auth = getAuth(app)
    const [Error ,setError] = useState('');
    const {CreateUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const handelGoogle = () => {
      signInWithPopup(Auth, provider)
      .then(result =>{
        const userinfo ={
          name : result.user?.displayName,
          email : result.user?.email,
          role: role,
        }
        axios.post(`https://asset-server-side.vercel.app/users`, userinfo)
        .then(res => {
          console.log(res.data)
        })
        console.log(userinfo)
        navigate("/");
      })
      .catch(err => console.log(err))
    }
    const role = "Employee";
    const handelLogin = (e) => {
        e.preventDefault()
        const password = e.target.password.value 
        const email = e.target.email.value 
        const Date = e.target.date.value;
        const Name = e.target.name.value;
        
        CreateUser(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userinfo = {
                name : Name,
                email : email,
                date : Date,
                role : role,
               }
               // User Entry to The Data-base 
               axiosPublic.post("/users",userinfo)
                .then(res => console.log(res))
            navigate('/')
               updateProfile(Auth.currentUser, {
                displayName: Name,
                role : role,
            })
            console.log(updateProfile)
                .then(() => {
                    console.log('Profile updated successfully');
                    const updatedDisplayName = Auth.currentUser.displayName;
                    console.log('Updated displayName:', updatedDisplayName);
                    e.terget.reset();
                })
                .catch(err => console.log(err.message));
        })
        .catch((error) => {
            const errorMessage = error.message;
            if (errorMessage === 'auth/weak-password') {
                setError('Weak password');
            } else if (/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(errorMessage)) {
                setError('Password should have at least one capital letter and one special character');
            } else if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                setError('You already have an account with this email. Please login.');
            } else {
                setError(errorMessage);
            }
            return;
        });
        
    }
    return (
              <div>
                 <Helmet>
        <title>Asset Management || Employee SignUp</title>
      </Helmet>
            <div>
            <div>
                <h2 className="text-3xl my-10 text-center">Join as Employee </h2>
                <form onSubmit={handelLogin} className=" md:w-3/4 lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input type="text" required name="name" placeholder="Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date of birth</span>
                        </label>
                        <input type="date" required name="date" placeholder="Date of birth" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" required name="email" placeholder="Email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" required name="password" placeholder="Password" className="input input-bordered" />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-secondary mb-4 mt-6 w-full">Join</button>
                    </div>
                    <div>
                        <button className="btn w-20" onClick={handelGoogle}>
                            <FaGoogle></FaGoogle>
                        </button>
                    </div>
                         {
                            Error && <p className='mt-6 text-red-500 mb-5'>{Error}</p>
                        }
                </form>
                <p className="text-center mt-4">Already have an account? <Link className="text-blue-600 font-bold" to="/login">Login</Link></p>
            </div>
        </div>
        </div>

    );
};

export default EmployeeSinup;