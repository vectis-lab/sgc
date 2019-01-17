import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { constants } from '../app.constants';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../components/parts/error-dialog/error-dialog.component';
import * as jwtDecode from 'jwt-decode';
import * as LogRocket from 'logrocket';
import * as auth0 from 'auth0-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export const expiredAtKey = 'expired_at';
export const uidKey = 'uid';
export const urlStateKey = 'urlState';

@Injectable()
export class Auth {
    auth0 = new auth0.WebAuth({
        clientID: environment.auth0ClientId,
        domain: environment.auth0Domain,
        responseType: 'token id_token',
        redirectUri: `${constants.ORIGIN_URL}/auth`,
        scope: 'openid email'
    });

    private userPermissionsSource = new BehaviorSubject<string[]>([]);
    userPermissions = this.userPermissionsSource.asObservable();
    
    constructor(private router: Router,
                public dialog: MatDialog,
                private http: HttpClient) {
    }

    public handleAuthentication(): void {
        this.auth0.parseHash(this.handleAuthResult);
        LogRocket.identify(localStorage.getItem(uidKey));
    }

    public login() {
        localStorage.setItem(urlStateKey, location.pathname);
				this.auth0.authorize();
    };

    public signUp(email, password, cb) {
        this.auth0.signupAndAuthorize({
            email: email,
            password: password,
            connection: environment.auth0Connection
        }, cb);
    }

    public authenticated() {
        const exp = localStorage.getItem(expiredAtKey);
        if (!exp) {
            return false;
        }
        const expiresAt = JSON.parse(localStorage.getItem(expiredAtKey));
        return new Date().getTime() < expiresAt;
    };

    public logout() {
      this.clearLocalStorage();
      window.location.href = `https://${ environment.auth0Domain }/v2/logout?returnTo=${ constants.ORIGIN_URL }`;
    };

    public setSession(authResult): void {
        const idToken = jwtDecode(authResult.idToken);
        localStorage.setItem('idToken', authResult.idToken);
        localStorage.setItem(uidKey, idToken.email);
        localStorage.setItem('userId', idToken.sub);
        const expiresAt = JSON.stringify(idToken.exp * 1000);
        LogRocket.identify(localStorage.getItem(uidKey));
		localStorage.setItem(expiredAtKey, expiresAt);
    }

    public getSavedSearches(token){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${token.access_token}`
            })
        };
        return this.http.get(`https://${environment.auth0Domain}/api/v2/users/${localStorage.getItem('userId')}`, httpOptions).map((res: any) => res.user_metadata.savedSearches);
    }

    public updateSavedSearches(token, savedSearches){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${token.access_token}`
            })
        };
        return this.http.patch(`https://${environment.auth0Domain}/api/v2/users/${localStorage.getItem('userId')}`, {
            "user_metadata": {
                "savedSearches": savedSearches
        }}, httpOptions).map(res => res);
    }

    public getUserPermissions(token){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${token.access_token}`
            })
        };
        return this.http.get(`https://${environment.auth0Domain}/api/v2/users/${localStorage.getItem('userId')}`, httpOptions).map((res: any) => res.app_metadata.authorization.permissions);
    }

    public getToken(){
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json'
            })
        };
        return this.http.post(`https://${environment.auth0Domain}/oauth/token`, { 
        grant_type: 'client_credentials',
        client_id: environment.auth0MachineClientId,
        client_secret: environment.auth0MachineClientSecret,
        audience: `https://${environment.auth0Domain}/api/v2/` }, httpOptions).map(res => res);
    }

    private handleAuthResult = (err, authResult) => {
        if (err) {
            if (!environment.production) {
                console.log(err);
            }
            this.dialog.open(
                ErrorDialogComponent,
                { data: "An error occurred while trying to authenticate. Please ensure private browsing is disabled and try again."}
            );
        } else if (authResult && authResult.idToken && authResult.idToken !== 'undefined') {
            this.setSession(authResult);
            const path = localStorage.getItem(urlStateKey);
			this.router.navigateByUrl(path);
        }
    };

    clearLocalStorage() {
        localStorage.removeItem(expiredAtKey);
        localStorage.removeItem(uidKey);
        localStorage.removeItem(urlStateKey);
        localStorage.removeItem('userId')
    }

    setUserPermissions(permissions){
        this.userPermissionsSource.next(permissions);
    }
}
