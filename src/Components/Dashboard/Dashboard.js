import React from "react";
import { auth } from "../Auth/Firebase-Auth";
import SidebarNav from './SidebarNav'

const Dashboard = () => {

  return (
    <div>
      <SidebarNav />
      <button onClick={() => { auth.signOut() }}>Sign out</button>
      <div className='main-page'>

      </div>
    </div>
  )
};
export default Dashboard;