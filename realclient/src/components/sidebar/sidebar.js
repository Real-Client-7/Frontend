import { NavLink } from "react-router-dom";
import "../sidebar/sidebar.css"
import { MdGroups2 } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { TbFileTime } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import {MdOutlineLogout} from "react-icons/md"
const links =[
    {
        path : "/dashboard",
        name : "Dashboard",
        icon : <MdSpaceDashboard/>
    },
    {
        path : "/patient",
        name : "Patients",
        icon : <MdGroups2/>
    },
    {
        path : "/appointment",
        name : "Appointments",
        icon : <TbFileTime/>
    },
    {
        path : "/assistant",
        name : "Assistants",
        icon : <MdPeopleAlt/>
    },
    {
        path : "/transaction",
        name : "Transactions",
        icon : <GrTransaction/>
    }
]

function SideBar() {
    return (
    <div className="Side_bar">
        <div className="side_top">
            <div className="Dc_info">
                <h1>MEC</h1>
                <div className="image_containt">
                <img src="https://pbs.twimg.com/media/FNUVXC2XEAUnjxm.jpg"/>
                </div>
                <h2>Dr. Bassem El-Monla</h2>
            </div>
        </div>
        <div className="side_links">
            {links.map((ele)=>{
                return <NavLink to={ele.path} className={"navlink"}><div className="each_link"> {ele.icon} {ele.name}</div></NavLink>
            })}
        </div>
        <div className="base_bar">
            <div className="logout">
            <MdOutlineLogout/>
            <span>Logout</span>
            </div>
        </div>
    </div> );
}

export default SideBar;