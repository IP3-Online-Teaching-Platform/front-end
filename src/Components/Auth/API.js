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
    const userData = await getStudentAPI()
        .catch(err => console.log(err));
    console.log(`Get Student Data Response: ${JSON.parse(userData)}`);
    auth.currentUser.api = userData;
}

export const getTutor = async () => {
    const userData = await getTutorAPI()
        .catch(err => console.log(err));
    console.log(`Get Tutor Data Response: ${JSON.parse(userData)}`);
    auth.currentUser.api = userData;
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