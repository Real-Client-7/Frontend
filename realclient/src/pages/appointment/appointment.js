import MUIDataTable from "mui-datatables";
import "../appointment/appointment.css"
import { useEffect, useState } from "react";
import axios from "axios"
import { TextField, Button } from "@mui/material";
import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import Loader from "../../components/loader/loder.js";

function Appointment() {

    const [Data, setData] = useState(null)
    const [DataById ,setDataById]=useState()
    const [DataPost, SetPostData] = useState({
        description: "",
        amount: "",
        date: ""
    })
    const [DataEdit, SetEditData] = useState({
        description: "",
        amount: "",
        date: ""
    })
    const [Id , setId] = useState()


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

 
    console.log(Data)
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
            setId(id)
        },
    }
const handelDelete = (id)=> {

        axios.delete(`http://localhost:8001/expense/${id}`)
        .then((response) => { console.log(response.data.message);getData();})
        .catch((err)=>{console.log(err.message)})
  
}

    const getDataByid = () => {

        axios.get(`http://localhost:8001/expense/${Id}`).then((response) => {
            setDataById(response.data.response)
        }).catch((err) => {
            console.log(err.message)
        })
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
                        {iconEdit && <Button sx={{ height: "40px" }} onClick={() => { showEdit(); show(); showiconAdd() ; getDataByid() }} >
                            <AiFillEdit />
                        </Button>}
                        <Button sx={{ height: "40px" }} onClick={() => { handelDelete(tableMeta.rowData[0])}}>
                            <MdDelete />
                        </Button>
                    </div>
                );
            },
        },
    },
    ]
    
    const getData = () => {

        axios.get("http://localhost:8001/expense/").then((response) => {
            setData(response.data.response)
        }).catch((err) => {
            console.log(err.message)
        })
    }



    useEffect(() => {
        getData()
        
    },[])


    const postData = () => {
        axios.post("http://localhost:8001/expense/", DataPost).then((res) => {
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


    const EditData = () => {
        axios.put(`http://localhost:4600/expense/${Id}`, DataEdit).then((res) => {
            console.log(res)
            getData()
        }).catch((err) => {
            console.log(err.message)
        })
    }
    const handelChangeEdit = (e) => {

        const value = e.target.value;
        SetEditData({
            ...DataEdit,
            [e.target.name]: value,
        });
    }
    console.log(DataEdit)

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
                        <label htmlFor="title"> Description</label>
                        <TextField type="text" name="description" onChange={handelChangePost} required />
                        <label htmlFor="amount"> Amount</label>
                        <TextField type="number" name="amount" onChange={handelChangePost} required />
                        <label htmlFor="date"> Date</label>
                        <TextField type="date" name="date" onChange={handelChangePost}  required/>
                        <Button variant="outlined" onClick={() => { postData();}}>Submit</Button>
                    </form>}
                {/* for edit expense */}
                {visibleEdit && <form>
                    <div className="head-form">
                        <h2>Edit Expense </h2>
                        <button onClick={() => { show(); showEdit(); showiconAdd() }}>x</button>
                    </div>
                    <label htmlFor="title"> Describtion</label>
                    <TextField name="description" value={DataById.description} onChange={handelChangeEdit} />
                    <label htmlFor="amount"> Amount</label>
                    <TextField name="amount" value={DataById.amount} onChange={handelChangeEdit} />
                    <label htmlFor="date"> Date</label>
                    <TextField type="date" name="date" value={DataById.date} onChange={handelChangeEdit} />
                    <Button variant="outlined" onClick={EditData}>Edit Expense </Button>
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


export default Appointment;