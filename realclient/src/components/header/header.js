
import "../header/header.css"
import { IoMdNotifications } from "react-icons/io";
import { BsClock } from "react-icons/bs";

console.log(Date.now)

function Header () {
    return (  
    <div className="header"> 
        <div className="Not_Time">
            <div className="not" >
            <IoMdNotifications style={{color:"#447695"}}/>
            </div>
            <div className="time_date">
                <div className="clock">
                <BsClock style={{color:"#447695"}}/>
                </div>
                <div className="time">
                <span> 10:10 </span>
                <span> 7 april 2023 </span>
                </div>
            </div>
        </div>
    </div>);
}

export default Header;