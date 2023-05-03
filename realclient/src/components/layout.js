import { Outlet } from 'react-router-dom';
import Header from './header/header';
import SideBar from './sidebar/sidebar'
import "../App.css"

function Layout({ children }) {
  return (
    <main className="App">
      <SideBar />
      <div className='right_side'>
        <Header />
        <div style={{ margin: "20px 20px 20px 20px", height: "100%" }}>
          {children}
        </div>
      </div>

    </main>
  );
}
export default Layout;
