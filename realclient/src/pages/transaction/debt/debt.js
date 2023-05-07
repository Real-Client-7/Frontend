    import MUIDataTable from "mui-datatables";
    import "../incom/incom.css";
    import { useEffect, useState,useContext } from "react";
    import axios from "axios";

    import Loader from "../../../components/loader/loder";

    import { Url } from "../../../components/layout";


    function Debt() {
    const URL =useContext(Url)
    const [Data, setData] = useState(null);



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
        })
    
    
    







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
