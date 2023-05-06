import MUIDataTable from "mui-datatables";
import "../incom/incom.css";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { TextField, Button,Select,MenuItem } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Loader from "../../../components/loader/loder";
import Swal from "sweetalert2"
import { Url } from "../../../components/layout";


function Income() {
  const URL =useContext(Url)
  const [Data, setData] = useState(null);
  const[DataPatient ,setDataPatient] = useState(null)
  const [DataById, setDataById] = useState({
    Name: "",
    amount: "",
    createdAt:""
 
  });
  const [DataPost, SetPostData] = useState({
    Name: "",
    amount: "",
    createdAt:""

  });
  const [DataEdit, SetEditData] = useState(null);
  const [Id, setId] = useState();

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
  const [visibleEdit, isShowEdit] = useState(false);
  const [iconEdit, isShowIcon] = useState(true);
  const [iconAdd, isShowIconAdd] = useState(true);

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
  const showiconAdd = () => {
    iconAdd ? isShowIconAdd(false) : isShowIconAdd(true);
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
console.log(Id)
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
console.log(DataById)
  useEffect(() => {
    getData();
  }, []);

  const handelChangePost = (e) => {
    const value = e.target.value;
    SetPostData({
      ...DataPost,
      [e.target.name]: value,
    });
  };


  const EditData = () => {
    axios
      .put(`${URL}/expense/${Id}`, DataEdit)
      .then((res) => {
        console.log(res);
        getData();
      })
      .catch((err) => {
        console.log(err);
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
                                Swal.fire({
                                  title: 'field is Empty !',
                                  icon: 'warning',
                                  confirmButtonColor: '#447695', 
                                })
                              }else {
                                axios
                                .post(`${URL}/income/addIncome`, DataPost)
                                    .then((res) => {
                                      console.log(res);
                                      getData();
                                    })
                                    .catch((err) => {
                                      console.log(err.message);
                                    });
                                Swal.fire({
                                  title:'Income created',
                                  icon :"success",
                                  iconColor : "#d0e9e7",
                                  confirmButtonColor: '#447695',
                                })
                              }
                            }}
            >
              Submit
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
              iconAdd && (
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
        </div>
      </div>
    </div>
  );
}

export default Income;
