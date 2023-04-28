import MUIDataTable from "mui-datatables";
import "../incom/incom.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Loader from "../../../components/loader/loder";
import Swal from "sweetalert2"

function Income() {
    const [Data, setData] = useState(null);
    const [DataById, setDataById] = useState({
        description:"value",
        amount:"value",
        date:"0000-00-00",
    });
    const [DataPost, SetPostData] = useState({
        description: "",
        amount: "",
        date: "",
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
                                        axios
                                        .get(`http://localhost:4600/income/getIncomeById/${tableMeta.rowData[0]}`)
                                        .then((response) => {
                                            setDataById(response.data.data);
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
                                                        .delete(`http://localhost:4600/income/deleteIncome/${tableMeta.rowData[0]}`)
                                                        .then((response) => {
                                                            console.log(response.data.message);
                                                            getData();
                                                        })
                                                        .catch((err) => {
                                                            console.log(err.message);
                                                        });
                                            }
                                        })
                                }
                            }
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
            .get("http://localhost:4600/income/getIncome")
            .then((response) => {
                console.log(response)
                setData(response.data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const postData = () => {
        axios
            .post("http://localhost:4600/income/addIncome", DataPost)
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
            .put(`http://localhost:4600/income/updateIncome/${Id}`, DataEdit)
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


    const checkDataAndPost = () => {
        if (DataPost.description === "" || DataPost.amount === "" || DataPost.date === "") {
            Swal.fire({
                title: 'field is Empty !',
                icon: 'warning',
                confirmButtonColor: '#447695',
            })
        } else {
            postData()
            Swal.fire({
                title: 'Expense created',
                icon: "success",
                iconColor: "#d0e9e7",
                confirmButtonColor: '#447695',
            })
        }
    }

    if (!Data) return <Loader />;
    return (
        <div className="incomss">
            <div className="none">
                {/* for add expense */}
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
                        <label htmlFor="title"> Description</label>
                        <TextField
                            type="text"
                            name="description"
                            required="required"
                            onChange={handelChangePost}
                        />
                        <label htmlFor="amount"> Amount</label>
                        <TextField
                            type="number"
                            name="amount"
                            required="required"
                            onChange={handelChangePost}
                        />
                        <label htmlFor="date"> Date</label>
                        <TextField type="date" required="required" name="date" onChange={handelChangePost} />
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
                            <h2>Edit Income </h2>
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
                        <Button variant="outlined" onClick={EditData}>
                            Edit Income
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
