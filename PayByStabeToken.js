import http from 'k6/http';
import { sleep, check } from 'k6';
import { login } from './login.js'

export let options = {
    vus: 300, // 100 users looping for 5 minute
    duration: '5m',
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

//init
const configs = JSON.parse(open(`./config/env.json`));


//Check performance of API pay by stable token
export default function () {
    //Get jwt Token
    let token = login('ducnv1911@gmail.com', 'admin@123', true);
    console.log(token);

    var payload = JSON.stringify({
        partnerId: 15,
        amount: 1,
    });
    var params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };
    let loginRes = http.post(`${configs.BASE_URL}/v1/api/stable-token/pay-by-stable-token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('statusCode') == 200,
    });

    console.log(loginRes.body);
}
