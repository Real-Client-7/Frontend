import { useState, useContext } from "react";
import "../chart/chart.css";
import axios from "axios";
import { Url } from "../../../components/layout";
import { useEffect } from "react";
function Chart() {
    const URL = useContext(Url);
    const [DataIncome, setDataIncome] = useState([]);
    const [DataExpense , SetDataExpense] = useState ([])


    const date = new Date()
    let year = date.getFullYear()
    let DataincomeFilter = DataIncome.filter((ele)=> ele.updatedAt.includes(year))
    let sumOfincome = DataincomeFilter.reduce((acc, ele) => acc + ele.amount, 0);

    let DataExpenseFilter = DataExpense.filter((ele)=> ele.date.includes(year))
    let sumOfExpense = DataExpenseFilter.reduce((acc, ele) => acc + ele.amount, 0);

    let profit = sumOfincome - sumOfExpense

    const getDataIncome = () => {
        axios
            .get(`${URL}/income/getIncome`)
            .then((response) => {
                setDataIncome(response.data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const getDataExpense = () => {
        axios
            .get(`${URL}/expense/`)
            .then((response) => {
                SetDataExpense(response.data.response);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        getDataIncome();
        getDataExpense()
    },[]);

  
    return (
        
        <div className="Chart">
            
            <div className="chart-content">
                <div className="data-chart">
                    <div className="data-bar">
                        <p style={{ marginTop: 0 }}>Profit This year {year} :</p>
                        <div style={{ width: `${profit/50}px` }}> {profit}$ </div>
                    </div>
                    <div className="data-bar">
                        <p>Income This year {year} :</p>
                        <div style={{ width: `${sumOfincome/50}px` }}>{sumOfincome}$ </div>
                    </div>
                    <div className="data-bar">
                        <p>Expense This year {year} :</p>
                        <div style={{ width: `${sumOfExpense/30}px`  }}>  {sumOfExpense}$</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chart;
