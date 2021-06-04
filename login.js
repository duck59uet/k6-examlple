import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

//init
const configs = JSON.parse(open(`./config/env.json`));

export function login(userName_, pass_, isCustomer_) {

    var payload = JSON.stringify({
        username: userName_,
        password: pass_,
        isCustomer: isCustomer_
    });
    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let loginRes = http.post(`${configs.BASE_URL}/v1/api/authentication/signin`, payload, params);

    let resp = loginRes.json();
    let token = resp.Data.idToken.jwtToken;

    return token;
};