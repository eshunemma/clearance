import React from "react";
import { BellElectric, House, LibraryBig, LogOut, Users } from "lucide-react";
import ProfileInitials from "./ProfileInitials";
import { getInitials } from "../utils/helperFunctions";

const navs = [
  {
    name: "Home",
    icon: <House size={24} />,
    link: "/",
  },
  {
    name: "Clearance Issues",
    icon: <LibraryBig />,
    link: "/approve",
  },
  {
    name: "Manage Users",
    icon: <Users />,
    link: "/manage-users",
  },
  {
    name: "Manage Departments",
    icon: <BellElectric />,
    link: "/manage-dept",
  },
  {
    name: "Logout",
    icon: <LogOut />,
    link: "/login",
  },
];

const NavBar = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  return (
    <div className="w-full md:w-[15%] bg-black border-r h-lvh shadow-md  mt-9">
      <div className="flex flex-col gap-3 mb-6 px-[2rem] bg-blue-300 w-full content-center">
        <img
          src="https://res.cloudinary.com/dt8vgj0u3/image/upload/v1732118677/gala/image-removebg-preview_1_jxbdtd.png"
          alt="User"
          className="w-[50rem] rounded-full"
        />
        {/* <ProfileInitials
          name={getInitials(`${authUser?.firstName} ${authUser?.lastName}`)}
        /> */}
        <div className="">
          <h3 className="font-semibold">{authUser?.name}</h3>
        </div>
      </div>
      <nav className="flex flex-col gap-5 justify-between h-1/4 pl-5">
        {navs.map((data, index) => (
          <div className="flex gap-3 text-white" key={index}>
            {data.icon}
            <a
              href={data.link}
              className="block font-medium hover:text-blue-500"
            >
              {data.name}
            </a>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
