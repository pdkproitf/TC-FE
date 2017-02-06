import { Headers } from '@angular/http';
export class HeadersService {
    createAuthHeaders(headers: Headers) {
        headers.append('Content-Type', 'application/json');
        if (localStorage.getItem('UserInfo') != null) {
            let userInfo = localStorage.getItem('UserInfo');
            let userObj = JSON.parse(userInfo);
            headers.append('uid', userObj.uid);
            headers.append('client', userObj.client);
            headers.append('access_token', userObj.token);
        }
    }
}
