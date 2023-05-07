import { Routes, Route } from 'react-router-dom'
import Appointment from "../src/pages/appointment/appointment"
import Assistant from "../src/pages/Assistant/assistant"
import Dashboard from "../src/pages/Dashboard/dashboard"
import Transaction from "../src/pages/transaction/transaction"
import Login from "../src/pages/login/logins"
import Patient from "../src/pages/patients/patient"
import Treatment from './pages/Treatment/treatment'
import RequireAuth from './components/RequireAuth'
function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="Login" element={<Login />} />
      {/* protect routes */}
      <Route  path="/" element={<RequireAuth />}>
          <Route path="Appointment" element={<Appointment />} />
          <Route path="Admins" element={<Assistant />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Patient" element={<Patient />} />
          <Route path="Treatment" element={<Treatment />} />
          <Route path="Transaction" element={<Transaction />} />
      </Route>
    </Routes>
  )
}
export default App;