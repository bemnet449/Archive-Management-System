import Nav from './nav and fot/navbar';
import Login from './admin/login';
import Signup from './admin/signup';
import Folder from './folder/folder';
import Fdetails from './folder/folderdetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage1 from './folder/homeout';
import Homepage from './folder/home';
import ResultsPage from './folder/users';
import FdEdit from './folder/fdEdit'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/s' element={<Signup />} />
          <Route path='/n' element={<Nav />} />
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<HomePage1 />} />
          <Route path='/folder' element={<Folder />} />
          <Route path='/fd/:userId' element={<Fdetails />} />
          <Route path="/u" element={<ResultsPage/>}/>
          <Route path='/results' element={<Homepage />}/>
          <Route path='/fdedit' element={<FdEdit/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
