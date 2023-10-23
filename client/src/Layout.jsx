import LandingPage from "./pages/LandingPage";
import TodoApp from "./pages/TodoApp";
import ErrorPage from "./pages/ErrorPage";
import RootBoundary from "./pages/RootBoundary";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import Login from "./components/No Auth Components/Login";
import Signup from "./components/No Auth Components/Signup";

import Home from "./components/No Auth Components/Home";
import {useAuth } from "./contexts/AuthContext";
import Profile, {  UserInfo } from "./components/profile/Profile";
import {EmailEditForm, NameEditForm, PasswordEditForm, } from "./components/profile/EditForms"
import AppPage from "./pages/AppPage";
const host = "http://localhost:3000";





export default function Layout() {
  const {user, setUser} = useAuth();

  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={!user?<LandingPage />: <Navigate to={"/app"} replace={true}/> }   errorElement={<ErrorPage />}>
          <Route path="" element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/app" element={user?<AppPage />: <Navigate to={"/login"} replace={true}/> } errorElement={<ErrorPage />}>
          <Route path="" element={<TodoApp/>} />    
          <Route path="profile" element={<Profile/>} >
            <Route path="" element={<UserInfo/>}/>
            <Route path="resetpassword" element={<PasswordEditForm/>}/>
            <Route path="editname" element={<NameEditForm/>}/>
            <Route path="editemail" element={<EmailEditForm/>}/>
           
          </Route>    
        </Route>

        

        
      </>
    )
  );



  return (

    <RouterProvider router={router} />

  );
}

