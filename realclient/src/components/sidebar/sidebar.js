import { NavLink } from "react-router-dom";
import "../sidebar/sidebar.css";
import { MdGroups2 } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { TbFileTime } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import image from "../image/dc-Bassam.jpeg"
import { useEffect } from "react";
const links = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: <MdSpaceDashboard />,
        id: 1,
    },
    {
        path: "/patient",
        name: "Patients",
        icon: <MdGroups2 />,
        id: 2,
    },
    {
        path: "/appointment",
        name: "Appointments",
        icon: <TbFileTime />,
        id: 3,
    },
    {
        path: "/assistant",
        name: "Assistants",
        icon: <MdPeopleAlt />,
        id: 4,
    },
    {
        path: "/transaction",
        name: "Transactions",
        icon: <AiOutlineTransaction />,
        id: 5,
    },
];

function SideBar() {
    let activeStyle = {
        backgroundColor: "#d0e9e7",
        color: "#447695",
        borderRadius:"20px",
        boxShadow:"0px 3px 5px  #888888"
    };
    return (
        <div className="Side_bar">
            <div className="side_top">
                <div className="Dc_info">
                    <h1>MEC</h1>
                    <div className="image_containt">
                        <img src={image} />
                    </div>
                    <h2>Dr. Bassem El-Monla</h2>
                </div>
            </div>
            <div className="side_links">
                {links.map((ele) => {
                    return (
                        <NavLink
                        to={ele.path} className={"navlink"}
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                            <div className="each_link">
                                
                                {ele.icon} {ele.name}
                            </div>
                        </NavLink>
                    );
                })}
            </div>
            <div className="base_bar">
                <div className="logout">
                    <MdOutlineLogout />
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
