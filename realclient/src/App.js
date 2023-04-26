import {Routes , Route} from 'react-router-dom'

import Appointment from "../src/pages/appointment/appointment"
import Assistant from "../src/pages/Assistant/assistant"
import Dashboard from "../src/pages/Dashboard/dashboard"
import Transaction from "../src/pages/transaction/transaction"
import Patient from "../src/pages/patient/patient"
import Login from "../src/pages/login/logins"
import Layout from "../src/components/layout"
import RequireAuth from './components/RequireAuth'
function App(){
  return (
   <Routes>
  
    {/* public routes */}
    <Route path="Login" element={<Login/>} /> 

{/* protect routes */}

<Route element={<RequireAuth/>}>
<Route path="/" element={<Layout/>}>
<Route path="Appointment" element={<Appointment/>} /> 
<Route path="Assistant" element={<Assistant/>} /> 
<Route path="Dashboard" element={<Dashboard/>} /> 
<Route path="Transaction" element={<Transaction/>} /> 
<Route path="Patient" element={<Patient/>} /> 
</Route> 
</Route> 
  </Routes>
  )
}
export default App;