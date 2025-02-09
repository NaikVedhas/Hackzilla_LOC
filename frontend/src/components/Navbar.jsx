import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed bg-black w-full flex justify-between items-center p-4 shadow-md ">
      <div className="">
        <p className="text-[#868686] text-xl font-bold">Blocky</p>
      </div>
        
      <div className="flex gap-8">
        <Link to="/" className="text-[#868686] hover:text-[#c2c1c1]">Home</Link>
        <Link to="/filecase" className="text-[#868686] hover:text-[#c2c1c1]">Register Case</Link>
        <Link to="/mycases" className="text-[#868686] hover:text-[#c2c1c1]">My Cases</Link>
        <Link to="/geoservices" className="text-[#868686] hover:text-[#c2c1c1]">Geo-service</Link>
        <Link to="/analytics" className="text-[#868686] hover:text-[#c2c1c1]">Analysis</Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Login Button */}
        <button className="text-[#868686] hover:text-[#c2c1c1] border border-[#868686] px-4 py-2 rounded-md hover:bg-[#f1f1f1]">
          Login
        </button>

        {/* Connect Button */}
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
