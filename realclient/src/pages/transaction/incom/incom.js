import MUIDataTable from "mui-datatables";
import "../incom/incom.css"
import { useEffect, useState } from "react";
import axios from "axios"
import { TextField, Button } from "@mui/material";
import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import Loader from "../../../components/loader/loder";


function Incom() {

    const [Data, setData] = useState(null)

    const show = () => {
        var ele = document.querySelector(".none");
        ele.classList.toggle("form-add-income");

    }

    const [visibleAdd, isShowAdd] = useState(false)
    const [visibleEdit, isShowEdit] = useState(false)
    const [iconEdit , isShowIcon] = useState(true)
    const [iconAdd , isShowIconAdd] = useState(true)

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
        iconEdit?isShowIcon(false):isShowIcon(true)
    }
    const showiconAdd = () => {
        iconAdd?isShowIconAdd(false):isShowIconAdd(true)
    }
    


    const columns = [{
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
                    <>
                        {iconEdit && <Button sx={{ height: "40px" }} onClick={()=>{showEdit() ;show() ;showiconAdd()}} >
                            <AiFillEdit />
                        </Button>}
                        <Button sx={{ height: "40px" }} >
                            <MdDelete />
                        </Button>
                    </>
                );
            },
        },
    },
    ]

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
        rowsPerPageOptions:[5],
        loaded: true,

    }

    const getData = () => {
        axios.get("http://localhost:4600/income/getIncome").then((response) => {
            setData(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        getData()
    }, [])

    if (!Data)  return <Loader/>
        return (

            <div className="incomss">
                <div className="none">
                    {/* for add income */}
                    {visibleAdd &&
                        <form>
                        <div className="head-form">
                            <h2>Add Incom</h2>
                            <button onClick={() => { show(); showAdd();showicon()}}>x</button>
                        </div>
                        <label htmlFor="title"> Title</label>
                        <TextField />
                        <label htmlFor="amount"> Amount</label>
                        <TextField />
                        <label htmlFor="date"> Date</label>
                        <TextField type="date" />
                        <Button variant="outlined">Submit</Button>
                    </form>}
                    {/* for edit income */}
                    {visibleEdit && <form>
                        <div className="head-form">
                            <h2>Edit Incom</h2>
                            <button onClick={() => { show(); showEdit() ;showiconAdd()}}>x</button>
                        </div>
                        <label htmlFor="title"> Title</label>
                        <TextField />
                        <label htmlFor="amount"> Amount</label>
                        <TextField />
                        <label htmlFor="date"> Date</label>
                        <TextField type="date" />
                        <Button variant="outlined">Submit</Button>
                    </form>}
                </div>
                <div className="income_table">
                    <div className="table_mui">
                        <MUIDataTable columns={columns} data={Data} options={options} title={iconAdd&& <Button onClick={() => { show(); showAdd();showicon()}}>+ Add income</Button>} />
                    </div>
                </div>
            </div>
        );
    }


export default Incom;