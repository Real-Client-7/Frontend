import MUIDataTable from "mui-datatables";
import "../incom/incom.css";
import { useEffect, useState ,useContext } from "react";
import axios from "axios";
import Loader from "../../../components/loader/loder";
import { Url } from "../../../App";

function Income() {

    const URL =useContext(Url)

    const [Data , setData]=useState(null)

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

    const getData = ()=>{
        axios.get(`${URL}/appointment/`).then((response)=>{
            setData(response.data.response)
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    console.log(Data)
    useEffect(()=>{
        getData()
    },[])


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
            label: "Description",
            options: {
                customBodyRender: (value) => `bill of ${value.first_name} ${value.last_name}` ,
            }},
            {
                name:'paid',
                label:'Paid'
            },
        // {
        // name: "bill",
        // label: "Total",
        // options: {
        //     customBodyRender: (value) => value.total
        // }},
        {
            name:"date",
            label:"Date"
        }
    ]


if(!Data) return <Loader/>
return(
            <div className="income_table">
                <div className="table_mui">
                    <MUIDataTable
                        columns={columns}
                        data={Data.filter((ele)=>{
                            return ele.paid 
                        })}
                        options={options}
                        title={<>Income</>}
                    />
                </div>
            </div>
        
    );
}

export default Income;
