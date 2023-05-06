import "../Appoitment/AppoitmentCard.css"
import axios from "axios";
import { useState, useEffect , useContext } from "react";
import { Url } from "../../layout";
import Loader from "../../loader/loader";

function Sugary() {
const URL =useContext(Url)
const [Data , setData] = useState(null)



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
    <span> {!Data?<Loader/> : Data.length} </span>
    </div>
    <div>
    <h2>Total surgeries</h2>
    <p></p>
    </div>
  </div>
    </> );
}

export default Sugary;