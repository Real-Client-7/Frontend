import "../Appoitment/AppoitmentCard.css"
import axios from "axios";
import { useState, useEffect , useContext } from "react";
import { Url } from "../../layout";
import Loader from "../../loader/loader";

function AppointmentCard() {
const URL =useContext(Url)
const [Data , setData] = useState([])

const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const day = today.getDate().toString().padStart(2, '0');
const currentDate = `${year}-${month}-${day}`;

const filteredArray = Data.filter((item) => item.date.includes(currentDate));
const getData = ()=>{
    axios.get(`${URL}/appointment/`).then((res)=>{
        setData(res.data.response)
    })
}
 

console.log(Data)

useEffect(()=>{
    getData()
},[])

return ( 
    <>
    <div className="Appoitment_box" >
    <div className="viewAndNmbrAppoitment">
    <span> { <div> {filteredArray.length} </div>}  </span>
    </div>
    <div>
    <h2>Today Appoitment</h2>
    <p>increas 7% from last month</p>
    </div>
  </div>
    </> );
}

export default AppointmentCard;