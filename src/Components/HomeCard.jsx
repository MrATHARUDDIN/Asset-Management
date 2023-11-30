import img1 from "../assets/features-img01.png"
import img2 from "../assets/features-img02.png"
import img3 from "../assets/features-img03.png"
import img4 from "../assets/features-img04.png"
const HomeCard = () => {
  return (
    <div className="mt-32 mb-20">
      <h1 className="text-center text-3xl text-black font-semibold">
        Revolutionary ICO Platform with Exclusive Rewards Program
      </h1>
      {/* Cards */}
      <section className="grid grid-cols-2 gap-10 mt-10">
        <div className="hero h-80 w-[35rem] bg-gray-900">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={img1}
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-3xl text-white hover:text-green-400 text-left font-bold">Mobile Payment Make Easy</h1>
              <p className="py-6 text-white text-left">
              Add new, trending and rare artwork to your collection.
              </p>
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="hero h-80 w-[35rem] bg-gray-900">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={img2}
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-3xl text-white hover:text-green-400 text-left font-bold">Lifetime Free Transaction</h1>
              <p className="py-6 text-white text-left">
              Add new, trending and rare artwork to your collection.
              </p>
            </div>
          </div>
        </div>
        {/* 3 */}
        <div className="hero h-80 w-[35rem] bg-gray-900">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={img3}
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-3xl text-white hover:text-green-400 text-left font-bold">Protect the Identity</h1>
              <p className="py-6 text-white text-left">
              Add new, trending and rare artwork to your collection.
              </p>
            </div>
          </div>
        </div>
        {/* 4 */}
        <div className="hero h-80 w-[35rem] bg-gray-900">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={img4}
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-3xl text-white hover:text-green-400 text-left font-bold">Security & Control Over Money</h1>
              <p className="py-6 text-white text-left">
              Add new, trending and rare artwork to your collection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeCard;
