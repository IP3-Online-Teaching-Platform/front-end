import firebase from "firebase/app";
import React, { useState } from "react";
import { auth } from '../Auth/Firebase-Auth';
import { postNewTutor, getTutor } from '../Auth/API'

const TutorSignUp = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        await auth.createUserWithEmailAndPassword(email, password)
            .then(async () => {
                auth.currentUser.updateProfile({ displayName: `${firstname} ${lastname}` });
                const success = await postNewTutor({ uid: auth.currentUser.uid, email: email, username: email.split('@')[0], active: true, first_name: firstname, last_name: lastname }, event)
                    .catch(err => console.log(err))
                if (success) {
                    auth.currentUser.api = await getTutor();
                    if (auth.currentUser.api) {
                        window.location.replace("/");
                    }
                }
            })
            .catch(err => {
                console.log(err);
                setError('Error signing up with email and password');
            })

        setError(null);
        setEmail("");
        setPassword("");
        setFirstname("");
        setLastname("");
    };

    const createUserWithGoogleHandler = async (event) => {
        event.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        let userdata = await auth.signInWithPopup(provider);

        const newUserData = {
            uid: auth.currentUser.uid,
            email: userdata.user.email,
            username: userdata.user.email,
            active: true,
            first_name: userdata.additionalUserInfo.profile.given_name,
            last_name: userdata.additionalUserInfo.profile.family_name,
        }

        const success = await postNewTutor(newUserData, event)
            .catch(err => console.log(err))
        if (success) {
            auth.currentUser.api = await getTutor();
            if (auth.currentUser.api) {
                window.location.replace("/");
            } else {
                console.log('error on sign up with google /get')
            }
        }
        window.location.replace("/");
    }

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "fname") {
            setFirstname(value);
        } else if (name === "lname") {
            setLastname(value);
        };
    };

    return (
        <div className="register-container">
            <div className="main-login-container">
                <div className="google-facebook-container">
                    <div className="google-facebook">
                        <div className="google-facebook-button">
                            <div className="image-container">
                                <img src="/assets/googlelogo.png" className="google-button-image" alt='' />
                            </div>
                            <button type="submit" className="google-facebook-link" onClick={(event) => { createUserWithGoogleHandler(event) }}>Sign up with Google</button>
                        </div>
                        <div className="google-facebook-button">
                            <div className="image-container">
                                <img src="/assets/facebooklogo.jpg" className="google-button-image" alt='' />
                            </div>
                            <a href="/facebookregister" className="google-facebook-link">
                                Sign up with Facebook
                    </a>
                        </div>
                    </div>
                </div>


                <form className="login-form" action="/dashboard">
                    <p className="login-title">Start learning!</p>

                    <label className="form-label" htmlFor="fname">First name</label>
                    <input type="text" className="form-input" name="fname" value={firstname} onChange={(event) => onChangeHandler(event)} />

                    <label className="form-label" htmlFor="lname">Last name</label>
                    <input type="text" className="form-input" name="lname" value={lastname} onChange={(event) => onChangeHandler(event)} />

                    <label className="form-label" htmlFor="email">Email</label>
                    <input type="email" className="form-input" name="email" value={email} onChange={(event) => onChangeHandler(event)} />

                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" className="form-input" name="password" value={password} onChange={(event) => onChangeHandler(event)} />

                    {error !== null && (
                        <div>
                            {error}
                        </div>
                    )}

                    <button type="submit" className="login-form-submit-button" onClick={event => {
                        createUserWithEmailAndPasswordHandler(event, email, password);
                    }}>Create account</button>

                    <a className="login-form-text" href="/login">Already have an account?</a>
                </form>

            </div>
        </div>
    );
};
export default TutorSignUp;