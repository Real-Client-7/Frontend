
import './App.css';
import { Outlet } from 'react-router-dom';
import SideBar from './components/sidebar/sidebar';
import Header from './components/header/header';
import {createContext} from "react"

export const Url = createContext()

function App() {
  const URL = "http://localhost:4600"
  return (
    <div className="App">
 
      <SideBar/>
     
          <div className='right_side'>
              <div className='Header'>
            <Header/>
              </div>
              <div style={{margin : "20px 20px 20px 20px" , height:"100%" ,backgroundColor:"#f6f6f6" , borderRadius:"20px"}}>
                <Url.Provider value={URL}>
                <Outlet/>
                </Url.Provider>
              </div>
          </div>
    </div>
  );
}

export default App;
