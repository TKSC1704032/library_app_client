import { BrowserRouter, Route, Routes } from "react-router-dom";
import Adminpage from "./components/Adminpage/adminpage";
import Adminrapper from "./components/Adminpage/adminrapper";
import AddBooks from "./components/Adminpage/component/addBooks";
import AddFine from "./components/Adminpage/component/addFine";
import AddTeacher from "./components/Adminpage/component/addTeacher";
import AdminNotification from "./components/Adminpage/component/adminNotification";
import DeleteBooks from "./components/Adminpage/component/deleteBooks";
import IssueRequest from "./components/Adminpage/component/issueRequest";
import ReIssueRequest from "./components/Adminpage/component/reissueRequest";
import ReturnBook from "./components/Adminpage/component/returnBook";
import StudentsInfo from "./components/Adminpage/component/studentInfo";
import BookDetails from "./components/Homepage/component/bookDetails";
import Contract from "./components/Homepage/component/contract";
import Issued from "./components/Homepage/component/issued";
import Notification from "./components/Homepage/component/notification";
import Profile from './components/Homepage/component/profile2';
import Rapper from "./components/Homepage/component/rapper";
import Reissue from "./components/Homepage/component/reissue";
import SemesterBook from "./components/Homepage/component/semesterBook";
import Showbooks from './components/Homepage/component/showbooks';
import Homepage from './components/Homepage/homepage';
import AdminLogin from "./components/Log in page/adminLogin";
import AuthRapper from "./components/Log in page/authRapper";
import ChangePasswordPage from "./components/Log in page/changePassword";
import Confirmationpage from "./components/Log in page/confirmationpage";
import ForgetPasswordPage from "./components/Log in page/fogetPassword";
import StudentLogin from "./components/Log in page/studentLogin";
import Studentsignup from "./components/Log in page/studentsignup";
import TeacherLogin from "./components/Log in page/teacherLogin";
import SebaHome from "./components/ResultStudentSection/Home/SebaHome";
import StudentHome from "./components/ResultStudentSection/StudentHome/StudentHome";
import StudentHomeRapper from "./components/ResultStudentSection/StudentHome/StudentHomeRapper";
import TeacherHome from "./components/ResultStudentSection/Teachers/Main/TeacherHome";
import Update from "./components/ResultStudentSection/Teachers/Main/Update";
import AdminProvider from "./contexts/adminContext";
import AuthProvider from "./contexts/authContext";
import TeacherProvider from "./contexts/teacherContext";
import AdminPrivateRouter from "./privateRouter/adminPrivateRouter";
import InvisibleAuthPage from './privateRouter/invisibleAuthPage';
import PrivateRouter from "./privateRouter/privateRouter";
import TeacherPrivateRouter from "./privateRouter/teacherPrivateRouter";
import './style/app.css';
function App() {
  return (
    <>
    <AdminProvider>
      <TeacherProvider>
    <AuthProvider>
    <BrowserRouter>
    <Routes>
    <Route path="/teacher-login/" element={ <AuthRapper><TeacherLogin/></AuthRapper>}/>
     
    <Route element={<TeacherPrivateRouter/>}>
        <Route path="/teacherHomePage/" element={<TeacherHome/>}/>
        <Route path="/teacherHomePage/updatesem/" element={<Update/>}/>
        <Route path="/teacherHomePage/" element={<TeacherHome/>}/>
        
        
        
    </Route>





    <Route path="/admin-login/" element={ <AuthRapper><AdminLogin/></AuthRapper>}/>

    <Route element={<AdminPrivateRouter/>}>
        <Route path="/admin/" element={<Adminpage/>}/>
        <Route path="/admin/notification" element={<Adminrapper> <AdminNotification/></Adminrapper>}/>
        <Route path="/admin/Students-Info" element={<Adminrapper> <StudentsInfo/></Adminrapper>}/>
        <Route path="/admin/Add%20Books" element={<Adminrapper> <AddBooks/></Adminrapper>}/>
        <Route path="/admin/Add%20Fine" element={<Adminrapper> <AddFine/></Adminrapper>}/>
        <Route path="/admin/Delete%20Books/" element={<Adminrapper> <DeleteBooks/></Adminrapper>}/>
        <Route path="/admin/Issue%20Books/" element={<Adminrapper> <IssueRequest/></Adminrapper>}/>
        
        <Route path="/admin/ReturnBook/" element={<Adminrapper> <ReturnBook/></Adminrapper>}/>

        <Route path="/admin/Re-Issue%20Books/" element={<Adminrapper> <ReIssueRequest/></Adminrapper>}/>
         
        <Route path="/admin/Create%20Teacher%20Account/" element={<Adminrapper> <AddTeacher/></Adminrapper>}/>
        
        
    </Route>
    
    <Route path="/seba-login/" element={ <SebaHome/>}/>
    
        
        <Route element={<PrivateRouter/>}>

        <Route path="/" element={ <StudentHome/>}/>


        <Route path="/library/" element={ <Homepage/>}>
        <Route path="/library/" element={ <Showbooks/>}/>
        </Route>

        <Route path="/book-details/:id/" element={ <Rapper><BookDetails/></Rapper>}/>
        <Route path="/notification/" element={ <StudentHomeRapper><Notification/></StudentHomeRapper>}/>
        
        <Route path="/Re-Issue-Books/" element={ <Rapper><Reissue/></Rapper>}/>
        <Route path="/Issued%20Books/" element={ <Rapper><Issued/></Rapper>}/>
        <Route path="/profile/" element={ <StudentHomeRapper ><Profile/></StudentHomeRapper>}/>
        <Route path="/books/semester/:sem/" element={ <Rapper><SemesterBook/></Rapper>}/>

        </Route>
        <Route path="/ContactUs/" element={ <StudentHomeRapper><Contract/></StudentHomeRapper>}/>
        <Route element={<InvisibleAuthPage/>}>
        <Route path="/login/" element={ <AuthRapper><StudentLogin/></AuthRapper>}/>
        <Route path="/login/forget-password/" element={ <AuthRapper sendCode={true}><ForgetPasswordPage/></AuthRapper>}/>
        <Route path="/login/forget-password/password_reset/:id/:token/" element={ <AuthRapper sendCode={true}><ChangePasswordPage/></AuthRapper>}/>
        <Route path="/signup/" element={ <AuthRapper><Studentsignup/></AuthRapper>}/>
        <Route path="/verify/" element={ <AuthRapper sendCode={true} ><Confirmationpage/></AuthRapper>}/>
        </Route>
      </Routes>  
      </BrowserRouter> 
      </AuthProvider>
      </TeacherProvider>
      </AdminProvider>
    
    </>
  );
}

export default App;
