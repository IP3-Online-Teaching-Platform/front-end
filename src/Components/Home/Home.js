import React from 'react'

const Home = () => {

    return (
        <div>
            <div class="hero">
                <div class="hero-container">
                    <div class="landing-text-container">
                        <h1 class="landing-title">The place to learn.</h1>
                        <h2 class="landing-text">Whether you need to catch up at
                        university, prepare for exams or you simply have a desire to learn,
                        ConnectedTutor can make that happen. From the comfort of your own home.</h2>
                        <h2 class="landing-text">Try it out. It's free.</h2>
                        <div class="login-register-container">
                            <div class="landing-register-button">
                                <a href="/register">Start learning</a>
                            </div>
                        </div>
                        <div class="teacher-text-container">
                            <a class="teacher-question-text" href="/tutorregister">Are you a tutor? Click here.</a>
                        </div>
                    </div>
                    <div class="hero-logo">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;