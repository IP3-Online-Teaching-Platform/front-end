import { auth } from '../Auth/Firebase-Auth';
import https from 'https';

export const postNewUser = (userdata, event) => {
    auth.currentUser.api = userdata;
    return new Promise(async (resolve, reject) => {
        event.preventDefault();
        const newUserResponse = await postNewUserAPI(userdata)
            .catch(err => { return reject(err) });
        console.log(`Post New User Response: ${JSON.parse(newUserResponse)}`);
        return resolve(JSON.parse(newUserResponse));
    })
}

export const getUser = async () => {
    const userData = await getUserAPI()
        .catch(err => console.log(err));
    console.log(`Get User Data Response: ${JSON.parse(userData)}`);
    auth.currentUser.api = userData;
}

async function postNewUserAPI(userdata) {
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

async function getUserAPI() {
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