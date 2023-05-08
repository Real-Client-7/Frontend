import MUIDataTable from "mui-datatables";
import "../incom/incom.css";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { TextField, Button,Select,MenuItem } from "@mui/material";

import Loader from "../../../components/loader/loder";

import { Url } from "../../../components/layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Income() {
  const URL =useContext(Url)
  const [Data, setData] = useState();
  const[DataPatient ,setDataPatient] = useState(null)

  const [DataPost, SetPostData] = useState({
    Name: "",
    amount: "",
    createdAt:""

  });


  const getDataPatient = () => {
    axios
        .get(`${URL}/patient/getAllPatients`)
        .then((response) => {
            setDataPatient(response.data);
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err.message);
        });
};

  const show = () => {
    var ele = document.querySelector(".none");
    ele.classList.toggle("form-add-income");
  };

  const [visibleAdd, isShowAdd] = useState(false);

  const [iconEdit, isShowIcon] = useState(true);


  const showAdd = () => {
    if (visibleAdd === false) {
      isShowAdd(true);
    } else {
      isShowAdd(false);
    }
  };


  const showicon = () => {
    iconEdit ? isShowIcon(false) : isShowIcon(true);
  };


  const options = {
    filterType: "checkbox",
    responsive: "simple",
    selectableRows: "none",
    search: true,
    searchPlaceholder: "Search for Income",
    download: true,
    print: true,
    pagination: true,
    rowsPerPage: 5,
    loaded: true,
    rowsPerPageOptions: [5], // this to specifique rows in page
  };
  const columns = [
    {
      name: "_id",
      label: " ",
      options: {
        display: "none",
      },
    },
       {
      name: "patient",
      label: "First Name",
      options: {
        customBodyRender: (value) => `${value.first_name} ` ,
    }},
    {
      name: "patient",
      label: "Last Name",
      options: {
        customBodyRender: (value) => `${value.last_name}` ,
    }},
    {
      name: "amount",
      label: "Amount"   ,
    },
    {
      name: "createdAt",
      label: "Paid at",
      options: {
        customBodyRender: (value) => {
          const date = new Date(value);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
          return formattedDate;
        },
      },
    },
    
  
  ];

const getData = () => {
  axios.get(`${URL}/income/getIncome`)
    .then((response) => {
      setData(response.data.data);
      console.log(response.data.data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

console.log(Data)
useEffect(()=>{
  getData()
  getDataPatient()
},[])

  useEffect(() => {
    getData();
  },[]);

  const handelChangePost = (e) => {
    const value = e.target.value;
    SetPostData({
      ...DataPost,
      [e.target.name]: value,
    });
  };



  if (!Data) return <Loader />;
  return (
    <div className="incomss">
      <div className="none">
        {/* for add Income */}
        {visibleAdd && (
          <form>
            <div className="head-form">
              <h2>Add Income</h2>
              <button
                onClick={() => {
                  show();
                  showAdd();
                  showicon();
                }}
              >
                x
              </button>
            </div>
            <label htmlFor="patient"> Patient</label>
                        <Select
                            name="patient"
                            required="required"
                            onChange={handelChangePost}
                        >
                            {DataPatient.map((ele)=>{
                                return <MenuItem value={ele._id} >{`${ele.first_name} ${ele.last_name}`}</MenuItem>
                            })}
                        </Select>
            <label htmlFor="amount"> Amount</label>
            <TextField
              type="number"
              name="amount"
              required= "required"    
              onChange={handelChangePost}
            />
            <Button
              variant="outlined" 
              onClick={() => {
                              if (DataPost.patient === "" || DataPost.amount=== ""){
                                toast.warning("All the fields are required!")

                              }else {
                                axios
                                .post(`${URL}/income/addIncome`, DataPost)
                                    .then((res) => {
                                      console.log(res);
                                      getData();
                                      show();
                                      showAdd();
                                      showicon();
                                      toast.success("Income added successfully!")
                                    })
                                    .catch((err) => {
                                      console.log(err.message);
                                    });
                              }
                            }}
            >
              Create
            </Button>
          </form>
        )}
 
      </div>
      <div className="income_table">
        <div className="table_mui">
          <MUIDataTable
            columns={columns}
            data={Data}
            options={options}
            title={
              (
                <Button
                  onClick={() => {
                    show();
                    showAdd();
                    showicon();
                  }}
                >
                  + Add Income
                </Button>
              )
            }
          />
                    <ToastContainer/>

        </div>
      </div>
    </div>
  );
}

export default Income;
