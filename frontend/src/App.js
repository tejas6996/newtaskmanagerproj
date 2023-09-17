import React from "react";
import {Route,Routes} from "react-router-dom";
import Home from "./Components/auth/Home/Home";
import Layout from './Components/layout'
import DashLayout from './Components/DashLayout'
import UsersList from "./Components/features/users/UsersList";
import register from "./Components/auth/register/register"; //vaic
import Login from "./Components/auth/login/Login";
import EditUser from "./Components/features/users/EditUser";
import NewUserForm from "./Components/features/users/NewUserForm";
import Prefetch from "./Components/auth/Prefetch";
import Tasks from "./Components/features/tasks/Tasks";
import PersistLogin from "./Components/auth/login/PersistLogin";
import { ROLES } from './Components/config/roles'

import EditTask from "./Components/features/tasks/EditTask";
import NewTask from "./Components/features/tasks/NewTask";
import RequireAuth from "./Components/auth/RequireAuth";
import TaskList from "./Components/features/tasks/TaskList";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Layout/>}>
       {/*  <Route index element={<Public />} /> */}
        <Route path="login" Component={Login}/>

     <Route element={<PersistLogin/>}>
      <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
        <Route element={<Prefetch/>}>
        <Route path="dash" element={<DashLayout />}>

          <Route path="home" Component={Home } />
          
          <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
          <Route path="users">
            
            <Route index element={<UsersList/>}/>
            <Route path=":id" element={<EditUser/>}/>
            <Route path="new" element={<NewUserForm/>}/>

          </Route>
          </Route>
{/* //vaic */}
          {/* <Route path="tasks" Component={Tasks}> */}
<Route path="tasks">
          <Route index element={<TaskList />} />
          <Route path=":id" element={<EditTask />} />
          <Route path="new" element={<NewTask />} />

         </Route>
          
          </Route>{/*dash*/}
          </Route>
          </Route>
        </Route>
      </Route>
      {/* //changed */}
      <Route path="register" Component={register}/> 
      
    </Routes> 
  
  );
}

export default App;
