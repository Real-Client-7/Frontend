import AppointmentCard from "../../components/Dashboard-Component/Appoitment/Appoitment_card";
import PatientBox from "../../components/Dashboard-Component/patient/patient";
import Sugary from "../../components/Dashboard-Component/surgery/surgery";
import "../Dashboard/dashboard.css";
function Dashboard() {
    return (
        <div className="Dashboard">
            <PatientBox />
            <AppointmentCard />
            <Sugary/>
        </div>
    );
}

export default Dashboard;
