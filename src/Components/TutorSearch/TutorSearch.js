import { useState } from "react";
import { db } from '../Auth/Firebase-Auth';
import { searchTutors } from '../Auth/API';

const TutorSearch = () => {

    const [searchTopic, setSearchTopic] = useState('')
    const [tutorDisplay, setTutorDisplay] = useState('')
    const [tutorDetailsUID, setTutorDetailsUID] = useState('')

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

    const handleDisplayTutorDetails = (event) => {
        event.preventDefault();
        setTutorDetailsUID(event.currentTarget.getAttribute('value'));
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

                <div id="clickGuide" className="click-on-tutor">
                    <div className="click-tutor-image"></div>
                    <p>Click a tutor to see their full details</p>
                </div>
                <div id="tutorDetails" className="tutor-details-container">
                    <div className="tutor-details-name-picture">
                        <div className="tutor-picture">
                        </div>
                        <div className="tutor-details-name">Mark McCane</div>
                        <a href="mailto:mark.mccane@gmail.com" className="tutor-email">mark.mccane@gmail.com</a>
                        <div className="tutor-contact-container">
                            <div className="tutor-add-button">
                                <a href="/add"><i className="far fa-plus-square sidenav-list-icon"></i>Add</a>
                            </div>
                            <div className="tutor-contact-button">
                                <a href="/contact"><i className="far fa-envelope sidenav-list-icon"></i>Contact</a>
                            </div>
                        </div>
                    </div>

                    <div className="tutor-details">
                        <div className="tabs-container">
                            <div className="tab tab-active"><span className="tab-text tab-text-active">Overview</span></div>
                        </div>
                        <div className="tutor-age-container">
                            <div className="tutor-detail">Age:</div>
                            <div className="tutor-actual">58</div>
                        </div>
                        <div className="tutor-age-container">
                            <div className="tutor-detail">Education:</div>
                            <div className="tutor-education-actual">
                                <div className="tutor-actual">BSc(Hons) Computing, Glasgow Caledonian University</div>
                                <div className="tutor-actual">MSc Artificial Intelligence, Glasgow University</div>
                            </div>
                        </div>
                        <div className="tutor-age-container">
                            <div className="tutor-detail">Work history:</div>
                            <div className="tuor-education-actual">
                                <div className="tutor-actual">2005-2010: Lecturer at Glasgow Caledonian University</div>
                                <div className="tutor-actual">2010-2015: Lecturer at Glasgow University</div>
                                <div className="tutor-actual">2015-now: Lecturer at University of Strathclyde</div>
                            </div>
                        </div>
                        <div className="tutor-age-container">
                            <div className="tutor-detail">Description:</div>
                            <div className="tutor-actual">"I am very passionate about Artificial Intelligence, especially picture analysis. If you're interested in that, please contact me."</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TutorSearch;