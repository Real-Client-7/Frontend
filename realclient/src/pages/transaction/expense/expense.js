import MUIDataTable from "mui-datatables";
import "../incom/incom.css";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Loader from "../../../components/loader/loder";
import Swal from "sweetalert2"
import { Url } from "../../../components/layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Expense() {
  const URL =useContext(Url)
  const [Data, setData] = useState(null);
  const [DataById, setDataById] = useState({
    description: "",
    amount: "",
    date: "",
  });
  const [DataPost, SetPostData] = useState({
    description: "",
    amount: "",
    date: "",
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
      name: "description",
      label: "Description",
    },
    {
      name: "amount",
      label: "Amount",
    },
    {
      name: "date",
      label: "Date",
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
                    .get(`${URL}/expense/${tableMeta.rowData[0]}`)
                    .then((response) => {
                      setDataById(response.data.response);
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
                      .delete(`${URL}/expense/${tableMeta.rowData[0]}`)
                      .then((response) => {
                        console.log(response.data.message);
                        toast.success("Deleted expense successful")
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
      .get(`${URL}/expense/`)
      .then((response) => {
        setData(response.data.response);
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
      .put(`${URL}/expense/${Id}`, DataEdit)
      .then((res) => {
        console.log(res);
        toast.success("Updated expense successful")
        getData();
        
      })
      .catch((err) => {
        console.log(err);
        toast.success(`${err.message}`)
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
        {/* for add expense */}
        {visibleAdd && (
          <form>
            <div className="head-form">
              <h2>Add Expense</h2>
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
            <label htmlFor="title"> Description</label>
            <TextField
              type="text"
              name="description"
              required= "required"
              onChange={handelChangePost}
            />
            <label htmlFor="amount"> Amount</label>
            <TextField
              type="number"
              name="amount"
              required= "required"
              onChange={handelChangePost}
            />
            <label htmlFor="date"> Date</label>
            <TextField type="date" required= "required" name="date" onChange={handelChangePost} />
            <Button
              variant="outlined" 
              onClick={() => {
                              if (DataPost.description === "" || DataPost.amount=== "" || DataPost.date === ""){
                                toast.warning("All the fields are required!")

                              }else {
                                axios
                                .post(`${URL}/expense/`, DataPost)
                                    .then((res) => {
                                      console.log(res);
                                      show();
                                      showAdd();
                                      showicon();
                                      getData();
                                      toast.success("Expense added successfully!")
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
        {/* for edit expense */}
        {visibleEdit && (
          <form>
            <div className="head-form">
              <h2>Edit Expense </h2>
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
            <label htmlFor="title"> Description</label>
            <TextField
              type="text"
              name="description"
              onChange={handelChangeEdit}
              defaultValue={DataById.description}
            />
            <label htmlFor="amount"> Amount</label>
            <TextField type="number" name="amount" defaultValue={DataById.amount} onChange={handelChangeEdit} />
            <label htmlFor="date"> Date</label>
            <TextField type="date" name="date" defaultValue={DataById.date} onChange={handelChangeEdit} />
            <Button variant="outlined"
  onClick={()=>{EditData();
    show();
    showEdit();
    showiconAdd();
    SetEditData(null)}}>              Edit Expense
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
                    toast.info('Loading...')
                    show();
                    showAdd();
                    showicon();
                  }}
                >
                  + Add Expense
                </Button>
              )
            }
          />
        <ToastContainer />

        </div>
      </div>
    </div>
  );
}

export default Expense;
