import { useContext } from "react";
import Banner from "../Components/Banner";
import HomeCard from "../Components/HomeCard";
import Package from "../Components/Package";
import { AuthContext } from "../Components/firebase config/Private";
import useAdmin from "../Hook/useAdmin";
import Footer from "../Components/Footer";
import { Helmet } from "react-helmet-async";
import RecentReq from "../Components/RecentReq";
import MostRequested from "../Components/Mostrequested";
import Limited from "../Components/Limited";
import PendingReq from "../Components/PendingReq";
import Monthly from "../Components/Monthly";
import Frequently from "../Components/Frequently";
import Customreq from "../Components/Customreq";
import Mypie from "../Components/Mypie";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  return (
    <div>
      <Helmet>
        <title>Asset Management || Home</title>
      </Helmet>
      {!user && (
        <>
          <Banner></Banner>
          <HomeCard></HomeCard>
          <Package></Package>
          <Footer></Footer>
        </>
      )}
      {user && !isAdmin && (
        <>
          <PendingReq></PendingReq>
          <Monthly></Monthly>
          <Frequently></Frequently>
          <Customreq></Customreq>
          <Footer></Footer>
        </>
      )}
      {user && isAdmin && (
        <>
        <RecentReq></RecentReq>
        <MostRequested></MostRequested>
        <Limited></Limited>
        <Mypie></Mypie>
          <Footer></Footer>
        </>
      )}
    </div>
  );
};

export default Home;
