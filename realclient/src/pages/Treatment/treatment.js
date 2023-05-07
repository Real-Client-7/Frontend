import MUIDataTable from "mui-datatables";
import "../../pages/transaction/incom/incom.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Loader from "../../components/loader/loder";
import Swal from "sweetalert2";
import { Url } from "../../components/layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Treatment() {
  const URL = useContext(Url);
  const [Data, setData] = useState(null);
  const [DataById, setDataById] = useState({
    type: "",
    appointment: "",
  });
  const [DataPost, SetPostData] = useState({
    type: "",

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
        display: "none",
      },
    },
    {
      name: "type",
      label: "Type",
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
                      .get(`${URL}/treatments/${tableMeta.rowData[0]}`)
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
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#447695",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      axios
                        .delete(`${URL}/treatments/${tableMeta.rowData[0]}`)
                        .then((response) => {
                          toast.success("Treatment deleted successfully")

                          getData();
                        })
                        .catch((err) => {
                          console.log(err.message);
                        });
                    }
                  });
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
  console.log(Id);
  const getData = () => {
    axios
      .get(`${URL}/treatments/`)
      .then((response) => {
        console.log(response);
        setData(response.data.response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  console.log(DataById);
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
      .put(`${URL}/treatments/${Id}`, DataEdit)
      .then((res) => {
        console.log(res);
        toast.success("Patient updated successfully!")
        getData();
        console.log(res);
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

  if (!Data) return <Loader />;
  return (
    <div className="incomss">
      <div className="none">
        {/* for add expense */}
        {visibleAdd && (
          <form>
            <div className="head-form">
              <h2>Add Treatment</h2>
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
            <label htmlFor="type"> Type</label>
            <TextField
              type="text"
              name="type"
              required="required"
              onChange={handelChangePost}
            />
         

            <Button
              variant="outlined"
              onClick={() => {
                if (DataPost.type === "") {
                  Swal.fire({
                    title: "field is Empty !",
                    icon: "warning",
                    confirmButtonColor: "#447695",
                  });
                } else {
                  axios
                    .post(`${URL}/treatments/addTreatment`, DataPost)
                    .then((res) => {
                      console.log(res);
                      getData();

                      Swal.fire({
                        title: "Treatment created",
                        icon: "success",
                        iconColor: "#d0e9e7",
                        confirmButtonColor: "#447695",
                      })
                                      show();
                                      showAdd();
                                      showicon();
                      toast.success("Treatment added successfully!")
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
              <h2>Edit Treatment </h2>
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
            <label htmlFor="type"> Type</label>
            <TextField
              type="text"
              name="type"
              onChange={handelChangeEdit}
              defaultValue={DataById.type}
            />
      

            <Button variant="outlined" onClick={()=>{EditData();
             show();
             showEdit();
             showiconAdd();
             SetEditData(null)}}>
              Edit Treatment
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
                  + Add Treatment
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

export default Treatment;
