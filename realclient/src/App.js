
import './App.css';
import { Outlet } from 'react-router-dom';
import SideBar from './components/sidebar/sidebar';
import Header from './components/header/header';
import {createContext, useState} from "react"

export const Url = createContext()


function App(props) {

  const [expanded , setExpanded] = useState(false)



  const URL = "http://localhost:4600"
  return (
    <div className="App">
 
      <SideBar isCollaps ={setExpanded} Collaps = {expanded}/>
     
          <div  className={expanded?"right_side":"right_side-on-6"} >
              <div className='Header'>
            <Header />
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
