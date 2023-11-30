import photo1 from "../assets/imgbanner (2).jpg"
import photo2 from "../assets/imgbanner (1).jpg"
import { Link } from "react-router-dom";
const Banner = () => {
    return (
        <div className='mt-10 mb-20'>
           <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src={photo1} className="w-full" />
    <div className="">
    <div className="absolute flex  right-72 gap-2 top-1/2">
    <div className="bg-black bg-opacity-20 p-5 h-52">
        <h1 className="text-7xl font-bold text-white p-2 ">Join As a Employee </h1>
        <Link to="/Employee" className="btn bg-pink-400 w-32 rounded-2xl mt-3 active:bg-green-300 hover:bg-green-300">Join Now</Link>
    </div>
      <a href="#slide2" className="btn mt-64 mr-4 h-14 w-14 rounded-full bg-orange-400 btn-circle">❮</a> 
      <a href="#slide2" className="btn mt-64 h-14  w-14 rounded-full bg-orange-400 btn-circle">❯</a>
    </div>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src={photo2} className="w-full" />
    <div className="">
    <div className="absolute flex  right-72 gap-2 top-1/2">
    <div className="bg-black bg-opacity-20 p-5 h-52">
        <h1 className="text-7xl font-bold text-white  p-2 ">Join As a Hr/Admin </h1>
        <Link to="/Hr" className="btn bg-pink-400 w-32 rounded-2xl mt-3 active:bg-green-300 hover:bg-green-300">Join Now</Link>
    </div>
      <a href="#slide1" className="btn mt-64 mr-4 h-14 w-14 rounded-full bg-orange-400 btn-circle">❮</a> 
      <a href="#slide1" className="btn mt-64 h-14  w-14 rounded-full bg-orange-400 btn-circle">❯</a>
    </div>
    </div>
  </div> 
</div>
        </div>
    );
};

export default Banner;