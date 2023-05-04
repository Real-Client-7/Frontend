import { Outlet } from 'react-router-dom';
import Header from './header/header';
import SideBar from './sidebar/sidebar'
import {useState,useContext} from  "react"
 import "../App.css"

function Layout({ children }) {
  const [expanded , setExpanded] = useState(false)
  const URL = "http://localhost:4600"
  return (
    <main className="App">
      <SideBar isCollaps ={setExpanded} Collaps = {expanded}/>
     
          <div  className={expanded?"right_side":"right_side-on-6"} >
              <div className='Header'>
            <Header />
              </div>
              <div style={{margin : "20px 20px 20px 20px" , height:"100%" ,backgroundColor:"#f6f6f6" , borderRadius:"20px"}}>
                <Url.Provider value={URL}>
                 {children}
                </Url.Provider>
              </div>
          </div>

    </main>
  );
}
export default Layout;