import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="fixed bg-black w-full flex justify-between items-center p-4 shadow-md z-20 ">
      <div className="">
        <p className="text-[#868686] text-xl font-bold">Raksha</p>
      </div>

      <div className="flex gap-8">
        <Link to="/" className="text-[#868686] hover:text-[#c2c1c1]">Home</Link>
        <Link to="/filecase" className="text-[#868686] hover:text-[#c2c1c1]">Register Case</Link>
        <Link to="/mycases" className="text-[#868686] hover:text-[#c2c1c1]">My Cases</Link>
        <Link to="/geoservices" className="text-[#868686] hover:text-[#c2c1c1]">Geo-service</Link>
        <Link to="/database" className="text-[#868686] hover:text-[#c2c1c1]">Search DB</Link>
        <Link to="/chat" className="text-[#868686] hover:text-[#c2c1c1]">Alerts</Link>
        <Link to="/shift" className="text-[#868686] hover:text-[#c2c1c1]">Shift Management</Link>
        <Link to="/analytics" className="text-[#868686] hover:text-[#c2c1c1]">Analysis</Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Connect Button */}
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
