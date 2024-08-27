import Nav from './nav and fot/navbar';
import Login from './admin/login';
import Folder from './folder/folder';
import Fdetails from './folder/folderdetails';
import FDedit from './folder/fdetailsedit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './folder/home';
import ResultsPage from './folder/users';
import Fileborrw from './filemovtrack/borrowingfile';
import Fbn from './filemovtrack/borrowingdetails';
import Fbs from './filemovtrack/fileSearch'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/n' element={<Nav />} />
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/folder' element={<Folder />} />
          <Route path='/fd/:userId' element={<Fdetails />} />
          <Route path="/u" element={<ResultsPage/>}/>
          <Route path="/fdedit" element={<FDedit/>}/>
          <Route path="/fb" element={<Fileborrw/>}/>
          <Route path="/fbn" element={<Fbn/>}/>
          <Route path='/fbs' element={<Fbs/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
