import { useState } from "react";
import "../transaction/transaction.css"
import Debt from "./debt/debt";
import Expenses from "./expense/expense";
import Income from "./incom/incom";





function Transaction() {
    const [valueSelect , setValueSelect] = useState("Income")
    const [page , setPage] = useState(<Income/>)

    const handelChange =(e)=>{
        setValueSelect(e.target.value)
    }

    const switchBetweenPge = ()=>{
        if (valueSelect === "Income"){
            setPage(<Income/>)
        }else if (valueSelect === "Debt"){
            setPage(<Debt/>)
        }
        else if (valueSelect === "Expenses"){
            setPage(<Expenses/>)
        }
    }

    return ( 
    <div className="transaction">
        <div className="heder-of-page">
            <div className="heder-tools">
                    <span>{valueSelect}</span>
                    <select name="transaction" onClick={switchBetweenPge} onChange={handelChange}>
                        <option value="Income"  >Income</option>
                        <option  value="Expenses" > Expenses</option>
                        <option value="Debt">Debt</option>
                    </select>
            </div>
        </div>
        <div className="tabels-transaction">
            {page}
        </div>
        
    </div> );
    
}


export default Transaction;