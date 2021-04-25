import { auth } from '../Auth/Firebase-Auth';
import https from 'https';

export const postNewStudent = (userdata, event) => {
    auth.currentUser.api = userdata;
    return new Promise(async (resolve, reject) => {
        event.preventDefault();
        const newUserResponse = await postNewStudentAPI(userdata)
            .catch(err => { return reject(err) });
        console.log(`Post New Student Response: ${JSON.parse(newUserResponse)}`);
        return resolve(JSON.parse(newUserResponse));
    })
}

export const postNewTutor = (userdata, event) => {
    auth.currentUser.api = userdata;
    return new Promise(async (resolve, reject) => {
        event.preventDefault();
        const newUserResponse = await postNewTutorAPI(userdata)
            .catch(err => { return reject(err) });
        console.log(`Post New Tutor Response: ${JSON.parse(newUserResponse)}`);
        return resolve(JSON.parse(newUserResponse));
    })
}

export const getStudent = async () => {
    return new Promise(async (resolve) => {
        const userData = await getStudentAPI()
            .catch(err => { return resolve(false); });
        try {
            JSON.parse(userData);
        } catch (err) {
            return resolve(false);
        }
        return resolve(userData);
    })
}

export const getTutor = () => {
    return new Promise(async (resolve) => {
        const userData = await getTutorAPI()
            .catch(err => { return resolve(false); });
        try {
            JSON.parse(userData);
        } catch (err) {
            return resolve(false);
        }
        return resolve(userData);
    })
}

export const searchTutors = (ids) => {
    return new Promise(async (resolve) => {

        //Try check if they are tutors first
        let tutors = await getSearchTutorAPI(ids)
            .catch(err => { console.log(err); return resolve(false); })
        try {
            tutors = JSON.parse(tutors);
        } catch (err) {
            console.log(err);
            return resolve(false);
        }

        //If no tutors found try check if there are students with the uid searched
        if (tutors.length === 0) {
            tutors = await getSearchStudentAPI(ids)
                .catch(err => { console.log(err); return resolve(false); })
            try {
                tutors = JSON.parse(tutors)
            } catch (err) {
                console.log(err);
                return resolve(false);
            }
        }
        return resolve(tutors);
    })
}

async function postNewStudentAPI(userdata) {
    return new Promise(async (resolve, reject) => {
        const body = JSON.stringify(userdata)
        //Get Firebase Auth token
        const authtoken = await auth.currentUser.getIdToken(true)
            .catch(err => { return reject(err) })
        let responsedata = '';
        //Prep GET options
        const options = {
            host: 'develop-dot-ip3-online-teaching-platform.appspot.com',
            path: '/student/post',
            method: 'POST',
            headers: {
                'Authorization': authtoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        };
        //Make API call
        const req = https.request(options, (res) => {
            res.on('data', (d) => {
                responsedata += d;
            });
            res.on('end', () => {
                return resolve(responsedata);
            });
        });
        req.write(body);
        req.end();
    });
}
async function postNewTutorAPI(userdata) {
    return new Promise(async (resolve, reject) => {
        const body = JSON.stringify(userdata)
        //Get Firebase Auth token
        const authtoken = await auth.currentUser.getIdToken(true)
            .catch(err => { return reject(err) })
        let responsedata = '';
        //Prep GET options
        const options = {
            host: 'develop-dot-ip3-online-teaching-platform.appspot.com',
            path: '/professor/post',
            method: 'POST',
            headers: {
                'Authorization': authtoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        };
        //Make API call
        const req = https.request(options, (res) => {
            res.on('data', (d) => {
                responsedata += d;
            });
            res.on('end', () => {
                return resolve(responsedata);
            });
        });
        req.write(body);
        req.end();
    });
}

async function getStudentAPI() {
    return new Promise(async (resolve, reject) => {
        let responsedata = '';

        //Get firebase data
        const authtoken = await auth.currentUser.getIdToken(true)
            .catch(err => { return reject(err) });

        //GET options
        const options = {
            host: 'develop-dot-ip3-online-teaching-platform.appspot.com',
            path: `/student/get`,
            method: 'GET',
            headers: {
                'Authorization': authtoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        };

        //Make API call
        https.get(options, (res) => {
            res.on('data', (d) => {
                responsedata += d;
            });
            res.on('end', () => {
                return resolve(responsedata);
            })
        });
    });
}

async function getTutorAPI() {
    return new Promise(async (resolve, reject) => {
        let responsedata = '';

        //Get firebase data
        const authtoken = await auth.currentUser.getIdToken(true)
            .catch(err => { return reject(err) });

        //GET options
        const options = {
            host: 'develop-dot-ip3-online-teaching-platform.appspot.com',
            path: `/professor/get`,
            method: 'GET',
            headers: {
                'Authorization': authtoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        };

        //Make API call
        https.get(options, (res) => {
            res.on('data', (d) => {
                responsedata += d;
            });
            res.on('end', () => {
                return resolve(responsedata);
            })
        });
    });
}

async function getSearchTutorAPI(ids) {
    return new Promise(async (resolve, reject) => {
        let responsedata = '';
        let body = JSON.stringify({ ids: ids, role: 'professor' });
        //Get firebase data
        const authtoken = await auth.currentUser.getIdToken(true)
            .catch(err => { return reject(err) });

        //GET options
        const options = {
            host: 'develop-dot-ip3-online-teaching-platform.appspot.com',
            path: `/search/all`,
            method: 'POST',
            headers: {
                'Authorization': authtoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        };

        //Make API call
        const req = https.request(options, (res) => {
            res.on('data', (d) => {
                responsedata += d;
            });
            res.on('end', () => {
                return resolve(responsedata);
            });
        });
        req.write(body);
        req.end();
    });
}

async function getSearchStudentAPI(ids) {
    return new Promise(async (resolve, reject) => {
        let responsedata = '';
        let body = JSON.stringify({ ids: ids, role: 'student' });
        //Get firebase data
        const authtoken = await auth.currentUser.getIdToken(true)
            .catch(err => { return reject(err) });

        //GET options
        const options = {
            host: 'develop-dot-ip3-online-teaching-platform.appspot.com',
            path: `/search/all`,
            method: 'POST',
            headers: {
                'Authorization': authtoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        };

        //Make API call
        const req = https.request(options, (res) => {
            res.on('data', (d) => {
                responsedata += d;
            });
            res.on('end', () => {
                return resolve(responsedata);
            });
        });
        req.write(body);
        req.end();
    });
}