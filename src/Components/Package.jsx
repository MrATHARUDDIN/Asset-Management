import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hook/useAxiosPublic';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './firebase config/Private';

const Package = () => {
  const AxiosPublic = useAxiosPublic();
  const {user} =useContext(AuthContext);
  const { data: pkg = [], refetch } = useQuery({
    queryKey: ["pkg"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/pkgs");
      return res.data;
    },
  });
  console.log(pkg)

  return (<>
  {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Sorry You Are Not Login</h3>
    <p className="py-4">To Buy This Package <Link className='text-blue-400' to={`Login`}>Login</Link> Now</p>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    <div className="flex gap-5 justify-center mt-10 mb-10">
      {pkg.map((item) => (
        <div key={item._id} className="h-96 w-[20rem] text-center bg-green-400">
          <h1 className="font-bold text-5xl mt-10 text-white">Package{item.pkgnumber}</h1>
          <h1 className="font-bold text-3xl mt-24 text-white">{`Maximum ${item.Employee} employees $${item.price}`}</h1>
         {user && <Link to={`/Paymet/`} className="btn mt-10">Buy Now</Link> }
         {!user && <button className="btn mt-10" onClick={()=>document.getElementById('my_modal_2').showModal()}>Buy Now</button> }
        </div>
      ))}
    </div>
      </>
  );
};

export default Package;
