import React, { useContext } from "react";
import { UserContext } from "../../Providers/UserProvider";
import { auth } from "../Auth/Firebase-Auth";

const SidebarNav = () => {
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
            <div className="header-logo-container">
                <div className="header-logo">
                </div>
                <a href="/" className="header-text">ConnectedTutor</a>
            </div>
            <script type="text/javascript" src="/script.js"></script>
            <div className="sidenav">
                <div id="dropdownToggle" className="profile-dropdown noselect">
                    <div className="profile-picture"></div>
                    <div>{displayName}<i className="fa fa-caret-down profiledown-icon"></i></div>
                    <div id="profileDropdown" className="profile-dropdown-cont">
                        <a href="/settings">Settings</a>
                        <a href="/logout">Log out</a>
                    </div>
                </div>
            </div>

            <div className="sidenav-list">
                <ul className="sidenav-list-inner no-bullets">
                    <li className="sidenav-li-item no-bullets">
                        <a href="/calendar"><i className="far fa-calendar-alt sidenav-list-icon"></i>Calendar</a>
                    </li>
                    <li className="sidenav-li-item no-bullets">
                        <a href="/notes"><i className="fas fa-clipboard sidenav-list-icon"></i>Notes</a>
                    </li>
                    <li className="sidenav-li-item no-bullets">
                        <a href="/findtutors"><i className="fas fa-user-tie sidenav-list-icon"></i>Tutors</a>
                    </li>
                    <li className="sidenav-li-item no-bullets">
                        <a href="/inbox"><i className="far fa-envelope sidenav-list-icon"></i>Inbox</a>
                    </li>
                    <li className="sidenav-li-item no-bullets">
                        <a href="/chat"><i className="far fa-envelope sidenav-list-icon"></i>Chat</a>
                    </li>
                </ul>
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
        </div>
    )
}

export default SidebarNav;