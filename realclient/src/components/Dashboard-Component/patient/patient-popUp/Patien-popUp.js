import { useEffect } from "react";
import "../patient.css";
import { Input } from "@mui/material";
import { useState } from "react";
import {ImEye} from "react-icons/im"

function PatientPopUp(props) {
    const [name, setName] = useState("");

    const handelChange = (e) => {
        setName(e.target.value);
    };
    console.log(name);

    const filteredArray = props.Data.filter((item) => {
        const condi1 = item.first_name.includes(name.trim());
        const condi2 = item.last_name.includes(name.trim());
        const condi3 = item.middle_name.includes(name.trim()); 
        const condi4 = item.gender.includes(name.trim());   
        const condi5 = item.address.includes(name.trim()); 
        return condi1 || condi2 || condi3 || condi4 || condi5  });


    return (
        <div className="patiensPopUp">
            <div className="container-patients">
                <span className="button-patient" onClick={props.Toggel}>
                    x
                </span>
                <div className="patients-title">
                    <h2>Patiens</h2>
                    <Input
                        placeholder="Shearch for patient"
                        onChange={handelChange}
                        className="input-Patient"
                    />
                </div>
                <div className="all-patients" >
                    <p className="resulte">Ptient result : {filteredArray.length}</p>
                    <div className="each-patient">
                        { filteredArray.map((ele) => {
                            if(filteredArray){
                            return (
                                
                                <div className="one-patient" key={ele._id}>
                                    <div className="patient-one">
                                        <div className="info-patient">
                                            <div className="head-ofCard">
                                            <h3>{`${ele.first_name } ${ele.middle_name} ${ele.last_name}`}</h3>
                                            </div>
                                            <p>
                                                {" "}
                                                <span>Join at :</span> { `${ele.created_at}`.split('T')[0]}{" "}
                                            </p>
                                            <div className="info">
                                                <p>
                                                    {" "}
                                                    <span>gender :</span> {ele.gender}
                                                </p>
                                                <p>
                                                    {" "}
                                                    <span>email :</span> {ele.email}{" "}
                                                </p>
                                                <p>
                                                    {" "}
                                                    <span>mobile : </span> {ele.mobile}
                                                </p>
                                                <p>
                                                    {" "}
                                                    <span> date birtday : </span>
                                                    {ele.dob.split('T')[0]}
                                                </p>
                                                <p>
                                                    {" "}
                                                    <span> address :</span> {ele.address}
                                                </p>
                                                <p>
                                                    {" "}
                                                    <span>status :</span> {ele.maritalStatus}{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                            }else {
                                return <div> Patient Not Found</div>
                            }
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientPopUp;

