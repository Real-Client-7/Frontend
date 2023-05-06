import { NavLink } from "react-router-dom";
import "../sidebar/sidebar.css";
import { MdGroups2 } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { TbFileTime } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import {BsFillArrowRightCircleFill, BsWindowSidebar} from "react-icons/bs"
import {BsFillArrowLeftCircleFill} from "react-icons/bs"
import image from "../image/dc-Bassam.jpeg"
import Assitant from "../image/Assitant.jpeg"
import { useState } from "react";
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
        path: "/treatment",
        name: "Treatment",
        icon: <MdGroups2 />,
        id: 3,
    },
    {
        path: "/appointment",
        name: "Appointments",
        icon: <TbFileTime />,
        id: 4,
    },
    {
        path: "/assistant",
        name: "Assistants",
        icon: <MdPeopleAlt />,
        id: 5,
    },
    {
        path: "/transaction",
        name: "Transactions",
        icon: <AiOutlineTransaction />,
        id: 6,
    },
];



const linksAssitant = [
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
        path: "/transaction",
        name: "Transactions",
        icon: <AiOutlineTransaction />,
        id: 4,
    },
];


function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("super-admin");
  window.location.href = "/login";
}

setTimeout(function() {
    localStorage.removeItem("token");
    localStorage.removeItem("super-admin");
    window.location.href = "/login";

  }, 8 * 60 * 60 * 1000);

  //1 * 60  * 1000)

function SideBar(props) {


   

    const iscollaps = ()=>{
        props.isCollaps(!props.Collaps)
    }

    let activeStyle = {
        backgroundColor: "#d0e9e7",
        color: "#447695",
        borderRadius:"20px",
        boxShadow:"0px 3px 5px  #888888"
    };
    // const hedear = ["Dashboard" , "Patients" , "Appoitments" , "Transaction"]
    const [title , setTitle] = useState("")
    const [show , setShow] = useState(true)
    const [iconBtn ,seticoneBTn]=useState(<BsFillArrowLeftCircleFill/>)
    const [width ,setwidth] = useState(true)

    let IsSuper = localStorage.getItem("super-admin")

    function sideCollaps(){
        let element = document.querySelector(".Side_bar")
            element.classList.toggle("close-side")
            let element1 = document.querySelector(".side_links")
            element1.classList.toggle("size-side-link")
    }
    

    function isVisible(){
        if(show === true || iconBtn === <BsFillArrowLeftCircleFill/>){
            setShow(false)
            seticoneBTn(<BsFillArrowRightCircleFill/>)
        }else{
            setShow(true)
            seticoneBTn(<BsFillArrowLeftCircleFill/>)
        }
    }
   useEffect(()=>{if (window.innerWidth < 600) {
    setwidth(false)
  } else {
  }},[])
        
      
    return (
        <div className="Side_bar">
            <button onClick={()=>{sideCollaps();isVisible();iscollaps()}} className="arrow-btn">{iconBtn}</button>
            <div className="title-Side">
                <div>
                    {title}
                </div>
            </div>
            <div className="side_top">
            {show &&<div className="Dc_info">
                    <h1>MEC</h1>
                    <div className="image_containt">
                        <img src={IsSuper === "true" ? image:Assitant} alt="Dc-Bassem" />
                    </div>
                    <h2>{IsSuper==="true"?"Dr. Bassem El-Monla":"Assistant"}</h2>
                </div>}
            </div>
            <div className="side_links">
                {(IsSuper==="true" ? links:linksAssitant).map((ele) => {
                    return (
                        <NavLink
                        to={ele.path} className={"navlink"} key={ele.id}
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        onClick={()=>{setTitle(ele.name)}}
                        >
                            <div className="each_link">
                                {width&&<>{ele.icon}</>} {show&&<>{ele.name }</>}
                            </div>
                        </NavLink>
                    );
                })}
            </div>
            <div className="base_bar">
            <button className="logout" onClick={handleLogout}>
                                    <MdOutlineLogout />
                    {show && <span>Logout</span>}
                </button>
            </div>
        </div> 
    );
}

export default SideBar;
