import React, { useContext } from "react";
import { UserContext } from "../../Providers/UserProvider";
import { auth } from "../Auth/Firebase-Auth";

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
    <div>
      <div class="sidenav">
        <div id="dropdownToggle" class="profile-dropdown noselect">
          <div class="profile-picture"></div>
          <div>{displayName}<i class="fa fa-caret-down profiledown-icon"></i></div>
          <div id="profileDropdown" class="profile-dropdown-cont">
            <a href="/settings">Settings</a>
            <a href="/logout">Log out</a>
          </div>
        </div>
      </div>

      <div class="sidenav-list">
        <ul class="sidenav-list-inner no-bullets">
          <li class="sidenav-li-item no-bullets">
            <a href="/calendar"><i class="far fa-calendar-alt sidenav-list-icon"></i>Calendar</a>
          </li>
          <li class="sidenav-li-item no-bullets">
            <a href="/notes"><i class="fas fa-clipboard sidenav-list-icon"></i>Notes</a>
          </li>
          <li class="sidenav-li-item no-bullets">
            <a href="/findtutors"><i class="fas fa-user-tie sidenav-list-icon"></i>Tutors</a>
          </li>
          <li class="sidenav-li-item no-bullets">
            <a href="/inbox"><i class="far fa-envelope sidenav-list-icon"></i>Inbox</a>
          </li>
        </ul>
      </div>
      <div class="sidenav-interests">
        <p class="sidenav-interest-title">Interests</p>
        <div class="sidenav-interests-inner">
          <div class="sidenav-interests-item">Biology</div>
          <div class="sidenav-interests-item">Math</div>
          <div class="sidenav-interests-item">C#</div>
          <div class="sidenav-interests-item">HTML/CSS</div>
          <a class="sidenav-interests-icon" href="/addinterest"><i class="fas fa-plus"></i></a>
        </div>
      </div>

      <div class="header-logo-container">
        <div class="header-logo">
        </div>
        <a href="/" class="header-text">
          ConnectedTutor
        </a>
      </div>

      <button onClick={() => { auth.signOut() }}>Sign out</button>

      <script type="text/javascript" src="/script.js"></script>

    </div>
  )
};
export default Dashboard;