import AppointmentCard from "../../components/Dashboard-Component/Appoitment/Appoitment_card";
import PatientBox from "../../components/Dashboard-Component/patient/patient";
import Sugary from "../../components/Dashboard-Component/surgery/surgery";
import "../Dashboard/dashboard.css";
import Calendar from "../../components/calendar/calendar.js";
import Chart from "../../components/Dashboard-Component/chart/chart";

function Dashboard() {
    return (
        <div className="Dashboard" >
            <div className="first-lineDashboard"> 
            <PatientBox />
            <AppointmentCard />
            <Sugary/>
            </div>
            <div className="seconde-line">
            <Calendar />
            <Chart/>
            </div>
        </div>
    );
}

export default Dashboard;
