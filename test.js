const https = require('https')


async function pollApi() {
    const options = {
        hostname: 'httpbin.org',
        path: `/post`,
        method: 'POST'
    };

    const response = await getData(options)
    console.log(JSON.parse(response))
}

function getData(options) {
    return new Promise((resolve, reject) => {
        let responseData = ''
        const req = https.request(options, (res) => {

            res.on('data', (d) => {
                responseData += d
            });

            res.on('end', () => {
                return resolve(responseData)
            });

        });
        req.write(JSON.stringify(options))
        req.end()
    });
}

pollApi()