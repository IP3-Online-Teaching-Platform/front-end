import React, { useContext, useState } from "react";
import { UserContext } from "../../Providers/UserProvider";
import { auth, db } from "../Auth/Firebase-Auth";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TextChat from '../TextChat/TextChat';
import TutorSearch from '../TutorSearch/TutorSearch'
import { getStudent, getTutor } from '../Auth/API';
import MakePayment from '../Payment/MakePayment';

const Dashboard = () => {
  const user = useContext(UserContext);

  const [displayInterests, setDisplayInterests] = useState(false);
  const [interests, setInterests] = useState('');
  const [interestUpdater, setInterestUpdater] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const [userType, setUserType] = useState('');

  const loadInterests = async () => {

    let userData = undefined;
    let userType = undefined;

    userData = await getStudent()
      .catch(err => console.log(err))
    userType = 'student';

    if (!userData) {
      userData = await getTutor()
        .catch(err => console.log(err));
      userType = 'tutor';
    }

    setUserType(userType);

    const studentModuleRef = db.collection(`${userType}s`).doc(auth.currentUser.uid);
    const studentModules = await studentModuleRef.get();
    if (studentModules.exists) {
      const subjects = studentModules.data();
      if (subjects.modules) {
        let subjectDisplay = (
          <>
            {subjects.modules.map(subject => (
              <div className="sidenav-interests-item">{subject}</div>
            ))}
          </>
        )
        auth.currentUser.subjects = subjects.modules;
        setInterests(subjectDisplay);
      }
    }
  }

  const handleSignOut = (event) => {
    event.preventDefault();
    auth.signOut().then(() => {
      window.location.replace('/');
    })
  }

  const displayInterestUpdater = (event) => {
    if (event) event.preventDefault();
    if (displayInterests) {
      setInterestUpdater('');
      setDisplayInterests(false);
    } else {
      let updaterHTML = generateInterestUpdaterHTML();
      setInterestUpdater(updaterHTML);
      setDisplayInterests(true);
    }
  }

  if (pageLoading) {
    setPageLoading(false);
    if (!auth.currentUser.subjects) {
      loadInterests();
    }
  }

  let displayName = user.email
  if (auth.currentUser.displayName) {
    displayName = auth.currentUser.displayName
  } else {
    displayName = `${auth.currentUser.api.first_name} ${auth.currentUser.api.last_name}`
    auth.currentUser.updateProfile({ displayName: `${auth.currentUser.api.first_name} ${auth.currentUser.api.last_name}` })
  }

  const generateInterestUpdaterHTML = () => {
    return (
      <div className="update-interests-container">

        <input type="checkbox" id="subject-math" name="subject-math" value="math" onChange={(event) => handleSetMath(event)} defaultChecked={auth.currentUser.subjects && auth.currentUser.subjects.includes('Math') ? true : false} />
        <label htmlFor="subject-math">Math</label><br />
        <input type="checkbox" id="subject-physics" name="subject-physics" value="physics" onChange={(event) => handleSetPhysics(event)} defaultChecked={auth.currentUser.subjects && auth.currentUser.subjects.includes('Physics') ? true : false} />
        <label htmlFor="subject-physics">Physics</label><br />
        <input type="checkbox" id="subject-chemistry" name="subject-chemistry" value="chemistry" onChange={(event) => handleSetChemistry(event)} defaultChecked={auth.currentUser.subjects && auth.currentUser.subjects.includes('Chemistry') ? true : false} />
        <label htmlFor="subject-chemistry">Chemistry</label><br />
        <input type="checkbox" id="subject-biology" name="subject-biology" value="biology" onChange={(event) => handleSetBiology(event)} defaultChecked={auth.currentUser.subjects && auth.currentUser.subjects.includes('Biology') ? true : false} />
        <label htmlFor="subject-biology">Biology</label><br />
        <input type="checkbox" id="subject-computing" name="subject-computing" value="computing" onChange={(event) => handleSetComputing(event)} defaultChecked={auth.currentUser.subjects && auth.currentUser.subjects.includes('Computing') ? true : false} />
        <label htmlFor="subject-computing">Computer Science</label><br />
        <input type="checkbox" id="subject-english" name="subject-english" value="english" onChange={(event) => handleSetEnglish(event)} defaultChecked={auth.currentUser.subjects && auth.currentUser.subjects.includes('English') ? true : false} />
        <label htmlFor="subject-english">English</label><br />

        <button onClick={() => handleCloseUpdater()}>Close</button>
      </div >
    )
  }

  const handleCloseUpdater = () => {
    db.collection(`${userType}s`).doc(auth.currentUser.uid).update({ modules: auth.currentUser.subjects })
      .then(() => {

        let subjectDisplay = (
          <>
            {auth.currentUser.subjects.map(subject => (
              <div className="sidenav-interests-item">{subject}</div>
            ))}
          </>
        )
        setInterests(subjectDisplay);
      }).catch(() => {
        db.collection(`${userType}s`).doc(auth.currentUser.uid).set({ modules: auth.currentUser.subjects })
          .then(() => {

            let subjectDisplay = (
              <>
                {auth.currentUser.subjects.map(subject => (
                  <div className="sidenav-interests-item">{subject}</div>
                ))}
              </>
            )
            setInterests(subjectDisplay);
          })
      })
    setInterestUpdater('');
    setDisplayInterests(false);
  }

  const handleSetMath = (event) => {
    if (!auth.currentUser.subjects) {
      auth.currentUser.subjects = ['Math']
    } else if (auth.currentUser.subjects.includes('Math')) {
      auth.currentUser.subjects.splice(auth.currentUser.subjects.indexOf('Math'), 1)
    } else {
      auth.currentUser.subjects.push('Math')
    }
  }

  const handleSetPhysics = (event) => {
    if (!auth.currentUser.subjects) {
      auth.currentUser.subjects = ['Physics']
    } else if (auth.currentUser.subjects.includes('Physics')) {
      auth.currentUser.subjects.splice(auth.currentUser.subjects.indexOf('Physics'), 1)
    } else {
      auth.currentUser.subjects.push('Physics')
    }
  }

  const handleSetChemistry = (event) => {
    if (!auth.currentUser.subjects) {
      auth.currentUser.subjects = ['Chemistry']
    } else if (auth.currentUser.subjects.includes('Chemistry')) {
      auth.currentUser.subjects.splice(auth.currentUser.subjects.indexOf('Chemistry'), 1)
    } else {
      auth.currentUser.subjects.push('Chemistry')
    }
  }

  const handleSetBiology = (event) => {
    if (!auth.currentUser.subjects) {
      auth.currentUser.subjects = ['Biology']
    } else if (auth.currentUser.subjects.includes('Biology')) {
      auth.currentUser.subjects.splice(auth.currentUser.subjects.indexOf('Biology'), 1)
    } else {
      auth.currentUser.subjects.push('Biology')
    }
  }

  const handleSetComputing = (event) => {
    if (!auth.currentUser.subjects) {
      auth.currentUser.subjects = ['Computing']
    } else if (auth.currentUser.subjects.includes('Computing')) {
      auth.currentUser.subjects.splice(auth.currentUser.subjects.indexOf('Computing'), 1)
    } else {
      auth.currentUser.subjects.push('Computing')
    }
  }

  const handleSetEnglish = (event) => {
    if (!auth.currentUser.subjects) {
      auth.currentUser.subjects = ['English']
    } else if (auth.currentUser.subjects.includes('English')) {
      auth.currentUser.subjects.splice(auth.currentUser.subjects.indexOf('English'), 1)
    } else {
      auth.currentUser.subjects.push('English')
    }
  }

  return (
    <Tabs className="dashboard-body">
      <div className="sidenav">
        <div id="dropdownToggle" className="profile-dropdown noselect">
          <div className="profile-picture"></div>
          <div>{displayName}</div>
        </div>

        <div className="sidenav-list">
          <TabList className="sidenav-list-inner no-bullets">
            <Tab className="sidenav-li-item no-bullets">
              <i className="fas fa-user-tie sidenav-list-icon"></i>Tutors
              </Tab>
            <Tab className="sidenav-li-item no-bullets">
              <i className="far fa-envelope sidenav-list-icon"></i>Inbox
              </Tab>
            <li className="sidenav-li-item no-bullets"><a href="/" onClick={(event) => { event.preventDefault(); window.open('https://connectedtutorvideochat.herokuapp.com/'); }}>
              <i className="far fa-envelope sidenav-list-icon"></i>Video Chat</a>
            </li>
            <Tab className="sidenav-li-item no-bullets">
              <i className="far fa-envelope sidenav-list-icon"></i>Payment
              </Tab>
          </TabList>
        </div>
        <div className="sidenav-interests">
          <p className="sidenav-interest-title">Interests</p>
          <div className="sidenav-interests-inner">
            {interests ? interests : ''}
            <div className="sidenav-interests-icon" onClick={(event) => displayInterestUpdater(event)}><i className="fas fa-plus"></i></div>
          </div>
        </div>
        <div className="header-logo-container">
          <div className="header-logo">
          </div>
          <a href="/" className="header-text">
            ConnectedTutor
        </a>
        </div>
        <button onClick={(event) => { handleSignOut(event) }}>Sign out</button>
      </div>
      <main className="dashboard-main-page">
        {interestUpdater ? interestUpdater : ''}
        <TabPanel>
          <TutorSearch />
        </TabPanel>
        <TabPanel>
          <TextChat />
        </TabPanel>
        <TabPanel>
          <MakePayment />
        </TabPanel>
      </main>
    </Tabs>

  )
};
export default Dashboard;