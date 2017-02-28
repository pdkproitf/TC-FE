import { Headers } from '@angular/http';
export class HeadersService {
    createAuthHeaders(headers: Headers) {
        headers.append('Content-Type', 'application/json');
        if (localStorage.getItem('UserInfo') != null) {
            let userInfo = localStorage.getItem('UserInfo');
            let userObj = JSON.parse(userInfo);
            headers.append('uid', userObj.user.uid);
            headers.append('client', userObj.user.client);
            headers.append('access_token', userObj.user.token);
            headers.append('company_domain', userObj.company.domain);
        }
    }
}
