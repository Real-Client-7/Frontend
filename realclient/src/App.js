
import './App.css';
import { Outlet } from 'react-router-dom';
import SideBar from './components/sidebar/sidebar';
import Header from './components/header/header';

function App() {
  return (
    <div className="App">
      <SideBar/>
      <div className='right_side'>
      <Header/>
      <div style={{margin : "20px 20px 20px 20px" , height:"100%"}}>
      <Outlet/>
      </div>
      </div>
    </div>
  );
}

export default App;
