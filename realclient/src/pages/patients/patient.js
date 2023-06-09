import MUIDataTable from "mui-datatables";
import "../transaction/incom/incom.css";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { TextField, Button ,Select ,MenuItem } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Loader from "../../components/loader/loder";
import Swal from "sweetalert2"
import { Url } from "../../components/layout";
import "./patient.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Patient() {
  const URL =useContext(Url)
  const [Data, setData] = useState(null);
  const [DataById, setDataById] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    occupation: "",
    address: "",
    referredBY: "",
    notes: "",
    medicalStatus: "",
  });
  const [DataPost, SetPostData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    occupation: "",
    address: "",
    referredBY: "",
    notes: "",
    medicalStatus: "",
  });
  const [DataEdit, SetEditData] = useState(null);
  const [Id, setId] = useState();

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
  const showEdit = () => {
    if (visibleEdit === false) {
      isShowEdit(true);
    } else {
      isShowEdit(false);
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
        display:"none"
      },
    },
    {
      name: "first_name",
      label: "First name",
    },
    {
      name: "middle_name",
      label: "Middle name",
    },
    {
      name: "last_name",
      label: "Last name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "mobile",
      label: "Mobile",
    },
    {
      name: "dob",
      label: "Birthday date",
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
    {
      name: "gender",
      label: "Gender",
    },
    {
      name: "maritalStatus",
      label: "Marital status",
    },
    {
      name: "occupation",
      label: "Occupation",
    },
    {
      name: "address",
      label: "Address",
    },
    {
      name: "referredBY",
      label: "Referred by",
    },
    {
      name: "notes",
      label: "Notes",
    },
    {
      name: "medicalStatus",
      label: "Medical status",
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ display: "flex" }}>
              {iconEdit && (
                <Button
                  sx={{ height: "40px" }}
                  onClick={() => {
                    toast.info('Loading...')
                    axios
                    .get(`${URL}/patient/get/${tableMeta.rowData[0]}`)
                    .then((response) => {
                      setDataById(response.data);
                      setId(tableMeta.rowData[0]);
                      show();
                      showiconAdd();
                      showEdit();
                    })
                    .catch((err) => {
                      console.log(err.message);
                    });
                  }}
                >
                  <AiFillEdit />
                </Button>
              )}
              <Button
                sx={{ height: "40px" }}
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#447695',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!' 
                  }).then((result) => {
                    if (result.isConfirmed) {
                      axios
                      .delete(`${URL}/patient/deletePatient/${tableMeta.rowData[0]}`)
                      .then((response) => {
                        console.log(response.data);
                        toast.success("Patient deleted successfully")
                        getData();
                      })
                      .catch((err) => {
                        console.log(err.message);
                      });
                    }
                  })
                }}
              >
                <MdDelete/>
              </Button>
            </div>
          );
        },
      },
    },
  ];
