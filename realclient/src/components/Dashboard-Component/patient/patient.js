import "../patient/patient.css"
import PatientsPopUb from "../patient/patient-popUp/Patien-popUp"
import {useState ,useEffect,useContext} from "react"
import axios from "axios"
import { Url } from "../../../App";
import {ImEye} from "react-icons/im"
import Loader from "../../loader/loader";

function PatienBox() {
    const URL =useContext(Url)
    const [Data , setData] = useState(null)
    const [visible , setVisible] = useState(false)

    const Toggel = ()=>{
        setVisible (!visible)
    }

    const getDataPatient = ()=> {

        axios.get(`${URL}/patient/getAllPatients`).then((response)=>{
            setData(response.data)
        })
    }

    useEffect(()=>{
        getDataPatient()
    },[])


  return( 
    <>
    <div className="Patient_box">
      <div className="viewAndNmbr">
      <span> {!Data?<Loader/> : Data.length} </span>
      <button onClick={Toggel}><ImEye/></button>
      </div>
      <div>
      <h2>Total patient</h2>
      <p>increas 7% from last month</p>
      </div>
    </div>
    {visible&&<PatientsPopUb Toggel = {Toggel} Data={Data} getDataPatient ={getDataPatient}/>}
  </>
  );

}

export default PatienBox;