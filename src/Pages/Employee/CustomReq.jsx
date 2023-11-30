import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { AuthContext } from "../../Components/firebase config/Private";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CustomReq = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const {user} =useAuth(AuthContext)
    // Destructure 'register', 'handleSubmit', 'setError', and 'formState' from 'useForm'
    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm();

    const handleFormSubmit = async (data) => {
        try {
            // Validate that an image is provided
            if (!data.image || !data.image[0]) {
                setError("image", {
                    type: "manual",
                    message: "Image is required",
                });
                return;
            }

            // Use FormData for file upload
            const formData = new FormData();
            formData.append("image", data.image[0]);

            // Upload image
            const imgRes = await axiosPublic.post(image_hosting_api, formData);

            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

            const asset = {
                reqdate: formattedDate,
                name: data.name,
                type: data.type,
                reason: data.reason,
                additionalInfo: data.additionalInfo,
                price: parseInt(data.price),
                image: imgRes.data.display_url,
                Status: "Pending",
                useremail: user.email,
            };

            // Use axiosSecure for the request to the "/Request" endpoint
            const bookingResponse = await axiosSecure.post("/Request", asset);
            if (bookingResponse.data.insertedId) {
              reset()
                // Show success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Request Success.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            // Show error popup
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Please try again.",
            });
        }
    };

    return (
        <div className="flex justify-center items-center">
             <Helmet>
        <title>Asset Management || Custom Request</title>
      </Helmet>
            <div className="bg-orange-300 mt-10 w-9/11 h-3/4 p-20">
                <h1 className="font-bold mb-10 text-center text-4xl">Make a Custom Request</h1>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    {/* Asset Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-lg">Asset Name</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="Asset Name"
                                className={`input input-bordered bg-gray-50 w-[40rem] ${errors.name && 'input-error'}`}
                                {...register('name', { required: true })}
                            />
                        </label>
                        {errors.name && <p className="error-message">Asset Name is required</p>}
                    </div>

                    {/* Price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-lg">Price</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="Price"
                                className={`input input-bordered bg-gray-50 w-[40rem] ${errors.price && 'input-error'}`}
                                {...register('price', { required: true })}
                            />
                        </label>
                        {errors.price && <p className="error-message">Price is required</p>}
                    </div>

                    {/* Asset Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-lg">Asset Type</span>
                        </label>
                        <label className="input-group grid">
                            <select id="categorySelect" {...register('type', { required: true })} className="p-3 w-32">
                                <option value="Returnable">Returnable</option>
                                <option value="Non-returnable">Non-returnable</option>
                            </select>
                        </label>
                        {errors.type && <p className="error-message">Asset Type is required</p>}
                    </div>

                    {/* Asset Image */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-lg">Asset Image</span>
                        </label>
                        <input
                            type="file"
                            className={`file-input w-full max-w-xs ${errors.image && 'input-error'}`}
                            {...register('image', { required: true })}
                        />
                        {errors.image && <p className="error-message">Image is required</p>}
                    </div>

                    {/* Why you need this */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-lg">Why you need this</span>
                        </label>
                        <label className="input-group">
                            <textarea
                                placeholder="Enter your reason"
                                className={`textarea textarea-bordered bg-gray-50 w-[40rem] ${errors.reason && 'input-error'}`}
                                {...register('reason', { required: true })}
                            ></textarea>
                        </label>
                        {errors.reason && <p className="error-message">Reason is required</p>}
                    </div>

                    {/* Additional information */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-lg">Additional information</span>
                        </label>
                        <label className="input-group">
                            <textarea
                                placeholder="Enter additional information"
                                className={`textarea textarea-bordered bg-gray-50 w-[40rem] ${errors.additionalInfo && 'input-error'}`}
                                {...register('additionalInfo', { required: true })}
                            ></textarea>
                        </label>
                        {errors.additionalInfo && <p className="error-message">Additional information is required</p>}
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn bg-green-400 mt-5 text-white">
                        Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CustomReq;
