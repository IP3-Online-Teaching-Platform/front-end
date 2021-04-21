import React, { useContext } from "react";
import { UserContext } from "../../Providers/UserProvider";
import { auth } from "../Auth/Firebase-Auth";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TextChat from '../TextChat/TextChat';

const Dashboard = () => {
  const user = useContext(UserContext);

  let displayName = user.email
  if (auth.currentUser.displayName) {
    displayName = auth.currentUser.displayName
  } else {
    displayName = `${auth.currentUser.api.first_name} ${auth.currentUser.api.last_name}`
    auth.currentUser.updateProfile({ displayName: `${auth.currentUser.api.first_name} ${auth.currentUser.api.last_name}` })
  }

  return (
    <Tabs className="dashboard-body">
      <div className="sidenav">
        <div id="dropdownToggle" className="profile-dropdown noselect">
          <div className="profile-picture"></div>
          <div>{displayName}<i className="fa fa-caret-down profiledown-icon"></i>
            <div id="profileDropdown" className="profile-dropdown-cont">
              <a href="/settings">Settings</a>
              <a href="/logout">Log out</a>
            </div>
          </div>
        </div>

        <div className="sidenav-list">
          <TabList className="sidenav-list-inner no-bullets">
            <Tab className="sidenav-li-item no-bullets">
              <i className="far fa-calendar-alt sidenav-list-icon"></i>Calendar
              </Tab>
            <Tab className="sidenav-li-item no-bullets">
              <i className="fas fa-clipboard sidenav-list-icon"></i>Notes
              </Tab>
            <Tab className="sidenav-li-item no-bullets">
              <i className="fas fa-user-tie sidenav-list-icon"></i>Tutors
              </Tab>
            <Tab className="sidenav-li-item no-bullets">
              <i className="far fa-envelope sidenav-list-icon"></i>Inbox
              </Tab>
            <li className="sidenav-li-item no-bullets"><a href="https://connectedtutorvideochat.herokuapp.com/">
              <i className="far fa-envelope sidenav-list-icon"></i>Video Chat</a>
            </li>
          </TabList>
        </div>
        <div className="sidenav-interests">
          <p className="sidenav-interest-title">Interests</p>
          <div className="sidenav-interests-inner">
            <div className="sidenav-interests-item">Biology</div>
            <div className="sidenav-interests-item">Math</div>
            <div className="sidenav-interests-item">C#</div>
            <div className="sidenav-interests-item">HTML/CSS</div>
            <a className="sidenav-interests-icon" href="/addinterest"><i className="fas fa-plus"></i></a>
          </div>
        </div>
        <div className="header-logo-container">
          <div className="header-logo">
          </div>
          <a href="/" className="header-text">
            ConnectedTutor
        </a>
        </div>
        <button onClick={() => { auth.signOut() }}>Sign out</button>
      </div>
      <main className="dashboard-main-page">
        <TabPanel>
          Calendar
        </TabPanel>
        <TabPanel>
          Notes
        </TabPanel>
        <TabPanel>
          Tutors
        </TabPanel>
        <TabPanel className="tutors-container">
          <TextChat />
        </TabPanel>
      </main>
    </Tabs>

  )
};
export default Dashboard;