console.log(Id)
  const getData = () => {
    axios
      .get(`${URL}/patient/getAllPatients`)
      .then((response) => {
        console.log(response)
        setData(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
console.log(DataById)
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


  const EditData = () => {
    axios
      .put(`${URL}/patient/editPatient/${Id}`, DataEdit)
      .then((res) => {
        console.log(res);
        toast.success("Patient updated successfully!")
        getData();
      })
      .catch((err) => {
        console.log(err); 
        toast.error(`${err.message}`)
      });
  };

  const handelChangeEdit = (e) => {
    
    const value = e.target.value;
    SetEditData({
      ...DataEdit,
      [e.target.name]: value,
    });
  };

  if (!Data) return <Loader />;
  return (
    <div className="incomss">
      <div className="none">
        {/* for add patient */}
        {visibleAdd && (
          <form>
            <div className="head-form">
              <h2>Add Patient</h2>
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

            <div className="form_patient">
            <div className="input-lable">
            <label htmlFor="first_name"> First Name</label>
            <TextField
              type="text"
              name="first_name"
              required= "required"
              
              onChange={handelChangePost}
            />
            </div>
            <div className="input-lable">
            <label htmlFor="middle_name"> Middle Name</label>
            <TextField
              type="text"
              name="middle_name"
              required= "required"
              onChange={handelChangePost}
            />
            </div>
            <div className="input-lable">

            <label htmlFor="last_name"> Last name</label>
            <TextField type="text" required= "required" name="last_name" onChange={handelChangePost} />
            </div>

            <div className="input-lable">
            <label htmlFor="email"> Email</label>
            <TextField
              type="text"
              name="email"
              required= "required"
              onChange={handelChangePost}
            />
            </div>
            <div className="input-lable">
            <label htmlFor="mobile"> Mobile</label>
            <TextField
              type="number"
              name="mobile"
              required= "required"
              onChange={handelChangePost}
            />
            </div>
            <div className="input-lable">
            <label htmlFor="dob"> Birthday date</label>
            <TextField
              type="date"
              name="dob"
              required= "required"
              onChange={handelChangePost}
            />
            </div>

            <div className="input-lable">
            <label htmlFor="gender"> Gender</label>
            <Select
              name="gender"
              required= "required"
              onChange={handelChangePost}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            </div>
            <div className="input-lable">
            <label htmlFor="marirtalStatus"> Marital status</label>
            <Select
              type="text"
              name="maritalStatus"
              onChange={handelChangePost}
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Maried</MenuItem>
              <MenuItem value="Engaged">Engaged</MenuItem>
            </Select>
            </div>
            <div className="input-lable">
            <label htmlFor="occupation"> Occupation</label>
            <TextField
              type="text"
              name="occupation"
              required= "required"
              onChange={handelChangePost}
            />
            </div>
            <div className="input-lable">
            <label htmlFor="medicalStatus"> Medical status</label>
            <TextField
              type="text"
              name="medicalStatus"
              required= "required"
              onChange={handelChangePost}
            />
            </div>
            <div className="input-lable">
            <label htmlFor="refferredBY"> Refferred by</label>
            <TextField
              type="text"
              name="referredBY"
              required= "required"
              onChange={handelChangePost}
            />
            </div>
            <div className="input-lable">
            <label htmlFor="notes"> Notes</label>
            <TextField
              type="text"
              name="notes"
              required= "required"
              onChange={handelChangePost}
            />
            </div>
            </div>
            <div className="input-lable">
            <label htmlFor="address"> Address</label>
            <TextField
              type="text"
              name="address"
              required= "required"
              onChange={handelChangePost}
            />
            </div>

            <Button
              variant="outlined" 
              onClick={() => {
                              if (DataPost.first_name === "" || DataPost.last_name=== "" || DataPost.email === "" ||DataPost.mobile === "" ||DataPost.address === ""||DataPost.maritalStatus === ""||DataPost.dob === ""||DataPost.gender === "" || DataPost.address === ""){
                                toast.warning("All the fields are required!")

                              }else {
                                axios
                                .post(`${URL}/patient/addPatient`, DataPost)
                                    .then((res) => {
                                      console.log(res);
                                      getData();
                                      show();
                                      showAdd();
                                      showicon();
                                      toast.success("Patient added successfully!")


                                    })
                                    .catch((err) => {
                                      console.log(err.message);
                                      toast.error(`${err.message}`)
                                    });
                              }
                            }}
            >
              Create
            </Button>
          </form>
        )}
        {/* for edit patient */}
        {visibleEdit && (
          <form>
            <div className="head-form">
              <h2>Edit Patient </h2>
              <button
                onClick={() => {
                  show();
                  showEdit();
                  showiconAdd();
                  SetEditData(null)
                }}
              >
                x
              </button>
            </div>
            <div className="form_patient">
            <div className="input-lable">
            <label htmlFor="first_name"> First Name</label>
            <TextField
              type="text"
              name="first_name"
              defaultValue={DataById.first_name}
              onChange={handelChangeEdit}
            />
            </div>
            <div className="input-lable">
            <label htmlFor="middle_name"> Middle Name</label>
            <TextField
              type="text"
              name="middle_name"
              defaultValue={DataById.middle_name}
              onChange={handelChangeEdit}
            />
            </div>
            <div className="input-lable">

            <label htmlFor="last_name"> Last name</label>
            <TextField type="text" defaultValue={DataById.last_name} name="last_name" onChange={handelChangeEdit} />
            </div>

            <div className="input-lable">
            <label htmlFor="email"> Email</label>
            <TextField
              type="text"
              name="email"
              defaultValue={DataById.email}
              onChange={handelChangeEdit}
            />
            </div>
            <div className="input-lable">
            <label htmlFor="mobile"> Mobile</label>
            <TextField
              type="number"
              name="mobile"
              defaultValue={DataById.mobile}
              onChange={handelChangeEdit}
            />
            </div>
            <div className="input-lable">
            <label htmlFor="dob"> Birthday date</label>
            <TextField
              type="date"
              name="dob"
              defaultValue={DataById.dob}
              onChange={handelChangeEdit}
            />
            </div>
            <div className="input-lable">
            <label htmlFor="gender"> Gender</label>
            <Select
              name="gender"
              required= "required"
              defaultValue={DataById.gender}
              onChange={handelChangeEdit}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            </div>
            <div className="input-lable">
            <label htmlFor="materialStatus"> Material status</label>
            <Select
              type="text"
              name="maritalStatus"
              defaultValue={DataById.maritalStatus}
              onChange={handelChangeEdit}
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Maried</MenuItem>
              <MenuItem value="Engaged">Engaged</MenuItem>
            </Select>
            </div>
            <div className="input-lable">
            <label htmlFor="occupation"> Occupation</label>
            <TextField
              type="text"
              name="occupation"
              defaultValue={DataById.occupation}
              onChange={handelChangeEdit}
            />
            </div>
            <div className="input-lable">
            <label htmlFor="medicalStatus"> Medical status</label>
            <TextField
              type="text"
              name="medicalStatus"
              defaultValue={DataById.medicalStatus}
              onChange={handelChangeEdit}
            />
            </div>
            <div className="input-lable">
            <label htmlFor="refferredBY"> Refferred by</label>
            <TextField
              type="text"
              name="referredBY"
              defaultValue={DataById.referredBY}
              onChange={handelChangeEdit}
            />
            </div>
            <div className="input-lable">
            <label htmlFor="notes"> Notes</label>
            <TextField
              type="text"
              name="notes"
              defaultValue={DataById.notes}
              onChange={handelChangeEdit}
            />
            </div>
            </div>
            <div className="input-lable">
            <label htmlFor="address"> Address</label>
            <TextField
              type="text"
              name="address"
              defaultValue={DataById.address}
              onChange={handelChangeEdit}
            />
            </div>


            <Button variant="outlined" 
            onClick={()=>{EditData();
             show();
             showEdit();
             showiconAdd();
             SetEditData(null)}}>
              Edit Patient
            </Button>
          </form>
        )}
      </div>
      <div className="income_table" style={{height:"83vh"}} >
        <div className="table_mui" >
          <MUIDataTable
            columns={columns}
            data={Data}
            options={options}
            title={
              iconAdd && (
                <Button
                  onClick={() => {
                    toast.info('Loading...')
                    show();
                    showAdd();
                    showicon();
                  }}
                >
                  + Add Patient
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

export default Patient;