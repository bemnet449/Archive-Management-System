import Nav from './nav and fot/navbar';
import Dashboard from './components/dashboard';
import Login from './admin/login';
import Folder from './folder/folder';
import Fdetails from './folder/folderdetails';
import FDedit from './folder/fdetailsedit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FolderPage from './folder/home';
import ResultsPage from './folder/users';
import Fileborrw from './filemovtrack/borrowingfile';
import Fbn from './filemovtrack/borrowingdetails';
import Fbs from './filemovtrack/fileSearch';
import FileReturn from './filemovtrack/fileReturn';
import Lsearch from './letters/lettersearch';
import Lnsearch from './letters/lnamesearch';
import LetterForm from './letters/letterform';
import Scandoc from './scan doc/scandocform';
import Scandet from './scan doc/scandetail';
import SdS from './scan doc/scandetshow';
import Case from './lookupmang/case';
import ShowCD from './lookupmang/showdetail';
import Dropd from './nav and fot/drop';
import Decision from './lookupmang/decision';
import ShowD from './lookupmang/showDes';
import RoomNum from './lookupmang/roomnum';
import RoomDetails from './lookupmang/roomdetails';
import ShelfDetails from './lookupmang/shelfdetails';
import ShelfNum from './lookupmang/shelfnum';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/n' element={<Nav />} />
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Dashboard/>} />
          <Route path='/fullNameSearchResults' element={<FolderPage />} />
          <Route path='/file-management' element={<Folder />} />
          <Route path='/folderDetails/:userId' element={<Fdetails />} />
          <Route path="/fileNoSearchResults" element={<ResultsPage/>}/>
          <Route path="/folderEdit" element={<FDedit/>}/>
          <Route path="/file-tracking" element={<Fileborrw/>}/>
          <Route path="/fbn" element={<Fbn/>}/>
          <Route path='/file-borrowed' element={<Fbs/>} />
          <Route path='/file-movement-edit' element={<FileReturn/>} />
          <Route path='/correspondence' element={<LetterForm/>} />
          <Route path='/letter-search' element={<Lsearch/>} />
          <Route path='/lettern-search' element={<Lnsearch/>} />
          <Route path='/scanned-documents' element={<Scandoc/>} />
          <Route path='/scansearch' element={<Scandet/>} />
          <Route path='/sds' element={<SdS/>} />
          <Route path='/case' element={<Case/>} />
          <Route path='/caseshow' element={<ShowCD/>} />
          <Route path='/decision' element={<Decision/>} />
          <Route path='/decisionshow' element={<ShowD/>} />
          <Route path='/d' element={<Dropd/>} />
          <Route path='/roomnumber' element={<RoomNum/>} />
          <Route path='/rdetail' element={<RoomDetails/>} />
          <Route path='/sdetail' element={<ShelfDetails/>} />
          <Route path='/shelfnumber' element={<ShelfNum/>} />

          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
