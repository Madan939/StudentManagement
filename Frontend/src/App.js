
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import MyRoute from './route/MyRoute';

function App() {
  const login = JSON.parse(localStorage.getItem("USER"));
  return (
    <>
      {login ? (
        <>
          {login.user.role === "Admin" ? (
            <div className='rowsidebar row'>
              <div className='col col-2 sidebar-container shadow'>
                <Sidebar />
              </div>
              <div className='col col-10 content-container'>
                <Header  />
                <MyRoute />
              </div>
            </div>
          ) : (
            <div className='full-height'>
              <Header className='header-container' />
              <div className='scrollable-content'>
                <MyRoute className='route-container'/>
              </div>
              
            </div>
          )}
        </>
      ) : (
       <><MyRoute/></>
      )}
    </>
  );
}

export default App;
