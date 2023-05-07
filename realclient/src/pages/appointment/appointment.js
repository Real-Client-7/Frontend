import MUIDataTable from "mui-datatables";
import ".././transaction/incom/incom.css";
import "../appointment/appointment.css"
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Loader from "../../components/loader/loder";
import Swal from "sweetalert2"
import { Url } from "../../components/layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Appointment() {

    const URL = useContext(Url)
    const [Data, setData] = useState(null);
    const [DataPatient, setDataPatient] = useState(null)
    const [DataTreatment, setDataTreatments] = useState(null)
    const [DataById, setDataById] = useState({
        patient: "",
        date: "",
        note: "",
        treatments: "",
        total: "",
        nbr: ''

    });

    const [DataPost, SetPostData] = useState({
        patient: "",
        date: "",
        note: "",
        treatments: "",
        total: "",
        nbr: ''

    });
    const [DataEdit, SetEditData] = useState();

    const [Id, setId] = useState(null);

    const show = () => {
        var ele = document.querySelector(".none");
        ele.classList.toggle("form-add-income");
    };

    const [visibleAdd, isShowAdd] = useState(false);
    const [visibleEdit, isShowEdit] = useState(false);
    const [iconEdit, isShowIcon] = useState(true);
    const [iconAdd, isShowIconAdd] = useState(true);

    const restDataPost = {
        patient: "",
        date: "",
        note: "",
        treatments: "",
        total: "",
        nbr: ''
    }

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
                display: "none"
            },
        },
        {
            name: "patient",
            label: "Patient",
            options: {
                customBodyRender: (value) => value ? `${value.first_name} ${value.last_name}` : "this Patient is deleted",
            }
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
            name: "treatments",
            label: "Treatment",
            options: {
                customBodyRender: (value) => value ? value.type : "dont have treatment",

            }
        },

        {
            name: "nbroftooth",
            label: "Tooth"
        },
        {
            name: "note",
            label: "Note",
        },
        {
            name: "total",
            lable: "Total"
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
                                            .get(`${URL}/appointment/getAppoitment/${tableMeta.rowData[0]}`)
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
                                        console.log(DataById)
                                    }}
                                >
                                    <AiFillEdit />
                                </Button>
                            )}
                            <Button
                                sx={{ height: "40px" }}
                                 onClick={() =>
                                    {
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
                                                .delete(`${URL}/appointment/deleteApointment/${tableMeta.rowData[0]}`)
                                                .then((response) => {
                                                    console.log(response.data.message);
                                                    toast.success("Appointment deleted successfully")
                                                    getData();

                                                })
                                                .catch((err) => {
                                                    toast.error(`${err.message}`)
                                                    console.log(err.message);
                                                });
                                        }
                                    })
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
    console.log(Id)
    const getData = () => {
        axios
            .get(`${URL}/appointment/`)
            .then((response) => {
                console.log(response)
                setData(response.data.response);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    const getDataPatient = () => {
        axios
            .get(`${URL}/patient/getAllPatients`)
            .then((response) => {
                setDataPatient(response.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    const getDataTreatments = () => {
        axios
            .get(`${URL}/treatments/`)
            .then((response) => {
                setDataTreatments(response.data.response);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    console.log(DataPatient)

    useEffect(() => {
        getData();
        getDataPatient()
        getDataTreatments()
    });

    const handelChangePost = (e) => {
        const value = e.target.value;
        SetPostData({
            ...DataPost,
            [e.target.name]: value,
        });
    };

    console.log(DataEdit)

    const EditData = () => {
        axios
            .put(`${URL}/appointment/update/${Id}`, DataEdit)
            .then((res) => {
                console.log(res);
                toast.success("Updated successful")
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
    console.log(DataPost)

    if (!Data) return <Loader />;
    return (
        <div className="incomss">
            <div className="none">
                {/* for add expense */}
                {visibleAdd && (
                    <form>
                        <div className="head-form">
                            <h2>Add Appointment</h2>
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
                            {DataPatient.map((ele) => {
                                return <MenuItem value={ele._id} >{`${ele.first_name} ${ele.last_name}`}</MenuItem>
                            })}
                        </Select>
                        <label htmlFor="treatment"> Treatment</label>
                        <Select
                            name="treatments"
                            required="required"
                            onChange={handelChangePost}
                        >
                            {DataTreatment.map((ele) => {
                                return <MenuItem value={ele._id} >{ele.type}</MenuItem>
                            })}

                        </Select>
                        <label htmlFor="note"> Note</label>
                        <TextField
                            type="text"
                            name="note"
                            required="required"
                            onChange={handelChangePost}
                        />

                        <label htmlFor="total"> Tooth</label>

                        <TextField
                            type="number"
                            name="nbroftooth"
                            required="required"
                            onChange={handelChangePost}
                            inputProps={{ min: "11", max: "48" }} />


                        <label htmlFor="total"> Total</label>
                        <TextField
                            type="number"
                            name="total"
                            required="required"
                            onChange={handelChangePost}
                        />

                        <div>

                        </div>
                        <div>

                        </div>
                        <label htmlFor="date"> Date</label>
                        <input type="datetime-local" required="required" name="date" onChange={handelChangePost} />
                        <Button
                            variant="outlined"
                            onClick={() => {
                                if (DataPost.patient === "" || DataPost.date === "" || DataPost.note === "" || DataPost.treatments === "") {

                                    toast.warning("All the fields are required!")

                                } else {
                                    axios
                                        .post(`${URL}/appointment/addAppoitment`, DataPost)
                                        .then((res) => {
                                            SetPostData(restDataPost)
                                            toast.success("Appointment added successfully!")
                                            getData();
                                            show();
                                            showAdd();
                                            showicon();
                                        })
                                        .catch((err) => {
                                            console.log(err.message);
                                            toast.success(`${err.message}`)
                                        });
                                }
                            }
                            }
                        >
                            Create
                        </Button>
                    </form>
                )}
                {/* for edit expense */}
                {visibleEdit && (
                    <form>
                        <div className="head-form">
                            <h2>Edit Appoitment </h2>
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
                        <label htmlFor="patient"> Patient</label>
                        <Select
                            name="patient"
                            required="required"
                            onChange={handelChangeEdit}
                        >
                            {DataPatient.map((ele) => {
                                return <MenuItem value={ele._id} >{`${ele.first_name} ${ele.last_name}`}</MenuItem>
                            })}
                        </Select>
                        <label htmlFor="treatment"> Treatment</label>
                        <Select
                            name="treatments"
                            required="required"
                            onChange={handelChangeEdit}
                        >
                            {DataTreatment.map((ele) => {
                                return <MenuItem value={ele._id} >{ele.type}</MenuItem>
                            })}
                        </Select>

                        <label htmlFor="note"> Note</label>
                        <TextField type="text" name="note" defaultValue={DataById.note} onChange={handelChangeEdit} />




                        <label htmlFor="total"> Tooth</label>

                        <TextField
                            type="number"
                            name="nbroftooth"
                            onChange={handelChangeEdit}
                            defaultValue={DataById.nbr}
                            inputProps={{ min: "11", max: "48" }} />
                        <label htmlFor="total"> Total</label>
                        <TextField
                            type="number"
                            name="total"
                            onChange={handelChangeEdit}
                            defaultValue={DataById.total}
                        />

                        <div>

                        </div>
                        <div>

                        </div>
                        <label htmlFor="date"> Date</label>
                        <input type="datetime-local" name="date" defaultValue={DataById.date} onChange={handelChangeEdit} />
                        <Button variant="outlined"
                            onClick={() => {
                                EditData();
                                show();
                                showEdit();
                                showiconAdd();
                                SetEditData(null)
                            }}>
                            Edit Appoitment
                        </Button>
                    </form>
                )}
            </div>
            <div className="income_table" style={{ height: "83vh" }}>
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
                                    + Add Appoitment
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

export default Appointment;
