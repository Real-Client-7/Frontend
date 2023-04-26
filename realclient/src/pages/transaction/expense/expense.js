import MUIDataTable from "mui-datatables";
import "../incom/incom.css"
import { useEffect, useState } from "react";
import axios from "axios"
import { TextField, Button } from "@mui/material";
import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import Loader from "../../../components/loader/loder";

function Expense() {

    const [Data, setData] = useState(null)
    const [DataPost, SetPostData] = useState({
        description: "",
        amount: "",
        date: ""
    })


    const show = () => {
        var ele = document.querySelector(".none");
        ele.classList.toggle("form-add-income");

    }

    const [visibleAdd, isShowAdd] = useState(false)
    const [visibleEdit, isShowEdit] = useState(false)
    const [iconEdit, isShowIcon] = useState(true)
    const [iconAdd, isShowIconAdd] = useState(true)


    const showAdd = () => {
        if (visibleAdd === false) {
            isShowAdd(true)
        } else {
            isShowAdd(false)
        }
    }
    const showEdit = () => {
        if (visibleEdit === false) {
            isShowEdit(true)
        } else {
            isShowEdit(false)
        }
    }

    const showicon = () => {
        iconEdit ? isShowIcon(false) : isShowIcon(true)
    }
    const showiconAdd = () => {
        iconAdd ? isShowIconAdd(false) : isShowIconAdd(true)
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
        // jumpToPage:false,
        rowsPerPageOptions:[5], // this to specifique rows in page
        onRowClick: (rowData, rowMeta) => {
            const id = rowData[0]; // Assuming that the ID column is the first column
            handelDelete(id);
        },
    }

    const handelDelete =  (id) => {
        axios.delete(`http://localhost:4600/expense/${id}`)
        .then((response) => { console.log(response.data.message);getData();})
        .catch((err)=>{console.log(err.message)})
    }


    const columns = [{
        name:"_id",
        label:" ",
        options:{
            display:"none"
        }
    },
        {
        name: "description",
        label: "Description"
    },
    {
        name: "amount",
        label: "Amount"
    }, {
        name: "date",
        label: "Date"
    }, {
        name: "actions",
        label: "Actions",
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <div style={{ display: "flex" }}>
                        {iconEdit && <Button sx={{ height: "40px" }} onClick={() => { showEdit(); show(); showiconAdd() }} >
                            <AiFillEdit />
                        </Button>}
                        <Button sx={{ height: "40px" }} onClick={() => { handelDelete()}}>
                            <MdDelete />
                        </Button>
                    </div>
                );
            },
        },
    },
    ]
    
    const getData = () => {

        axios.get("http://localhost:4600/expense/").then((response) => {
            setData(response.data.response)
        }).catch((err) => {
            console.log(err.message)
        })

    }

    useEffect(() => {
        getData()
    }, [])


    const postData = () => {
        axios.post("http://localhost:4600/expense/", DataPost).then((res) => {
            console.log(res)
            getData()

        }).catch((err) => {
            console.log(err.message)
        })
    }

    const handelChangePost = (e) => {

        const value = e.target.value;
        SetPostData({
            ...DataPost,
            [e.target.name]: value,
        });
    }

    if (!Data) return <Loader />
    return (

        <div className="incomss">
            <div className="none">
                {/* for add expense */}
                {visibleAdd &&
                    <form>
                        <div className="head-form">
                            <h2>Add Expense</h2>
                            <button onClick={() => { show(); showAdd(); showicon() }}>x</button>
                        </div>
                        <label htmlFor="title"> Describtion</label>
                        <TextField type="text" name="description" onChange={handelChangePost} />
                        <label htmlFor="amount"> Amount</label>
                        <TextField type="number" name="amount" onChange={handelChangePost} />
                        <label htmlFor="date"> Date</label>
                        <TextField type="date" name="date" onChange={handelChangePost} />
                        <Button variant="outlined" onClick={() => { postData(); }}>Submit</Button>
                    </form>}
                {/* for edit expense */}
                {visibleEdit && <form>
                    <div className="head-form">
                        <h2>Edit Expense</h2>
                        <button onClick={() => { show(); showEdit(); showiconAdd() }}>x</button>
                    </div>
                    <label htmlFor="title"> Describtion</label>
                    <TextField name="description" />
                    <label htmlFor="amount"> Amount</label>
                    <TextField name="amount" />
                    <label htmlFor="date"> Date</label>
                    <TextField type="date" name="date" />
                    <Button variant="outlined">Submit</Button>
                </form>}
            </div>
            <div className="income_table">
                <div className="table_mui">
                    <MUIDataTable columns={columns} data={Data} options={options} title={iconAdd && <Button onClick={() => { show(); showAdd(); showicon() }}>+ Add Expense</Button>} />
                </div>
            </div>
        </div>
    );
}


export default Expense;