import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed bg-black w-full flex justify-between items-center p-4 shadow-md z-20">
      <div className="">
        <p className="text-[#868686] text-xl font-bold">Raksha</p>
      </div>

      <div className="flex gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#c2c1c1] hover:text-[#868686] font-bold"
              : "text-[#868686] hover:text-[#c2c1c1]"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/filecase"
          className={({ isActive }) =>
            isActive
              ? "text-[#c2c1c1] hover:text-[#868686] font-bold"
              : "text-[#868686] hover:text-[#c2c1c1]"
          }
        >
          Register Case
        </NavLink>
        <NavLink
          to="/mycases"
          className={({ isActive }) =>
            isActive
              ? "text-[#c2c1c1] hover:text-[#868686] font-bold"
              : "text-[#868686] hover:text-[#c2c1c1]"
          }
        >
          My Cases
        </NavLink>
        <NavLink
          to="/geoservices"
          className={({ isActive }) =>
            isActive
              ? "text-[#c2c1c1] hover:text-[#868686] font-bold"
              : "text-[#868686] hover:text-[#c2c1c1]"
          }
        >
          Geo-service
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive
              ? "text-[#c2c1c1] hover:text-[#868686] font-bold"
              : "text-[#868686] hover:text-[#c2c1c1]"
          }
        >
          Alerts
        </NavLink>
        <NavLink
          to="/shift"
          className={({ isActive }) =>
            isActive
              ? "text-[#c2c1c1] hover:text-[#868686] font-bold"
              : "text-[#868686] hover:text-[#c2c1c1]"
          }
        >
          Shift Management
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive
              ? "text-[#c2c1c1] hover:text-[#868686] font-bold"
              : "text-[#868686] hover:text-[#c2c1c1]"
          }
        >
          Analysis
        </NavLink>
        <NavLink
          to="/database"
          className={({ isActive }) =>
            isActive
              ? "text-[#c2c1c1] hover:text-[#868686] font-bold"
              : "text-[#868686] hover:text-[#c2c1c1]"
          }
        >
          Search DB
        </NavLink>
      </div>

      <div className="flex items-center gap-4 text-sm">
        {/* Connect Button */}
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
