import { useState } from "react";
import { auth, db } from '../Auth/Firebase-Auth';
import { searchTutors } from '../Auth/API';
import moment from 'moment';


const TutorSearch = () => {

    const [searchTopic, setSearchTopic] = useState('');
    const [tutorDisplay, setTutorDisplay] = useState('');
    const [tutorDetailsHTML, setTutorDetailsHTML] = useState('');

    const handleSubjectSearch = async (event) => {
        event.preventDefault();
        const collRef = db.collection('tutors');
        const docs = await collRef.where('modules', 'array-contains', searchTopic).get();
        let uids = [];
        docs.forEach(doc => {
            uids.push(doc.id);
        })
        const tutors = await searchTutors(uids)
            .catch(err => console.log(err));

        buildTutorDisplayHTML(tutors);
    }

    const onSearchChangeHandler = (event) => {
        event.preventDefault();
        const { value } = event.currentTarget;
        setSearchTopic(value);
    }

    const buildTutorDisplayHTML = async (tutors) => {
        let html = undefined

        for(let tutor of tutors){
            let tutorRef = await db.collection('tutors').doc(tutor.uid).get();
            let modules = tutorRef.data();
            modules = modules.modules;
            tutor.modules = modules;
        }

        if (tutors.length >= 1) {
            html = (
                <>
                    {
                        tutors.map(tutor => (
                            < div className="tutor-container" value={tutor.uid} onClick={(event) => handleDisplayTutorDetails(event)} >
                                <div className="tutor-name-picture">
                                    <div className="tutor-subjects-name">
                                        <div className="tutor-name">{tutor.first_name + " " + tutor.last_name}</div>
                                        <div className="tutor-subjects">
                                            {
                                                tutor.modules.map(subject => (
                                                    <div className="tutor-subject">{subject}</div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div >
                        ))
                    }
                </>
            )
        } else {
            html = (
                <>
                We're working had to get tutors for {searchTopic}! We'll have some here soon!
                </>
            )
        }
        setTutorDisplay(html);
    }

    const handleSendMessage = async (event, tUID, tName) => {
        event.preventDefault();

        const userToMessage = tUID;
        const usernameToMessage = tName;
        const msgContent = document.getElementById('tutor-chat-message-content').value;

        if (!userToMessage) {
            return console.log('No user to message found');
        }

        if(msgContent.length === 0){
            return console.log('No message to send')
        }

        let sortedUsers = [auth.currentUser.uid, userToMessage].sort()
        let sortedUsernames = []
        if (sortedUsers[0] === auth.currentUser.uid) {
            sortedUsernames.push(auth.currentUser.displayName);
            sortedUsernames.push(usernameToMessage);
        } else {
            sortedUsernames.push(usernameToMessage);
            sortedUsernames.push(auth.currentUser.displayName);
        }

        let docname = sortedUsers.join('|');

        const docRef = db.collection('conversations').doc(docname);
        const doc = await docRef.get();
        const docData = doc.data();

        db.collection('conversations').doc(docname).set(
            {
                recentMessage: {
                    timestamp: moment().unix() * 1000,
                    content: msgContent,
                    author: auth.currentUser.uid
                },
                users: sortedUsers,
                usernames: sortedUsernames,
                created: docData ? docData.created : moment().unix() * 1000
            }
        )

        db.collection('conversations').doc(docname).collection('messages').add(
            {
                timestamp: moment().unix() * 1000,
                content: msgContent,
                author: auth.currentUser.uid
            }
        )
        document.getElementById('tutor-chat-message-content').value = "";
        document.getElementById('tutor-chat-message-content').placeholder = "Your message has been sent! Check your inbox for replies!";

    }

    const handleDisplayTutorDetails = async (event) => {
        event.preventDefault();
        const tutorUID = event.currentTarget.getAttribute('value');
        let tutorData = await searchTutors([tutorUID]);

        let tutorRef = await db.collection('tutors').doc(tutorUID).get();
        let modules = tutorRef.data();
        modules = modules.modules;
        tutorData[0].modules = modules;

        const tutorName = tutorData[0].first_name + " " +tutorData[0].last_name

        const tutorDisplayHTML = (
                <div id="tutorDetails" className="tutor-details-container">
                    <div className="tutor-details-name-picture">
                        <div className="tutor-picture">
                        </div>
                        <div className="tutor-details-name">{`${tutorName}`}</div>
                        <a href={`mailto:${tutorData[0].email}`} className="tutor-email">{tutorData[0].email}</a>
                        <div className="tutor-contact-container">
                            <div className="tutor-contact-button">
                                <div onClick={(event) => { event.preventDefault(); window.open('https://connectedtutorvideochat.herokuapp.com/'); }}><i className="fas fa-phone sidenav-list-icon"></i>Call</div>
                            </div>
                        </div>
                    </div>

                    <div className="tutor-details">
                        <div className="tabs-container">
                            <div className="tab tab-active"><span className="tab-text tab-text-active">Overview</span></div>
                        </div>
                        <div className="tutor-age-container">
                            <div className="tutor-detail">Subjects:</div>
                            <div className="tutor-education-actual">
                            {
                                tutorData[0].modules.map(subject => (
                                    <div className="tutor-actual">{subject}</div>
                                ))
                            }
                            </div>
                        </div>
                        <div className="chat-typing">
                            <input type="text" id="tutor-chat-message-content" className="chat-input" name="msgContent" />
                            <div className="chat-buttons-container">
                                <div className="chat-buttons"></div>
                            <div className="chat-attachments">
                                <i className="fas fa-phone sidenav-list-icon" onClick={() => window.open('https://connectedtutorvideochat.herokuapp.com/')}></i>
                                <i className="fas fa-paper-plane input-send" onClick={(event) => { handleSendMessage(event, tutorUID, tutorName) }}></i>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
        );
        setTutorDetailsHTML(tutorDisplayHTML);
    }

    return (
        <div className="tutors-container">
            <div className="results-container">
                <div className="find-tutors-title">Find tutors</div>
                <div className="tutors-search-container">
                    <input className="search" type="search" id="site-search" name="search" placeholder="Type in your preferred subject. F.ex. 'Biology'" value={searchTopic} onChange={event => onSearchChangeHandler(event)} />
                    <div className="icon-center" onClick={event => handleSubjectSearch(event)}><i className="fa fa-search search-icon"></i></div>
                </div>
                <div className="tutor-results-container">
                    <div className="tutor-results-text">Results:</div>
                    {tutorDisplay ? tutorDisplay : 'No tutors found! Try another subject!'}
                </div>
            </div>
            <div className="tutors-details-container-main">
                {
                tutorDetailsHTML? tutorDetailsHTML : 
                <div id="clickGuide" className="click-on-tutor">
                    <div className="click-tutor-image"></div>
                    <p>Click a tutor to see their full details</p>
                </div>
                }
            </div>
        </div>
    )
}

export default TutorSearch;