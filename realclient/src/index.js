// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { BrowserRouter, Routes ,Route } from 'react-router-dom'; 
// import Appointment from "../src/pages/appointment/appointment"
// import Assistant from "../src/pages/Assistant/assistant"
// import Dashboard from "../src/pages/Dashboard/dashboard"
// import Transaction from "../src/pages/transaction/transaction"
// import Patient from "../src/pages/patient/patient"
// import Login from "../src/pages/login/logins"

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//     <Routes>
//       <Route path='/login' element={<Login/>}></Route>
//       <Route path = '/' element ={<App/>}>
//       <Route path='/appointment' element={<Appointment/>}></Route>
//       <Route path='/assistant' element={<Assistant/>}></Route>
//       <Route path='/dashboard' element={<Dashboard/>}></Route>
//       <Route path='/transaction' element={<Transaction/>}></Route>
//       <Route path='/patient' element={<Patient/>}></Route>
//       </Route>
//     </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

 

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
