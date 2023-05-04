import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import "./assistant.css";

function Admins() {
  const [Data, setData] = useState(null);
  const [DataById, setDataById] = useState({
    username: "",
    password: "",
    isSuperAdmin: "",
  });
  const [DataPost, SetPostData] = useState({
    username: "",
    password: "",
    isSuperAdmin: "",
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
    rowsPerPageOptions: [5], 
    onRowClick: (rowData, rowMeta) => {
     
    },
  };

  const handelDelete = (id) => {
    axios
      .delete(`http://localhost:4600/admin/${id}`)
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
      .get(`http://localhost:4600/admin/${id}`)
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
        display: "none",
      },
    },
    {
      name: "username",
      label: "Username",
    },
    {
      name: "password",
      label: "Password",
    },
    {
      name: "isSuperAdmin",
      label: "IsSuperAdmin",
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
                  handelDelete(tableMeta.rowData[0]);
                }}
              >
                <MdDelete />
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const getData = () => {
    axios
      .get("http://localhost:4600/admin/")
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
      .post("http://localhost:4600/admin/add", DataPost)
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
      .put(`http://localhost:4600/admin/${Id}`, DataEdit)
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
  console.log(Data);

  if (!Data) return "Loadind";
  return (
    <div className="incomss">
      <div className="none">
        {visibleAdd && (
          <form>
            <div className="head-form">
              <h2>Add Admins</h2>
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
            <label htmlFor="title"> Username</label>
            <TextField
              type="text"
              name="username"
              onChange={handelChangePost}
            />
            <label htmlFor="amount"> Password</label>
            <TextField
              type="number"
              name="password"
              onChange={handelChangePost}
            />
            <label htmlFor="date"> IsSuperAdmin</label>
            <TextField type="boolean" name="isSuperAdmin" onChange={handelChangePost} />
            <Button
              variant="outlined"
              onClick={() => {
                postData();
              }}
            >
              Submit
            </Button>
          </form>
        )}
        {visibleEdit && (
          <form>
            <div className="head-form">
              <h2>Edit Admins </h2>
              <button
                onClick={() => {
                  show();
                  showEdit();
                  showiconAdd();
                }}
              >
                x
              </button>
            </div>
            <label htmlFor="title"> Username</label>
            <TextField
              type="text"
              name="description"
              onChange={handelChangeEdit}
            />
            <label htmlFor="amount"> Password</label>
            <TextField
              type="number"
              name="amount"
              onChange={handelChangeEdit}
            />
            <label htmlFor="date"> IsSuperAdmin</label>
            <TextField type="date" name="date" onChange={handelChangeEdit} />
            <Button variant="outlined" onClick={EditData}>
              Edit Admins
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
                  + Add Admins
                </Button>
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Admins;
