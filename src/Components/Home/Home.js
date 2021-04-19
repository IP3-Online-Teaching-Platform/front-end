import React from 'react'

const Home = () => {

    return (
        <div>
            <div className="hero">
                <div className="hero-container">
                    <div className="landing-text-container">
                        <h1 className="landing-title">The place to learn.</h1>
                        <h2 className="landing-text">Whether you need to catch up at
                        university, prepare for exams or you simply have a desire to learn,
                        ConnectedTutor can make that happen. From the comfort of your own home.</h2>
                        <h2 className="landing-text">Try it out. It's free.</h2>
                        <div className="login-register-container">
                            <div className="landing-register-button">
                                <a href="/studentsignup">Start learning</a>
                            </div>
                        </div>
                        <div className="teacher-text-container">
                            <a className="teacher-question-text" href="/tutorsignup">Are you a tutor? Click here.</a>
                        </div>
                    </div>
                    <div className="hero-logo">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;