import MUIDataTable from "mui-datatables";
import "../incom/incom.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Loader from "../../../components/loader/loder";
import Swal from "sweetalert2"

function Expense() {
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

  const questionAlert = () => {
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
        handelDelete(Id);
      }
    })
}


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

  const handelDelete = (id) => {
    axios
      .delete(`http://localhost:4600/expense/${id}`)
      .then((response) => {
        console.log(response.data.message);
        getData();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getDataByid = (id) => {
    axios
      .get(`http://localhost:4600/expense/${id}`)
      .then((response) => {
        setDataById(response.data.response);
        console.log(response.data.response);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
                    setId(tableMeta.rowData[0]);
                    show();
                    showiconAdd();
                    showEdit();
                    getDataByid(tableMeta.rowData[0]);
                    
                  }}
                >
                  <AiFillEdit />
                </Button>
              )}
              <Button
                sx={{ height: "40px" }}
                onClick={() => {
                  setId(tableMeta.rowData[0]);
                  questionAlert()
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
      .get("http://localhost:4600/expense/")
      .then((response) => {
        setData(response.data.response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData();
    getDataByid();
  }, []);

  const postData = () => {
    axios
      .post("http://localhost:4600/expense/", DataPost)
      .then((res) => {
        console.log(res);
        getData();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handelChangePost = (e) => {
    const value = e.target.value;
    SetPostData({
      ...DataPost,
      [e.target.name]: value,
    });
  };


  const EditData = () => {
    axios
      .put(`http://localhost:4600/expense/${Id}`, DataEdit)
      .then((res) => {
        console.log(res);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelChangeEdit = (e) => {
    
    const value = e.target.value;
    SetEditData({
      ...DataEdit,
      [e.target.name]: value,
    });
  };


  const checkDataAndPost = () =>  {
    if (DataPost.description === "" || DataPost.amount=== "" || DataPost.date === ""){
      Swal.fire({
        title: 'field is Empty !',
        icon: 'warning',
        confirmButtonColor: '#447695', 
      })
    }else {
      postData()
      Swal.fire({
        title:'Expense created',
        icon :"success",
        iconColor : "#d0e9e7",
        confirmButtonColor: '#447695',
      })
    }
  }

  if (!Data && Id===undefined) return <Loader />;
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
                checkDataAndPost()
              }}
            >
              Submit
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
              placeholder={DataById.description}
            />
            <label htmlFor="amount"> Amount</label>
            <TextField type="number" name="amount" placeholder={DataById.amount} onChange={handelChangeEdit} />
            <label htmlFor="date"> Date</label>
            <TextField type="date" name="date" placeholder={DataById.date} onChange={handelChangeEdit} />
            <Button variant="outlined" onClick={EditData}>
              Edit Expense
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
                  + Add Expense
                </Button>
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Expense;
