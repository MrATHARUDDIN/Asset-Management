import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { AuthContext } from "../Components/firebase config/Private";
import app from "../Components/firebase config/firebase.config";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";
const AdminSingup = () => {
    const Auth = getAuth(app)
    const axiosSecure = useAxiosSecure();
    const [Error ,setError] = useState('');
    const {CreateUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const handelLogin = (e) => {
        e.preventDefault()
        const password = e.target.password.value 
        const email = e.target.email.value 
        const Photo = e.target.photo.value;
        const Date = e.target.date.value;
        const Name = e.target.name.value;
        const Pkg = e.target.selectedPackage.value;
        const Package = parseInt(Pkg)
        
        const role = "Admin" 
        CreateUser(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userinfo = {
                name : Name,
                email : email,
                date : Date,
                role : role,
                Package:Package,
               }
               // User Entry to The Data-base 
                axiosSecure.post("/users",userinfo)
            navigate('/Paymet')
            updateProfile(Auth.currentUser, {
                displayName: Name,
                photoURL: Photo,
            })
                .then(() => {
                    // console.log('Profile updated successfully');
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
        <title>Asset Management || Admin Sing UP</title>
      </Helmet>
            <div>
            <div>
                <h2 className="text-3xl my-10 text-center">Join as HR/Admin</h2>
                <form onSubmit={handelLogin} className=" md:w-3/4 lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input type="text" required name="name" placeholder="Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Company Name</span>
                        </label>
                        <input type="text" required name="Company" placeholder="Company Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Company Logo</span>
                        </label>
                        <input type="text" required name="photo" placeholder="Company Logo" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Select Package</span>
                    </label>
                    <select name="selectedPackage" className="select select-bordered" required>
                        {/* Default option with empty value */}
                        <option value="" disabled>Select a Package</option>
                        <option value="5">5 Members for $5</option>
                        <option value="10">10 Members for $8</option>
                        <option value="20">20 Members for $15</option>
                    </select>
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

export default AdminSingup;
