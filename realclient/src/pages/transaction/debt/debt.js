    import MUIDataTable from "mui-datatables";
    import "../incom/incom.css";
    import { useEffect, useState,useContext } from "react";
    import axios from "axios";
    import { TextField, Button,Select,MenuItem } from "@mui/material";
    import { AiFillEdit } from "react-icons/ai";
    import { MdDelete } from "react-icons/md";
    import Loader from "../../../components/loader/loder";
    import Swal from "sweetalert2"
    import { Url } from "../../../components/layout";


    function Debt() {
    const URL =useContext(Url)
    const [Data, setData] = useState(null);
    const [DataById, setDataById] = useState({
        patient: "",
        rest: "",
    
    });


    const getData = () => {
        axios.get(`${URL}/debt/getDebt`)
            .then((response) => {
            setData(response.data); 
            console.log(response.data)
            })
            .catch((err) => {
            console.log(err.message);
            });
        };
    
        // console.log(Data)
        useEffect(()=>{
        getData()
        },[])
    
    
    

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
          name: "first_name",
          label: "First Name",
        },
        {
          name: "last_name",
          label: "Last Name",
        },
        {
          name: "rest",
          label: "Rest",
        },
      ];
      


    if (!Data) return <Loader />;
    return (
        <div className="incomss">
        <div className="none">
        
    
        </div>
        <div className="income_table">
            <div className="table_mui">
            <MUIDataTable
                columns={columns}
                data={Data}
                options={options}
            
            />
            </div>
        </div>
        </div>
    );
    }

    export default Debt;
